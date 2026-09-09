// Directory handles stay local and are deliberately excluded from settings exports.
import { detectImageFileType } from './image-file.js';
import { isBackupFailure } from './backup-status.js';
import { buildEchoShotMetadata, embedEchoShotMetadata } from './image-metadata.js';

const DB = 'echoshot-local-backup';
const ROOT_DIRECTORY = 'EchoShot-backup';
const CHARACTER_DIRECTORY = 'characters';
const SOURCE_DIRECTORY = 'sources';
const RECORD_FIELDS = [
  'prompt', 'requestPrompt', 'sourcePrompt', 'promptZh', 'explanationLanguage',
  'platformId', 'provider', 'model', 'width', 'height', 'ratio', 'size',
  'srcUrl', 'pageUrl', 'kind', 'groupId', 'groupIndex', 'groupCount',
  'replacementType', 'characterId'
];
const CHARACTER_FIELDS = [
  'name', 'albumRecordId', 'prompt', 'sourcePrompt', 'promptZh',
  'explanationLanguage', 'provider', 'model', 'width', 'height', 'ratio'
];

export const BACKUP_STATUS_KEY = 'localBackupStatus';
export const BACKUP_SCHEMA = 'echoshot-backup/2';
export const MAX_MANIFEST_BYTES = 1024 * 1024;
function serializeManifest(manifest) {
  const text = JSON.stringify(manifest, null, 2);
  if (new TextEncoder().encode(text).byteLength > MAX_MANIFEST_BYTES) {
    throw new Error('备份清单超过 1 MiB，未提交备份，请缩短提示词或元数据后重试');
  }
  return text;
}
export function backupDirectoryId(config) {
  return String(config?.directoryId || 'legacy-directory');
}
export const withBackupLock = (fn) => navigator.locks?.request
  ? navigator.locks.request('echoshot-local-backup', fn)
  : fn();

