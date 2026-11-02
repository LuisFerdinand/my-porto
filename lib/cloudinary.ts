import "server-only";

export type CloudinaryConfig = { cloudName: string; apiKey: string; apiSecret: string };

/** Accepts CLOUDINARY_URL (cloudinary://KEY:SECRET@CLOUD) or the three separate variables. */
export function getCloudinaryConfig(): CloudinaryConfig | null {
  const url = process.env.CLOUDINARY_URL;
  if (url) {
    try {
      const u = new URL(url);
      if (u.protocol === "cloudinary:" && u.hostname && u.username && u.password) {
        return {
          cloudName: u.hostname,
          apiKey: decodeURIComponent(u.username),
          apiSecret: decodeURIComponent(u.password),
        };
      }
    } catch {
      // fall through to the separate variables
    }
  }
  const { CLOUDINARY_CLOUD_NAME: cloudName, CLOUDINARY_API_KEY: apiKey, CLOUDINARY_API_SECRET: apiSecret } =
    process.env;
  return cloudName && apiKey && apiSecret ? { cloudName, apiKey, apiSecret } : null;
}

export const UPLOAD_FOLDERS = ["portfolio/hero", "portfolio/about", "portfolio/projects"] as const;
