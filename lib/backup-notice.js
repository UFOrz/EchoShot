import { BACKUP_STATUS_KEY } from './local-backup.js';
import { isBackupFailure } from './backup-status.js';
import { getStoredLanguage, t } from './i18n.js';

const notice = document.createElement('div');
notice.setAttribute('role', 'status');
notice.style.cssText = 'padding:10px 14px;background:#fff1d6;color:#613d00;font-size:13px;line-height:1.5;';
notice.hidden = true;
const label = document.createElement('span');
const link = document.createElement('a');
link.href = chrome.runtime.getURL('options/options.html');
link.target = '_blank';
link.rel = 'noopener';
link.textContent = ' 打开备份设置';
notice.append(label, link);
document.body.prepend(notice);
let latestValue = null;
let renderRevision = 0;
async function render(value = latestValue) {
  const revision = ++renderRevision;
  latestValue = value;
  notice.hidden = !value?.enabled || !isBackupFailure(value);
  const language = await getStoredLanguage().catch(() => document.documentElement.dataset.language || 'zh');
  if (revision !== renderRevision) return;
  link.textContent = ` ${t('打开备份设置', {}, language)}`;
  const vars = { ...(value?.messageVars || {}) };
  if (vars.subject) vars.subject = t(vars.subject, {}, language);
  label.textContent = value?.messageKey
    ? t(value.messageKey, vars, language)
    : (value?.message || '');
}
chrome.storage.local.get(BACKUP_STATUS_KEY).then((data) => render(data[BACKUP_STATUS_KEY])).catch(() => {});
chrome.storage.onChanged.addListener((changes, area) => {
  if (area !== 'local') return;
  if (changes[BACKUP_STATUS_KEY]) void render(changes[BACKUP_STATUS_KEY].newValue);
  else if (changes.settings?.newValue?.language !== changes.settings?.oldValue?.language) void render();
});
