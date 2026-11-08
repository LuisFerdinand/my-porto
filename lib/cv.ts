import type { SiteSettings } from "./types";

/** The CV that ships with the site (public/cv). The "CV link" in /admin/contact replaces it when filled in. */
export const DEFAULT_CV = "/cv/CV-Luis-Ferdinand.pdf";

export function cvUrl(site: Pick<SiteSettings, "resumeUrl">): string {
  return site.resumeUrl.trim() || DEFAULT_CV;
}

const DRIVE_FILE = /^https:\/\/drive\.google\.com\/file\/d\/([\w-]+)/i;
const DRIVE_OPEN = /^https:\/\/drive\.google\.com\/(?:open|uc)\?(?:.*&)?id=([\w-]+)/i;

function driveId(url: string): string | null {
  return (DRIVE_FILE.exec(url) ?? DRIVE_OPEN.exec(url))?.[1] ?? null;
}

/** The address to put in the preview frame. A Google Drive share link is turned into its embeddable /preview form. */
export function cvEmbedUrl(url: string): string {
  const drive = driveId(url);
  if (drive) return `https://drive.google.com/file/d/${drive}/preview`;
  // Chrome and Firefox open their PDF viewer fitted to the width of the frame.
  return /\.pdf($|\?)/i.test(url) && !url.includes("#") ? `${url}#view=FitH` : url;
}

/** A link that saves the file instead of opening it, where the host allows that. */
export function cvDownloadUrl(url: string): string {
  const drive = driveId(url);
  return drive ? `https://drive.google.com/uc?export=download&id=${drive}` : url;
}
