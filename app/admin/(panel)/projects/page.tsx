import Link from "next/link";
import { setProjectFeatured } from "@/app/admin/actions";
import { PageHeader } from "@/components/admin/admin-ui";
import { Star } from "@/components/icons";
import { SmartImage } from "@/components/smart-image";
import { getAdminProjects } from "@/lib/admin-data";
import { formatMonth, initialsOf } from "@/lib/format";

export default async function ProjectsAdminPage() {
  const projects = await getAdminProjects();
  const featuredCount = projects.filter((p) => p.featured).length;

  return (
    <>
      <PageHeader
        title="Projects"
        intro={`Add, edit and reorder your work. The home page shows only the starred projects (${featuredCount} now), so star the ones you want visitors to see first. Drafts stay hidden until you publish them.`}
        viewHref="/#work"
        actions={
          <Link href="/admin/projects/new" className="btn btn-solid btn-sm">
            New project
          </Link>
        }
      />
      <ul className="grid gap-3">
        {projects.map((p) => (
          <li
            key={p.id}
            className="panel grid grid-cols-[auto_minmax(0,1fr)] items-center gap-x-4 gap-y-3 !p-3 sm:grid-cols-[auto_minmax(0,1fr)_auto]"
          >
            <Link
              href={`/admin/projects/${p.id}`}
              aria-label={`Edit ${p.title}`}
              className="relative block aspect-[16/10] w-28 overflow-hidden rounded-xl bg-ink sm:w-44"
            >
              {p.imageUrl ? (
                <SmartImage src={p.imageUrl} alt="" sizes="176px" className="object-cover object-top" />
              ) : (
                <span className="absolute inset-0 grid place-items-center text-2xl font-extrabold tracking-tight text-white/90">
                  {initialsOf(p.title)}
                </span>
              )}
            </Link>

            <Link href={`/admin/projects/${p.id}`} className="grid min-w-0 gap-1.5">
              <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
                <span className="truncate text-lg font-bold tracking-tight">{p.title}</span>
                <span className={`chip ${p.published ? "" : "opacity-70"}`}>{p.published ? "Published" : "Draft"}</span>
              </span>
              <span className="truncate text-sm font-semibold muted">
                {[p.tags.slice(0, 3).join(" · "), formatMonth(p.lastActivity)].filter(Boolean).join(" · ")}
              </span>
              <span className="text-sm font-semibold muted">Order {p.sortOrder}</span>
            </Link>

            <form action={setProjectFeatured} className="col-span-full sm:col-span-1">
              <input type="hidden" name="id" value={p.id} />
              <input type="hidden" name="featured" value={String(!p.featured)} />
              <button
                type="submit"
                className={`btn btn-sm w-full sm:w-auto ${p.featured ? "btn-solid" : "btn-quiet"}`}
                aria-pressed={p.featured}
                title={p.featured ? "Remove from the home page" : "Show on the home page"}
              >
                <Star className="size-4" fill={p.featured ? "currentColor" : "none"} />
                {p.featured ? "On home page" : "Feature on home"}
              </button>
            </form>
          </li>
        ))}
        {projects.length === 0 && <li className="panel muted">No projects yet. Add your first one.</li>}
      </ul>
    </>
  );
}
