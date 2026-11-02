import Link from "next/link";
import { PageHeader } from "@/components/admin/admin-ui";
import { getAdminTimeline } from "@/lib/admin-data";
import { formatPeriod } from "@/lib/timeline";

export default async function TimelineAdminPage() {
  const entries = await getAdminTimeline();

  return (
    <>
      <PageHeader
        title="Timeline"
        intro="The career timeline on the About page, newest first. Dates are shown as months and years."
        viewHref="/about#timeline"
        actions={
          <Link href="/admin/timeline/new" className="btn btn-solid btn-sm">
            New entry
          </Link>
        }
      />
      <ul className="grid gap-3">
        {entries.map((e) => (
          <li key={e.id}>
            <Link
              href={`/admin/timeline/${e.id}`}
              className="panel card-hover grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 gap-y-1 !py-4"
            >
              <span className="truncate text-lg font-extrabold tracking-tight">{e.title}</span>
              <span className={`chip ${e.published ? "" : "opacity-60"}`}>{e.published ? e.kind : "Hidden"}</span>
              <span className="small muted truncate font-bold">{[formatPeriod(e, "en", "Present"), e.org].filter(Boolean).join(" · ")}</span>
              {e.isCurrent && <span className="small font-bold">Current</span>}
            </Link>
          </li>
        ))}
        {entries.length === 0 && <li className="panel muted">No entries yet. Add your first one.</li>}
      </ul>
    </>
  );
}
