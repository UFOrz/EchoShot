// 设置页：多平台配置、模型获取、能力启用、默认模型与尺寸映射

import {
  DEFAULT_PLATFORM_PRESET_IDS,
  PRESETS,
  RATIOS,
  applyRunningHubModelCatalog,
  allowsEmptyApiKey,
  fallbackModelChoice,
  isPlatformConfigured,
  isRunningHubPreset,
  listModelChoices,
  loadSettings,
  modelCapabilityKinds,
  normalizeRunningHubModel,
  presetIdFromBaseUrl,
  runningHubAppId,
  saveSettings,
  setModelAliasIfEmpty,
  withSettingsWriteLock
} from '../lib/settings.js';
import { localizeDocument, localizeRuntimeError, resolveLanguage, t } from '../lib/i18n.js';

const $ = (id) => document.getElementById(id);
const sizeInputIds = {
  '1:1': 'size11',
  '4:3': 'size43',
  '3:4': 'size34',
  '3:2': 'size32',
  '2:3': 'size23',
  '16:9': 'size169',
  '9:16': 'size916'
};
let state = null;
let toastTimer = 0;
let activePlatformId = '';
let currentLanguage = 'zh';
let savedSnapshot = null;
let saving = false;
let dirty = false;
let savedTagTimer = 0;
let externalSettingsRefreshSeq = 0;
const platformStatus = new Map();
const pendingModelFetches = new Map();
const pendingWorkflowAliasLookups = new Map();
const ui = (key, vars = {}) => t(key, vars, currentLanguage);
const platformStatusText = (platformId) => {
  const status = platformStatus.get(platformId);
  if (!status) return '';
  const vars = { ...status.vars };
  if (status.error != null) vars.error = localizeRuntimeError(status.error, currentLanguage);
  return ui(status.key, vars);
};
const presetLabel = (presetId) => ui(PRESETS[presetId]?.label || '自定义平台');
const platformDisplayName = (platform) => {
  const originalPresetLabel = PRESETS[platform.preset]?.label;
  return platform.name === originalPresetLabel ? presetLabel(platform.preset) : (platform.name || ui('未命名平台'));
};

const esc = (value) => String(value ?? '').replace(/[&<>"']/g, (ch) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
}[ch]));

const MODEL_KIND_ICONS = {
  vision: '<svg class="model-kind-icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5"></circle><path d="m15.5 15.5 4.5 4.5"></path></svg>',
  'text-to-image': '<svg class="model-kind-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.5 6 10 4.5h4L15.5 6H19a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z"></path><circle cx="12" cy="12.5" r="3.5"></circle></svg>',
  'image-edit': '<svg class="model-kind-icon" viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="15" rx="2"></rect><circle cx="8.5" cy="10" r="1.5"></circle><path d="m4 17 4.5-4 3.5 3 2.5-2 5.5 5"></path></svg>'
};

function showToast(text) {
  $('toast').textContent = text;
  $('toast').hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => ($('toast').hidden = true), 2400);
}

function setLocalizedText(element, key, vars = {}) {
  // 新建文本节点，避免 localizeDocument 缓存的旧动态文案覆盖当前状态。
  const text = ui(key, vars);
  if (element.textContent !== text) element.replaceChildren(document.createTextNode(text));
}

function settingsSnapshot(settings) {
  const unorderedLists = new Set(['models', 'visionModels', 'imageModels', 'imageEditModels']);
  const canonical = (value, key = '') => {
    if (Array.isArray(value)) {
      const items = value.map((item) => canonical(item));
      return unorderedLists.has(key) ? items.sort() : items;
    }
    if (value && typeof value === 'object') {
      return Object.fromEntries(Object.keys(value).sort().map((name) => [name, canonical(value[name], name)]));
    }
    return value;
  };
  return JSON.stringify(canonical(settings));
}

function settingsChanged(key, before, after) {
  return settingsSnapshot({ [key]: before }) !== settingsSnapshot({ [key]: after });
}

function settingsConflict() {
  const error = new Error(ui('设置保存冲突：其他页面已修改同一配置，请重新打开设置核对后重试'));
  error.code = 'SETTINGS_CONFLICT';
  return error;
}

function mergePlatformValue(before, edited, latest, key, preferEdited) {
  if (!settingsChanged(key, before, edited)) return structuredClone(latest);
  if (!settingsChanged(key, before, latest) || !settingsChanged(key, edited, latest)) return structuredClone(edited);
  // Model checkboxes are sets. Apply only the local membership changes to the
  // latest set, so another page's additions or removals remain intact.
  if ([before, edited, latest].every(value => Array.isArray(value) && value.every(item => typeof item === 'string'))) {
    const original = new Set(before), selected = new Set(edited), result = new Set(latest);
    for (const value of original) if (!selected.has(value)) result.delete(value);
    for (const value of selected) if (!original.has(value)) result.add(value);
    return [...result];
  }
  const object = value => value && typeof value === 'object' && !Array.isArray(value);
  if (object(edited) && object(latest) && (before === undefined || object(before))) {
    const result = structuredClone(latest);
    for (const name of new Set([...Object.keys(before || {}), ...Object.keys(edited)])) {
      if (!settingsChanged(name, before?.[name], edited[name])) continue;
      const value = mergePlatformValue(before?.[name], edited[name], latest[name], name, preferEdited);
      if (value === undefined) delete result[name];
      else Object.defineProperty(result, name, { value, enumerable: true, configurable: true, writable: true });
    }
    return result;
  }
  if (preferEdited) return structuredClone(edited);
  throw settingsConflict();
}

function mergePlatforms(baseline = [], edited = [], latest = [], preferEdited = false) {
  const before = new Map(baseline.map(platform => [platform.id, platform]));
  const local = new Map(edited.map(platform => [platform.id, platform]));
  const result = structuredClone(latest);
  for (const platform of baseline) {
    if (local.has(platform.id)) continue;
    const index = result.findIndex(item => item.id === platform.id);
    if (index < 0) continue;
    if (!preferEdited && settingsChanged('platform', platform, result[index])) throw settingsConflict();
    result.splice(index, 1);
  }
  for (const platform of edited) {
    const original = before.get(platform.id);
    const index = result.findIndex(item => item.id === platform.id);
    if (!original) {
      if (index < 0) result.push(structuredClone(platform));
      else if (settingsChanged('platform', platform, result[index])) {
        if (!preferEdited) throw settingsConflict();
        result[index] = structuredClone(platform);
      }
    } else if (index < 0) {
      if (!settingsChanged('platform', original, platform)) continue;
      if (!preferEdited) throw settingsConflict();
      result.push(structuredClone(platform));
    } else {
      result[index] = mergePlatformValue(original, platform, result[index], 'platform', preferEdited);
    }
  }
  return result;
}

function mergeSettingsChanges(baseline, edited, latest, { preferEdited = false } = {}) {
  const merged = structuredClone(latest);
  for (const [key, value] of Object.entries(edited)) {
    // 默认模型按用途、尺寸映射按比例保存，保留侧边栏更新的其他选择。
    if (key === 'platforms') {
      merged.platforms = mergePlatforms(baseline.platforms, value, latest.platforms, preferEdited);
    } else if (key === 'defaults' || key === 'sizeMap') {
      for (const [name, item] of Object.entries(value)) {
        if (settingsChanged(name, baseline[key]?.[name], item)) {
          merged[key] = { ...merged[key], [name]: structuredClone(item) };
        }
      }
    } else if (settingsChanged(key, baseline[key], value)) {
      merged[key] = structuredClone(value);
    }
  }
  return merged;
}

