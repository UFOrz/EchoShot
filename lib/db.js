// 相册数据库：基于 IndexedDB，扩展内各页面（面板/相册）共享同一数据库
// 记录结构：
// {
//   id, createdAt,
//   prompt,            // 实际用于生成的提示词（可能被用户编辑过）
//   requestPrompt,     // 实际发送给生图/编辑模型的提示词
//   sourcePrompt,      // 反推得到的原始提示词
//   promptZh,          // 反推得到的中文解读
//   platformId, provider, model, // 稳定平台 ID / 生成平台显示名 / 模型
//   width, height, ratio, size,  // 尺寸像素 / 比例 / 请求尺寸
//   srcUrl, pageUrl, sourceAssetId, // 来源图片地址 / 所在页面 / 对比素材引用
//   sourceBlob,         // v1/v2 旧记录的内嵌原图，继续兼容读取
//   blob               // 图片二进制（Blob）
// }

import {
  backupCharacter,
  backupDirectoryId,
  backupRecord,
  ensureBackupDirectoryId,
  finishBackupBatch,
  getBackupConfig
} from './local-backup.js';
import { reportBackupError } from './local-backup.js';
import { needsBackupQueue, restoredBackupState } from './backup-status.js';

const DB_NAME = 'ir-gallery';
const DB_VERSION = 3;
const STORE = 'images';
const CHARACTER_STORE = 'characters';
const ASSET_STORE = 'assets';
const BACKUP_QUEUE_REVISION_KEY = 'localBackupQueueRevision';
const BACKUP_QUEUE_REVISION = 3;

function openDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(STORE)) {
        const store = db.createObjectStore(STORE, { keyPath: 'id' });
        store.createIndex('createdAt', 'createdAt');
      }
      if (!db.objectStoreNames.contains(CHARACTER_STORE)) {
        const characters = db.createObjectStore(CHARACTER_STORE, { keyPath: 'id' });
        characters.createIndex('createdAt', 'createdAt');
        characters.createIndex('albumRecordId', 'albumRecordId');
      } else {
        const characters = req.transaction.objectStore(CHARACTER_STORE);
        if (!characters.indexNames.contains('albumRecordId')) {
          characters.createIndex('albumRecordId', 'albumRecordId');
        }
      }
      if (!db.objectStoreNames.contains(ASSET_STORE)) {
        const assets = db.createObjectStore(ASSET_STORE, { keyPath: 'id' });
        assets.createIndex('createdAt', 'createdAt');
      }
    };
    req.onsuccess = () => {
      const db = req.result;
      db.onversionchange = () => db.close();
      resolve(db);
    };
    req.onerror = () => reject(req.error);
    req.onblocked = () => reject(new Error('相册数据库正被其他页面占用，请关闭其他相册或设置页面后重试'));
  });
}

function tx(db, mode, fn) {
  return new Promise((resolve, reject) => {
    const t = db.transaction(STORE, mode);
    const store = t.objectStore(STORE);
    const result = fn(store);
    t.oncomplete = () => resolve(result?.result ?? result);
    t.onerror = () => reject(t.error);
    t.onabort = () => reject(t.error);
  });
}

