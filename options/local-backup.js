import {
  BACKUP_STATUS_KEY,
  backupCharacter,
  backupRecord,
  reportBackupError,
  diagnoseBackupDirectory,
  finishBackupBatch,
  getBackupConfig,
  setBackupConfig,
  setBackupEnabled
} from '../lib/local-backup.js';
import {
  getBackupStats,
  getById,
  getCharacterById,
  getRequiredSourceBlob,
  getPendingBackupIds,
  getPendingCharacterBackupIds,
  markBackupComplete,
  markBackupFailed,
  markCharacterBackupComplete,
  markCharacterBackupFailed,
  queueAllBackups
} from '../lib/db.js';
import { restoreBackupDirectory, verifyBackupDirectory } from '../lib/backup-restore.js';
import { t } from '../lib/i18n.js';

const $ = (id) => document.getElementById(id);
const enabled = $('localBackupEnabled');
const choose = $('localBackupChoose');
const run = $('localBackupRun');
const stop = $('localBackupStop');
const verify = $('localBackupVerify');
const restore = $('localBackupRestore');
const diagnose = $('localBackupDiagnose');
const status = $('localBackupStatus');
const directory = $('localBackupDirectory');
const counts = $('localBackupCounts');
const storageStatus = $('localStorageStatus');
const diagnostics = $('localBackupDiagnostics');
let config;
let busy = false;
let stopped = false;
let abortController = null;
let latestStatus = null;

const language = () => document.documentElement.dataset.language || 'zh';
const ui = (key, vars = {}) => t(key, vars, language());
const statusText = (value) => {
  if (!value?.messageKey) return value?.message || '';
  const vars = { ...(value.messageVars || {}) };
  if (vars.subject) vars.subject = ui(vars.subject);
  return ui(value.messageKey, vars);
};

function controls() {
  enabled.checked = Boolean(config?.enabled);
  choose.disabled = busy || typeof window.showDirectoryPicker !== 'function';
  enabled.disabled = busy || !config?.handle;
  for (const control of [run, verify, restore, diagnose]) control.disabled = busy || !config?.handle;
  restore.disabled = busy || typeof window.showDirectoryPicker !== 'function';
  directory.textContent = config?.handle
    ? ui('保存目录：{directory} / EchoShot-backup', { directory: config.handle.name })
    : ui('尚未选择目录');
}

async function refreshCounts() {
  const stats = await getBackupStats();
  counts.textContent = ui('备份状态：成功 {success}，失败 {failed}，待处理 {pending}（相册 {images}，角色库 {characters}）', stats);
  return stats;
}

function formatBytes(value) {
  const bytes = Math.max(0, Number(value) || 0);
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  if (bytes < 1024 * 1024 * 1024) return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
  return `${(bytes / 1024 / 1024 / 1024).toFixed(1)} GB`;
}

async function refreshStorageStatus() {
  const [estimate, persistent] = await Promise.all([
    navigator.storage?.estimate?.() || {},
    navigator.storage?.persisted?.() || false
  ]);
  const usage = formatBytes(estimate.usage);
  const quota = estimate.quota ? ` / ${formatBytes(estimate.quota)}` : '';
  storageStatus.textContent = ui('浏览器相册存储：{usage}{quota}；{protection}', {
    usage,
    quota,
    protection: ui(persistent ? '已启用持久存储保护' : '由浏览器管理存储保护')
  });
  return { estimate, persistent };
}

async function requestDirectoryPermission(mode = 'readwrite') {
  if (!config?.handle) throw new Error(ui('请先选择备份目录'));
  const permission = await config.handle.requestPermission({ mode });
  if (permission !== 'granted') throw new Error(ui('请重新选择并授权备份目录'));
}