function refreshSaveState() {
  if (!state || savedSnapshot === null) return;
  dirty = settingsSnapshot(collectSettings()) !== savedSnapshot;
  $('btnSave').disabled = saving || !dirty;
  $('btnSave').textContent = ui(saving ? '正在保存…' : '保存设置');
  $('saveState').dataset.state = saving ? 'saving' : dirty ? 'dirty' : 'saved';
  setLocalizedText($('saveState'), saving ? '正在保存设置…' : dirty ? '有未保存的修改' : '所有修改已保存');
  setLocalizedText($('saveHint'), dirty ? '保存后，新任务会使用这些设置。' : '回到网页，悬停图片并点击魔法按钮即可开始。');
  if (dirty) $('savedTag').hidden = true;
  refreshSetupProgress();
}

function refreshSetupProgress() {
  if (!state) return;
  const choicePlatform = (type) => state.platforms.find((item) => item.id === state.defaults[type]?.platformId);
  const hasChoices = ['vision', 'image'].every((type) => {
    const platform = choicePlatform(type);
    const models = type === 'vision' ? platform?.visionModels : platform?.imageModels;
    return models?.includes(state.defaults[type]?.model);
  });
  const configuredChoice = (type) => {
    const choice = state.defaults[type];
    const platform = choicePlatform(type);
    const models = type === 'vision' ? platform?.visionModels : platform?.imageModels;
    return Boolean(isPlatformConfigured(platform) && models?.includes(choice?.model));
  };
  const ready = configuredChoice('vision') && configuredChoice('image');
  const missingPlatforms = [...new Set(['vision', 'image'].filter(type => !configuredChoice(type))
    .map(type => choicePlatform(type)).filter(Boolean).map(platformDisplayName))];
  setLocalizedText($('setupProgress'), !hasChoices ? '请先启用反推与生图模型。' : ready
    ? '基础配置已填写，保存后即可尝试。'
    : '默认模型使用的平台尚未配置：{platforms}。请填写这些平台的 Base URL 与 API Key，或改选已配置平台的默认模型。', { platforms: missingPlatforms.join(', ') });
  $('setupProgress').dataset.ready = String(ready);
}

function updateModelIdentity(row, platform, model) {
  const alias = String(platform.modelAliases?.[model] || '').trim();
  row.querySelector('.model-name').textContent = alias || model;
  row.querySelector('.model-id').hidden = !alias;
}

function newPlatform() {
  return {
    id: crypto.randomUUID(), preset: 'custom', listed: true, name: ui('新平台'), baseUrl: '', apiKey: '',
    models: [], modelAliases: {}, modelKinds: {}, imageCapabilities: {}, visionModels: [], imageModels: [], imageEditModels: []
  };
}

function newPresetPlatform(presetId) {
  const preset = PRESETS[presetId];
  const models = [...(preset.models || [])];
  const visionModels = [...(preset.visionModels || [])];
  const imageModels = [...(preset.imageModels || [])];
  const imageEditModels = [...(preset.imageEditModels || [])];
  const disabledModels = [...(preset.disabledModels || [])];
  return {
    id: crypto.randomUUID(),
    preset: presetId,
    listed: true,
    name: preset.label,
    baseUrl: preset.baseUrl,
    apiKey: '',
    models: [...new Set([...models, ...visionModels, ...imageModels, ...disabledModels])],
    modelAliases: { ...(preset.modelAliases || {}) },
    modelKinds: { ...(preset.modelKinds || {}) },
    imageCapabilities: {},
    visionModels,
    imageModels,
    imageEditModels
  };
}

function modelRows(platform) {
  if (!platform.models.length) return `<div class="model-empty">${esc(ui('尚未获取模型，可自动获取或手动添加。'))}</div>`;
  const visibleModels = state.showDisabledModels
    ? platform.models
    : platform.models.filter((model) => platform.visionModels.includes(model) || platform.imageModels.includes(model));
  if (!visibleModels.length) return `<div class="model-empty">${esc(ui('未启用的模型已隐藏，可打开上方开关查看。'))}</div>`;
  return visibleModels.map((model, index) => {
    const enabled = platform.visionModels.includes(model) || platform.imageModels.includes(model);
    const alias = String(platform.modelAliases?.[model] || '').trim();
    const kindDefinitions = {
      vision: { icon: MODEL_KIND_ICONS.vision, label: ui('适合反推'), className: 'vision' },
      'text-to-image': { icon: MODEL_KIND_ICONS['text-to-image'], label: ui('适合文生图'), className: 'text-image' },
      'image-edit': { icon: MODEL_KIND_ICONS['image-edit'], label: ui('适合图像编辑'), className: 'image-edit' }
    };
    const kinds = modelCapabilityKinds(platform, model)
      .map((kind) => kindDefinitions[kind])
      .filter(Boolean);
    const kindBadges = kinds.length
      ? `<span class="model-kind-badges" aria-label="${esc(kinds.map((kind) => kind.label).join('、'))}">${kinds.map((kind) => (
          `<span class="model-kind ${esc(kind.className)}" title="${esc(kind.label)}" aria-hidden="true">${kind.icon}</span>`
        )).join('')}</span>`
      : '';
    return `
    <div class="model-row${enabled ? '' : ' disabled-model'}" data-model="${esc(model)}">
      <span class="model-identity">${kindBadges}<span class="model-name-stack"><span class="model-name" title="${esc(model)}">${esc(alias || model)}</span><code class="model-id" ${alias ? '' : 'hidden'} title="${esc(model)}">${esc(model)}</code></span></span>
      <button class="model-edit" type="button" aria-expanded="false" aria-controls="modelAlias-${esc(platform.id)}-${index}">${esc(ui('编辑名称'))}</button>
      <label title="${esc(ui('看图生成提示词'))}"><input type="checkbox" data-capability="vision" ${platform.visionModels.includes(model) ? 'checked' : ''}/> ${esc(ui('反推'))}</label>
      <label><input type="checkbox" data-capability="image" ${platform.imageModels.includes(model) ? 'checked' : ''}/> ${esc(ui('生图'))}</label>
      <button class="model-remove" type="button" title="${esc(ui('移除模型'))}" aria-label="${esc(ui('移除模型'))}">×</button>
      <span class="model-alias-wrap" id="modelAlias-${esc(platform.id)}-${index}" hidden>
        <span class="alias-label">${esc(ui('显示名称'))}</span>
        <input class="model-alias" type="text" value="${esc(alias)}" placeholder="${esc(ui('模型别名（可选）'))}" aria-label="${esc(ui('为 {model} 设置别名', { model }))}" />
        ${isRunningHubPreset(platform.preset) && (/^workflow\/\d+$/.test(model) || runningHubAppId(model))
          ? `<button class="model-alias-fetch" type="button" ${alias && !runningHubAppId(model) ? 'hidden' : ''}>${esc(ui(runningHubAppId(model) ? '读取应用参数' : '获取名称'))}</button>`
          : ''}
      </span>
    </div>`;
  }).join('');
}