function reqToPromise(req) {
  return new Promise((resolve, reject) => {
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

async function activeBackupConfig() {
  const config = await getBackupConfig().catch(() => null);
  if (!config?.enabled || !config.handle) return null;
  if (config.directoryId) return config;
  return ensureBackupDirectoryId().catch(() => config);
}

export async function getRequiredSourceBlob(record) {
  if (!record?.sourceAssetId) return record?.sourceBlob || null;
  const blob = await getSourceBlob(record);
  if (!(blob instanceof Blob) || blob.size <= 0) {
    throw new Error('关联原图不存在或无法读取，已保留待处理状态');
  }
  return blob;
}

export async function addRecord(rec) {
  const backupConfig = await activeBackupConfig();
  const storedRecord = backupConfig
    ? { ...rec, backupPending: true, backupDirectoryId: backupDirectoryId(backupConfig) }
    : rec;
  const db = await openDB();
  await tx(db, 'readwrite', (s) => s.put(storedRecord));
  db.close();
  if (!backupConfig) return rec.id;
  const result = await backupRecord(storedRecord);
  if (result.ok) await markBackupComplete(rec.id, result.directoryId).catch(() => {});
  else if (!result.skipped && storedRecord.backupPending) await markBackupFailed(rec.id, result.error || result.message, backupDirectoryId(backupConfig)).catch(() => {});
  return rec.id;
}

export async function addRecordWithSource(rec, sourceBlob = null, sourceAssetId = '') {
  const backupConfig = await activeBackupConfig();
  const storedRecord = backupConfig
    ? { ...rec, backupPending: true, backupDirectoryId: backupDirectoryId(backupConfig) }
    : rec;
  const recordForStorage = { ...storedRecord };
  delete recordForStorage.sourceBlob;
  if (sourceAssetId) recordForStorage.sourceAssetId = sourceAssetId;
  const db = await openDB();
  const stores = sourceAssetId ? [STORE, ASSET_STORE] : [STORE];
  await new Promise((resolve, reject) => {
    const transaction = db.transaction(stores, 'readwrite');
    transaction.objectStore(STORE).put(recordForStorage);
    if (sourceAssetId) {
      const assets = transaction.objectStore(ASSET_STORE);
      const request = assets.get(sourceAssetId);
      request.onsuccess = () => {
        const existing = request.result;
        if (existing) {
          assets.put({ ...existing, refCount: Math.max(0, Number(existing.refCount) || 0) + 1 });
        } else if (sourceBlob) {
          assets.put({
            id: sourceAssetId,
            createdAt: Date.now(),
            refCount: 1,
            blob: sourceBlob
          });
        }
      };
    }
    transaction.oncomplete = resolve;
    transaction.onerror = () => reject(transaction.error);
    transaction.onabort = () => reject(transaction.error);
  });
  db.close();
  if (!backupConfig) return rec.id;
  let backupSource;
  try {
    if (sourceAssetId) {
      backupSource = await getRequiredSourceBlob({ ...recordForStorage, sourceBlob });
    } else {
      backupSource = sourceBlob;
      if (backupSource && (!(backupSource instanceof Blob) || backupSource.size <= 0)) {
        throw new Error('关联原图不存在或无法读取，已保留待处理状态');
      }
    }
  } catch (error) {
    await markBackupFailed(rec.id, error, backupDirectoryId(backupConfig)).catch(() => {});
    await reportBackupError(error);
    return rec.id;
  }
  const result = await backupRecord(recordForStorage, { sourceBlob: backupSource });
  if (result.ok) await markBackupComplete(rec.id, result.directoryId).catch(() => {});
  else if (!result.skipped && storedRecord.backupPending) await markBackupFailed(rec.id, result.error || result.message, backupDirectoryId(backupConfig)).catch(() => {});
  return rec.id;
}

export async function markBackupComplete(id, directoryId = '') {
  const db = await openDB();
  await new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE, 'readwrite');
    const store = transaction.objectStore(STORE);
    const request = store.get(id);
    request.onsuccess = () => {
      if (request.result && (!directoryId || request.result.backupDirectoryId === directoryId)) {
        const next = { ...request.result, backupPending: false, backedUpAt: Date.now() };
        if (directoryId) next.backupDirectoryId = directoryId;
        delete next.backupError;
        store.put(next);
      }
    };
    transaction.oncomplete = resolve;
    transaction.onerror = () => reject(transaction.error);
    transaction.onabort = () => reject(transaction.error);
  });
  db.close();
}

export async function markBackupFailed(id, error, directoryId = '') {
  const db = await openDB();
  await new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE, 'readwrite');
    const store = transaction.objectStore(STORE);
    const request = store.get(id);
    request.onsuccess = () => {
      if (request.result && (!directoryId || request.result.backupDirectoryId === directoryId)) store.put({
        ...request.result,
        backupPending: true,
        ...(directoryId ? { backupDirectoryId: directoryId } : {}),
        backupError: String(error || '备份失败').slice(0, 1000)
      });
    };
    transaction.oncomplete = resolve;
    transaction.onerror = () => reject(transaction.error);
    transaction.onabort = () => reject(transaction.error);
  });
  db.close();
}

