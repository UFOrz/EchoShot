import { BACKUP_SCHEMA, MAX_MANIFEST_BYTES, sha256 } from './local-backup.js';
import { restoreCharacter, restoreRecord } from './db.js';

const ROOT_DIRECTORY = 'EchoShot-backup';
const MAX_IMAGE_BYTES = 256 * 1024 * 1024;
const SUPPORTED_SCHEMAS = new Set(['echoshot-backup/1', BACKUP_SCHEMA]);
const ID_PATTERN = /^[a-zA-Z0-9_-]{1,100}$/;
const RECORD_FIELDS = new Set([
  'prompt', 'requestPrompt', 'sourcePrompt', 'promptZh', 'explanationLanguage',
  'platformId', 'provider', 'model', 'width', 'height', 'ratio', 'size',
  'srcUrl', 'pageUrl', 'kind', 'groupId', 'groupIndex', 'groupCount',
  'replacementType', 'characterId'
]);
const CHARACTER_FIELDS = new Set([
  'name', 'albumRecordId', 'prompt', 'sourcePrompt', 'promptZh',
  'explanationLanguage', 'provider', 'model', 'width', 'height', 'ratio'
]);

function allowlisted(value, fields) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return {};
  return Object.fromEntries(Object.entries(value).filter(([key]) => fields.has(key)));
}

function assertSafeName(name, label = '文件') {
  const value = String(name || '');
  if (!value || value === '.' || value === '..' || value.includes('/') || value.includes('\\')) {
    throw new Error(`${label}名称无效`);
  }
  return value;
}

async function optionalDirectory(parent, name) {
  try { return await parent.getDirectoryHandle(name); }
  catch (error) {
    if (error?.name === 'NotFoundError') return null;
    throw error;
  }
}

function checkStopped(signal) {
  if (signal?.aborted) throw new DOMException('已停止', 'AbortError');
}

async function manifestsIn(directory, type, signal) {
  checkStopped(signal);
  if (!directory) return [];
  const entries = [];
  const images = [];
  for await (const [name, handle] of directory.entries()) {
    checkStopped(signal);
    if (handle.kind === 'file' && name.toLowerCase().endsWith('.json')) entries.push({ directory, name, handle, type });
    else if (handle.kind === 'file' && /\.(png|jpe?g|webp|gif|avif|svg)$/i.test(name)) images.push({ directory, name, handle, type });
  }
  const referenced = new Set();
  for (const entry of entries) {
    checkStopped(signal);
    try {
      const file = await entry.handle.getFile();
      if (file.size <= MAX_MANIFEST_BYTES) referenced.add(JSON.parse(await file.text()).image);
    } catch { /* The main pass reports malformed manifests. */ }
    checkStopped(signal);
  }
  for (const entry of images) {
    checkStopped(signal);
    // Legacy image retained after its manifest switches to a versioned image.
    const base = entry.name.replace(/\.[^.]+$/, '');
    if (entries.some(item => item.name === `${base}.json`) &&
        [...referenced].some(name => typeof name === 'string' && name.startsWith(`versions/${base}_`))) continue;
    if (!referenced.has(entry.name)) entries.push({ ...entry, missingManifest: true });
  }
  return entries.sort((left, right) => left.name.localeCompare(right.name));
}

async function readManifest(entry) {
  if (entry.missingManifest) throw new Error(`${entry.name}: missing recovery manifest / 缺少恢复清单`);
  const file = await entry.handle.getFile();
  if (file.size > MAX_MANIFEST_BYTES) throw new Error(`${entry.name} 超过 1 MiB`);
  let manifest;
  try { manifest = JSON.parse(await file.text()); }
  catch { throw new Error(`${entry.name} 不是有效 JSON`); }
  if (!manifest || typeof manifest !== 'object' || !SUPPORTED_SCHEMAS.has(manifest.schema)) {
    throw new Error(`${entry.name} 不是受支持的 EchoShot 备份清单`);
  }
  if (!ID_PATTERN.test(String(manifest.id || ''))) throw new Error(`${entry.name} 的记录 ID 无效`);
  if (entry.type === 'character' && manifest.schema !== BACKUP_SCHEMA) {
    throw new Error(`${entry.name} 的角色素材格式不受支持`);
  }
  return manifest;
}

