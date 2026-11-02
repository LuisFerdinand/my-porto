import Link from "next/link";
import { notFound } from "next/navigation";
import { deleteTimeline } from "@/app/admin/actions";
import { PageHeader } from "@/components/admin/admin-ui";
import { ConfirmButton } from "@/components/admin/confirm-button";
import { TimelineForm } from "@/components/admin/timeline-form";
import { getAdminTimelineEntry } from "@/lib/admin-data";

export default async function EditTimelinePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const numericId = Number(id);
  const entry = Number.isInteger(numericId) ? await getAdminTimelineEntry(numericId) : null;
  if (!entry) notFound();

  return (
    <>
      <PageHeader
        title={entry.title}
        intro={entry.published ? "Visible on the About page." : "Hidden from visitors."}
        actions={
          <Link href="/admin/timeline" className="btn btn-quiet btn-sm">
            Back to timeline
          </Link>
        }
      />
      <TimelineForm entry={entry} />

      <form action={deleteTimeline} className="panel mt-6 flex flex-wrap items-center justify-between gap-4">
        <input type="hidden" name="id" value={entry.id} />
        <div>
          <h2 className="text-lg font-extrabold tracking-tight">Delete this entry</h2>
          <p className="muted">This removes it from the timeline for good.</p>
        </div>
        <ConfirmButton message={`Delete “${entry.title}”? This can’t be undone.`} className="btn btn-quiet btn-sm text-red-800">
          Delete entry
        </ConfirmButton>
      </form>
    </>
  );
}
