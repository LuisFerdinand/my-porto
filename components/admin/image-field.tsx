"use client";

import { useId, useRef, useState } from "react";

type Folder = "portfolio/hero" | "portfolio/about" | "portfolio/projects";

const MAX_BYTES = 10 * 1024 * 1024;

/**
 * Uploads straight from the browser to Cloudinary using a one-off signature from
 * /api/admin/upload-signature, then submits the resulting URL + public id with the form
 * as `${name}Url` and `${name}PublicId`.
 */
export function ImageField({
  name,
  label,
  folder,
  initialUrl,
  initialPublicId,
  hint,
  aspect = "4 / 5",
}: {
  name: string;
  label: string;
  folder: Folder;
  initialUrl: string | null;
  initialPublicId: string | null;
  hint?: string;
  aspect?: string;
}) {
  const inputId = useId();
  const fileRef = useRef<HTMLInputElement>(null);
  const [url, setUrl] = useState(initialUrl ?? "");
  const [publicId, setPublicId] = useState(initialPublicId ?? "");
  const [status, setStatus] = useState<{ kind: "idle" | "uploading" | "error" | "done"; message?: string }>({
    kind: "idle",
  });

  async function onFile(file: File | undefined) {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setStatus({ kind: "error", message: "Choose an image file (JPG, PNG, WebP or AVIF)." });
      return;
    }
    if (file.size > MAX_BYTES) {
      setStatus({ kind: "error", message: "That image is over 10 MB. Export a smaller one." });
      return;
    }

    setStatus({ kind: "uploading", message: "Uploading…" });
    try {
      const sigRes = await fetch("/api/admin/upload-signature", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ folder }),
      });
      const sig = await sigRes.json().catch(() => ({}));
      if (!sigRes.ok) throw new Error(sig.error ?? "Couldn’t start the upload.");

      const body = new FormData();
      body.set("file", file);
      body.set("api_key", sig.apiKey);
      body.set("timestamp", String(sig.timestamp));
      body.set("signature", sig.signature);
      body.set("folder", sig.folder);

      const res = await fetch(`https://api.cloudinary.com/v1_1/${sig.cloudName}/image/upload`, {
        method: "POST",
        body,
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json?.error?.message ?? "Cloudinary rejected the upload.");

      setUrl(json.secure_url);
      setPublicId(json.public_id);
      setStatus({ kind: "done", message: "Uploaded. Save to publish it." });
    } catch (err) {
      setStatus({ kind: "error", message: err instanceof Error ? err.message : "Upload failed." });
    } finally {
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  return (
    <div>
      <p className="field-label">{label}</p>
      <div
        className="relative grid place-items-center overflow-hidden border border-dashed border-ink/30 bg-card"
        style={{ aspectRatio: aspect }}
      >
        {url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={url} alt="" className="absolute inset-0 h-full w-full object-cover" />
        ) : (
          <p className="px-6 text-center font-semibold muted">No image yet</p>
        )}
      </div>

      <input type="hidden" name={`${name}Url`} value={url} />
      <input type="hidden" name={`${name}PublicId`} value={publicId} />

      <div className="mt-3 flex flex-wrap gap-2">
        <label htmlFor={inputId} className="btn btn-solid btn-sm cursor-pointer">
          {status.kind === "uploading" ? "Uploading…" : url ? "Replace image" : "Upload image"}
        </label>
        <input
          ref={fileRef}
          id={inputId}
          type="file"
          accept="image/*"
          className="sr-only"
          disabled={status.kind === "uploading"}
          onChange={(e) => onFile(e.target.files?.[0])}
        />
        {url && (
          <button
            type="button"
            className="btn btn-quiet btn-sm"
            onClick={() => {
              setUrl("");
              setPublicId("");
              setStatus({ kind: "idle" });
            }}
          >
            Remove
          </button>
        )}
      </div>

      <p className="help" role="status" aria-live="polite">
        {status.message ?? hint ?? "JPG, PNG, WebP or AVIF, up to 10 MB."}
      </p>
      {status.kind === "error" && <p className="sr-only">Upload failed</p>}

      <details className="mt-3">
        <summary className="cursor-pointer text-sm font-semibold muted">Use an image link instead</summary>
        <input
          // Not type="url": images shipped with the site are local paths such as /projects/x.jpg. The browser
          // rejects those as "not a URL" and silently blocks the whole form from saving; the server checks the value.
          type="text"
          inputMode="url"
          className="field mt-2"
          placeholder="https://…"
          value={url}
          aria-label={`${label} URL`}
          onChange={(e) => {
            setUrl(e.target.value);
            setPublicId("");
          }}
        />
      </details>
    </div>
  );
}
