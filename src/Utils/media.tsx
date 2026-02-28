// Util functions to determine whether a string is a video or image link.
export const isVideo = (url: string) =>
  /\.(mp4|webm|ogg|mov)(\?.*)?$/i.test(url);

export const isImage = (url: string) =>
  /\.(png|jpe?g|gif|svg|webp|avif)(\?.*)?$/i.test(url);

export const isYouTubeUrl = (url: string) =>
  /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\//i.test(url);

export const toYouTubeEmbedUrl = (url: string) => {
  // Handles:
  // - https://www.youtube.com/watch?v=VIDEO_ID
  // - https://youtu.be/VIDEO_ID
  // - https://www.youtube.com/embed/VIDEO_ID
  try {
    const u = new URL(url);

    // youtu.be/<id>
    if (u.hostname.includes("youtu.be")) {
      const id = u.pathname.replace("/", "");
      return `https://www.youtube.com/embed/${id}`;
    }

    // youtube.com/watch?v=<id>
    if (u.hostname.includes("youtube.com")) {
      if (u.pathname.startsWith("/embed/")) return url; // already embed
      const id = u.searchParams.get("v");
      if (id) return `https://www.youtube.com/embed/${id}`;
    }
  } catch {
    // ignore invalid URLs
  }
  return url; // fallback (won't crash)
};