export async function getPendingBackupIds() {
  const db = await openDB();
  const ids = [];
  await new Promise((resolve, reject) => {
    const request = db.transaction(STORE).objectStore(STORE).openCursor();
    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      const cursor = request.result;
      if (!cursor) return resolve();
      if (cursor.value?.backupPending) ids.push(cursor.primaryKey);
      cursor.continue();
    };
  });
  db.close();
  return ids;
}

export async function resumePendingBackups() {
  let config = await activeBackupConfig();
  const queuedIds = await getPendingBackupIds();
  const queuedCharacterIds = await getPendingCharacterBackupIds();
  if (!config) {
    // Disabled backups remain pending and can resume when the user enables them.
    return { completed: 0, charactersCompleted: 0, total: queuedIds.length + queuedCharacterIds.length };
  }
  const queueState = await chrome.storage.local.get(BACKUP_QUEUE_REVISION_KEY).catch(() => ({}));
  if (queueState[BACKUP_QUEUE_REVISION_KEY] !== BACKUP_QUEUE_REVISION || !config.directoryId) {
    // One-time migration queues records created before source/character backup existed.
    await queueAllBackups();
    config = await activeBackupConfig();
  }
  await queueAllBackups({ onlyMissing: true });
  const ids = await getPendingBackupIds();
  const characterIds = await getPendingCharacterBackupIds();
  const startedAt = Date.now();
  let completed = 0;
  for (const id of ids) {
    const record = await getById(id);
    if (!record) continue;
    let sourceBlob;
    try {
      sourceBlob = await getRequiredSourceBlob(record);
    } catch (error) {
      await markBackupFailed(id, error, backupDirectoryId(config)).catch(() => {});
      await reportBackupError(error);
      continue;
    }
    const result = await backupRecord(record, { configOverride: config, sourceBlob });
    if (result.skipped) return { completed, charactersCompleted: 0, total: ids.length + characterIds.length, paused: true };
    if (!result.ok) {
      if (!result.skipped) await markBackupFailed(id, result.error || result.message, backupDirectoryId(config)).catch(() => {});
      continue;
    }
    await markBackupComplete(id, result.directoryId);
    completed += 1;
  }
  let charactersCompleted = 0;
  for (const id of characterIds) {
    const record = await getCharacterById(id);
    if (!record) continue;
    const result = await backupCharacter(record, { configOverride: config });
    if (result.stale) continue;
    if (result.skipped) return { completed, charactersCompleted, total: ids.length + characterIds.length, paused: true };
    if (!result.ok) {
      if (!result.skipped) await markCharacterBackupFailed(id, result.error || result.message, backupDirectoryId(config), record.backupRevision || '').catch(() => {});
      continue;
    }
    await markCharacterBackupComplete(id, result.directoryId, record.backupRevision || '');
    charactersCompleted += 1;
  }
  const total = ids.length + characterIds.length;
  if (total && completed + charactersCompleted === total) {
    await finishBackupBatch(
      startedAt,
      `自动补备份完成，共 ${completed} 张图片、${charactersCompleted} 项角色素材`,
      {
        messageKey: '自动补备份完成，共 {images} 张图片、{characters} 项角色素材',
        messageVars: { images: completed, characters: charactersCompleted }
      }
    ).catch(() => {});
  }
  return { completed, charactersCompleted, total };
}

export async function getAll() {
  const db = await openDB();
  const list = await reqToPromise(db.transaction(STORE).objectStore(STORE).getAll());
  db.close();
  return (list || []).sort((a, b) => b.createdAt - a.createdAt);
}