async function runQueuedBackups({ queueAll = false } = {}) {
  if (busy) return;
  busy = true;
  stopped = false;
  stop.hidden = false;
  stop.disabled = false;
  stop.textContent = ui('停止补备份');
  controls();
  const startedAt = Date.now();
  let completed = 0;
  let characterCompleted = 0;
  let failures = 0;
  try {
    await requestDirectoryPermission();
    let batchConfig = await getBackupConfig();
    if (!batchConfig?.enabled || !batchConfig.handle) throw new Error(ui('请先启用自动备份并选择目录'));
    {
      await queueAllBackups({ onlyMissing: !queueAll });
      batchConfig = await getBackupConfig();
    }
    const imageIds = await getPendingBackupIds();
    const characterIds = await getPendingCharacterBackupIds();
    const total = imageIds.length + characterIds.length;
    for (const id of imageIds) {
      if (stopped) break;
      const currentConfig = await getBackupConfig();
      if (currentConfig?.directoryId !== batchConfig.directoryId || !currentConfig?.enabled) {
        throw new Error(ui('备份目录已切换，请重新执行备份'));
      }
      const record = await getById(id);
      if (!record) continue;
      let sourceBlob;
      try {
        sourceBlob = await getRequiredSourceBlob(record);
      } catch (error) {
        await markBackupFailed(id, error, batchConfig.directoryId);
        await reportBackupError(error);
        failures += 1;
        continue;
      }
      const result = await backupRecord(record, { configOverride: batchConfig, sourceBlob });
      if (result.ok) {
        await markBackupComplete(id, result.directoryId);
        completed += 1;
      } else {
        if (!result.skipped) await markBackupFailed(id, result.error || result.message, batchConfig.directoryId);
        failures += 1;
      }
      status.textContent = ui('正在备份：{completed} / {total}，失败 {failures}', {
        completed: completed + characterCompleted + failures,
        total,
        failures
      });
      await refreshCounts();
    }
    for (const id of characterIds) {
      if (stopped) break;
      const currentConfig = await getBackupConfig();
      if (currentConfig?.directoryId !== batchConfig.directoryId || !currentConfig?.enabled) {
        throw new Error(ui('备份目录已切换，请重新执行备份'));
      }
      const record = await getCharacterById(id);
      if (!record) continue;
      const result = await backupCharacter(record, { configOverride: batchConfig });
      if (result.stale) continue;
      if (result.ok) {
        await markCharacterBackupComplete(id, result.directoryId, record.backupRevision || '');
        characterCompleted += 1;
      } else {
        if (!result.skipped) await markCharacterBackupFailed(id, result.error || result.message, batchConfig.directoryId, record.backupRevision || '');
        failures += 1;
      }
      status.textContent = ui('正在备份：{completed} / {total}，失败 {failures}', {
        completed: completed + characterCompleted + failures,
        total,
        failures
      });
      await refreshCounts();
    }
    const message = stopped
      ? ui('已停止；已备份 {images} 张图片、{characters} 项角色素材，失败 {failed}', { images: completed, characters: characterCompleted, failed: failures })
      : ui('备份完成；图片 {images} 张、角色素材 {characters} 项、失败 {failed}', { images: completed, characters: characterCompleted, failed: failures });
    status.textContent = message;
    if (!stopped && failures === 0) {
      await finishBackupBatch(startedAt, message, {
        messageKey: '备份完成；图片 {images} 张、角色素材 {characters} 项、失败 {failed}',
        messageVars: { images: completed, characters: characterCompleted, failed: failures }
      });
    }
  } catch (error) {
    status.textContent = ui('备份未完成：{error}', { error: error?.message || error });
  } finally {
    busy = false;
    stop.hidden = true;
    config = await getBackupConfig().catch(() => config);
    controls();
    await refreshCounts().catch(() => {});
  }
}

choose.addEventListener('click', async () => {
  try {
    // Picker must be the first async operation, while user activation is live.
    const handle = await window.showDirectoryPicker({ id: 'echoshot-backup', mode: 'readwrite' });
    const next = { enabled: true, handle };
    await setBackupConfig(next);
    config = next;
    await queueAllBackups();
    status.textContent = ui('自动备份已启用，现有内容已加入持久备份队列。');
    await refreshCounts();
    void runQueuedBackups();
  } catch (error) {
    if (error.name !== 'AbortError') status.textContent = ui('目录设置失败：{error}', { error: error.message });
  } finally { controls(); }
});

enabled.addEventListener('change', async () => {
  try {
    config = await setBackupEnabled(enabled.checked);
    status.textContent = ui(config.enabled ? '自动备份已启用' : '自动备份已暂停，已有文件保留');
    if (config.enabled) void runQueuedBackups();
  } catch (error) { status.textContent = ui('备份未完成：{error}', { error: error?.message || error }); }
  finally { controls(); }
});

stop.addEventListener('click', () => {
  stopped = true;
  abortController?.abort();
  stop.disabled = true;
});
run.addEventListener('click', () => void runQueuedBackups({ queueAll: true }));

verify.addEventListener('click', async () => {
  if (busy) return;
  busy = true;
  controls();
  try {
    await requestDirectoryPermission('read');
    abortController = new AbortController();
    stop.hidden = false;
    stop.disabled = false;
    stop.textContent = ui('停止校验');
    controls();
    const result = await verifyBackupDirectory(config.handle, {
      signal: abortController.signal,
      onProgress: ({ completed, total }) => {
        status.textContent = ui('正在校验：{completed} / {total}', { completed, total });
      }
    });
    status.textContent = ui('校验完成：通过 {valid}，损坏或缺失 {failed}，旧版未校验 {unverified}', result);
    diagnostics.textContent = result.errors.slice(0, 3).join('；');
  } catch (error) {
    status.textContent = error?.name === 'AbortError' ? ui('任务已停止') : ui('校验失败：{error}', { error: error?.message || error });
  } finally {
    stop.hidden = true;
    abortController = null;
    busy = false;
    controls();
  }
});

