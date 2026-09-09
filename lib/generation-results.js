export function generatedImages(response, limit = Infinity) {
  const images = Array.isArray(response?.images) && response.images.length
    ? response.images
    : [response];
  const max = Number.isFinite(limit) ? Math.max(0, Math.floor(limit)) : images.length;
  return images.slice(0, max).map((image) => ({ ...response, ...image, images: undefined }));
}
