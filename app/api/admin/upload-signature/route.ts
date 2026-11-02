import { v2 as cloudinary } from "cloudinary";
import { UPLOAD_FOLDERS, getCloudinaryConfig } from "@/lib/cloudinary";
import { isAdmin } from "@/lib/session";

// Hands the admin browser a short-lived signature so the image goes straight to Cloudinary.
// The API secret never leaves the server, and the upload never passes through this app.
export async function POST(request: Request) {
  if (!(await isAdmin())) {
    return Response.json({ error: "Not signed in" }, { status: 401 });
  }

  const config = getCloudinaryConfig();
  if (!config) {
    return Response.json(
      { error: "Cloudinary isn’t configured. Add CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET to .env.local and restart." },
      { status: 503 },
    );
  }

  const body = (await request.json().catch(() => null)) as { folder?: string } | null;
  const folder = UPLOAD_FOLDERS.find((f) => f === body?.folder);
  if (!folder) {
    return Response.json({ error: "Unknown upload folder" }, { status: 400 });
  }

  const timestamp = Math.round(Date.now() / 1000);
  const signature = cloudinary.utils.api_sign_request({ folder, timestamp }, config.apiSecret);

  return Response.json({
    cloudName: config.cloudName,
    apiKey: config.apiKey,
    timestamp,
    folder,
    signature,
  });
}