function appendPlatformNavItem(list, platform) {
  const item = document.createElement('button');
  item.className = 'platform-nav-item' + (platform.id === activePlatformId ? ' active' : '');
  item.type = 'button';
  item.dataset.id = platform.id;
  item.setAttribute('aria-pressed', String(platform.id === activePlatformId));
  const summary = presetLabel(platform.preset);
  item.innerHTML = `
    <span class="platform-nav-main"><b>${esc(platformDisplayName(platform))}</b><small>${esc(summary)}</small></span>
    <span class="platform-nav-count"><i>${esc(ui('反 {count}', { count: platform.visionModels.length }))}</i><i>${esc(ui('图 {count}', { count: platform.imageModels.length }))}</i></span>`;
  item.addEventListener('click', () => {
    const restoreFocus = document.activeElement === item;
    activePlatformId = platform.id;
    renderPlatforms();
    if (restoreFocus) {
      [...$('platformList').querySelectorAll('.platform-nav-item')]
        .find(button => button.dataset.id === platform.id)?.focus({ preventScroll: true });
    }
  });
  list.appendChild(item);
}

function appendNavGroupTitle(list, text) {
  const title = document.createElement('div');
  title.className = 'platform-nav-group';
  title.textContent = text;
  list.appendChild(title);
}

function renderPlatformNav() {
  const list = $('platformList');
  list.innerHTML = '';
  const listedPlatforms = state.platforms.filter((platform) => platform.listed !== false);
  if (!listedPlatforms.length) {
    list.innerHTML = `<div class="platform-empty">${esc(ui('尚未添加接口'))}<br><small>${esc(ui('从右上角选择模板或自定义接口'))}</small></div>`;
    return;
  }
  appendNavGroupTitle(list, ui('已添加接口'));
  listedPlatforms.forEach((platform) => appendPlatformNavItem(list, platform));
}

function renderPlatforms({ preserveControls = false } = {}) {
  const listedPlatforms = state.platforms.filter((platform) => platform.listed !== false);
  if (!listedPlatforms.some((platform) => platform.id === activePlatformId)) {
    activePlatformId = listedPlatforms[0]?.id || '';
  }
  const detail = $('platformDetail');
  const platform = state.platforms.find((item) => item.id === activePlatformId);
  const previousCard = detail.querySelector('.platform-card');
  const retainedCard = preserveControls && previousCard?.dataset.id === platform?.id ? previousCard : null;
  if (!retainedCard) {
    renderPlatformNav();
    detail.innerHTML = '';
  }
  if (platform) {
    const preset = PRESETS[platform.preset];
    const getKeyUrl = preset?.getKeyUrl || '';
    const platformLabel = preset ? presetLabel(platform.preset) : platformDisplayName(platform);
    const affiliateDisclosure = ui('通过此链接注册，插件开发者可能获得平台推广奖励，不影响您的使用价格。您也可以直接访问平台官网注册。');
    const getKeyLabel = preset?.affiliateLink
      ? ui('前往 {platform} 获取 API Key（推广链接）', { platform: platformLabel })
      : ui('前往 {platform} 获取 API Key', { platform: platformLabel });
    const getKeyLink = getKeyUrl
      ? `<span class="get-key-wrap">
          <a class="get-key-link" data-affiliate="${preset.affiliateLink ? 'true' : 'false'}" href="${esc(getKeyUrl)}" target="_blank" rel="noopener noreferrer"${preset.affiliateLink ? ` aria-describedby="getKeyDisclosure" aria-label="${esc(getKeyLabel)}"` : ` title="${esc(getKeyLabel)}"`}>${esc(ui('获取密钥'))}</a>
          ${preset.affiliateLink ? `<span class="get-key-disclosure" id="getKeyDisclosure" role="tooltip">${esc(affiliateDisclosure)}</span>` : ''}
        </span>`
      : '';
    if (retainedCard) {
      // URL change runs while the pointer is moving focus to the next control.
      // Keep those inputs/buttons in place so the same click can finish.
      retainedCard.querySelector('[data-field="name"]').value = platformDisplayName(platform);
      retainedCard.querySelector('[data-field="baseUrl"]').value = platform.baseUrl;
      retainedCard.querySelector('.platform-index').textContent = platformDisplayName(platform).slice(0, 1) || 'P';
      retainedCard.querySelector('.preset-chip').textContent = presetLabel(platform.preset);
      retainedCard.querySelector('.key-field-label').innerHTML = `<span>API Key</span>${getKeyLink}`;
      retainedCard.querySelector('.model-list').innerHTML = modelRows(platform);
      const nav = [...$('platformList').querySelectorAll('.platform-nav-item')].find(item => item.dataset.id === platform.id);
      if (nav) {
        nav.querySelector('b').textContent = platformDisplayName(platform);
        nav.querySelector('small').textContent = presetLabel(platform.preset);
        const counts = nav.querySelectorAll('.platform-nav-count i');
        counts[0].textContent = ui('反 {count}', { count: platform.visionModels.length });
        counts[1].textContent = ui('图 {count}', { count: platform.imageModels.length });
      }
      renderDefaults();
      localizeDocument(currentLanguage);
      refreshSaveState();
      return;
    }
    const card = document.createElement('article');
    card.className = 'platform-card';
    card.dataset.id = platform.id;
    card.innerHTML = `
      <div class="platform-title">
        <span class="platform-index">${esc(platformDisplayName(platform).slice(0, 1) || 'P')}</span>
        <input data-field="name" value="${esc(platformDisplayName(platform))}" aria-label="${esc(ui('平台名称'))}" />
        <span class="preset-chip">${esc(presetLabel(platform.preset))}</span>
        <button class="btn mini danger remove-platform" type="button">${esc(ui('删除平台'))}</button>
      </div>
      <div class="platform-grid">
        <label>Base URL<input data-field="baseUrl" list="builtinBaseUrls" value="${esc(platform.baseUrl)}" placeholder="${esc(ui('选择内置接口或输入 {url}', { url: 'https://api.example.com/v1' }))}" /></label>
        <div class="key-field">
          <div class="key-field-label"><span>API Key</span>${getKeyLink}</div>
          <span><input data-field="apiKey" type="password" value="${esc(platform.apiKey)}" placeholder="sk-..." aria-label="API Key"/><button class="btn mini key-toggle" type="button">${esc(ui('显示'))}</button></span>
        </div>
      </div>
      <div class="platform-actions">
        <button class="btn fetch-models" type="button">${esc(ui('自动获取模型'))}</button>
        <span class="platform-status">${esc(platformStatusText(platform.id))}</span>
      </div>
      <details class="manual-model-details">
        <summary>${esc(ui('手动添加模型（高级）'))}</summary>
        <div class="manual-model-editor"><input class="manual-model" placeholder="${esc(ui(isRunningHubPreset(platform.preset) ? '模型名称、工作流或 AI 应用链接' : '手动输入模型名称'))}" aria-label="${esc(ui('模型名称'))}" /><button class="btn add-model" type="button">${esc(ui('添加'))}</button></div>
        ${isRunningHubPreset(platform.preset) ? `<p class="hint">${esc(ui('可粘贴 RunningHub 工作流或 AI 应用链接，也可输入 workflow/工作流ID 或 app/应用ID'))}</p>` : ''}
      </details>
      <p class="model-use-hint">${esc(ui('勾选模型用途，再在下方选择默认模型。'))}</p>
      <div class="model-head">
        <span class="model-head-main">
          <span>${esc(ui('模型名称、别名与启用能力'))}</span>
          <span class="model-kind-legend" aria-label="${esc(ui('模型能力图例'))}">
            <span title="${esc(ui('适合反推'))}">${MODEL_KIND_ICONS.vision}<span>${esc(ui('反推'))}</span></span>
            <span title="${esc(ui('适合文生图'))}">${MODEL_KIND_ICONS['text-to-image']}<span>${esc(ui('文生图'))}</span></span>
            <span title="${esc(ui('适合图像编辑'))}">${MODEL_KIND_ICONS['image-edit']}<span>${esc(ui('编辑'))}</span></span>
          </span>
        </span>
        <label class="model-filter-toggle"><input class="show-disabled-models" type="checkbox" ${state.showDisabledModels ? 'checked' : ''}/> ${esc(ui('显示未启用模型'))}</label>
      </div>
      <div class="model-list">${modelRows(platform)}</div>`;
    bindPlatformCard(card, platform);
    detail.appendChild(card);
  }
  renderDefaults();
  localizeDocument(currentLanguage);
  refreshSaveState();
}