restore.addEventListener('click', async () => {
  if (busy || !window.confirm(ui('将从备份恢复缺失的相册和角色库记录，不覆盖现有记录。是否继续？'))) return;
  busy = true;
  controls();
  try {
    const restoreHandle = await window.showDirectoryPicker({ id: 'echoshot-restore', mode: 'read' });
    busy = true;
    abortController = new AbortController();
    stop.hidden = false;
    stop.disabled = false;
    stop.textContent = ui('停止恢复');
    controls();
    const result = await restoreBackupDirectory(restoreHandle, {
      signal: abortController.signal,
      onProgress: ({ completed, total }) => {
        status.textContent = ui('正在恢复：{completed} / {total}', { completed, total });
      }
    });
    status.textContent = ui('恢复完成：相册 {images}，角色库 {characters}，已存在 {skipped}，失败 {failed}', {
      images: result.restoredImages,
      characters: result.restoredCharacters,
      skipped: result.skipped,
      failed: result.failed
    });
    diagnostics.textContent = [ui('旧版未校验：{count}', { count: result.unverified }), ...result.errors.slice(0, 3)].join('；');
    await refreshCounts();
  } catch (error) {
    status.textContent = error?.name === 'AbortError' ? ui('任务已停止') : ui('恢复失败：{error}', { error: error?.message || error });
  } finally {
    stop.hidden = true;
    abortController = null;
    busy = false;
    controls();
    await refreshCounts().catch(() => {});
  }
});

diagnose.addEventListener('click', async () => {
  if (busy) return;
  try {
    await requestDirectoryPermission();
    busy = true;
    controls();
    const [directoryResult, storage] = await Promise.all([
      diagnoseBackupDirectory(config.handle),
      refreshStorageStatus()
    ]);
    const remaining = storage.estimate.quota
      ? formatBytes(Math.max(0, storage.estimate.quota - (storage.estimate.usage || 0)))
      : ui('未知');
    diagnostics.textContent = ui('目录权限：{permission}；读取：{readable}；写入：{writable}；浏览器相册预计剩余：{remaining}。所选磁盘剩余容量请在系统中查看。', {
      permission: ui(directoryResult.permission === 'granted' ? '已授权' : '未授权'),
      readable: ui(directoryResult.readable ? '正常' : '失败'),
      writable: ui(directoryResult.writable ? '正常' : '失败'),
      remaining
    });
    status.textContent = directoryResult.writable ? ui('存储与目录诊断完成') : ui('目录不可写，请重新授权或更换目录');
  } catch (error) {
    status.textContent = ui('诊断失败：{error}', { error: error?.message || error });
  } finally {
    busy = false;
    controls();
  }
});

chrome.storage.onChanged.addListener((changes, area) => {
  if (area === 'local' && changes[BACKUP_STATUS_KEY] && !busy) {
    latestStatus = changes[BACKUP_STATUS_KEY].newValue || null;
    status.textContent = statusText(latestStatus);
    void getBackupConfig().then((next) => { config = next; controls(); }).catch(() => {});
    void refreshCounts().catch(() => {});
  }
});

$('interfaceLanguage')?.addEventListener('change', () => queueMicrotask(() => {
  status.textContent = statusText(latestStatus);
  controls();
  void refreshCounts().catch(() => {});
  void refreshStorageStatus().catch(() => {});
}));

async function init() {
  config = await getBackupConfig();
  controls();
  if (typeof window.showDirectoryPicker !== 'function') {
    status.textContent = ui('当前浏览器不支持目录授权，请使用相册下载功能备份。');
    return;
  }
  const saved = (await chrome.storage.local.get(BACKUP_STATUS_KEY))[BACKUP_STATUS_KEY];
  latestStatus = saved || null;
  status.textContent = statusText(saved);
  if (config?.enabled && await config.handle.queryPermission({ mode: 'readwrite' }) !== 'granted') {
    status.textContent = ui('备份目录需要重新授权，请点击“选择 / 重新授权目录”。');
  }
  await refreshCounts();
  await refreshStorageStatus().catch(() => {});
}
init().catch((error) => { status.textContent = ui('备份设置读取失败：{error}', { error: error.message }); });
