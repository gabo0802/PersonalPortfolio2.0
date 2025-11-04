// Util functions to determine whether a string is a video or image link.
export const isVideo = (url: string) =>
  /\.(mp4|webm|ogg|mov)(\?.*)?$/i.test(url);

export const isImage = (url: string) =>
  /\.(png|jpe?g|gif|svg|webp|avif)(\?.*)?$/i.test(url);
