import Link from "next/link";
import { PageHeader } from "@/components/admin/admin-ui";
import { TimelineForm } from "@/components/admin/timeline-form";
import { requireAdmin } from "@/lib/session";

export default async function NewTimelinePage() {
  await requireAdmin();
  return (
    <>
      <PageHeader
        title="New entry"
        intro="Add a job, project period, course or milestone."
        actions={
          <Link href="/admin/timeline" className="btn btn-quiet btn-sm">
            Back to timeline
          </Link>
        }
      />
      <TimelineForm />
    </>
  );
}