function addModel(platform, model) {
  const value = String(model || '').trim();
  if (!value || platform.models.includes(value)) return false;
  platform.models.push(value);
  platform.models.sort((a, b) => a.localeCompare(b));
  return true;
}

function updatePlatformStatus(platform, message) {
  platformStatus.set(platform.id, { key: message });
  const card = [...$('platformDetail').querySelectorAll('.platform-card')]
    .find((item) => item.dataset.id === platform.id);
  const label = card?.querySelector('.platform-status');
  if (label) label.textContent = platformStatusText(platform.id);
}

function platformRequestConfig(platform) {
  return { preset: platform.preset, baseUrl: platform.baseUrl, apiKey: platform.apiKey };
}

function platformRequestMatches(platform, cfg) {
  return state.platforms.includes(platform)
    && platform.preset === cfg.preset
    && platform.baseUrl === cfg.baseUrl
    && platform.apiKey === cfg.apiKey;
}

function fetchManualWorkflowAlias(platform, model) {
  if (isRunningHubPreset(platform.preset) && runningHubAppId(model)) return fetchManualRunningHubApp(platform, model);
  if (!isRunningHubPreset(platform.preset) || !/^workflow\/\d+$/.test(model)) return;
  const key = `${platform.id}\n${model}`;
  const pendingLookup = pendingWorkflowAliasLookups.get(key);
  if ((pendingLookup?.platform === platform && platformRequestMatches(platform, pendingLookup.cfg))
    || String(platform.modelAliases?.[model] || '').trim()) return;
  const lookup = { platform, edited: false, promise: null, cfg: platformRequestConfig(platform) };
  pendingWorkflowAliasLookups.set(key, lookup);
  updatePlatformStatus(platform, '正在获取工作流名称…');
  const card = [...$('platformDetail').querySelectorAll('.platform-card')]
    .find((item) => item.dataset.id === platform.id);
  const button = [...(card?.querySelectorAll('.model-row') || [])]
    .find((item) => item.dataset.model === model)?.querySelector('.model-alias-fetch');
  if (button) button.disabled = true;
  lookup.promise = (async () => {
    let title = '';
    let usedPresetAlias = false;
    try {
      const response = await chrome.runtime.sendMessage({
        type: 'ir.runningHubWorkflowTitle',
        payload: { preset: lookup.cfg.preset, model }
      });
      if (response?.ok) title = String(response.title || '').trim();
    } catch { /* 公开页面不可读时仍保留手动添加的工作流。 */ }
    if (!title) {
      title = String(PRESETS[lookup.cfg.preset]?.modelAliases?.[model] || '').trim();
      usedPresetAlias = Boolean(title);
    }
    if (pendingWorkflowAliasLookups.get(key) !== lookup
      || !platformRequestMatches(platform, lookup.cfg)
      || !isRunningHubPreset(platform.preset)
      || !platform.models.includes(model)
      || lookup.edited) return;
    if (!setModelAliasIfEmpty(platform, model, title)) {
      if (!platform.modelAliases?.[model]) updatePlatformStatus(platform, '未获取到工作流名称，可手动填写别名');
      return;
    }
    const card = [...$('platformDetail').querySelectorAll('.platform-card')]
      .find((item) => item.dataset.id === platform.id);
    const row = [...(card?.querySelectorAll('.model-row') || [])]
      .find((item) => item.dataset.model === model);
    const input = row?.querySelector('.model-alias');
    if (input && !input.value.trim()) input.value = title;
    if (row) updateModelIdentity(row, platform, model);
    const aliasButton = row?.querySelector('.model-alias-fetch');
    if (aliasButton) aliasButton.hidden = true;
    renderDefaults();
    refreshSaveState();
    updatePlatformStatus(platform, usedPresetAlias ? '已填入内置工作流名称' : '已自动填入工作流名称');
  })().finally(() => {
    if (pendingWorkflowAliasLookups.get(key) === lookup) {
      if (button?.isConnected) button.disabled = false;
      pendingWorkflowAliasLookups.delete(key);
    }
  });
}

function fetchManualRunningHubApp(platform, model) {
  const key = `${platform.id}\n${model}`;
  const pending = pendingWorkflowAliasLookups.get(key);
  if (pending?.platform === platform && platformRequestMatches(platform, pending.cfg)) return;
  const lookup = { platform, edited: false, promise: null, cfg: platformRequestConfig(platform) };
  pendingWorkflowAliasLookups.set(key, lookup);
  updatePlatformStatus(platform, '正在读取 AI 应用参数…');
  const isCurrent = () => pendingWorkflowAliasLookups.get(key) === lookup
    && platformRequestMatches(platform, lookup.cfg) && platform.models.includes(model);
  lookup.promise = (async () => {
    try {
      const response = await chrome.runtime.sendMessage({
        type: 'ir.runningHubAppDescriptor', payload: { preset: lookup.cfg.preset, model }
      });
      if (!isCurrent()) return;
      if (!response?.ok || !response.descriptor) throw new Error(response?.error || '未返回应用信息');
      const descriptor = response.descriptor;
      platform.imageCapabilities ||= {};
      platform.imageCapabilities[model] = { runningHubApp: descriptor };
      const kinds = modelCapabilityKinds(platform, model);
      platform.modelKinds ||= {};
      platform.modelKinds[model] = kinds;
      platform.imageEditModels = (platform.imageEditModels || []).filter(item => item !== model);
      if (kinds.includes('image-edit')) platform.imageEditModels.push(model);
      // 改别名只影响显示名称；应用能力和参数仍须保存。
      if (!lookup.edited) setModelAliasIfEmpty(platform, model, descriptor.name);
      const card = [...$('platformDetail').querySelectorAll('.platform-card')].find(item => item.dataset.id === platform.id);
      const row = [...(card?.querySelectorAll('.model-row') || [])].find(item => item.dataset.model === model);
      if (row) {
        const aliasInput = row.querySelector('.model-alias');
        if (aliasInput && !lookup.edited) aliasInput.value = platform.modelAliases?.[model] || '';
        updateModelIdentity(row, platform, model);
        const preview = document.createElement('div');
        preview.innerHTML = modelRows({ ...platform, models: [model] });
        const badges = preview.querySelector('.model-kind-badges');
        row.querySelector('.model-kind-badges')?.remove();
        if (badges) row.querySelector('.model-identity').prepend(badges);
      }
      updatePlatformStatus(platform, '已读取 AI 应用参数，请勾选生图并保存');
      renderDefaults();
      refreshSaveState();
    } catch (error) {
      if (!isCurrent()) return;
      platformStatus.set(platform.id, { key: '获取失败：{error}', error: error?.message || String(error) });
      const label = [...$('platformDetail').querySelectorAll('.platform-card')]
        .find(item => item.dataset.id === platform.id)?.querySelector('.platform-status');
      if (label) label.textContent = platformStatusText(platform.id);
    }
  })().finally(() => {
    if (pendingWorkflowAliasLookups.get(key) === lookup) pendingWorkflowAliasLookups.delete(key);
  });
}

