import Link from "next/link";
import { notFound } from "next/navigation";
import { deleteProject } from "@/app/admin/actions";
import { PageHeader } from "@/components/admin/admin-ui";
import { ConfirmButton } from "@/components/admin/confirm-button";
import { ProjectForm } from "@/components/admin/project-form";
import { getAdminProject } from "@/lib/admin-data";

export default async function EditProjectPage({ params }: PageProps<"/admin/projects/[id]">) {
  const { id } = await params;
  const numericId = Number(id);
  const project = Number.isInteger(numericId) ? await getAdminProject(numericId) : null;
  if (!project) notFound();

  return (
    <>
      <PageHeader
        title={project.title}
        intro={project.published ? "Live on your homepage." : "Draft. Visitors can’t see it yet."}
        actions={
          <Link href="/admin/projects" className="btn btn-quiet btn-sm">
            Back to projects
          </Link>
        }
      />
      <ProjectForm project={project} />

      <form action={deleteProject} className="panel mt-6 flex flex-wrap items-center justify-between gap-4">
        <input type="hidden" name="id" value={project.id} />
        <div>
          <h2 className="text-lg font-bold tracking-tight">Delete this project</h2>
          <p className="muted">This removes it from the database. The Cloudinary image stays in your media library.</p>
        </div>
        <ConfirmButton message={`Delete “${project.title}”? This can’t be undone.`} className="btn btn-quiet btn-sm text-red-800">
          Delete project
        </ConfirmButton>
      </form>
    </>
  );
}