export async function getAllRecordIds() {
  const db = await openDB();
  const ids = [];
  await new Promise((resolve, reject) => {
    const request = db.transaction(STORE).objectStore(STORE).index('createdAt').openKeyCursor(null, 'prev');
    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      const cursor = request.result;
      if (!cursor) return resolve();
      ids.push(cursor.primaryKey);
      cursor.continue();
    };
  });
  db.close();
  return ids;
}

export async function getRecordsByIds(ids = []) {
  if (!ids.length) return [];
  const db = await openDB();
  const store = db.transaction(STORE).objectStore(STORE);
  const records = await Promise.all(ids.map((id) => reqToPromise(store.get(id))));
  db.close();
  return records.filter(Boolean);
}

export function recordMatchesQuery(record, query, extraTerms = []) {
  const normalizedQuery = String(query || '').trim().toLowerCase();
  if (!normalizedQuery) return true;
  const additionalTerms = Array.isArray(extraTerms) ? extraTerms : [extraTerms];
  const haystack = [record.prompt, record.promptZh, record.model, record.provider, ...additionalTerms]
    .map((value) => String(value || '').toLowerCase())
    .join('\n');
  return haystack.includes(normalizedQuery);
}

export async function getPage({ offset = 0, limit = 48, query = '', searchTermsForRecord = null } = {}) {
  const db = await openDB();
  const normalizedOffset = Math.max(0, Number(offset) || 0);
  const normalizedLimit = Math.max(1, Math.min(100, Number(limit) || 48));
  const normalizedQuery = String(query || '').trim().toLowerCase();
  const records = [];
  let skipped = 0;
  let hasMore = false;
  await new Promise((resolve, reject) => {
    const store = db.transaction(STORE).objectStore(STORE);
    const request = store.index('createdAt').openCursor(null, 'prev');
    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      const cursor = request.result;
      if (!cursor) return resolve();
      const extraTerms = typeof searchTermsForRecord === 'function' ? searchTermsForRecord(cursor.value) : [];
      if (!recordMatchesQuery(cursor.value, normalizedQuery, extraTerms)) {
        cursor.continue();
        return;
      }
      if (skipped < normalizedOffset) {
        skipped += 1;
        cursor.continue();
        return;
      }
      if (records.length < normalizedLimit) {
        records.push(cursor.value);
        cursor.continue();
        return;
      }
      hasMore = true;
      resolve();
    };
  });
  db.close();
  return { records, hasMore };
}

export async function getById(id) {
  const db = await openDB();
  const rec = await reqToPromise(db.transaction(STORE).objectStore(STORE).get(id));
  db.close();
  return rec;
}

export async function getSourceBlob(rec) {
  if (rec?.sourceBlob) return rec.sourceBlob;
  if (!rec?.sourceAssetId) return null;
  const db = await openDB();
  const asset = await reqToPromise(db.transaction(ASSET_STORE).objectStore(ASSET_STORE).get(rec.sourceAssetId));
  db.close();
  return asset?.blob || null;
}

export async function removeMany(ids) {
  const uniqueIds = [...new Set(ids.filter(Boolean))];
  if (!uniqueIds.length) return;
  const db = await openDB();
  await new Promise((resolve, reject) => {
    // Read and mutate in one serialized transaction. A concurrent second delete
    // then observes the image as absent and cannot decrement its source twice.
    const transaction = db.transaction([STORE, ASSET_STORE], 'readwrite');
    const images = transaction.objectStore(STORE);
    const assets = transaction.objectStore(ASSET_STORE);
    let remaining = uniqueIds.length;
    const decrements = new Map();
    const finishReads = () => {
      if (--remaining > 0) return;
      for (const [assetId, decrement] of decrements) {
        const assetRequest = assets.get(assetId);
        assetRequest.onsuccess = () => {
          const asset = assetRequest.result;
          if (!asset) return;
          const nextCount = Math.max(0, Number(asset.refCount) || 0) - decrement;
          if (nextCount === 0) assets.delete(assetId);
          else assets.put({ ...asset, refCount: nextCount });
        };
      }
    };
    for (const id of uniqueIds) {
      const request = images.get(id);
      request.onsuccess = () => {
        const record = request.result;
        if (record) {
          images.delete(id);
          if (record.sourceAssetId) {
            decrements.set(record.sourceAssetId, (decrements.get(record.sourceAssetId) || 0) + 1);
          }
        }
        finishReads();
      };
      request.onerror = () => transaction.abort();
    }
    transaction.oncomplete = resolve;
    transaction.onerror = () => reject(transaction.error);
    transaction.onabort = () => reject(transaction.error);
  });
  db.close();
}