function bindPlatformCard(card, platform) {
  card.querySelectorAll('[data-field]').forEach((input) => {
    input.addEventListener('input', () => {
      platform[input.dataset.field] = input.value;
      if (input.dataset.field === 'baseUrl' || input.dataset.field === 'apiKey') {
        platformStatus.delete(platform.id);
        card.querySelector('.platform-status').textContent = '';
        const fetchButton = card.querySelector('.fetch-models');
        fetchButton.disabled = false;
        fetchButton.textContent = ui('自动获取模型');
        card.querySelectorAll('.model-alias-fetch').forEach((button) => { button.disabled = false; });
      }
      if (input.dataset.field === 'name') renderPlatformNav();
      refreshSaveState();
    });
  });
  card.querySelector('[data-field="baseUrl"]').addEventListener('change', (e) => {
    const presetId = presetIdFromBaseUrl(e.target.value);
    if (!presetId) {
      if (platform.preset !== 'custom') {
        platform.models = [];
        platform.modelAliases = {};
        platform.modelKinds = {};
        platform.imageCapabilities = {};
        platform.visionModels = [];
        platform.imageModels = [];
        platform.imageEditModels = [];
      }
      platform.preset = 'custom';
      return renderPlatforms({ preserveControls: true });
    }
    if (presetId === platform.preset) {
      // URL normalization within the same provider must preserve fetched
      // catalogs, aliases, capability selections, and the user's name.
      platform.baseUrl = PRESETS[presetId].baseUrl;
      return renderPlatforms({ preserveControls: true });
    }
    const preset = PRESETS[presetId];
    platform.preset = presetId;
    platform.name = preset.label;
    platform.baseUrl = preset.baseUrl;
    platform.models = [...new Set([
      ...(preset.models || []),
      ...(preset.visionModels || []),
      ...(preset.imageModels || []),
      ...(preset.disabledModels || [])
    ])];
    platform.modelAliases = { ...(preset.modelAliases || {}) };
    platform.modelKinds = { ...(preset.modelKinds || {}) };
    platform.imageCapabilities = {};
    platform.visionModels = [...(preset.visionModels || [])];
    platform.imageModels = [...(preset.imageModels || [])];
    platform.imageEditModels = [...(preset.imageEditModels || [])];
    renderPlatforms({ preserveControls: true });
  });
  card.querySelector('.show-disabled-models').addEventListener('change', (e) => {
    state.showDisabledModels = e.target.checked;
    renderPlatforms();
  });
  card.querySelector('.key-toggle').addEventListener('click', (e) => {
    const input = card.querySelector('[data-field="apiKey"]');
    input.type = input.type === 'password' ? 'text' : 'password';
    e.currentTarget.textContent = ui(input.type === 'password' ? '显示' : '隐藏');
  });
  card.querySelector('.fetch-models').addEventListener('click', async (e) => {
    if (!platform.baseUrl || (!platform.apiKey && platform.preset !== 'apimart' && !allowsEmptyApiKey(platform))) {
      showToast(ui('请先填写 Base URL 和 API Key'));
      return;
    }
    const button = e.currentTarget;
    const request = { cfg: platformRequestConfig(platform) };
    pendingModelFetches.set(platform.id, request);
    const isCurrentRequest = () => pendingModelFetches.get(platform.id) === request
      && platformRequestMatches(platform, request.cfg);
    button.disabled = true;
    platformStatus.set(platform.id, { key: '正在获取…' });
    button.textContent = ui('获取中…');
    try {
      const resp = await chrome.runtime.sendMessage({
        type: 'ir.listModels', payload: {
          cfg: request.cfg
        }
      });
      if (!isCurrentRequest()) return;
      if (!resp?.ok) throw new Error(resp?.error || '获取失败');
      let added = 0;
      if (platform.preset === 'runninghub_cn') {
        const previousModels = new Set(platform.models);
        Object.assign(platform, applyRunningHubModelCatalog(platform, resp, { replace: true }));
        added = platform.models.filter((model) => !previousModels.has(model)).length;
      } else {
        for (const model of resp.models || []) if (addModel(platform, model)) added += 1;
      }
      if (platform.preset === 'runninghub') {
        Object.assign(platform, applyRunningHubModelCatalog(platform, resp));
      }
      if (!['runninghub', 'runninghub_cn'].includes(platform.preset) && resp.modelKinds) {
        platform.modelKinds = { ...(platform.modelKinds || {}) };
        for (const [model, kinds] of Object.entries(resp.modelKinds)) {
          if (platform.models.includes(model) && Array.isArray(kinds)) {
            platform.modelKinds[model] = [...new Set(kinds)];
          }
        }
      }
      if (!['runninghub', 'runninghub_cn'].includes(platform.preset) && resp.modelAliases) {
        platform.modelAliases = { ...(resp.modelAliases || {}), ...(platform.modelAliases || {}) };
      }
      if (['qianwenai', 'bailian_token_plan'].includes(platform.preset)) {
        const preset = PRESETS[platform.preset];
        platform.visionModels = [...new Set([
          ...platform.visionModels,
          ...(preset.visionModels || []).filter((model) => platform.models.includes(model))
        ])];
        platform.imageModels = [...new Set([
          ...platform.imageModels,
          ...(preset.imageModels || []).filter((model) => platform.models.includes(model))
        ])];
        platform.imageEditModels = [...new Set([
          ...(platform.imageEditModels || []),
          ...(preset.imageEditModels || []).filter((model) => platform.models.includes(model))
        ])];
      }
      if (['openrouter', 'fal'].includes(platform.preset) && Array.isArray(resp.imageEditModels)) {
        platform.imageEditModels = [...new Set(resp.imageEditModels.filter((model) => platform.models.includes(model)))];
        platform.imageCapabilities = Object.fromEntries(
          Object.entries(resp.imageCapabilities || {}).filter(([model]) => platform.models.includes(model))
        );
      }
      platformStatus.set(platform.id, ['runninghub', 'runninghub_cn'].includes(platform.preset)
        ? { key: '已获取 {total} 个（反推 {vision}，生图 {image}），新增 {added} 个', vars: {
            total: resp.models?.length || 0,
            vision: resp.visionModels?.length || 0,
            image: resp.imageModels?.length || 0,
            added
          } }
        : { key: '已获取 {total} 个，新增 {added} 个', vars: { total: resp.models?.length || 0, added } });
    } catch (error) {
      if (!isCurrentRequest()) return;
      platformStatus.set(platform.id, { key: '获取失败：{error}', error: error?.message || String(error) });
    } finally {
      const current = isCurrentRequest();
      if (pendingModelFetches.get(platform.id) === request) {
        pendingModelFetches.delete(platform.id);
        if (button.isConnected) {
          button.disabled = false;
          button.textContent = ui('自动获取模型');
        }
      }
      if (current) {
        const transient = captureTransientControls();
        renderPlatforms();
        restoreTransientControls(transient);
      }
    }
  });
  card.querySelector('.add-model').addEventListener('click', () => {
    const input = card.querySelector('.manual-model');
    const model = isRunningHubPreset(platform.preset) ? normalizeRunningHubModel(input.value) : input.value.trim();
    if (!model) return showToast(ui('请输入新的模型名称'));
    if (!addModel(platform, model)) {
      if (isRunningHubPreset(platform.preset) && (runningHubAppId(model) || /^workflow\/\d+$/.test(model))) {
        if (!state.showDisabledModels) {
          state.showDisabledModels = true;
          renderPlatforms();
        }
        fetchManualWorkflowAlias(platform, model);
        showToast(ui('模型已在列表中'));
        return;
      }
      return showToast(ui('模型已在列表中'));
    }
    if (!state.showDisabledModels) state.showDisabledModels = true;
    renderPlatforms();
    fetchManualWorkflowAlias(platform, model);
  });
  card.querySelector('.model-list').addEventListener('change', (e) => {
    const capability = e.target.dataset.capability;
    if (!capability) return;
    const row = e.target.closest('.model-row');
    const model = row?.dataset.model;
    if (!model) return;
    const key = capability === 'vision' ? 'visionModels' : 'imageModels';
    platform[key] = e.target.checked
      ? [...new Set([...platform[key], model])]
      : platform[key].filter((item) => item !== model);
    const enabled = platform.visionModels.includes(model) || platform.imageModels.includes(model);
    row.classList.toggle('disabled-model', !enabled);
    if (!state.showDisabledModels && !enabled) row.remove();
    const navItem = [...$('platformList').querySelectorAll('.platform-nav-item')]
      .find((item) => item.dataset.id === platform.id);
    const counts = navItem?.querySelectorAll('.platform-nav-count i') || [];
    if (counts[0]) counts[0].textContent = ui('反 {count}', { count: platform.visionModels.length });
    if (counts[1]) counts[1].textContent = ui('图 {count}', { count: platform.imageModels.length });
    renderDefaults();
    refreshSaveState();
  });
  card.querySelector('.model-list').addEventListener('input', (e) => {
    if (!e.target.classList.contains('model-alias')) return;
    const model = e.target.closest('.model-row')?.dataset.model;
    if (!model) return;
    const lookup = pendingWorkflowAliasLookups.get(`${platform.id}\n${model}`);
    if (lookup) lookup.edited = true;
    platform.modelAliases ||= {};
    const alias = e.target.value.trim();
    if (alias) platform.modelAliases[model] = alias;
    else delete platform.modelAliases[model];
    const aliasButton = e.target.closest('.model-row')?.querySelector('.model-alias-fetch');
    if (aliasButton) aliasButton.hidden = Boolean(alias) && !runningHubAppId(model);
    updateModelIdentity(e.target.closest('.model-row'), platform, model);
    renderDefaults();
    refreshSaveState();
  });
  card.querySelector('.model-list').addEventListener('click', (e) => {
    const editButton = e.target.closest('.model-edit');
    if (editButton) {
      const editor = editButton.closest('.model-row').querySelector('.model-alias-wrap');
      editor.hidden = !editor.hidden;
      editButton.setAttribute('aria-expanded', String(!editor.hidden));
      if (!editor.hidden) editor.querySelector('.model-alias').focus();
      return;
    }
    if (e.target.closest('.model-alias-fetch')) {
      const model = e.target.closest('.model-row')?.dataset.model;
      if (model) fetchManualWorkflowAlias(platform, model);
      return;
    }
    if (!e.target.classList.contains('model-remove')) return;
    const model = e.target.closest('.model-row')?.dataset.model;
    platform.models = platform.models.filter((item) => item !== model);
    if (platform.modelAliases) delete platform.modelAliases[model];
    if (platform.modelKinds) delete platform.modelKinds[model];
    if (platform.imageCapabilities) delete platform.imageCapabilities[model];
    platform.visionModels = platform.visionModels.filter((item) => item !== model);
    platform.imageModels = platform.imageModels.filter((item) => item !== model);
    platform.imageEditModels = (platform.imageEditModels || []).filter((item) => item !== model);
    renderPlatforms();
  });
  card.querySelector('.manual-model').addEventListener('keydown', (event) => {
    if (event.key !== 'Enter') return;
    event.preventDefault();
    card.querySelector('.add-model').click();
  });
  card.querySelector('.remove-platform').addEventListener('click', (e) => {
    const button = e.currentTarget;
    if (button.dataset.armed !== 'true') {
      button.dataset.armed = 'true';
      button.textContent = ui('再次点击删除');
      setTimeout(() => { if (button.isConnected) { button.dataset.armed = ''; button.textContent = ui('删除平台'); } }, 1800);
      return;
    }
    state.platforms = state.platforms.filter((item) => item.id !== platform.id);
    activePlatformId = state.platforms[0]?.id || '';
    renderPlatforms();
  });
}

