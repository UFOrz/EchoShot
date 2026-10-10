// 内容脚本：检测鼠标悬停的图片，在不遮挡网页控件的位置显示浮动按钮。
// 使用 Shadow DOM 隔离样式，避免被站点 CSS 干扰。

(() => {
  if (window.top !== window) return; // 仅顶层框架

  // 扩展更新后，旧内容脚本的 DOM 可能仍留在未刷新的网页里，但其运行上下文已经失效。
  // 每次补注入都先清理本版本可管理的旧实例，再建立一套新的监听，避免按钮看得见却点不动。
  const previousRuntime = globalThis.__paiTongKuanContentReady;
  try { previousRuntime?.cleanup?.(); } catch { /* 旧扩展上下文可能已失效 */ }
  document.querySelectorAll('#ir-fab-host,#ir-region-capture-host').forEach((node) => node.remove());
  const contentRuntime = { active: true };
  globalThis.__paiTongKuanContentReady = contentRuntime;
  // DOM 标记在不同扩展运行上下文之间共享；新实例接管后，旧监听不得重新创建按钮。
  const OWNER_ATTRIBUTE = 'data-echoshot-magic-owner';
  const ownerToken = globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  document.documentElement.setAttribute(OWNER_ATTRIBUTE, ownerToken);

  const MIN_SIZE = 110; // 过小的图标/头像不处理
  const HOST_ID = 'ir-fab-host';
  const FAB_SIZE = 30;
  const FAB_INSET = 6;
  const CONTROL_GAP = 4;
  const SHOW_DELAY = 120;
  const PAGE_CONTROL_SELECTOR = 'button,a[href],[role="button"],[role="link"],input,select,textarea,summary,[onclick],[tabindex]:not([tabindex="-1"])';
  const PAGE_OBSTRUCTION_SELECTOR = 'iframe,object,embed';

  let host = null;
  let btn = null;
  let currentImg = null;
  let hideTimer = 0;
  let showTimer = 0;
  let pendingImg = null;
  let pointerOnFab = false;
  let rafId = 0;
  let currentCorner = -1;
  let cornerInsetOffset = 0;
  let interiorPosition = null;
  let lastX = 0;
  let lastY = 0;
  let magicButtonVisible = true;
  let regionCaptureHost = null;
  let regionCaptureCleanup = null;
  let regionCaptureBusy = false;
  let regionCaptureGeneration = 0;
  let uiLanguage = 'zh';
  const contentTexts = {
    en: {
      magic: 'Reconstruct prompt and generate', capture: 'Drag to select an area · Press Esc to cancel',
      small: 'Area too small. Drag again · Press Esc to cancel', cancelled: 'Area capture cancelled',
      captureFailed: 'Capture failed: {error}', saveFailed: 'Could not save capture: {error}',
      cropFailed: 'Could not crop capture: {error}', captured: 'Captured {width} × {height} area',
      noScreenshot: 'No page screenshot was returned', unknown: 'Unknown error',
      disconnected: 'The extension is not connected to this page. Refresh the page and try again.',
      permission: 'Capture permission is unavailable. Return to the page and try again.',
      unsupported: 'This page cannot be captured. Use a regular HTTP/HTTPS webpage.',
      invalidArea: 'The selected area is invalid. Select it again.',
      invalidCrop: 'The cropped screenshot is invalid.'
    },
    ja: {
      magic: 'プロンプトを解析して生成', capture: 'ドラッグして範囲を選択 · Escでキャンセル',
      small: '範囲が小さすぎます。もう一度ドラッグ · Escでキャンセル', cancelled: '範囲キャプチャをキャンセルしました',
      captureFailed: 'キャプチャに失敗しました：{error}', saveFailed: 'キャプチャを保存できませんでした：{error}',
      cropFailed: 'キャプチャの切り抜きに失敗しました：{error}', captured: '{width} × {height} の範囲をキャプチャしました',
      noScreenshot: 'ページのスクリーンショットを取得できませんでした', unknown: '不明なエラー',
      disconnected: '拡張機能がこのページに接続されていません。ページを再読み込みしてもう一度お試しください。',
      permission: 'キャプチャ権限を使用できません。ページに戻ってもう一度お試しください。',
      unsupported: 'このページはキャプチャできません。通常のHTTP/HTTPSページで使用してください。',
      invalidArea: '選択範囲が無効です。もう一度選択してください。',
      invalidCrop: '切り抜いたスクリーンショットが無効です。'
    },
    ko: {
      magic: '프롬프트 분석 및 생성', capture: '드래그하여 영역 선택 · Esc로 취소',
      small: '영역이 너무 작습니다. 다시 드래그 · Esc로 취소', cancelled: '영역 캡처를 취소했습니다',
      captureFailed: '캡처 실패: {error}', saveFailed: '캡처 저장 실패: {error}',
      cropFailed: '캡처 자르기 실패: {error}', captured: '{width} × {height} 영역을 캡처했습니다',
      noScreenshot: '페이지 스크린샷을 가져오지 못했습니다', unknown: '알 수 없는 오류',
      disconnected: '확장 프로그램이 이 페이지에 연결되지 않았습니다. 페이지를 새로고침한 후 다시 시도하세요.',
      permission: '캡처 권한을 사용할 수 없습니다. 페이지로 돌아가 다시 시도하세요.',
      unsupported: '이 페이지는 캡처할 수 없습니다. 일반 HTTP/HTTPS 웹페이지에서 사용하세요.',
      invalidArea: '선택 영역이 올바르지 않습니다. 다시 선택하세요.',
      invalidCrop: '잘라낸 스크린샷이 올바르지 않습니다.'
    },
    zh: {
      magic: '反推提示词并生成同款', capture: '拖动框选截图区域 · 按 Esc 取消',
      small: '区域太小，请重新拖动框选 · 按 Esc 取消', cancelled: '已取消区域截图',
      captureFailed: '截图失败：{error}', saveFailed: '截图保存失败：{error}',
      cropFailed: '截图裁切失败：{error}', captured: '已截取 {width} × {height} 区域',
      noScreenshot: '未取得页面截图', unknown: '未知错误',
      disconnected: '扩展尚未连接当前网页，请刷新页面后重试',
      permission: '当前页面截图权限不可用，请返回网页后重试',
      unsupported: '当前页面不支持截图，请在普通 HTTP/HTTPS 网页中使用',
      invalidArea: '截图区域无效，请重新框选',
      invalidCrop: '裁切后的截图数据无效'
    }
  };
  const uiText = (key) => contentTexts[uiLanguage]?.[key] || contentTexts.en[key];
  const uiFormat = (key, vars = {}) => {
    let value = uiText(key);
    for (const [name, replacement] of Object.entries(vars)) value = value.replaceAll(`{${name}}`, String(replacement));
    return value;
  };
  const localizeCaptureError = (error) => {
    const raw = String(error?.message || error || '').trim();
    if (!raw) return uiText('unknown');
    if (/Receiving end does not exist|Could not establish connection/i.test(raw)) return uiText('disconnected');
    if (/activeTab permission|permission.*(?:capture|active tab)|active tab.*permission/i.test(raw)) return uiText('permission');
    if (/普通 HTTP\/HTTPS|不支持截图|Cannot access|chrome:\/\/|edge:\/\//i.test(raw)) return uiText('unsupported');
    if (/截图区域无效|selected area is invalid/i.test(raw)) return uiText('invalidArea');
    if (/裁切后的截图(?:数据|尺寸)无效|cropped screenshot is invalid/i.test(raw)) return uiText('invalidCrop');
    return raw;
  };

  const WAND_SVG = `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
         stroke-linecap="round" stroke-linejoin="round" width="16" height="16">
      <path d="m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72Z"/>
      <path d="m14 7 3 3"/>
      <path d="M5 6v4"/><path d="M19 14v4"/><path d="M10 2v2"/>
      <path d="M7 8H3"/><path d="M21 16h-4"/><path d="M11 3H9"/>
    </svg>`;

  function ensureFab() {
    if (!runtimeIsCurrent()) return;
    document.querySelectorAll('#ir-fab-host').forEach((node) => {
      if (node !== host) node.remove();
    });
    if (host?.isConnected) return;
    pointerOnFab = false;
    host = document.createElement('div');
    host.id = HOST_ID;
    host.setAttribute(OWNER_ATTRIBUTE, ownerToken);
    host.style.cssText =
      'position:fixed;z-index:2147483647;display:none;width:30px;height:30px;' +
      'pointer-events:none;top:0;left:0;';

    const shadow = host.attachShadow({ mode: 'closed' });
    const style = document.createElement('style');
    style.textContent = `
      .fab {
        pointer-events: auto;
        width: 30px; height: 30px;
        display: flex; align-items: center; justify-content: center;
        border: none; border-radius: 9px; cursor: pointer;
        color: #fff;
        background: linear-gradient(135deg, #7c5cf6, #de58ec);
        box-shadow: 0 2px 10px rgba(0,0,0,.35);
        opacity: .92;
        transform: scale(.9);
        transition: transform .12s ease, opacity .12s ease, box-shadow .12s ease;
        padding: 0; margin: 0;
      }
      .fab:hover {
        opacity: 1;
        transform: scale(1.08);
        box-shadow: 0 4px 14px rgba(124,92,246,.55);
      }
      .fab:active { transform: scale(.98); }
    `;
    btn = document.createElement('button');
    btn.className = 'fab';
    btn.type = 'button';
    btn.title = uiText('magic');
    btn.setAttribute('aria-label', uiText('magic'));
    btn.innerHTML = WAND_SVG;

    btn.addEventListener('click', onFabClick, true);
    btn.addEventListener('pointerdown', (e) => e.stopPropagation(), true);
    btn.addEventListener('mouseenter', () => {
      if (!runtimeIsCurrent()) return;
      pointerOnFab = true;
      cancelPendingShow();
      clearHideTimer();
    });
    btn.addEventListener('mouseleave', () => {
      pointerOnFab = false;
      scheduleHide();
    });

    shadow.append(style, btn);
    (document.documentElement || document.body).appendChild(host);
  }

  function isPageControl(el, img) {
    if (!(el instanceof Element) || el === host || !isRenderedElement(el)) return false;
    const control = el.closest(PAGE_CONTROL_SELECTOR);
    // 图片本身可能位于链接或按钮内，这不应阻止用户选取图片。
    if (control && !control.contains(img)) return true;
    for (let node = el; node && node !== document.documentElement; node = node.parentElement) {
      if (node === control || node.contains(img)) break;
      const rect = node.getBoundingClientRect();
      if (rect.width > 0 && rect.width <= 72 && rect.height > 0 && rect.height <= 72 &&
          (node.hasAttribute('aria-label') || node.hasAttribute('title') ||
           /(?:close|dismiss|关闭|關閉)/i.test(String(node.className || '')) ||
           getComputedStyle(node).cursor === 'pointer')) {
        return true;
      }
    }
    return false;
  }

  function imagePointStatus(x, y, img) {
    const stack = document.elementsFromPoint(x, y);
    const hitsImage = stack.includes(img);
    for (const el of stack) {
      if (el === host) continue;
      if (isImageObstruction(el, img)) return 'blocked';
      if (el === img) return 'clear';
      if (isPageControl(el, img)) return 'blocked';
      // 圆角空隙会露出卡片后方的兄弟层；仅检查图片祖先之前的前景。
      // 命中图片时仍继续到图片，兼容链接伪元素排在图片之前的正常命中栈。
      if (!hitsImage && el.contains(img)) return 'clipped';
    }
    return 'clipped'; // 圆角等裁切区域没有命中图片，可尝试将角落位置向内移动。
  }

  function isImageObstruction(el, img) {
    if (el === host) return false;
    if (el.matches?.(PAGE_OBSTRUCTION_SELECTOR)) return true;
    if (!(el instanceof Element) || el.contains(img) || img.contains(el)) return false;
    if (!isRenderedElement(el)) return false;
    if (el === imagePaintLayer(img)) return false;
    if (isProductZoomLens(el, img)) return false;
    if (isSiteImageHoverLayer(el, img)) return false;
    // 图片卡片的透明按钮容器并未遮住图片；实际按钮仍由控件检测避让。
    // 独立遮罩、跨卡片容器和不透明覆盖层继续阻挡图片选择。
    return !isImageActionLayer(el, img);
  }

  function isProductZoomLens(el, img) {
    // 商品主图的放大镜选区跟随鼠标，并不阻止选取其下方的原图。
    // 仅接受已确认的同容器空选区；实际控件和独立遮罩仍要避让。
    if (!/^(?:item\.taobao\.com|detail\.tmall\.com)$/i.test(location.hostname) ||
        img.id !== 'mainPicImageEl' || el.tagName !== 'DIV' || el.id !== 'lensDiv' ||
        !el.classList.contains('js-image-zoom__zoomed-area') ||
        el.parentElement !== img.parentElement || el.childElementCount ||
        el.matches(PAGE_CONTROL_SELECTOR)) return false;
    const preview = [...img.parentElement.children].find((node) =>
      node.classList.contains('js-image-zoom__zoomed-image'));
    if (!preview || getComputedStyle(preview).backgroundImage === 'none') return false;
    const style = getComputedStyle(el);
    const opacity = Number(style.opacity);
    if (style.position !== 'absolute' || opacity <= 0 || opacity >= 1 ||
        style.backgroundImage !== 'none' ||
        (style.backdropFilter && style.backdropFilter !== 'none')) return false;
    const rect = el.getBoundingClientRect();
    const imageRect = img.getBoundingClientRect();
    const containerRect = img.parentElement.getBoundingClientRect();
    return rect.width > 0 && rect.height > 0 && rect.width <= imageRect.width &&
      rect.height <= imageRect.height && rect.left >= containerRect.left - 1 &&
      rect.top >= containerRect.top - 1 && rect.right <= containerRect.right + 1 &&
      rect.bottom <= containerRect.bottom + 1 && rect.left < imageRect.right &&
      rect.right > imageRect.left && rect.top < imageRect.bottom && rect.bottom > imageRect.top;
  }

  function isSiteImageHoverLayer(el, img) {
    if (el.tagName !== 'DIV') return false;
    const pinterest = /(^|\.)pinterest\.com$/i.test(location.hostname);
    const pexels = /(^|\.)pexels\.com$/i.test(location.hostname);
    const layerId = el.getAttribute('data-test-id');
    let overlay;
    let card;
    if (pinterest && ['pin-card-hover-overlay', 'pin-card-hover-overlay-top-wash',
        'pin-card-hover-overlay-gradient-full'].includes(layerId)) {
      overlay = el.closest('[data-test-id="pin-card-hover-overlay"]');
      card = img.closest('[data-test-id="pinWrapper"]');
      if (!overlay || !card || overlay.closest('[data-test-id="pinWrapper"]') !== card) return false;
    } else if (pexels && [...el.classList].some((name) => name.startsWith('MediaCard_overlay__'))) {
      overlay = el;
      card = img.closest('article[class*="MediaCard_card__"]');
      if (!card || overlay.closest('article') !== card ||
          overlay.parentElement !== img.parentElement || overlay.parentElement.tagName !== 'A') return false;
    } else return false;
    // 仅接受已确认的单图卡片装饰层，保存/下载等并列控件仍由控件检测避让。
    if (overlay.querySelector(`${PAGE_CONTROL_SELECTOR},${PAGE_OBSTRUCTION_SELECTOR}`)) return false;
    const modal = overlay.closest('dialog,[role="dialog"],[aria-modal="true"]');
    if (modal && !modal.contains(img)) return false;
    // 长图可被卡片裁切；比较裁切后的边界，而不是未裁切 IMG 的全部高度。
    const imageRect = clippedRect(img, false);
    const overlayRect = clippedRect(overlay, false);
    const layerRect = clippedRect(el, false);
    if (Math.abs(overlayRect.left - imageRect.left) > 4 ||
        Math.abs(overlayRect.top - imageRect.top) > 4 ||
        Math.abs(overlayRect.right - imageRect.right) > 4 ||
        Math.abs(overlayRect.bottom - imageRect.bottom) > 4 ||
        layerRect.width <= 0 || layerRect.height <= 0 ||
        layerRect.left < overlayRect.left - 4 || layerRect.top < overlayRect.top - 4 ||
        layerRect.right > overlayRect.right + 4 || layerRect.bottom > overlayRect.bottom + 4) return false;
    for (const other of card.querySelectorAll('img')) {
      if (other === img) continue;
      const rect = other.getBoundingClientRect();
      if (rect.width >= MIN_SIZE && rect.height >= MIN_SIZE && isRenderedImage(other)) return false;
    }
    // pointer-events:none 的绘制层不会出现在命中栈中，也要检查整个装饰层。
    for (const node of [overlay, ...overlay.querySelectorAll('*')]) {
      const style = getComputedStyle(node);
      if (style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0') continue;
      const nodeId = node.getAttribute('data-test-id');
      if ((style.backdropFilter && style.backdropFilter !== 'none') || paintAlpha(style.backgroundColor) >= 1) return false;
      if (!(pexels && node === overlay) &&
          !['pin-card-hover-overlay-top-wash', 'pin-card-hover-overlay-gradient-full'].includes(nodeId) &&
          hasLayerPaint(style)) return false;
      if (style.backgroundImage !== 'none') {
        const colors = style.backgroundImage.match(/rgba?\([^)]*\)/g) || [];
        if ((!(pexels && node === overlay) && nodeId !== 'pin-card-hover-overlay-gradient-full') ||
            !style.backgroundImage.startsWith('linear-gradient(') || colors.length < 2 ||
            colors.some((color) => paintAlpha(color) >= 1)) return false;
      }
      for (const pseudo of ['::before', '::after']) {
        const pseudoStyle = getComputedStyle(node, pseudo);
        if (!['none', 'normal', ''].includes(pseudoStyle.content) &&
            pseudoStyle.display !== 'none' && pseudoStyle.visibility !== 'hidden' &&
            pseudoStyle.opacity !== '0' && hasLayerPaint(pseudoStyle)) return false;
      }
    }
    return true;
  }

  function isImageActionLayer(el, img) {
    if (el.matches(PAGE_CONTROL_SELECTOR)) return false;
    const modal = el.closest('dialog,[role="dialog"],[aria-modal="true"]');
    if (modal && !modal.contains(img)) return false;
    const style = getComputedStyle(el);
    if (hasLayerPaint(style)) return false;
    // 命中检测不会单独返回伪元素，容器的伪元素也可能绘制真正的遮罩。
    for (const pseudo of ['::before', '::after']) {
      const pseudoStyle = getComputedStyle(el, pseudo);
      if (!['none', 'normal', ''].includes(pseudoStyle.content) &&
          pseudoStyle.display !== 'none' && pseudoStyle.visibility !== 'hidden' &&
          pseudoStyle.opacity !== '0' && hasLayerPaint(pseudoStyle)) return false;
    }
    let card = el.parentElement;
    while (card && !card.contains(img)) card = card.parentElement;
    if (!card || card === document.body || card === document.documentElement) return false;
    const imageRect = img.getBoundingClientRect();
    const cardRect = card.getBoundingClientRect();
    const layerRect = el.getBoundingClientRect();
    if (cardRect.width > imageRect.width + 80 || cardRect.height > imageRect.height + 120 ||
        layerRect.width <= 0 || layerRect.height <= 0 ||
        layerRect.left < imageRect.left - 12 || layerRect.top < imageRect.top - 12 ||
        layerRect.right > cardRect.right + 12 || layerRect.bottom > cardRect.bottom + 12) return false;
    for (const other of card.querySelectorAll('img')) {
      if (other === img) continue;
      const rect = other.getBoundingClientRect();
      if (rect.width >= MIN_SIZE && rect.height >= MIN_SIZE && isRenderedImage(other)) return false;
    }
    if ([...el.querySelectorAll(`${PAGE_CONTROL_SELECTOR},[aria-label],[title]`)].some((control) => {
      const rect = control.getBoundingClientRect();
      return rect.width > 0 && rect.width <= 160 && rect.height > 0 && rect.height <= 96 &&
        rect.left >= cardRect.left - 12 && rect.top >= cardRect.top - 12 &&
        rect.right <= cardRect.right + 12 && rect.bottom <= cardRect.bottom + 12 &&
        isPageControl(control, img);
    })) return true;
    // 京东等列表用空的透明分区切换商品图片，分区本身并未遮住图片。
    // 只接受与当前单张可见图片同尺寸的容器，文字、绘制层和独立遮罩仍阻挡选图。
    if (el.tagName !== 'DIV' || el.textContent.trim() ||
        el.querySelector(`${PAGE_CONTROL_SELECTOR},${PAGE_OBSTRUCTION_SELECTOR},[aria-label],[title]`) ||
        ['left', 'top', 'right', 'bottom'].some((side) =>
          Math.abs(cardRect[side] - imageRect[side]) > 4)) return false;
    for (const node of [el, ...el.querySelectorAll('*')]) {
      if (node.tagName !== 'DIV' || node.matches(`${PAGE_CONTROL_SELECTOR},[aria-label],[title]`)) return false;
      const nodeStyle = getComputedStyle(node);
      if (nodeStyle.display === 'none' || nodeStyle.visibility === 'hidden' || nodeStyle.opacity === '0') continue;
      if (hasLayerPaint(nodeStyle)) return false;
      for (const pseudo of ['::before', '::after']) {
        const pseudoStyle = getComputedStyle(node, pseudo);
        if (!['none', 'normal', ''].includes(pseudoStyle.content) &&
            pseudoStyle.display !== 'none' && pseudoStyle.visibility !== 'hidden' &&
            pseudoStyle.opacity !== '0' && hasLayerPaint(pseudoStyle)) return false;
      }
    }
    return true;
  }

  function hasLayerPaint(style) {
    return paintAlpha(style.backgroundColor) !== 0 || style.backgroundImage !== 'none' ||
      (style.backdropFilter && style.backdropFilter !== 'none');
  }

  function paintAlpha(color) {
    if (color === 'transparent') return 0;
    const comma = color.match(/^rgba\([^)]*,\s*(\d*\.?\d+)\)$/);
    const slash = color.match(/^[\w-]+\([^)]*\/\s*(\d*\.?\d+)(%)?\)$/);
    if (comma) return Number(comma[1]);
    if (slash) return Number(slash[1]) / (slash[2] ? 100 : 1);
    return 1;
  }

  function clippedRect(el, viewport = true) {
    const rect = el.getBoundingClientRect();
    let { left, top, right, bottom } = rect;
    if (viewport) {
      left = Math.max(left, 0);
      top = Math.max(top, 0);
      right = Math.min(right, window.innerWidth);
      bottom = Math.min(bottom, window.innerHeight);
    }
    for (let parent = el.parentElement; parent && parent !== document.documentElement; parent = parent.parentElement) {
      const style = getComputedStyle(parent);
      const containPaint = /\b(paint|content|strict)\b/.test(style.contain);
      const clipX = containPaint || /^(hidden|clip|scroll|auto)$/.test(style.overflowX);
      const clipY = containPaint || /^(hidden|clip|scroll|auto)$/.test(style.overflowY);
      if (!clipX && !clipY) continue;
      const box = parent.getBoundingClientRect();
      const scaleX = parent.offsetWidth ? box.width / parent.offsetWidth : 1;
      const scaleY = parent.offsetHeight ? box.height / parent.offsetHeight : 1;
      if (clipX) {
        left = Math.max(left, box.left + parent.clientLeft * scaleX);
        right = Math.min(right, box.left + (parent.clientLeft + parent.clientWidth) * scaleX);
      }
      if (clipY) {
        top = Math.max(top, box.top + parent.clientTop * scaleY);
        bottom = Math.min(bottom, box.top + (parent.clientTop + parent.clientHeight) * scaleY);
      }
    }
    return { left, top, right, bottom, width: Math.max(0, right - left), height: Math.max(0, bottom - top) };
  }

  function isRenderedElement(el) {
    const visibility = getComputedStyle(el).visibility;
    if (visibility === 'hidden' || visibility === 'collapse') return false;
    for (let node = el; node; node = node.parentElement) {
      const style = getComputedStyle(node);
      if (style.display === 'none' || style.opacity === '0') return false;
    }
    return true;
  }

  // X 等页面把照片绘制在相邻背景层，透明 IMG 仍提供图片地址和命中区域。
  // 只认同一父容器内地址、边界完全对应的可见图层，隐藏图片仍不能触发按钮。
  function imagePaintLayer(img) {
    const style = getComputedStyle(img);
    if (style.opacity !== '0' || style.display === 'none' ||
        style.visibility === 'hidden' || style.visibility === 'collapse') return null;
    const parent = img.parentElement;
    const src = img.currentSrc || img.src;
    if (!src || !parent || !isRenderedElement(parent)) return null;
    const imageRect = img.getBoundingClientRect();
    for (const layer of parent.children) {
      if (layer === img || !isRenderedElement(layer)) continue;
      const background = getComputedStyle(layer).backgroundImage.match(/^url\((["']?)(.*?)\1\)$/);
      if (!background || background[2] !== src) continue;
      const layerRect = layer.getBoundingClientRect();
      if (['left', 'top', 'right', 'bottom'].every((side) =>
          Math.abs(layerRect[side] - imageRect[side]) <= 1)) return layer;
    }
    return null;
  }

  function isRenderedImage(img) {
    return isRenderedElement(img) || !!imagePaintLayer(img);
  }

  function imageActionContainer(img) {
    const known = img.closest('[data-test-id="pinWrapper"],article[class*="MediaCard_card__"]');
    if (known) return known;
    const imageRect = img.getBoundingClientRect();
    let container = img.parentElement;
    for (let parent = container?.parentElement; parent && parent !== document.body &&
        parent !== document.documentElement; parent = parent.parentElement) {
      const rect = parent.getBoundingClientRect();
      if (rect.width > imageRect.width + 80 || rect.height > imageRect.height + 120) break;
      container = parent;
    }
    return container || img;
  }

  function imageControlRects(img) {
    const container = imageActionContainer(img);
    const controls = container.querySelectorAll(`${PAGE_CONTROL_SELECTOR},[aria-label],[title]`);
    const rects = [];
    for (const control of controls) {
      if (control === img || control.contains(img) || !isRenderedElement(control) || !isPageControl(control, img)) continue;
      const rect = clippedRect(control);
      if (rect.width > 0 && rect.height > 0) rects.push(rect);
    }
    return rects;
  }

  // 找到坐标下第一张足够大的 <img>，但不穿过网页上的可交互控件。
  function findImgAt(x, y) {
    const els = document.elementsFromPoint(x, y);
    const foreground = [];
    for (const el of els) {
      if (el === host) continue;
      if (el.matches?.(PAGE_OBSTRUCTION_SELECTOR)) return null;
      if (el.tagName === 'IMG') {
        const src = el.currentSrc || el.src;
        if (!src) continue;
        const r = el.getBoundingClientRect();
        if (r.width >= MIN_SIZE && r.height >= MIN_SIZE && isRenderedImage(el)) {
          return foreground.some((item) => isImageObstruction(item, el) || isPageControl(item, el)) ? null : el;
        }
      }
      foreground.push(el);
    }
    return null;
  }

  function positionFab(img) {
    const r = clippedRect(img);
    if (!isRenderedImage(img) || r.width < FAB_SIZE + FAB_INSET * 2 || r.height < FAB_SIZE + FAB_INSET * 2) {
      return false;
    }
    const minX = r.left + FAB_INSET;
    const minY = r.top + FAB_INSET;
    const maxX = r.right - FAB_SIZE - FAB_INSET;
    const maxY = r.bottom - FAB_SIZE - FAB_INSET;
    const midX = (minX + maxX) / 2;
    const midY = (minY + maxY) / 2;
    const edges = [
      [maxX, minY], [minX, minY], [maxX, maxY], [minX, maxY],
      [maxX, midY], [minX, midY], [midX, minY], [midX, maxY]
    ];
    const candidates = edges.map(([x, y], index) => ({ x, y, index }));
    if (currentCorner >= 0 && currentCorner < edges.length) {
      candidates.unshift(...candidates.splice(currentCorner, 1));
    } else if (interiorPosition) {
      candidates.unshift({ x: minX + (maxX - minX) * interiorPosition.x,
        y: minY + (maxY - minY) * interiorPosition.y, index: 8 });
    }
    const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
    // 所有边缘被占用时，尝试鼠标首次停留点附近和内部空位；显示后保存相对位置。
    for (const [dx, dy] of [[40, 0], [-70, 0], [0, 40], [0, -70]]) {
      candidates.push({ x: clamp(lastX + dx, minX, maxX), y: clamp(lastY + dy, minY, maxY), index: 8 });
    }
    for (const yRatio of [.5, .25, .75]) {
      for (const xRatio of [.5, .25, .75]) {
        candidates.push({ x: minX + (maxX - minX) * xRatio,
          y: minY + (maxY - minY) * yRatio, index: 8 });
      }
    }
    const controlRects = imageControlRects(img);
    const seen = new Set();
    const previousPointerEvents = btn.style.pointerEvents;
    btn.style.pointerEvents = 'none';
    try {
      const placementStatus = (x, y) => {
        if (controlRects.some((control) => x - CONTROL_GAP < control.right &&
            x + FAB_SIZE + CONTROL_GAP > control.left && y - CONTROL_GAP < control.bottom &&
            y + FAB_SIZE + CONTROL_GAP > control.top)) return 'blocked';
        const xs = [x - CONTROL_GAP, x + FAB_SIZE / 2, x + FAB_SIZE + CONTROL_GAP];
        const ys = [y - CONTROL_GAP, y + FAB_SIZE / 2, y + FAB_SIZE + CONTROL_GAP];
        let result = 'clear';
        for (const sampleX of xs) {
          for (const sampleY of ys) {
            const status = imagePointStatus(sampleX, sampleY, img);
            if (status === 'blocked') return status;
            if (status === 'clipped') result = status;
          }
        }
        return result;
      };
      candidateLoop:
      for (const { x, y, index } of candidates) {
        const key = `${x},${y}`;
        if (seen.has(key)) continue;
        seen.add(key);
        const baseStatus = placementStatus(x, y);
        if (baseStatus === 'blocked') continue;
        const offsets = [];
        if (index < 4 && index === currentCorner && cornerInsetOffset > 0) offsets.push(cornerInsetOffset);
        if (baseStatus === 'clear') offsets.push(0);
        else if (index < 4) offsets.push(2, 4, 8, 12, 16);
        // 仅几何裁切允许角落内移；真实控件或遮罩阻挡时直接改用下一位置。
        for (const offset of new Set(offsets)) {
          const placedX = x + (index % 2 ? offset : -offset);
          const placedY = y + (index < 2 ? offset : -offset);
          if (placedX < minX || placedX > maxX || placedY < minY || placedY > maxY) continue;
          const status = offset === 0 ? baseStatus : placementStatus(placedX, placedY);
          if (status === 'blocked') continue candidateLoop;
          if (status !== 'clear') continue;
          host.style.left = placedX + 'px';
          host.style.top = placedY + 'px';
          currentCorner = index;
          cornerInsetOffset = index < 4 ? offset : 0;
          interiorPosition = index === 8 ? {
            x: maxX === minX ? .5 : (placedX - minX) / (maxX - minX),
            y: maxY === minY ? .5 : (placedY - minY) / (maxY - minY)
          } : null;
          return true;
        }
      }
    } finally {
      btn.style.pointerEvents = previousPointerEvents;
    }
    return false;
  }

  function runtimeIsCurrent() {
    if (!contentRuntime.active) return false;
    if (document.documentElement.getAttribute(OWNER_ATTRIBUTE) === ownerToken) return true;
    cleanupRuntime();
    return false;
  }

  function clearHideTimer() {
    clearTimeout(hideTimer);
    hideTimer = 0;
  }

  function cancelPendingShow() {
    clearTimeout(showTimer);
    showTimer = 0;
    pendingImg = null;
  }

  function resetPosition() {
    currentCorner = -1;
    cornerInsetOffset = 0;
    interiorPosition = null;
  }

  function renderFab(img) {
    if (!runtimeIsCurrent() || !img.isConnected || !magicButtonVisible || regionCaptureBusy) return;
    ensureFab();
    host.style.display = positionFab(img) ? 'block' : 'none';
    clearHideTimer();
  }

  function show(img) {
    if (!runtimeIsCurrent() || !magicButtonVisible || regionCaptureBusy) return;
    clearHideTimer();
    if (currentImg === img) {
      renderFab(img);
      return;
    }
    if (pendingImg === img) return;
    cancelPendingShow();
    currentImg = null;
    pointerOnFab = false;
    if (host) host.style.display = 'none';
    resetPosition();
    pendingImg = img;
    showTimer = setTimeout(() => {
      const target = pendingImg;
      showTimer = 0;
      pendingImg = null;
      if (!runtimeIsCurrent() || !target?.isConnected || !magicButtonVisible || regionCaptureBusy ||
          findImgAt(lastX, lastY) !== target) return;
      currentImg = target;
      renderFab(target);
    }, SHOW_DELAY);
  }

  function hide() {
    clearHideTimer();
    cancelPendingShow();
    currentImg = null;
    pointerOnFab = false;
    resetPosition();
    if (host) host.style.display = 'none';
  }

  function scheduleHide() {
    if (hideTimer) return;
    hideTimer = setTimeout(hide, 300);
  }

  function refreshMagicButton() {
    if (!runtimeIsCurrent()) return;
    if (!magicButtonVisible || regionCaptureBusy) {
      hide();
      return;
    }
    const img = findImgAt(lastX, lastY);
    if (img) show(img);
    else hide();
  }

  // rAF 节流的鼠标追踪；进入按钮后保持当前图片和位置。
  function onMouseMove(e) {
    if (!runtimeIsCurrent()) return;
    lastX = e.clientX;
    lastY = e.clientY;
    if (!rafId) rafId = requestAnimationFrame(tick);
  }

  function tick() {
    rafId = 0;
    if (!runtimeIsCurrent() || regionCaptureBusy) return;
    if (!magicButtonVisible) { hide(); return; }
    if (host) ensureFab();
    const img = findImgAt(lastX, lastY);
    if (pointerOnFab && host?.style.display === 'block') {
      if (img === currentImg && currentImg?.isConnected) clearHideTimer();
      else hide();
      return;
    }
    if (img) show(img);
    else {
      cancelPendingShow();
      if (!currentImg) return;
      const rect = clippedRect(currentImg);
      const insideImage = lastX >= rect.left && lastX < rect.right && lastY >= rect.top && lastY < rect.bottom;
      const foreground = document.elementsFromPoint(lastX, lastY).filter((el) => el !== host);
      const modal = foreground.some((el) => el.closest?.('dialog,[role="dialog"],[aria-modal="true"]'));
      if (modal || (insideImage && foreground.some((el) =>
          isImageObstruction(el, currentImg) && !isPageControl(el, currentImg)))) hide();
      else scheduleHide();
    }
  }

  function onFabClick(e) {
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
    const img = currentImg;
    if (!img) return;
    if (!runtimeIsCurrent() || !img.isConnected || !magicButtonVisible || regionCaptureBusy) return;
    if (findImgAt(lastX, lastY) !== img) { hide(); return; }
    const src = img.currentSrc || img.src;
    const payload = { src, previewUrl: src, pageUrl: location.href, pageTitle: document.title };
    // 第一时间通知后台打开侧边栏，不能在此之前执行 Canvas 或任何 await。
    // 后台打开侧边栏后会先尝试读取原始图片元数据；原图不可访问时再请求页面已解码像素。
    try {
      chrome.runtime.sendMessage({ type: 'ir.openPanel', payload }, () => {
        // 读取 lastError 以避免未捕获警告；SW 不可达时静默（用户可从右键菜单重试）
        void chrome.runtime.lastError;
      });
    } catch { /* 扩展上下文失效（如扩展刚更新），忽略 */ }
  }

  async function captureLoadedImg(img, maxDim = 2048) {
    if (img.decode) {
      try { await img.decode(); } catch { /* ignore */ }
    }
    const width = img.naturalWidth || img.width;
    const height = img.naturalHeight || img.height;
    if (!width || !height) throw new Error('图片尚未完成解码');
    const scale = Math.min(1, maxDim / Math.max(width, height));
    const canvas = document.createElement('canvas');
    canvas.width = Math.max(1, Math.round(width * scale));
    canvas.height = Math.max(1, Math.round(height * scale));
    canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);
    return {
      dataUrl: canvas.toDataURL('image/webp', 0.9),
      width,
      height
    };
  }

  function showPageNotice(text, error = false) {
    const notice = document.createElement('div');
    notice.style.cssText =
      'position:fixed;z-index:2147483647;left:50%;top:24px;transform:translateX(-50%);' +
      'box-sizing:border-box;width:max-content;max-width:min(420px,calc(100vw - 24px));padding:10px 14px;border-radius:10px;' +
      `background:${error ? '#b83232' : '#292437'};color:#fff;font:13px/1.5 -apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;` +
      'box-shadow:0 8px 28px rgba(0,0,0,.28);overflow-wrap:anywhere;text-align:center;pointer-events:none;';
    notice.textContent = text;
    (document.documentElement || document.body).appendChild(notice);
    setTimeout(() => notice.remove(), 2600);
  }

  function startRegionCapture() {
    regionCaptureCleanup?.();
    const captureGeneration = ++regionCaptureGeneration;
    regionCaptureBusy = true;
    hide();

    const captureHost = document.createElement('div');
    captureHost.id = 'ir-region-capture-host';
    captureHost.style.cssText = 'position:fixed;inset:0;z-index:2147483647;pointer-events:auto;';
    const shadow = captureHost.attachShadow({ mode: 'closed' });
    const style = document.createElement('style');
    style.textContent = `
      :host { all: initial; }
      .overlay { position: fixed; inset: 0; cursor: crosshair; user-select: none; touch-action: none; background: rgba(18, 16, 28, .38); }
      .tip { position: fixed; top: 22px; left: 50%; transform: translateX(-50%); padding: 9px 14px; border-radius: 999px; color: #fff; background: rgba(35, 30, 51, .92); box-shadow: 0 7px 24px rgba(0,0,0,.25); font: 600 13px/1.4 -apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif; white-space: nowrap; pointer-events: none; }
      .selection { position: fixed; display: none; box-sizing: border-box; border: 2px solid #a78bfa; border-radius: 4px; background: transparent; box-shadow: 0 0 0 9999px rgba(18, 16, 28, .52), 0 0 0 1px rgba(255,255,255,.85) inset; }
      .size { position: absolute; left: 0; bottom: -28px; padding: 4px 7px; border-radius: 6px; color: #fff; background: rgba(35, 30, 51, .92); font: 11px/1.35 ui-monospace,SFMono-Regular,Menlo,monospace; white-space: nowrap; }
    `;
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    overlay.tabIndex = -1;
    overlay.innerHTML = `<div class="tip">${uiText('capture')}</div><div class="selection"><span class="size"></span></div>`;
    shadow.append(style, overlay);
    (document.documentElement || document.body).appendChild(captureHost);
    regionCaptureHost = captureHost;

    const selection = overlay.querySelector('.selection');
    const size = overlay.querySelector('.size');
    let startX = 0;
    let startY = 0;
    let selecting = false;

    const finishCapture = () => {
      if (captureGeneration !== regionCaptureGeneration) return;
      regionCaptureBusy = false;
      refreshMagicButton();
    };
    const captureIsCurrent = () => runtimeIsCurrent() && captureGeneration === regionCaptureGeneration;
    const cleanup = (resumeMagic = true) => {
      window.removeEventListener('keydown', onKeyDown, true);
      captureHost.remove();
      if (regionCaptureHost === captureHost) regionCaptureHost = null;
      if (regionCaptureCleanup === cleanup) regionCaptureCleanup = null;
      if (resumeMagic) finishCapture();
    };
    const onKeyDown = (event) => {
      if (!captureIsCurrent()) return;
      if (event.key !== 'Escape') return;
      event.preventDefault();
      event.stopPropagation();
      cleanup();
      showPageNotice(uiText('cancelled'));
      void chrome.runtime.sendMessage({ type: 'ir.regionCaptureCancelled' }).catch(() => {});
    };
    const selectionRect = (x, y) => ({
      x: Math.min(startX, x),
      y: Math.min(startY, y),
      width: Math.abs(x - startX),
      height: Math.abs(y - startY)
    });
    const renderSelection = (rect) => {
      selection.style.display = 'block';
      selection.style.left = `${rect.x}px`;
      selection.style.top = `${rect.y}px`;
      selection.style.width = `${rect.width}px`;
      selection.style.height = `${rect.height}px`;
      size.textContent = `${Math.round(rect.width)} × ${Math.round(rect.height)}`;
    };

    overlay.addEventListener('pointerdown', (event) => {
      if (event.button !== 0) return;
      event.preventDefault();
      event.stopPropagation();
      selecting = true;
      startX = event.clientX;
      startY = event.clientY;
      overlay.setPointerCapture?.(event.pointerId);
      renderSelection({ x: startX, y: startY, width: 0, height: 0 });
    }, true);
    overlay.addEventListener('pointermove', (event) => {
      if (!selecting) return;
      event.preventDefault();
      renderSelection(selectionRect(event.clientX, event.clientY));
    }, true);
    overlay.addEventListener('pointerup', (event) => {
      if (!selecting) return;
      event.preventDefault();
      event.stopPropagation();
      selecting = false;
      const rect = selectionRect(event.clientX, event.clientY);
      if (rect.width < 20 || rect.height < 20) {
        selection.style.display = 'none';
        overlay.querySelector('.tip').textContent = uiText('small');
        return;
      }
      cleanup(false);
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      requestAnimationFrame(() => requestAnimationFrame(() => {
        if (!captureIsCurrent()) return;
        chrome.runtime.sendMessage({
          type: 'ir.captureRegion',
          payload: { rect, viewportWidth, viewportHeight }
        }, (response) => {
          const message = chrome.runtime.lastError?.message;
          if (!captureIsCurrent()) return;
          if (message || !response?.ok || !response.dataUrl) {
            finishCapture();
            showPageNotice(uiFormat('captureFailed', {
              error: localizeCaptureError(message || response?.error || uiText('noScreenshot'))
            }), true);
            return;
          }
          void cropRegionScreenshot(response.dataUrl, rect, viewportWidth, viewportHeight)
            .then((cropped) => {
              if (!captureIsCurrent()) return;
              return chrome.runtime.sendMessage({
                type: 'ir.submitRegionCapture',
                payload: cropped
              }, (submitResponse) => {
                const submitError = chrome.runtime.lastError?.message;
                if (!captureIsCurrent()) return;
                finishCapture();
                if (submitError || !submitResponse?.ok) {
                  showPageNotice(uiFormat('saveFailed', {
                    error: localizeCaptureError(submitError || submitResponse?.error || uiText('unknown'))
                  }), true);
                } else {
                  showPageNotice(uiFormat('captured', {
                    width: submitResponse.width,
                    height: submitResponse.height
                  }));
                }
              });
            })
            .catch((error) => {
              if (!captureIsCurrent()) return;
              finishCapture();
              showPageNotice(uiFormat('cropFailed', { error: localizeCaptureError(error) }), true);
            });
        });
      }));
    }, true);
    overlay.addEventListener('contextmenu', (event) => event.preventDefault(), true);
    overlay.addEventListener('wheel', (event) => event.preventDefault(), { passive: false });
    window.addEventListener('keydown', onKeyDown, true);
    regionCaptureCleanup = cleanup;
    queueMicrotask(() => overlay.focus({ preventScroll: true }));
  }

  function cropRegionScreenshot(dataUrl, rect, viewportWidth, viewportHeight, maxDim = 2048) {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = () => {
        try {
          const scaleX = image.naturalWidth / viewportWidth;
          const scaleY = image.naturalHeight / viewportHeight;
          const sx = Math.max(0, Math.min(image.naturalWidth - 1, Math.round(rect.x * scaleX)));
          const sy = Math.max(0, Math.min(image.naturalHeight - 1, Math.round(rect.y * scaleY)));
          const sw = Math.max(1, Math.min(image.naturalWidth - sx, Math.round(rect.width * scaleX)));
          const sh = Math.max(1, Math.min(image.naturalHeight - sy, Math.round(rect.height * scaleY)));
          const outputScale = Math.min(1, maxDim / Math.max(sw, sh));
          const outputWidth = Math.max(1, Math.round(sw * outputScale));
          const outputHeight = Math.max(1, Math.round(sh * outputScale));
          const canvas = document.createElement('canvas');
          canvas.width = outputWidth;
          canvas.height = outputHeight;
          canvas.getContext('2d').drawImage(image, sx, sy, sw, sh, 0, 0, outputWidth, outputHeight);
          resolve({
            dataUrl: canvas.toDataURL('image/webp', 0.92),
            width: sw,
            height: sh,
            mime: 'image/webp'
          });
        } catch (error) {
          reject(error);
        }
      };
      image.onerror = () => reject(new Error('无法读取当前页面截图'));
      image.src = dataUrl;
    });
  }

  // 右键菜单发生在后台；尽量回到页面上下文复用已经解码的图片。
  function onRuntimeMessage(msg, _sender, sendResponse) {
    if (!runtimeIsCurrent()) return false;
    if (msg?.type === 'ir.startRegionCapture') {
      startRegionCapture();
      sendResponse({ ok: true });
      return;
    }
    if (msg?.type === 'ir.cancelRegionCapture') {
      const cancelled = regionCaptureBusy || Boolean(regionCaptureCleanup);
      if (cancelled) {
        // 松开鼠标后选择层已移除，截图或裁切仍可能在等待异步回调。
        // 取消整个捕获代次，避免迟到的回调继续提交已经取消的截图。
        regionCaptureGeneration += 1;
        regionCaptureCleanup?.(false);
        regionCaptureBusy = false;
        refreshMagicButton();
        showPageNotice(uiText('cancelled'));
      }
      sendResponse({ ok: true, cancelled });
      return;
    }
    if (msg?.type === 'ir.magicVisibility') {
      magicButtonVisible = msg.visible !== false;
      refreshMagicButton();
      sendResponse({ ok: true, visible: magicButtonVisible });
      return;
    }
    if (msg?.type === 'ir.languageChanged') {
      uiLanguage = ['zh', 'en', 'ja', 'ko'].includes(msg.language) ? msg.language : 'en';
      if (btn) btn.title = uiText('magic');
      sendResponse({ ok: true, language: uiLanguage });
      return;
    }
    if (msg?.type !== 'ir.captureImage' || !msg.src) return;
    const img = [...document.images].find((el) => (el.currentSrc || el.src) === msg.src);
    if (!img) {
      sendResponse({ ok: false, error: '页面中未找到目标图片' });
      return;
    }
    captureLoadedImg(img)
      .then((captured) => sendResponse({ ok: true, ...captured }))
      .catch((e) => sendResponse({ ok: false, error: e?.message || String(e) }));
    return true;
  }

  chrome.runtime.onMessage.addListener(onRuntimeMessage);

  // 滚动 / 缩放时重新定位，图片滚出视口则隐藏
  function onScrollOrResize() {
    if (!runtimeIsCurrent() || regionCaptureBusy) return;
    if (!currentImg || !host) {
      cancelPendingShow();
      refreshMagicButton();
      return;
    }
    if (!document.contains(currentImg)) { hide(); return; }
    const r = clippedRect(currentImg);
    if (r.width <= 0 || r.height <= 0) {
      hide();
      return;
    }
    ensureFab();
    host.style.display = positionFab(currentImg) ? 'block' : 'none';
  }

  document.addEventListener('mousemove', onMouseMove, { passive: true, capture: true });
  window.addEventListener('scroll', onScrollOrResize, { passive: true, capture: true });
  window.addEventListener('resize', onScrollOrResize, { passive: true });

  function cleanupRuntime() {
    contentRuntime.active = false;
    clearHideTimer();
    cancelPendingShow();
    if (rafId) cancelAnimationFrame(rafId);
    document.removeEventListener('mousemove', onMouseMove, true);
    window.removeEventListener('scroll', onScrollOrResize, true);
    window.removeEventListener('resize', onScrollOrResize);
    window.removeEventListener('pagehide', onPageHide);
    window.removeEventListener('pageshow', onPageShow);
    regionCaptureCleanup?.();
    try { chrome.runtime.onMessage.removeListener(onRuntimeMessage); } catch { /* 扩展更新期间忽略 */ }
    host?.remove();
    host = null;
    btn = null;
    currentImg = null;
    pointerOnFab = false;
    if (document.documentElement.getAttribute(OWNER_ATTRIBUTE) === ownerToken) {
      document.documentElement.removeAttribute(OWNER_ATTRIBUTE);
    }
    if (globalThis.__paiTongKuanContentReady === contentRuntime) {
      delete globalThis.__paiTongKuanContentReady;
    }
  }

  contentRuntime.cleanup = cleanupRuntime;
  function onPageHide(event) {
    // 返回缓存会恢复同一内容脚本；保留监听，避免返回网页后按钮永久失效。
    if (event.persisted) {
      hide();
      regionCaptureCleanup?.(false);
      regionCaptureGeneration += 1;
      regionCaptureBusy = false;
      return;
    }
    cleanupRuntime();
  }
  function onPageShow(event) {
    if (event.persisted) loadUiPrefs();
  }
  window.addEventListener('pagehide', onPageHide);
  window.addEventListener('pageshow', onPageShow);

  function loadUiPrefs() {
    try {
      chrome.runtime.sendMessage({ type: 'ir.getUiPrefs' }, (resp) => {
        void chrome.runtime.lastError;
        if (!runtimeIsCurrent()) return;
        magicButtonVisible = resp?.visible !== false;
        uiLanguage = ['zh', 'en', 'ja', 'ko'].includes(resp?.language) ? resp.language : 'en';
        if (btn) {
          btn.title = uiText('magic');
          btn.setAttribute('aria-label', uiText('magic'));
        }
        refreshMagicButton();
      });
    } catch { /* 扩展更新期间忽略 */ }
  }
  loadUiPrefs();
})();