export async function countAll(query = '', { searchTermsForRecord = null } = {}) {
  const db = await openDB();
  const normalizedQuery = String(query || '').trim().toLowerCase();
  if (!normalizedQuery) {
    const n = await reqToPromise(db.transaction(STORE).objectStore(STORE).count());
    db.close();
    return n;
  }
  let n = 0;
  await new Promise((resolve, reject) => {
    const request = db.transaction(STORE).objectStore(STORE).openCursor();
    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      const cursor = request.result;
      if (!cursor) return resolve();
      const extraTerms = typeof searchTermsForRecord === 'function' ? searchTermsForRecord(cursor.value) : [];
      if (recordMatchesQuery(cursor.value, normalizedQuery, extraTerms)) n += 1;
      cursor.continue();
    };
  });
  db.close();
  return n;
}

export async function addCharacter(rec) {
  const backupConfig = await activeBackupConfig();
  // Saving may update an existing character. A paused backup must not retain
  // the previous revision's success marker: queue the new content for later.
  const storedRecord = {
    ...rec,
    backupRevision: crypto.randomUUID(),
    backupPending: true,
    backupDirectoryId: backupConfig ? backupDirectoryId(backupConfig) : (rec.backupDirectoryId || '')
  };
  delete storedRecord.backedUpAt;
  delete storedRecord.backupError;
  const db = await openDB();
  await new Promise((resolve, reject) => {
    const transaction = db.transaction(CHARACTER_STORE, 'readwrite');
    transaction.objectStore(CHARACTER_STORE).put(storedRecord);
    transaction.oncomplete = resolve;
    transaction.onerror = () => reject(transaction.error);
    transaction.onabort = () => reject(transaction.error);
  });
  db.close();
  if (!backupConfig) return rec.id;
  const result = await backupCharacter(storedRecord);
  if (result.ok) await markCharacterBackupComplete(rec.id, result.directoryId, storedRecord.backupRevision).catch(() => {});
  else if (!result.skipped && storedRecord.backupPending) {
    await markCharacterBackupFailed(rec.id, result.error || result.message, backupDirectoryId(backupConfig), storedRecord.backupRevision).catch(() => {});
  }
  return rec.id;
}

export async function addCharacterFromAlbumUnique(rec) {
  const backupConfig = await activeBackupConfig();
  const storedRecord = backupConfig
    ? { ...rec, backupPending: true, backupDirectoryId: backupDirectoryId(backupConfig) }
    : rec;
  const db = await openDB();
  const result = await new Promise((resolve, reject) => {
    const transaction = db.transaction(CHARACTER_STORE, 'readwrite');
    const store = transaction.objectStore(CHARACTER_STORE);
    const albumRecordId = String(storedRecord.albumRecordId || '');
    const request = albumRecordId
      ? store.index('albumRecordId').get(albumRecordId)
      : null;
    let outcome = { id: storedRecord.id, created: true };
    const insert = () => store.put(storedRecord);
    if (request) {
      request.onsuccess = () => {
        if (request.result) outcome = { id: request.result.id, created: false };
        else insert();
      };
      request.onerror = () => reject(request.error);
    } else {
      insert();
    }
    transaction.oncomplete = () => resolve(outcome);
    transaction.onerror = () => reject(transaction.error);
    transaction.onabort = () => reject(transaction.error);
  });
  db.close();
  if (result.created && backupConfig) {
    const backup = await backupCharacter(storedRecord);
    if (backup.ok) await markCharacterBackupComplete(storedRecord.id, backup.directoryId, storedRecord.backupRevision || '').catch(() => {});
    else if (!backup.skipped && storedRecord.backupPending) {
      await markCharacterBackupFailed(storedRecord.id, backup.error || backup.message, backupDirectoryId(backupConfig), storedRecord.backupRevision || '').catch(() => {});
    }
  }
  return result;
}