function choiceValue(choice) { return JSON.stringify([choice.platformId, choice.model]); }
function parseChoice(value) { try { const [platformId, model] = JSON.parse(value); return { platformId, model }; } catch { return { platformId: '', model: '' }; } }

function renderDefaultSelect(type) {
  const select = $(type === 'vision' ? 'defaultVision' : 'defaultImage');
  const choices = listModelChoices(state, type);
  const current = choiceValue(state.defaults[type] || {});
  select.innerHTML = choices.length
    ? choices.map((choice) => `<option value="${esc(choiceValue(choice))}"${choiceValue(choice) === current ? ' selected' : ''}>${esc(choice.label)}</option>`).join('')
    : `<option value="">${esc(ui('尚未启用模型'))}</option>`;
  select.disabled = !choices.length;
  if (choices.length && !choices.some((choice) => choiceValue(choice) === current)) {
    const fallback = fallbackModelChoice(state, type);
    state.defaults[type] = { platformId: fallback.platformId, model: fallback.model };
    select.value = choiceValue(fallback);
  }
}

function renderDefaults() { renderDefaultSelect('vision'); renderDefaultSelect('image'); }

function collectSettings() {
  const sizeMap = {};
  for (const ratio of RATIOS) sizeMap[ratio] = $(sizeInputIds[ratio]).value.trim();
  return {
    presetRevision: state.presetRevision,
    language: $('interfaceLanguage').value,
    platforms: state.platforms,
    defaults: state.defaults,
    showDisabledModels: state.showDisabledModels,
    sizeMap,
    defaultRatio: $('defaultRatio').value,
    imageQuality: $('imageQuality').value,
    imageResolution: $('imageResolution').value
  };
}

