import Link from "next/link";
import { PageHeader } from "@/components/admin/admin-ui";
import { getAdminProjects } from "@/lib/admin-data";
import { formatMonth } from "@/lib/format";

export default async function ProjectsAdminPage() {
  const projects = await getAdminProjects();

  return (
    <>
      <PageHeader
        title="Projects"
        intro="Add, edit and reorder your work. Drafts stay hidden until you publish them."
        viewHref="/#work"
        actions={
          <Link href="/admin/projects/new" className="btn btn-solid btn-sm">
            New project
          </Link>
        }
      />
      <ul className="grid gap-3">
        {projects.map((p) => (
          <li key={p.id}>
            <Link
              href={`/admin/projects/${p.id}`}
              className="panel grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 gap-y-1 !py-4 transition-transform duration-300 hover:-translate-y-0.5"
            >
              <span className="truncate text-lg font-bold tracking-tight">{p.title}</span>
              <span className={`chip ${p.published ? "" : "opacity-70"}`}>{p.published ? "Published" : "Draft"}</span>
              <span className="truncate text-sm font-semibold muted">
                {[p.tags.slice(0, 3).join(" · "), formatMonth(p.lastActivity)].filter(Boolean).join(" · ")}
              </span>
              <span className="text-sm font-semibold muted">Order {p.sortOrder}</span>
            </Link>
          </li>
        ))}
        {projects.length === 0 && <li className="panel muted">No projects yet. Add your first one.</li>}
      </ul>
    </>
  );
}
