export type VideoEmbed = { src: string; openUrl: string; provider: "drive" | "youtube" };

const DRIVE_ID = /^[A-Za-z0-9_-]{10,}$/;
const YT_ID = /^[A-Za-z0-9_-]{11}$/;

/**
 * Turns a pasted Google Drive or YouTube link into a safe embed URL.
 * Anything that is not https on a known host returns null, so we never
 * put an arbitrary address inside an iframe.
 */
export function toEmbed(raw: string | null | undefined): VideoEmbed | null {
  if (!raw) return null;
  let url: URL;
  try {
    url = new URL(raw.trim());
  } catch {
    return null;
  }
  if (url.protocol !== "https:") return null;
  const host = url.hostname.toLowerCase().replace(/^www\./, "");

  if (host === "drive.google.com") {
    const m = url.pathname.match(/^\/file\/d\/([^/]+)/);
    const id = m?.[1] ?? url.searchParams.get("id");
    if (!id || !DRIVE_ID.test(id)) return null;
    return {
      provider: "drive",
      src: `https://drive.google.com/file/d/${id}/preview`,
      openUrl: `https://drive.google.com/file/d/${id}/view`,
    };
  }

  let ytId: string | null = null;
  if (host === "youtu.be") {
    ytId = url.pathname.split("/")[1] ?? null;
  } else if (host === "youtube.com" || host === "m.youtube.com") {
    if (url.pathname === "/watch") {
      ytId = url.searchParams.get("v");
    } else {
      const m = url.pathname.match(/^\/(?:embed|shorts|live)\/([^/]+)/);
      ytId = m?.[1] ?? null;
    }
  }
  if (ytId && YT_ID.test(ytId)) {
    return {
      provider: "youtube",
      src: `https://www.youtube-nocookie.com/embed/${ytId}`,
      openUrl: `https://www.youtube.com/watch?v=${ytId}`,
    };
  }

  return null;
}