// `loadSettings()` adds compatibility-only `vision` / `image` fields. They are
// not part of the form and must not be included when comparing saved state.
function savedSettingsShape(settings) {
  const keys = Object.keys(collectSettings());
  return Object.fromEntries(keys.map((key) => [key, settings?.[key]]));
}

function transientFocusDescriptor(element) {
  if (!element || element === document.body || element === document.documentElement) return null;
  if (element.id) return { id: element.id };
  if (element.matches?.('.platform-nav-item')) return { kind: 'nav', platformId: element.dataset.id || '' };
  const card = element.closest?.('.platform-card');
  if (!card?.dataset.id) return null;
  const platformId = card.dataset.id;
  const row = element.closest?.('.model-row');
  const model = row?.dataset.model || '';
  if (element.classList?.contains('manual-model')) return { platformId, kind: 'manual' };
  if (element.classList?.contains('model-alias')) return { platformId, kind: 'alias', model };
  if (element.matches?.('input[data-capability]')) {
    return { platformId, kind: 'capability', model, capability: element.dataset.capability || '' };
  }
  if (element.dataset?.field) return { platformId, kind: 'field', field: element.dataset.field };
  const control = [...(element.classList || [])].find((name) => [
    'model-edit', 'model-remove', 'model-alias-fetch', 'add-model', 'fetch-models',
    'key-toggle', 'show-disabled-models', 'remove-platform'
  ].includes(name));
  return control ? { platformId, kind: 'control', model, control } : null;
}

function captureTransientControls() {
  const snapshot = { manual: new Map(), details: new Set(), aliases: new Set(), focus: null };
  if (!state || !state.platforms) return snapshot;
  for (const card of $('platformDetail').querySelectorAll('.platform-card')) {
    const platformId = card.dataset.id;
    if (!platformId) continue;
    if (card.querySelector('.manual-model-details')?.open) snapshot.details.add(platformId);
    const manual = card.querySelector('.manual-model');
    if (manual?.value) snapshot.manual.set(platformId, manual.value);
    for (const row of card.querySelectorAll('.model-row')) {
      const editor = row.querySelector('.model-alias-wrap');
      if (editor && !editor.hidden) snapshot.aliases.add(`${platformId}\n${row.dataset.model || ''}`);
    }
  }
  snapshot.focus = transientFocusDescriptor(document.activeElement);
  if (snapshot.focus && typeof document.activeElement?.selectionStart === 'number') {
    snapshot.focus.selection = [document.activeElement.selectionStart,
      document.activeElement.selectionEnd, document.activeElement.selectionDirection];
  }
  return snapshot;
}

function restoreTransientControls(snapshot) {
  if (!snapshot) return;
  const cardFor = (platformId) => [...$('platformDetail').querySelectorAll('.platform-card')]
    .find((card) => card.dataset.id === platformId);
  for (const platformId of snapshot.details) {
    const details = cardFor(platformId)?.querySelector('.manual-model-details');
    if (details) details.open = true;
  }
  for (const [platformId, value] of snapshot.manual) {
    const input = cardFor(platformId)?.querySelector('.manual-model');
    if (input) input.value = value;
  }
  for (const key of snapshot.aliases) {
    const separator = key.indexOf('\n');
    const platformId = key.slice(0, separator);
    const model = key.slice(separator + 1);
    const row = [...(cardFor(platformId)?.querySelectorAll('.model-row') || [])]
      .find((item) => item.dataset.model === model);
    const editor = row?.querySelector('.model-alias-wrap');
    if (!editor) continue;
    editor.hidden = false;
    row.querySelector('.model-edit')?.setAttribute('aria-expanded', 'true');
  }
  const focus = snapshot.focus;
  if (!focus) return;
  let target = null;
  if (focus.id) {
    target = document.getElementById(focus.id);
  } else if (focus.kind === 'nav') {
    target = [...$('platformList').querySelectorAll('.platform-nav-item')]
      .find((item) => item.dataset.id === focus.platformId);
  } else {
    const card = cardFor(focus.platformId);
    const row = [...(card?.querySelectorAll('.model-row') || [])]
      .find((item) => item.dataset.model === focus.model);
    if (focus.kind === 'manual') target = card?.querySelector('.manual-model');
    else if (focus.kind === 'alias') target = row?.querySelector('.model-alias');
    else if (focus.kind === 'capability') target = row?.querySelector(`input[data-capability="${focus.capability}"]`);
    else if (focus.kind === 'field') target = card?.querySelector(`[data-field="${focus.field}"]`);
    else if (focus.kind === 'control') target = row?.querySelector(`.${focus.control}`) || card?.querySelector(`.${focus.control}`);
  }
  if (target && !target.disabled && !target.hidden) {
    target.focus({ preventScroll: true });
    if (focus.selection && typeof target.setSelectionRange === 'function') {
      target.setSelectionRange(...focus.selection);
    }
  }
}

function applySettingsToForm(settings, { resetRequests = true, savedSettings = null, preservePlatformControls = false } = {}) {
  const transient = resetRequests ? null : captureTransientControls();
  const previousPlatformsSnapshot = state ? settingsSnapshot(state.platforms) : '';
  const previousShowDisabled = state?.showDisabledModels;
  if (resetRequests) {
    // 导入会替换平台对象，旧请求不能参与新配置的去重、保存等待或状态展示。
    pendingModelFetches.clear();
    pendingWorkflowAliasLookups.clear();
    platformStatus.clear();
  } else {
    // 普通保存保留未变的平台对象，让进行中的模型查询继续完成。
    settings.platforms = settings.platforms.map((platform) => {
      const existing = state.platforms.find((item) => item.id === platform.id);
      return existing && settingsSnapshot(existing) === settingsSnapshot(platform) ? existing : platform;
    });
  }
  const previousPlatformId = activePlatformId;
  state = settings;
  $('interfaceLanguage').value = state.language || 'auto';
  currentLanguage = resolveLanguage(state.language);
  activePlatformId = !resetRequests && state.platforms.some((item) => item.id === previousPlatformId)
    ? previousPlatformId
    : state.defaults.vision?.platformId || state.platforms[0]?.id || '';
  for (const ratio of RATIOS) $(sizeInputIds[ratio]).value = state.sizeMap?.[ratio] || '';
  $('defaultRatio').value = state.defaultRatio || '1:1';
  $('imageQuality').value = state.imageQuality || 'low';
  $('imageResolution').value = state.imageResolution || '1k';
  const platformControlsUnchanged = !resetRequests
    && settingsSnapshot(state.platforms) === previousPlatformsSnapshot
    && state.showDisabledModels === previousShowDisabled;
  // A background settings refresh should update defaults without throwing away
  // an unfinished manual-model draft or moving focus while the user is typing.
  if (preservePlatformControls && platformControlsUnchanged) renderDefaults();
  else renderPlatforms();
  localizeDocument(currentLanguage);
  savedSnapshot = settingsSnapshot(savedSettings ? savedSettingsShape(savedSettings) : collectSettings());
  refreshSaveState();
  restoreTransientControls(transient);
}

