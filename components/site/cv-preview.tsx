"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, FileText } from "@/components/icons";
import { cvDownloadUrl, cvEmbedUrl } from "@/lib/cv";

export type CvLabels = {
  button: string;
  title: string;
  open: string;
  download: string;
  close: string;
  fallback: string;
};

/**
 * A "CV" button for the nav and the dialog it opens: the PDF in a frame, with links to open it in its
 * own tab or save it. The frame is only mounted while the dialog is open, so the PDF is not fetched
 * for visitors who never ask for it.
 */
export function CvPreview({ url, labels }: { url: string; labels: CvLabels }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const el = dialog.current;
    if (!el) return;
    if (open && !el.open) el.showModal();
    if (!open && el.open) el.close();
  }, [open]);

  const external = /^https?:\/\//i.test(url);
  const download = cvDownloadUrl(url);

  return (
    <>
      <button type="button" className="nav-cv" onClick={() => setOpen(true)} aria-haspopup="dialog">
        <FileText />
        {labels.button}
      </button>

      <dialog
        ref={dialog}
        className="cv-dialog"
        aria-labelledby="cv-dialog-title"
        onClose={() => setOpen(false)}
        // A click on the dimmed area outside the panel closes it.
        onClick={(e) => {
          if (e.target === e.currentTarget) setOpen(false);
        }}
      >
        <div className="cv-panel">
          <header className="cv-head">
            <h2 id="cv-dialog-title" className="h3">
              {labels.title}
            </h2>
            <div className="cv-actions">
              <a href={url} className="btn btn-soft btn-sm" target="_blank" rel="noopener noreferrer">
                {labels.open}
                <ArrowUpRight />
              </a>
              <a href={download} className="btn btn-ink btn-sm" {...(external ? { target: "_blank", rel: "noopener noreferrer" } : { download: "" })}>
                {labels.download}
              </a>
              <button type="button" className="btn btn-light btn-sm" onClick={() => setOpen(false)}>
                {labels.close}
              </button>
            </div>
          </header>
          {open && <iframe src={cvEmbedUrl(url)} title={labels.title} className="cv-frame" />}
          <p className="small muted cv-note">{labels.fallback}</p>
        </div>
      </dialog>
    </>
  );
}