async function verifyBlob(blob, expected, required = false) {
  if (!(blob instanceof Blob) || blob.size <= 0 || blob.size > MAX_IMAGE_BYTES) {
    return { ok: false, verified: false, error: '图片文件为空或超过 256 MiB' };
  }
  if (!expected) return required
    ? { ok: false, verified: false, error: '新版备份缺少完整性信息' }
    : { ok: true, verified: false };
  if (expected.algorithm !== 'SHA-256' || !/^[a-f0-9]{64}$/i.test(String(expected.digest || ''))) {
    return { ok: false, verified: false, error: '完整性信息无效' };
  }
  if (Number(expected.bytes) !== blob.size) return { ok: false, verified: true, error: '文件大小不匹配' };
  const digest = await sha256(blob);
  if (digest !== String(expected.digest).toLowerCase()) return { ok: false, verified: true, error: 'SHA-256 不匹配' };
  return { ok: true, verified: true };
}

async function imageFor(entry, manifest) {
  const parts = String(manifest.image || '').split('/');
  if (parts.length > 1 && (parts.length !== 2 || parts[0] !== 'versions')) throw new Error('图片备份路径无效');
  const imageName = assertSafeName(parts.at(-1), '图片文件');
  const directory = parts.length === 2 ? await entry.directory.getDirectoryHandle('versions') : entry.directory;
  const handle = await directory.getFileHandle(imageName);
  const blob = await handle.getFile();
  const verification = await verifyBlob(blob, manifest.imageIntegrity, manifest.schema === BACKUP_SCHEMA);
  if (!verification.ok) throw new Error(`${imageName}：${verification.error}`);
  return { blob, verified: verification.verified };
}

async function sourceFor(root, manifest) {
  if (!manifest.source) return { blob: null, sourceAssetId: '', verified: true };
  const parts = String(manifest.source.file || '').split('/');
  if (parts.length !== 2 || parts[0] !== 'sources') throw new Error('原图备份路径无效');
  const name = assertSafeName(parts[1], '原图文件');
  const sources = await root.getDirectoryHandle('sources');
  const blob = await (await sources.getFileHandle(name)).getFile();
  const verification = await verifyBlob(blob, manifest.source.integrity, manifest.schema === BACKUP_SCHEMA);
  if (!verification.ok) throw new Error(`${name}：${verification.error}`);
  const digest = String(manifest.source.integrity?.digest || await sha256(blob)).toLowerCase();
  return { blob, sourceAssetId: `backup-source-${digest}`, verified: verification.verified };
}

function createdAtOf(manifest) {
  const direct = Number(manifest.createdAt);
  if (Number.isFinite(direct) && direct > 0) return direct;
  const parsed = Date.parse(manifest.generation?.createdAt || '');
  return Number.isFinite(parsed) ? parsed : Date.now();
}

function restoredAlbumRecord(manifest, blob) {
  const generation = manifest.generation || {};
  return {
    ...(manifest.schema === BACKUP_SCHEMA ? allowlisted(manifest.record, RECORD_FIELDS) : {}),
    prompt: manifest.record?.prompt ?? generation.prompt ?? '',
    requestPrompt: manifest.record?.requestPrompt ?? generation.requestPrompt ?? generation.prompt ?? '',
    provider: manifest.record?.provider ?? generation.provider ?? '',
    model: manifest.record?.model ?? generation.model ?? '',
    ratio: manifest.record?.ratio ?? generation.ratio ?? '',
    size: manifest.record?.size ?? generation.size ?? '',
    width: manifest.record?.width ?? generation.width,
    height: manifest.record?.height ?? generation.height,
    kind: manifest.record?.kind ?? generation.kind,
    groupIndex: manifest.record?.groupIndex ?? generation.groupIndex,
    groupCount: manifest.record?.groupCount ?? generation.groupCount,
    id: manifest.id,
    createdAt: createdAtOf(manifest),
    blob
  };
}

