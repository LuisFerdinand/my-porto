import Link from "next/link";
import { PageHeader } from "@/components/admin/admin-ui";
import { ProjectForm } from "@/components/admin/project-form";
import { requireAdmin } from "@/lib/session";

export default async function NewProjectPage() {
  await requireAdmin();
  return (
    <>
      <PageHeader
        title="New project"
        intro="Fill in what you have. You can publish it now or keep it as a draft."
        actions={
          <Link href="/admin/projects" className="btn btn-quiet btn-sm">
            Back to projects
          </Link>
        }
      />
      <ProjectForm />
    </>
  );
}
