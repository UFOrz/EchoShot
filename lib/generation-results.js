export function generatedImages(response, limit = Infinity) {
  const images = Array.isArray(response?.images) && response.images.length
    ? response.images
    : [response];
  const max = Number.isFinite(limit) ? Math.max(0, Math.floor(limit)) : images.length;
  return images.slice(0, max).map((image) => ({ ...response, ...image, images: undefined }));
}

const COMMON_IMAGE_RATIOS = ['1:1', '4:3', '3:4', '3:2', '2:3', '16:9', '9:16', '4:5', '5:4', '21:9'];

export function pixelAspectRatio(width, height) {
  const w = Number(width), h = Number(height);
  if (!Number.isSafeInteger(w) || !Number.isSafeInteger(h) || w <= 0 || h <= 0) return '';
  const value = w / h;
  let nearest = '', difference = Infinity;
  for (const ratio of COMMON_IMAGE_RATIOS) {
    const [rw, rh] = ratio.split(':').map(Number);
    const error = Math.abs(value / (rw / rh) - 1);
    if (error < difference) { nearest = ratio; difference = error; }
  }
  // 模型可能对尺寸取整；接近常见比例时展示可读比例，而非很长的整数比。
  if (difference <= .01) return nearest;
  let a = w, b = h;
  while (b) [a, b] = [b, a % b];
  return `${w / a}:${h / a}`;
}

export function imageAspectInfo(record) {
  const requested = String(record?.ratio || '').trim();
  const actual = pixelAspectRatio(record?.width, record?.height);
  const match = requested.match(/^(\d+(?:\.\d+)?):(\d+(?:\.\d+)?)$/);
  const validRequest = match && Number(match[1]) > 0 && Number(match[2]) > 0;
  const mismatch = !!(actual && validRequest && Math.abs(
    (Number(record.width) / Number(record.height)) / (Number(match[1]) / Number(match[2])) - 1
  ) > .02);
  // ratio 保留用户的生成选择，不能让一次错误返回改变“重新生成”的比例。
  return { requested, actual, mismatch };
}