async function updateCharacterBackupState(id, update) {
  const db = await openDB();
  await new Promise((resolve, reject) => {
    const transaction = db.transaction(CHARACTER_STORE, 'readwrite');
    const store = transaction.objectStore(CHARACTER_STORE);
    const request = store.get(id);
    request.onsuccess = () => {
      if (request.result) store.put(update(request.result));
    };
    transaction.oncomplete = resolve;
    transaction.onerror = () => reject(transaction.error);
    transaction.onabort = () => reject(transaction.error);
  });
  db.close();
}

export async function markCharacterBackupComplete(id, directoryId = '', revision = '') {
  return updateCharacterBackupState(id, (record) => {
    if ((record.backupRevision || '') !== revision) return record;
    if (directoryId && record.backupDirectoryId !== directoryId) return record;
    const next = { ...record, backupPending: false, backedUpAt: Date.now() };
    if (directoryId) next.backupDirectoryId = directoryId;
    delete next.backupError;
    return next;
  });
}

export async function markCharacterBackupFailed(id, error, directoryId = '', revision = '') {
  return updateCharacterBackupState(id, (record) => {
    if ((record.backupRevision || '') !== revision) return record;
    if (directoryId && record.backupDirectoryId !== directoryId) return record;
    return {
      ...record,
      backupPending: true,
      ...(directoryId ? { backupDirectoryId: directoryId } : {}),
      backupError: String(error || '备份失败').slice(0, 1000)
    };
  });
}

export async function getPendingCharacterBackupIds() {
  const db = await openDB();
  const ids = [];
  await new Promise((resolve, reject) => {
    const request = db.transaction(CHARACTER_STORE).objectStore(CHARACTER_STORE).openCursor();
    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      const cursor = request.result;
      if (!cursor) return resolve();
      if (cursor.value?.backupPending) ids.push(cursor.primaryKey);
      cursor.continue();
    };
  });
  db.close();
  return ids;
}

export async function getCharacters() {
  const db = await openDB();
  const list = await reqToPromise(db.transaction(CHARACTER_STORE).objectStore(CHARACTER_STORE).getAll());
  db.close();
  return (list || []).sort((a, b) => b.createdAt - a.createdAt);
}

export async function getBackupStats() {
  const db = await openDB();
  const stats = { success: 0, failed: 0, pending: 0, images: 0, characters: 0 };
  await Promise.all([STORE, CHARACTER_STORE].map((storeName) => new Promise((resolve, reject) => {
    const request = db.transaction(storeName).objectStore(storeName).openCursor();
    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      const cursor = request.result;
      if (!cursor) return resolve();
      const record = cursor.value || {};
      if (storeName === STORE) stats.images += 1;
      else stats.characters += 1;
      if (record.backupPending && record.backupError) stats.failed += 1;
      else if (record.backedUpAt && !record.backupPending) stats.success += 1;
      else stats.pending += 1;
      cursor.continue();
    };
  })));
  db.close();
  return stats;
}

export async function queueAllBackups({ onlyMissing = false } = {}) {
  let config = await activeBackupConfig();
  if (!config) return getBackupStats();
  if (!config.directoryId) {
    config = await ensureBackupDirectoryId();
  }
  const directoryId = backupDirectoryId(config);
  const db = await openDB();
  await new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE, CHARACTER_STORE], 'readwrite');
    for (const storeName of [STORE, CHARACTER_STORE]) {
      const store = transaction.objectStore(storeName);
      const request = store.openCursor();
      request.onerror = () => transaction.abort();
      request.onsuccess = () => {
        const cursor = request.result;
        if (!cursor) return;
        if (onlyMissing && !needsBackupQueue(cursor.value, directoryId)) {
          cursor.continue();
          return;
        }
        const next = { ...cursor.value, backupPending: true, backupDirectoryId: directoryId };
        delete next.backupError;
        cursor.update(next);
        cursor.continue();
      };
    }
    transaction.oncomplete = resolve;
    transaction.onerror = () => reject(transaction.error);
    transaction.onabort = () => reject(transaction.error);
  });
  db.close();
  await chrome.storage.local.set({ [BACKUP_QUEUE_REVISION_KEY]: BACKUP_QUEUE_REVISION });
  return getBackupStats();
}