async function storage(mode, action) {
  const db = await new Promise((resolve, reject) => {
    const req = indexedDB.open(DB, 1);
    req.onupgradeneeded = () => req.result.createObjectStore('state');
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
  try {
    return await new Promise((resolve, reject) => {
      const tx = db.transaction('state', mode);
      const req = action(tx.objectStore('state'));
      tx.oncomplete = () => resolve(req.result);
      tx.onerror = tx.onabort = () => reject(tx.error || new Error('备份设置读取失败'));
    });
  } finally { db.close(); }
}

export const getBackupConfig = () => storage('readonly', (s) => s.get('config'));
export async function isBackupEnabled() {
  const config = await getBackupConfig().catch(() => null);
  return Boolean(config?.enabled && config.handle);
}
export async function setBackupConfig(config) {
  const next = { ...config, directoryId: config.directoryId || crypto.randomUUID() };
  await withBackupLock(async () => {
    await storage('readwrite', (s) => s.put(next, 'config'));
    await chrome.storage.local.set({ [BACKUP_STATUS_KEY]: {
      enabled: next.enabled, directory: next.handle?.name || '', message: '', updatedAt: Date.now()
    } });
  });
}

export async function ensureBackupDirectoryId() {
  return withBackupLock(async () => {
    const config = await getBackupConfig();
    if (!config?.handle) return config;
    if (config.directoryId) return config;
    const next = { ...config, directoryId: crypto.randomUUID() };
    await storage('readwrite', (s) => s.put(next, 'config'));
    await chrome.storage.local.set({ [BACKUP_STATUS_KEY]: {
      enabled: next.enabled, directory: next.handle?.name || '', message: '', updatedAt: Date.now()
    } });
    return next;
  });
}

export async function setBackupEnabled(enabled) {
  return withBackupLock(async () => {
    const current = await getBackupConfig();
    if (!current?.handle) throw new Error('请先选择备份目录');
    const next = { ...current, enabled: Boolean(enabled), directoryId: current.directoryId || crypto.randomUUID() };
    await storage('readwrite', (s) => s.put(next, 'config'));
    await chrome.storage.local.set({ [BACKUP_STATUS_KEY]: {
      enabled: next.enabled, directory: next.handle.name || '', message: '', updatedAt: Date.now()
    } });
    return next;
  });
}

function validId(value, label = '图片记录') {
  const id = String(value || '');
  if (!/^[a-zA-Z0-9_-]{1,100}$/.test(id)) throw new Error(`${label} ID 无效`);
  return id;
}

export function backupBaseName(rec) {
  const id = validId(rec.id);
  const createdAt = Number(rec.createdAt);
  if (!Number.isFinite(createdAt) || createdAt <= 0) throw new Error('图片记录时间无效');
  return `${new Date(createdAt).toISOString().replace(/[:.]/g, '-')}_${id}`;
}

export function characterBackupBaseName(rec) {
  const id = validId(rec.id, '角色素材');
  const createdAt = Number(rec.createdAt);
  if (!Number.isFinite(createdAt) || createdAt <= 0) throw new Error('角色素材时间无效');
  return `${new Date(createdAt).toISOString().replace(/[:.]/g, '-')}_${id}`;
}

function selectedFields(source, fields) {
  return Object.fromEntries(fields
    .filter((key) => source[key] !== undefined && source[key] !== null && source[key] !== '')
    .map((key) => [key, source[key]]));
}

async function writeFile(directory, name, content) {
  const handle = await directory.getFileHandle(name, { create: true });
  const stream = await handle.createWritable();
  try {
    await stream.write(content);
    await stream.close();
  } catch (error) {
    await stream.abort().catch(() => {});
    throw error;
  }
}

export async function sha256(blob) {
  const bytes = new Uint8Array(await blob.arrayBuffer());
  const digest = new Uint8Array(await crypto.subtle.digest('SHA-256', bytes));
  return [...digest].map((value) => value.toString(16).padStart(2, '0')).join('');
}

async function integrity(blob) {
  return { algorithm: 'SHA-256', bytes: blob.size, digest: await sha256(blob) };
}

async function rootDirectory(handle, create = false) {
  return handle.getDirectoryHandle(ROOT_DIRECTORY, { create });
}

export async function writeBackupFiles(handle, rec, { sourceBlob = null } = {}) {
  if (await handle.queryPermission({ mode: 'readwrite' }) !== 'granted') {
    throw new Error('备份目录需要重新授权，请打开设置选择目录');
  }
  const directory = await rootDirectory(handle, true);
  const base = backupBaseName(rec);
  const { ext } = await detectImageFileType(rec.blob);
  // Export only record-owned generation data. Runtime version and mutable UI
  // aliases must not create a new image version for unchanged content.
  const generation = buildEchoShotMetadata(rec);
  const result = await embedEchoShotMetadata(rec.blob, generation);
  if (!result.embedded) throw new Error('当前图片格式不支持嵌入生成信息');
  const imageIntegrity = await integrity(result.blob);
  const imageName = `versions/${base}_${imageIntegrity.digest}.${ext}`;
  const manifest = {
    schema: BACKUP_SCHEMA,
    type: 'album-image',
    id: rec.id,
    createdAt: rec.createdAt,
    image: imageName,
    imageIntegrity,
    record: selectedFields(rec, RECORD_FIELDS),
    generation
  };

  let sourceWrite = null;
  if (sourceBlob instanceof Blob && sourceBlob.size > 0) {
    const sourceType = await detectImageFileType(sourceBlob);
    const sourceIntegrity = await integrity(sourceBlob);
    const sourceName = `source-${sourceIntegrity.digest}.${sourceType.ext}`;
    sourceWrite = { name: sourceName, blob: sourceBlob };
    manifest.source = {
      file: `${SOURCE_DIRECTORY}/${sourceName}`,
      mime: sourceType.mime,
      integrity: sourceIntegrity
    };
  }

  const manifestText = serializeManifest(manifest);
  if (sourceWrite) {
    const sources = await directory.getDirectoryHandle(SOURCE_DIRECTORY, { create: true });
    await writeFile(sources, sourceWrite.name, sourceWrite.blob);
  }
  const versions = await directory.getDirectoryHandle('versions', { create: true });
  await writeFile(versions, imageName.split('/')[1], result.blob);
  // Only the explicit metadata allowlist is exported; never platform credentials.
  await writeFile(directory, `${base}.json`, manifestText);
  return manifest;
}

export async function writeCharacterBackupFiles(handle, rec) {
  if (await handle.queryPermission({ mode: 'readwrite' }) !== 'granted') {
    throw new Error('备份目录需要重新授权，请打开设置选择目录');
  }
  if (!(rec.blob instanceof Blob) || rec.blob.size <= 0) throw new Error('角色素材图片无效');
  const directory = await rootDirectory(handle, true);
  const characters = await directory.getDirectoryHandle(CHARACTER_DIRECTORY, { create: true });
  const base = characterBackupBaseName(rec);
  const { ext, mime } = await detectImageFileType(rec.blob);
  const imageIntegrity = await integrity(rec.blob);
  const imageName = `versions/${base}_${imageIntegrity.digest}.${ext}`;
  const manifest = {
    schema: BACKUP_SCHEMA,
    type: 'character',
    id: rec.id,
    createdAt: rec.createdAt,
    image: imageName,
    imageIntegrity,
    mime,
    record: selectedFields(rec, CHARACTER_FIELDS)
  };
  const manifestText = serializeManifest(manifest);
  const versions = await characters.getDirectoryHandle('versions', { create: true });
  await writeFile(versions, imageName.split('/')[1], rec.blob);
  await writeFile(characters, `${base}.json`, manifestText);
  return manifest;
}

export function reportBackupError(error, subject = '图片') {
  return withBackupLock(() => writeBackupError(error, subject));
}

async function writeBackupError(error, subject = '图片') {
  const detail = error?.message || String(error);
  const message = `本地备份未完成：${detail}。${subject}仍保存在浏览器中，请在设置中重试。`;
  await chrome.storage.local.set({ [BACKUP_STATUS_KEY]: {
    enabled: true, error: true, message,
    messageKey: '备份失败：{error}', messageVars: { error: detail },
    updatedAt: Date.now(), failureAt: Date.now()
  } }).catch(() => {});
  return { ok: false, message, error: detail };
}

async function runBackup(createOperation, subject) {
  try {
    return await withBackupLock(async () => {
      try {
        const { config, execute, stale = false } = await createOperation();
        if (stale) return { skipped: true, stale: true };
        if (!config?.enabled || !config.handle) return { skipped: true };
        const current = await getBackupConfig();
        if (!current?.enabled || backupDirectoryId(current) !== backupDirectoryId(config)) {
          return { skipped: true };
        }
        const previous = (await chrome.storage.local.get(BACKUP_STATUS_KEY))[BACKUP_STATUS_KEY];
        const hadFailure = isBackupFailure(previous);
        await chrome.storage.local.set({ [BACKUP_STATUS_KEY]: {
          enabled: true, directory: config.handle.name, error: hadFailure, inProgress: true, updatedAt: Date.now(),
          failureAt: hadFailure ? previous.failureAt : 0,
          message: hadFailure ? previous.message : `${subject}正在备份；若浏览器中途关闭，重启后会自动补齐。`,
          messageKey: hadFailure ? previous.messageKey : '备份进行中，浏览器重启后会自动补齐',
          messageVars: hadFailure ? previous.messageVars : { subject }
        } });
        const manifest = await execute(config.handle);
        await chrome.storage.local.set({ [BACKUP_STATUS_KEY]: {
          enabled: true, directory: config.handle.name, updatedAt: Date.now(),
          error: hadFailure, inProgress: false, failureAt: hadFailure ? previous.failureAt : 0,
          message: hadFailure ? previous.message : `最近一项${subject}已备份。`,
          messageKey: hadFailure ? previous.messageKey : '最近一项{subject}已备份',
          messageVars: hadFailure ? previous.messageVars : { subject }
        } });
        return { ok: true, manifest, directoryId: backupDirectoryId(config) };
      } catch (error) {
        return writeBackupError(error, subject);
      }
    });
  } catch (error) {
    return reportBackupError(error, subject);
  }
}

// Database success must remain success even when the independent backup fails.
export function backupRecord(rec, { sourceBlob = null, configOverride = null } = {}) {
  return runBackup(async () => {
    const config = configOverride || await getBackupConfig();
    return { config, execute: (handle) => writeBackupFiles(handle, rec, { sourceBlob }) };
  }, '图片');
}

export function backupCharacter(rec, { configOverride = null } = {}) {
  return runBackup(async () => {
    // Re-read under the file-write lock: a queued snapshot may have become
    // obsolete while another context saved and backed up a newer revision.
    const { getCharacterById } = await import('./db.js');
    const current = await getCharacterById(rec.id);
    if (!current || (current.backupRevision || '') !== (rec.backupRevision || '')) {
      return { stale: true };
    }
    const config = configOverride || await getBackupConfig();
    return { config, execute: (handle) => writeCharacterBackupFiles(handle, rec) };
  }, '角色素材');
}

export async function diagnoseBackupDirectory(handle, { requestPermission = false } = {}) {
  if (!handle) return { permission: 'missing', readable: false, writable: false };
  let permission = await handle.queryPermission({ mode: 'readwrite' });
  if (requestPermission && permission !== 'granted') {
    permission = await handle.requestPermission({ mode: 'readwrite' });
  }
  if (permission !== 'granted') return { permission, readable: false, writable: false };
  const directory = await rootDirectory(handle, true);
  let entries = 0;
  for await (const _entry of directory.entries()) entries += 1;
  const probe = `.echoshot-write-test-${crypto.randomUUID()}`;
  try {
    await writeFile(directory, probe, new Blob(['ok'], { type: 'text/plain' }));
    await directory.removeEntry(probe);
    return { permission, readable: true, writable: true, entries };
  } catch (error) {
    await directory.removeEntry(probe).catch(() => {});
    return { permission, readable: true, writable: false, entries, error: error?.message || String(error) };
  }
}

export async function finishBackupBatch(startedAt, message, { messageKey = '', messageVars = {} } = {}) {
  return withBackupLock(async () => {
    const previous = (await chrome.storage.local.get(BACKUP_STATUS_KEY))[BACKUP_STATUS_KEY];
    if (previous?.error && previous.failureAt >= startedAt) return false;
    const config = await getBackupConfig();
    await chrome.storage.local.set({ [BACKUP_STATUS_KEY]: {
      enabled: Boolean(config?.enabled), directory: config?.handle?.name || '', message,
      messageKey, messageVars, updatedAt: Date.now()
    } });
    return true;
  });
}
