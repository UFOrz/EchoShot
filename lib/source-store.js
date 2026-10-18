// Temporary source pixels are separate from the gallery's reference-counted assets.
// Only sourceBlobId and lightweight source metadata belong in storage.session.
const DB_NAME = 'ir-source-cache';
const DB_VERSION = 1;
const STORE = 'sources';
const DEFAULT_GRACE_MS = 60_000;

function sourceError(message, code) {
  const error = new Error(message);
  error.code = code;
  return error;
}

function missingSource() {
  return sourceError('来源图片缓存已失效，请重新选择图片', 'SOURCE_ASSET_MISSING');
}

function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    let settled = false;
    request.onupgradeneeded = () => {
      if (!request.result.objectStoreNames.contains(STORE)) {
        request.result.createObjectStore(STORE, { keyPath: 'id' });
      }
    };
    request.onsuccess = () => {
      const db = request.result;
      if (settled) { db.close(); return; }
      settled = true;
      db.onversionchange = () => db.close();
      resolve(db);
    };
    request.onerror = () => { settled = true; reject(request.error); };
    request.onblocked = () => {
      settled = true;
      reject(sourceError('来源图片缓存正被其他页面占用，请关闭其他面板后重试', 'SOURCE_STORE_BLOCKED'));
    };
  });
}

async function withStore(mode, callback) {
  const db = await openDB();
  try {
    return await new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE, mode);
      let result;
      transaction.oncomplete = () => resolve(result);
      transaction.onerror = event => reject(transaction.error || event.target?.error || new Error('来源图片缓存操作失败'));
      transaction.onabort = () => reject(transaction.error || new Error('来源图片缓存写入已中止'));
      try {
        callback(transaction.objectStore(STORE), value => { result = value; });
      } catch (error) {
        transaction.abort();
        reject(error);
      }
    });
  } finally {
    db.close();
  }
}

export async function putSourceBlob(blob, { id, windowId, requestId } = {}) {
  if (!(blob instanceof Blob) || blob.size === 0) {
    throw sourceError('来源图片不能为空', 'SOURCE_ASSET_INVALID');
  }
  const sourceId = id || `source-blob:${crypto.randomUUID()}`;
  const now = Date.now();
  await withStore('readwrite', store => {
    // add prevents an accidental reused ID from replacing another active source.
    store.add({ id: sourceId, blob, createdAt: now, lastUsedAt: now, windowId, requestId });
  });
  return sourceId;
}

export async function getSourceBlob(id) {
  if (typeof id !== 'string' || !id) return null;
  return withStore('readwrite', (store, finish) => {
    const request = store.get(id);
    request.onsuccess = () => {
      const entry = request.result;
      if (!(entry?.blob instanceof Blob) || entry.blob.size === 0) { finish(null); return; }
      store.put({ ...entry, lastUsedAt: Date.now() });
      finish(entry.blob);
    };
  });
}

// Explicit rollback for a newly stored Blob whose session metadata failed to commit.
// Normal cleanup should use pruneSourceBlobs with the complete session/job reference set.
export async function deleteSourceBlob(id) {
  if (typeof id !== 'string' || !id) return false;
  return withStore('readwrite', (store, finish) => {
    const request = store.get(id);
    request.onsuccess = () => {
      finish(Boolean(request.result));
      if (request.result) store.delete(id);
    };
  });
}

function remoteUrl(value) {
  if (typeof value !== 'string' || !value) return false;
  try { return ['http:', 'https:'].includes(new URL(value).protocol); } catch { return false; }
}

export function sourceMetadata(source) {
  if (!source || typeof source !== 'object') return source;
  const metadata = { ...source };
  for (const key of ['dataUrl', 'blob', 'sourceBlob', 'previewBlob']) delete metadata[key];
  for (const key of ['src', 'previewUrl']) {
    if (metadata[key] && !remoteUrl(metadata[key])) delete metadata[key];
  }
  return metadata;
}

