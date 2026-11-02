import { saveTimeline } from "@/app/admin/actions";
import { ActionForm } from "@/components/admin/action-form";
import { BiField, Field, TextField, idText } from "@/components/admin/admin-ui";
import type { TimelineEntry } from "@/lib/types";

export function TimelineForm({ entry }: { entry?: TimelineEntry }) {
  const id = entry?.idContent ?? {};
  return (
    <ActionForm action={saveTimeline} label={entry ? "Save entry" : "Create entry"}>
      <input type="hidden" name="id" value={entry?.id ?? ""} />
      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_19rem]">
        <div className="panel grid gap-6">
          <BiField name="title" label="Title" en={entry?.title} id={idText(id, "title")} required />
          <BiField name="org" label="Where" en={entry?.org} id={idText(id, "org")} help="A company, school or the projects involved." />
          <BiField name="description" label="Description" area rows={4} en={entry?.description} id={idText(id, "description")} />
          <TextField name="tags" label="Technologies" defaultValue={entry?.tags.join(", ")} help="Separate with commas." />
          <TextField name="linkUrl" label="Link" defaultValue={entry?.linkUrl} help="A page such as /portfolio (the language is added for you) or a full https:// link." />
        </div>

        <div className="panel grid content-start gap-5">
          <Field label="Type" htmlFor="kind">
            <select id="kind" name="kind" className="field" defaultValue={entry?.kind ?? "project"}>
              <option value="work">Work</option>
              <option value="project">Projects</option>
              <option value="education">Education</option>
              <option value="milestone">Milestone</option>
            </select>
          </Field>
          <TextField name="startsOn" label="Starts" type="date" defaultValue={entry?.startsOn ?? ""} help="Only the month and year are shown." />
          <TextField name="endsOn" label="Ends" type="date" defaultValue={entry?.endsOn ?? ""} help="Leave blank for a single month or an ongoing entry." />
          <label className="flex items-center gap-3 font-bold">
            <input type="checkbox" name="isCurrent" defaultChecked={entry?.isCurrent ?? false} className="size-5 accent-ink" />
            Current (shows “Present”, listed first)
          </label>
          <label className="flex items-center gap-3 font-bold">
            <input type="checkbox" name="published" defaultChecked={entry?.published ?? true} className="size-5 accent-ink" />
            Visible on the site
          </label>
        </div>
      </div>
    </ActionForm>
  );
}
