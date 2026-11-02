import { saveProject } from "@/app/admin/actions";
import { ActionForm } from "@/components/admin/action-form";
import { BiField, Field, TextField, idText } from "@/components/admin/admin-ui";
import { ImageField } from "@/components/admin/image-field";
import type { Project } from "@/lib/types";

export function ProjectForm({ project }: { project?: Project }) {
  const id = project?.idContent ?? {};
  return (
    <ActionForm action={saveProject} label={project ? "Save project" : "Create project"}>
      <input type="hidden" name="id" value={project?.id ?? ""} />
      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_19rem]">
        <div className="panel grid gap-6">
          <TextField name="title" label="Title" defaultValue={project?.title} required help="The same in both languages." />
          <BiField name="summary" label="One-line summary" en={project?.summary} id={idText(id, "summary")} help="Shown on the cards. Up to 180 characters." />
          <BiField name="description" label="Description" area rows={5} en={project?.description} id={idText(id, "description")} help="What it does, who it’s for, what you built." />
          <BiField name="role" label="Your role" en={project?.role} id={idText(id, "role")} help="Optional." />
          <TextField name="tags" label="Technologies" defaultValue={project?.tags.join(", ")} help="Separate with commas. These drive the filter on the Portfolio page." />
          <div className="grid gap-5 sm:grid-cols-2">
            <TextField name="liveUrl" label="Live site" defaultValue={project?.liveUrl} placeholder="https://…" />
            <TextField name="repoUrl" label="Source code" defaultValue={project?.repoUrl} placeholder="https://github.com/…" />
          </div>
        </div>

        <div className="grid content-start gap-6">
          <div className="panel">
            <ImageField
              name="image"
              label="Cover image"
              folder="portfolio/projects"
              initialUrl={project?.imageUrl ?? null}
              initialPublicId={project?.imagePublicId ?? null}
              hint="A screenshot works best. Without one, a black card with the initials is shown."
              aspect="16 / 10"
            />
          </div>

          <div className="panel grid gap-5">
            <Field label="Type" htmlFor="kind">
              <select id="kind" name="kind" className="field" defaultValue={project?.kind ?? "personal"}>
                <option value="personal">Personal project</option>
                <option value="collaboration">Team collaboration</option>
              </select>
            </Field>
            <TextField name="startedOn" label="Started" type="date" defaultValue={project?.startedOn ?? ""} help="Drives the activity chart on the home page." />
            <TextField name="lastActivity" label="Last worked on" type="date" defaultValue={project?.lastActivity ?? ""} />
            <TextField name="slug" label="Slug" defaultValue={project?.slug} help="Leave blank to generate it from the title." />
            <TextField name="sortOrder" label="Order" type="number" defaultValue={project?.sortOrder} help="Lower numbers come first. Blank puts it last." />
            <label className="flex items-center gap-3 font-bold">
              <input type="checkbox" name="featured" defaultChecked={project?.featured ?? false} className="size-5 accent-ink" />
              Featured on the home page
            </label>
            <label className="flex items-center gap-3 font-bold">
              <input type="checkbox" name="published" defaultChecked={project?.published ?? true} className="size-5 accent-ink" />
              Published on the site
            </label>
          </div>
        </div>
      </div>
    </ActionForm>
  );
}