async function blobToDataUrl(blob) {
  // Keep the conversion independent of page-specific reader helpers.
  const bytes = new Uint8Array(await blob.arrayBuffer());
  const chunks = [];
  for (let offset = 0; offset < bytes.length; offset += 0x8000) {
    chunks.push(String.fromCharCode(...bytes.subarray(offset, offset + 0x8000)));
  }
  return `data:${blob.type || 'application/octet-stream'};base64,${btoa(chunks.join(''))}`;
}

function imageDataUrlToBlob(dataUrl) {
  const comma = dataUrl.indexOf(',');
  const header = dataUrl.slice(5, comma);
  if (comma < 0 || !/;base64$/i.test(header)) {
    throw sourceError('来源图片编码无效，请重新选择图片', 'SOURCE_ASSET_INVALID');
  }
  const chunks = [];
  // Decode locally: fetch(data:) can reject very large source URLs before IDB
  // ever receives the bytes. A multiple-of-four chunk keeps base64 boundaries.
  try {
    const encoded = dataUrl.slice(comma + 1).replace(/\s/g, '');
    for (let offset = 0; offset < encoded.length; offset += 0x8000) {
      const binary = atob(encoded.slice(offset, offset + 0x8000));
      const bytes = new Uint8Array(binary.length);
      for (let index = 0; index < binary.length; index += 1) bytes[index] = binary.charCodeAt(index);
      chunks.push(bytes);
    }
  } catch {
    throw sourceError('来源图片编码无效，请重新选择图片', 'SOURCE_ASSET_INVALID');
  }
  return new Blob(chunks, { type: header.slice(0, -7) });
}

export async function storeSource(source, { windowId } = {}) {
  if (!source || typeof source !== 'object') return source;
  const metadata = sourceMetadata(source);
  if (source.sourceBlobId && await getSourceBlob(source.sourceBlobId)) return metadata;
  let blob = source.sourceBlob instanceof Blob ? source.sourceBlob : null;
  if (!blob && typeof source.dataUrl === 'string' && /^data:image\//i.test(source.dataUrl)) {
    blob = imageDataUrlToBlob(source.dataUrl);
  }
  if (!blob) {
    if (source.sourceBlobId) throw missingSource();
    return metadata;
  }
  metadata.sourceBlobId = await putSourceBlob(blob, { windowId, requestId: source.requestId });
  return metadata;
}

export async function hydrateSource(source) {
  if (!source || typeof source !== 'object') return source;
  // Old session entries remain readable until their next metadata commit migrates them.
  if (typeof source.dataUrl === 'string' && /^data:image\//i.test(source.dataUrl)) return { ...source };
  if (!source.sourceBlobId) return { ...source };
  const blob = await getSourceBlob(source.sourceBlobId);
  if (!blob) throw missingSource();
  return { ...sourceMetadata(source), dataUrl: await blobToDataUrl(blob) };
}

export function collectSourceBlobIds(value) {
  const ids = new Set();
  const seen = new WeakSet();
  const visit = item => {
    if (!item || typeof item !== 'object' || seen.has(item)) return;
    seen.add(item);
    if (typeof item.sourceBlobId === 'string' && item.sourceBlobId) ids.add(item.sourceBlobId);
    for (const child of Object.values(item)) visit(child);
  };
  visit(value);
  return ids;
}

export async function pruneSourceBlobs(referencedIds = [], { graceMs = DEFAULT_GRACE_MS, now = Date.now() } = {}) {
  const references = new Set(referencedIds);
  const grace = Math.max(0, Number(graceMs) || 0);
  return withStore('readwrite', (store, finish) => {
    const result = { deleted: 0, kept: 0, bytesDeleted: 0 };
    const request = store.openCursor();
    request.onsuccess = () => {
      const cursor = request.result;
      if (!cursor) { finish(result); return; }
      const entry = cursor.value;
      const age = Number(now) - Math.max(Number(entry.createdAt) || 0, Number(entry.lastUsedAt) || 0);
      if (references.has(entry.id) || age < grace) result.kept += 1;
      else {
        cursor.delete();
        result.deleted += 1;
        result.bytesDeleted += entry.blob?.size || 0;
      }
      cursor.continue();
    };
  });
}