chrome.storage.local.onChanged.addListener((changes) => {
  if (!changes.settings || saving || !state || savedSnapshot === null) return;
  const seq = ++externalSettingsRefreshSeq;
  void loadSettings().then((incoming) => {
    if (seq !== externalSettingsRefreshSeq || saving || !state) return;
    try {
      const current = mergeSettingsChanges(
        JSON.parse(savedSnapshot),
        collectSettings(),
        incoming
      );
      applySettingsToForm(current, {
        resetRequests: false,
        savedSettings: incoming,
        preservePlatformControls: true
      });
    } catch {
      // Keep unsaved local edits visible. A later manual save reports real conflicts.
    }
  }).catch(() => {});
});

function settingsExportName() {
  const date = new Date();
  const pad = (value) => String(value).padStart(2, '0');
  const stamp = `${date.getFullYear()}${pad(date.getMonth() + 1)}${pad(date.getDate())}-${pad(date.getHours())}${pad(date.getMinutes())}${pad(date.getSeconds())}`;
  return `EchoShot-settings-${stamp}.json`;
}

function downloadSettingsFile(settings) {
  const payload = {
    format: 'echoshot-settings',
    version: 1,
    exportedAt: new Date().toISOString(),
    settings
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = settingsExportName();
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 10000);
}

function importedSettingsFrom(value) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    throw new Error(ui('配置文件格式无效'));
  }
  const supportedFormats = new Set(['echoshot-settings', 'pai-tong-kuan-settings']);
  if (value.format && !supportedFormats.has(value.format)) {
    throw new Error(ui('不是 EchoShot · 拍同款配置文件'));
  }
  const imported = value.settings && typeof value.settings === 'object' ? value.settings : value;
  if (!Array.isArray(imported.platforms) || !imported.defaults || typeof imported.defaults !== 'object') {
    throw new Error(ui('配置文件缺少平台或默认模型信息'));
  }
  return imported;
}

$('defaultVision').addEventListener('change', (e) => { state.defaults.vision = parseChoice(e.target.value); refreshSaveState(); });
$('defaultImage').addEventListener('change', (e) => { state.defaults.image = parseChoice(e.target.value); refreshSaveState(); });
$('interfaceLanguage').addEventListener('change', (e) => {
  state.language = e.target.value;
  currentLanguage = resolveLanguage(state.language);
  renderPlatforms();
  localizeDocument(currentLanguage);
  refreshSaveState();
});
$('btnAddPlatform').addEventListener('click', () => {
  const presetId = $('addPlatformPreset').value;
  let platform = presetId === 'custom'
    ? null
    : state.platforms.find((item) => item.preset === presetId && item.listed === false);
  if (platform) {
    platform.listed = true;
  } else {
    platform = presetId === 'custom' ? newPlatform() : newPresetPlatform(presetId);
    state.platforms.push(platform);
  }
  activePlatformId = platform.id;
  renderPlatforms();
});
$('btnSave').addEventListener('click', async () => {
  if (saving) return;
  saving = true;
  refreshSaveState();
  try {
    await Promise.allSettled([...pendingWorkflowAliasLookups.values()].map((lookup) => lookup.promise));
    const settings = structuredClone(collectSettings());
    const saved = await withSettingsWriteLock(async () => {
      const merged = mergeSettingsChanges(JSON.parse(savedSnapshot), settings, await loadSettings());
      await saveSettings(merged);
      return loadSettings();
    });
    const savedForm = Object.fromEntries(Object.keys(settings).map((key) => [key, saved[key]]));
    const current = mergeSettingsChanges(settings, collectSettings(), savedForm, { preferEdited: true });
    applySettingsToForm(current, {
      resetRequests: false,
      savedSettings: savedForm,
      preservePlatformControls: true
    });
    clearTimeout(savedTagTimer);
    $('savedTag').hidden = dirty;
    savedTagTimer = setTimeout(() => ($('savedTag').hidden = true), 2000);
  } catch (error) {
    const invalidRatio = RATIOS.find((ratio) => String(error?.message || '').startsWith(`${ratio}：`));
    if (invalidRatio) {
      $('advancedSizes').open = true;
      $(sizeInputIds[invalidRatio]).focus();
    }
    showToast(error?.message || String(error));
  } finally {
    saving = false;
    refreshSaveState();
  }
});
$('btnExportSettings').addEventListener('click', () => {
  downloadSettingsFile(collectSettings());
  showToast(ui('配置已导出，请妥善保管其中的 API Key'));
});
$('btnImportSettings').addEventListener('click', () => $('settingsImportFile').click());
$('settingsImportFile').addEventListener('change', async (event) => {
  const file = event.target.files?.[0];
  event.target.value = '';
  if (!file) return;
  if (file.size > 5 * 1024 * 1024) {
    showToast(ui('导入失败：{error}', { error: ui('配置文件过大') }));
    return;
  }
  try {
    const imported = importedSettingsFrom(JSON.parse(await file.text()));
    if (!window.confirm(ui('导入配置将覆盖当前设置，是否继续？'))) return;
    const saved = await withSettingsWriteLock(async () => {
      await saveSettings(imported);
      return loadSettings();
    });
    applySettingsToForm(saved);
    showToast(ui('配置导入成功'));
  } catch (error) {
    const message = error instanceof SyntaxError ? ui('配置文件不是有效的 JSON') : (error?.message || String(error));
    showToast(ui('导入失败：{error}', { error: message }));
  }
});
$('btnAlbum').addEventListener('click', async () => {
  try {
    const response = await chrome.runtime.sendMessage({ type: 'ir.openAlbum' });
    if (!response?.ok) throw new Error(response?.error || ui('未知错误'));
  } catch (error) {
    showToast(ui('打开相册失败：{error}', { error: localizeRuntimeError(error, currentLanguage) }));
  }
});

for (const id of [...Object.values(sizeInputIds), 'defaultRatio', 'imageQuality', 'imageResolution']) {
  $(id).addEventListener('input', refreshSaveState);
  $(id).addEventListener('change', refreshSaveState);
}
document.querySelectorAll('[data-settings-target]').forEach((button) => {
  button.addEventListener('click', () => {
    const targetId = button.dataset.settingsTarget;
    const target = targetId === 'platformKey'
      ? $('platformDetail').querySelector('[data-field="apiKey"]') || $('addPlatformPreset')
      : $(targetId);
    target?.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'center' });
    if (targetId === 'btnSave' && target?.disabled) $('saveState').focus({ preventScroll: true });
    else target?.focus({ preventScroll: true });
  });
});
window.addEventListener('beforeunload', (event) => {
  if (!dirty) return;
  event.preventDefault();
  event.returnValue = '';
});

(async function init() {
  const presetOrder = new Map(DEFAULT_PLATFORM_PRESET_IDS.map((id, index) => [id, index]));
  const presetOptions = Object.entries(PRESETS)
    .filter(([id]) => id !== 'custom')
    .sort(([left], [right]) => (
      (presetOrder.get(left) ?? Number.MAX_SAFE_INTEGER)
      - (presetOrder.get(right) ?? Number.MAX_SAFE_INTEGER)
    ));
  $('addPlatformPreset').insertAdjacentHTML('beforeend', presetOptions.map(([id, preset]) =>
    `<option value="${esc(id)}">${esc(preset.label)}</option>`).join(''));
  $('builtinBaseUrls').innerHTML = presetOptions.map(([, preset]) =>
    `<option value="${esc(preset.baseUrl)}">${esc(preset.label)}</option>`).join('');
  applySettingsToForm(await loadSettings());
})();