export async function getCharacterById(id) {
  const db = await openDB();
  const rec = await reqToPromise(db.transaction(CHARACTER_STORE).objectStore(CHARACTER_STORE).get(id));
  db.close();
  return rec;
}

export async function restoreRecord(rec, sourceBlob = null, sourceAssetId = '') {
  const config = await activeBackupConfig();
  const record = restoredBackupState(rec, config ? backupDirectoryId(config) : '');
  delete record.backupError;
  delete record.sourceBlob;
  if (sourceBlob instanceof Blob && sourceBlob.size > 0 && sourceAssetId) record.sourceAssetId = sourceAssetId;
  const db = await openDB();
  let created = false;
  await new Promise((resolve, reject) => {
    const storeNames = record.sourceAssetId ? [STORE, ASSET_STORE] : [STORE];
    const transaction = db.transaction(storeNames, 'readwrite');
    const images = transaction.objectStore(STORE);
    const request = images.get(record.id);
    request.onsuccess = () => {
      if (request.result) return;
      created = true;
      images.put(record);
      if (!record.sourceAssetId) return;
      const assets = transaction.objectStore(ASSET_STORE);
      const assetRequest = assets.get(record.sourceAssetId);
      assetRequest.onsuccess = () => {
        const existing = assetRequest.result;
        assets.put(existing
          ? { ...existing, refCount: Math.max(0, Number(existing.refCount) || 0) + 1 }
          : { id: record.sourceAssetId, createdAt: Date.now(), refCount: 1, blob: sourceBlob });
      };
    };
    request.onerror = () => transaction.abort();
    transaction.oncomplete = resolve;
    transaction.onerror = () => reject(transaction.error);
    transaction.onabort = () => reject(transaction.error);
  });
  db.close();
  return { created, id: record.id };
}

export async function restoreCharacter(rec) {
  const config = await activeBackupConfig();
  const record = restoredBackupState(rec, config ? backupDirectoryId(config) : '');
  delete record.backupError;
  const db = await openDB();
  let created = false;
  await new Promise((resolve, reject) => {
    const transaction = db.transaction(CHARACTER_STORE, 'readwrite');
    const store = transaction.objectStore(CHARACTER_STORE);
    const request = store.get(record.id);
    request.onsuccess = () => {
      if (!request.result) {
        created = true;
        store.put(record);
      }
    };
    request.onerror = () => transaction.abort();
    transaction.oncomplete = resolve;
    transaction.onerror = () => reject(transaction.error);
    transaction.onabort = () => reject(transaction.error);
  });
  db.close();
  return { created, id: record.id };
}

export async function getCharacterByAlbumRecordId(albumRecordId) {
  if (!albumRecordId) return null;
  const db = await openDB();
  const rec = await reqToPromise(
    db.transaction(CHARACTER_STORE).objectStore(CHARACTER_STORE).index('albumRecordId').get(albumRecordId)
  );
  db.close();
  return rec || null;
}

export async function removeCharacters(ids) {
  const db = await openDB();
  await new Promise((resolve, reject) => {
    const transaction = db.transaction(CHARACTER_STORE, 'readwrite');
    const store = transaction.objectStore(CHARACTER_STORE);
    for (const id of ids) store.delete(id);
    transaction.oncomplete = resolve;
    transaction.onerror = () => reject(transaction.error);
    transaction.onabort = () => reject(transaction.error);
  });
  db.close();
}