function restoredCharacterRecord(manifest, blob) {
  return {
    ...allowlisted(manifest.record, CHARACTER_FIELDS),
    id: manifest.id,
    createdAt: createdAtOf(manifest),
    blob
  };
}

async function backupContext(handle, signal) {
  checkStopped(signal);
  if (!handle) throw new Error('尚未选择备份目录');
  if (await handle.queryPermission({ mode: 'read' }) !== 'granted') throw new Error('备份目录需要重新授权');
  const root = handle.name === ROOT_DIRECTORY ? handle : await handle.getDirectoryHandle(ROOT_DIRECTORY);
  const characters = await optionalDirectory(root, 'characters');
  checkStopped(signal);
  return {
    root,
    entries: [
      ...await manifestsIn(root, 'album-image', signal),
      ...await manifestsIn(characters, 'character', signal)
    ]
  };
}

export async function verifyBackupDirectory(handle, { onProgress = null, signal = null } = {}) {
  const { root, entries } = await backupContext(handle, signal);
  const summary = { total: entries.length, valid: 0, failed: 0, unverified: 0, errors: [] };
  for (let index = 0; index < entries.length; index += 1) {
    if (signal?.aborted) throw new DOMException('已停止', 'AbortError');
    const entry = entries[index];
    try {
      const manifest = await readManifest(entry);
      const image = await imageFor(entry, manifest);
      const source = entry.type === 'album-image' ? await sourceFor(root, manifest) : { verified: true };
      if (signal?.aborted) throw new DOMException('已停止', 'AbortError');
      if (image.verified && source.verified) summary.valid += 1;
      else summary.unverified += 1;
    } catch (error) {
      if (signal?.aborted) throw new DOMException('已停止', 'AbortError');
      summary.failed += 1;
      if (summary.errors.length < 20) summary.errors.push(`${entry.name}: ${error?.message || error}`);
    }
    onProgress?.({ completed: index + 1, total: entries.length, summary });
  }
  return summary;
}

export async function restoreBackupDirectory(handle, { onProgress = null, signal = null } = {}) {
  const { root, entries } = await backupContext(handle, signal);
  const summary = {
    total: entries.length,
    restoredImages: 0,
    restoredCharacters: 0,
    skipped: 0,
    failed: 0,
    unverified: 0,
    errors: []
  };
  for (let index = 0; index < entries.length; index += 1) {
    if (signal?.aborted) throw new DOMException('已停止', 'AbortError');
    const entry = entries[index];
    try {
      const manifest = await readManifest(entry);
      const image = await imageFor(entry, manifest);
      if (signal?.aborted) throw new DOMException('已停止', 'AbortError');
      if (!image.verified) summary.unverified += 1;
      if (entry.type === 'character') {
        const result = await restoreCharacter(restoredCharacterRecord(manifest, image.blob));
        if (result.created) summary.restoredCharacters += 1;
        else summary.skipped += 1;
      } else {
        const source = await sourceFor(root, manifest);
        if (signal?.aborted) throw new DOMException('已停止', 'AbortError');
        if (!source.verified) summary.unverified += 1;
        const result = await restoreRecord(
          restoredAlbumRecord(manifest, image.blob),
          source.blob,
          source.sourceAssetId
        );
        if (result.created) summary.restoredImages += 1;
        else summary.skipped += 1;
      }
    } catch (error) {
      if (signal?.aborted) throw new DOMException('已停止', 'AbortError');
      summary.failed += 1;
      if (summary.errors.length < 20) summary.errors.push(`${entry.name}: ${error?.message || error}`);
    }
    onProgress?.({ completed: index + 1, total: entries.length, summary });
  }
  return summary;
}
