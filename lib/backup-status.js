// Older versions marked normal progress as an error. Do not surface that
// persisted status as a failure after an upgrade or browser restart.
export function isBackupFailure(status) {
  return Boolean(status?.error && status.messageKey !== '备份进行中，浏览器重启后会自动补齐');
}

export function needsBackupQueue(record, directoryId) {
  return record.backupDirectoryId !== directoryId ||
    (!record.backupPending && !record.backedUpAt);
}

export function restoredBackupState(record, directoryId = '') {
  const next = { ...record, backupPending: true, backupDirectoryId: directoryId };
  delete next.backedUpAt;
  delete next.backupError;
  return next;
}
