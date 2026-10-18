// One cancellation/deadline context follows a complete image pipeline.
const IMAGE_REQUEST_CONTEXT = Symbol('imageRequestContext');

export function throwIfAborted(signal) {
  if (signal?.aborted) throw signal.reason || new DOMException('任务已停止', 'AbortError');
}

export function createRequestControl(signal, timeoutMs, timeoutError) {
  const controller = new AbortController();
  const abort = () => controller.abort(signal.reason || new DOMException('任务已停止', 'AbortError'));
  if (signal?.aborted) abort();
  else signal?.addEventListener('abort', abort, { once: true });
  const timer = Number.isFinite(timeoutMs) && timeoutMs > 0
    ? setTimeout(() => controller.abort(timeoutError || new DOMException('请求超时', 'TimeoutError')), timeoutMs)
    : null;
  return {
    signal: controller.signal,
    abort(reason) { controller.abort(reason); },
    dispose() {
      if (timer != null) clearTimeout(timer);
      signal?.removeEventListener('abort', abort);
    }
  };
}

export async function awaitWithSignal(promise, signal) {
  throwIfAborted(signal);
  if (!signal) return promise;
  let abort;
  try {
    return await Promise.race([
      promise,
      new Promise((_, reject) => {
        abort = () => reject(signal.reason || new DOMException('任务已停止', 'AbortError'));
        signal.addEventListener('abort', abort, { once: true });
        if (signal.aborted) abort();
      })
    ]);
  } finally {
    signal.removeEventListener('abort', abort);
  }
}

export function requestWait(ms, signal, wait) {
  throwIfAborted(signal);
  if (wait) return awaitWithSignal(Promise.resolve().then(() => wait(ms)), signal);
  return new Promise((resolve, reject) => {
    const abort = () => {
      clearTimeout(timer);
      signal?.removeEventListener('abort', abort);
      reject(signal.reason || new DOMException('任务已停止', 'AbortError'));
    };
    const timer = setTimeout(() => {
      signal?.removeEventListener('abort', abort);
      resolve();
    }, ms);
    signal?.addEventListener('abort', abort, { once: true });
    if (signal?.aborted) abort();
  });
}

export async function withImageRequest(cfg, operation, defaultTimeoutMs = 600000) {
  if (cfg?.[IMAGE_REQUEST_CONTEXT]) {
    throwIfAborted(cfg.signal);
    return operation(cfg);
  }
  const configuredTimeout = Number(cfg?.timeoutMs);
  const timeoutMs = configuredTimeout > 0 && Number.isFinite(configuredTimeout) ? configuredTimeout : defaultTimeoutMs;
  const timeoutError = new Error(`生图任务等待超过 ${Math.round(timeoutMs / 60000 * 10) / 10} 分钟，请稍后到平台查看任务状态`);
  timeoutError.code = 'IMAGE_TASK_TIMEOUT';
  const control = createRequestControl(cfg?.signal, timeoutMs, timeoutError);
  const requestCfg = { ...cfg, signal: control.signal, [IMAGE_REQUEST_CONTEXT]: true };
  try {
    throwIfAborted(control.signal);
    return await awaitWithSignal(Promise.resolve().then(() => operation(requestCfg)), control.signal);
  } catch (error) {
    // Stop sibling uploads if a parallel upload or another pipeline stage fails.
    control.abort(error);
    throw error;
  } finally {
    control.dispose();
  }
}
