// Keep the native select as the source of truth for the existing task and save logic.
export function createModelPicker(select, translate) {
  const wrapper = document.createElement('div');
  wrapper.className = 'model-picker-control';
  select.before(wrapper);
  wrapper.appendChild(select);
  select.hidden = true;

  const button = document.createElement('button');
  button.type = 'button';
  button.id = `${select.id}Picker`;
  button.className = 'model-picker-trigger';
  button.setAttribute('aria-haspopup', 'dialog');
  button.setAttribute('aria-expanded', 'false');
  const value = document.createElement('span');
  value.id = `${select.id}PickerValue`;
  value.className = 'model-picker-value';
  const arrow = document.createElement('span');
  arrow.className = 'model-picker-arrow';
  arrow.setAttribute('aria-hidden', 'true');
  button.append(value, arrow);
  wrapper.appendChild(button);

  const label = document.querySelector(`label[for="${select.id}"]`);
  if (label) {
    label.id ||= `${select.id}PickerLabel`;
    label.htmlFor = button.id;
    button.setAttribute('aria-labelledby', `${label.id} ${value.id}`);
  }

  const popup = document.createElement('div');
  popup.className = 'model-picker-popup';
  popup.id = `${select.id}Popup`;
  popup.hidden = true;
  popup.setAttribute('role', 'dialog');
  button.setAttribute('aria-controls', popup.id);

  const searchWrap = document.createElement('div');
  searchWrap.className = 'model-picker-search-wrap';
  const searchLabel = document.createElement('label');
  searchLabel.className = 'model-picker-search-label';
  searchLabel.htmlFor = `${select.id}Search`;
  const search = document.createElement('input');
  search.id = searchLabel.htmlFor;
  search.className = 'model-picker-search';
  search.type = 'search';
  search.autocomplete = 'off';
  search.setAttribute('role', 'combobox');
  search.setAttribute('aria-autocomplete', 'list');
  search.setAttribute('aria-expanded', 'true');

  const list = document.createElement('div');
  list.id = `${select.id}List`;
  list.className = 'model-picker-list';
  list.setAttribute('role', 'listbox');
  search.setAttribute('aria-controls', list.id);
  const empty = document.createElement('div');
  empty.className = 'model-picker-empty';
  empty.setAttribute('role', 'status');
  empty.hidden = true;
  searchWrap.append(searchLabel, search);
  popup.append(searchWrap, list, empty);
  document.body.appendChild(popup);

  let choices = [];
  let filtered = [];
  let activeIndex = -1;

  function choiceValue(choice) {
    return JSON.stringify([choice.platformId, choice.model]);
  }

  function position() {
    if (popup.hidden) return;
    if (!button.getClientRects().length) return close(false);
    const rect = button.getBoundingClientRect();
    if (rect.bottom < 0 || rect.top > window.innerHeight) return close(false);
    const margin = 12;
    const width = Math.min(Math.max(rect.width, 280), window.innerWidth - margin * 2);
    const below = window.innerHeight - rect.bottom - margin - 6;
    const above = rect.top - margin - 6;
    const openBelow = below >= Math.min(240, window.innerHeight - margin * 2) || below >= above;
    popup.style.width = `${width}px`;
    popup.style.left = `${Math.max(margin, Math.min(rect.left, window.innerWidth - margin - width))}px`;
    popup.style.maxHeight = `${Math.max(80, Math.min(440, openBelow ? below : above))}px`;
    popup.style.top = openBelow ? `${rect.bottom + 6}px` : 'auto';
    popup.style.bottom = openBelow ? 'auto' : `${window.innerHeight - rect.top + 6}px`;
  }

  function updateActive() {
    const items = list.querySelectorAll('[role="option"]');
    items.forEach((item, index) => item.classList.toggle('active', index === activeIndex));
    const active = items[activeIndex];
    if (active) {
      search.setAttribute('aria-activedescendant', active.id);
      active.scrollIntoView({ block: 'nearest' });
    } else {
      search.removeAttribute('aria-activedescendant');
    }
  }

  function render() {
    const query = search.value.trim().toLocaleLowerCase();
    filtered = choices.filter((choice) =>
      `${choice.platformName || ''} ${choice.model} ${choice.alias || ''} ${choice.label}`.toLocaleLowerCase().includes(query));
    activeIndex = -1;
    search.removeAttribute('aria-activedescendant');
    list.replaceChildren();
    const groups = new Map();
    filtered.forEach((choice, index) => {
      let group = groups.get(choice.platformId);
      if (!group) {
        group = document.createElement('div');
        group.className = 'model-picker-group';
        group.dataset.platformId = choice.platformId;
        group.setAttribute('role', 'group');
        group.setAttribute('aria-label', choice.platformName || translate('未命名平台'));
        const heading = document.createElement('div');
        heading.className = 'model-picker-group-title';
        heading.setAttribute('aria-hidden', 'true');
        heading.textContent = choice.platformName || translate('未命名平台');
        group.appendChild(heading);
        groups.set(choice.platformId, group);
        list.appendChild(group);
      }
      const item = document.createElement('div');
      item.className = 'model-picker-option';
      item.id = `${select.id}Option${index}`;
      item.dataset.index = String(index);
      item.dataset.model = choice.model;
      item.setAttribute('role', 'option');
      const selected = select.value === choiceValue(choice);
      item.setAttribute('aria-selected', String(selected));
      const name = document.createElement('span');
      name.className = 'model-picker-option-name';
      const prefix = `${choice.platformName} · `;
      name.textContent = choice.label.startsWith(prefix) ? choice.label.slice(prefix.length) : choice.label;
      const check = document.createElement('span');
      check.className = 'model-picker-check';
      check.setAttribute('aria-hidden', 'true');
      check.textContent = selected ? '✓' : '';
      item.append(name, check);
      group.appendChild(item);
    });
    empty.hidden = filtered.length > 0;
    empty.textContent = translate('未找到匹配模型');
  }

  function sync() {
    value.textContent = select.selectedOptions[0]?.textContent || '';
    button.disabled = select.disabled || !choices.length;
    button.title = select.title;
    if (button.disabled && !popup.hidden) close(false);
  }

  function close(restoreFocus) {
    popup.hidden = true;
    button.setAttribute('aria-expanded', 'false');
    search.removeAttribute('aria-activedescendant');
    if (restoreFocus && !button.disabled) button.focus({ preventScroll: true });
  }

  function open() {
    if (button.disabled) return;
    searchLabel.textContent = translate('搜索模型');
    search.placeholder = translate('搜索模型…');
    popup.setAttribute('aria-label', translate('选择模型'));
    search.value = '';
    popup.hidden = false;
    button.setAttribute('aria-expanded', 'true');
    render();
    list.scrollTop = 0;
    position();
    search.focus({ preventScroll: true });
  }

  function choose(index) {
    const choice = filtered[index];
    if (!choice) return;
    const next = choiceValue(choice);
    if (select.value !== next) {
      select.value = next;
      select.dispatchEvent(new Event('change', { bubbles: true }));
    }
    sync();
    close(true);
  }

  button.addEventListener('click', () => popup.hidden ? open() : close(true));
  button.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowDown' && popup.hidden) {
      event.preventDefault();
      open();
    }
  });
  search.addEventListener('input', () => { render(); list.scrollTop = 0; });
  search.addEventListener('keydown', (event) => {
    if (event.isComposing) return;
    if (event.key === 'Escape') {
      event.preventDefault();
      close(true);
    } else if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      if (!filtered.length) return;
      const step = event.key === 'ArrowDown' ? 1 : -1;
      activeIndex = activeIndex < 0 ? (step > 0 ? 0 : filtered.length - 1)
        : (activeIndex + step + filtered.length) % filtered.length;
      updateActive();
    } else if (event.key === 'Enter' && filtered.length) {
      event.preventDefault();
      choose(activeIndex < 0 ? 0 : activeIndex);
    }
  });
  list.addEventListener('pointerdown', (event) => {
    // Keep mouse focus in the search field without cancelling touch scrolling.
    if (event.pointerType === 'mouse' && event.target.closest('[role="option"]')) event.preventDefault();
  });
  list.addEventListener('click', (event) => {
    const item = event.target.closest('[role="option"]');
    if (item) choose(Number(item.dataset.index));
  });
  select.addEventListener('change', sync);
  new MutationObserver(sync).observe(select, { attributes: true, attributeFilter: ['disabled', 'title'] });
  document.addEventListener('pointerdown', (event) => {
    if (!popup.hidden && !popup.contains(event.target) && !button.contains(event.target)) close(false);
  });
  document.addEventListener('focusin', (event) => {
    if (!popup.hidden && !popup.contains(event.target) && event.target !== button) close(false);
  });
  window.addEventListener('resize', position);
  window.addEventListener('scroll', (event) => {
    if (!popup.contains(event.target)) position();
  }, true);

  return {
    setChoices(nextChoices) {
      choices = nextChoices;
      sync();
      if (!popup.hidden) {
        const scrollTop = list.scrollTop;
        render();
        list.scrollTop = scrollTop;
        position();
      }
    },
    sync,
    close: () => close(false)
  };
}
