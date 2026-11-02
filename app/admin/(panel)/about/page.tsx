import { saveAbout } from "@/app/admin/actions";
import { ActionForm } from "@/components/admin/action-form";
import { AreaField, BiField, PageHeader, idText } from "@/components/admin/admin-ui";
import { ImageField } from "@/components/admin/image-field";
import { getAdminSite } from "@/lib/admin-data";
import { formatHighlights, formatSkills } from "@/lib/format";
import type { Highlight } from "@/lib/types";

export default async function AboutAdminPage() {
  const site = await getAdminSite();
  const id = site.idContent;
  const idHighlights = Array.isArray(id.aboutHighlights) ? (id.aboutHighlights as Highlight[]) : [];

  return (
    <>
      <PageHeader title="About" intro="Your story, vision, mission and stack. The timeline has its own page." viewHref="/about" />
      <ActionForm action={saveAbout}>
        <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_18rem]">
          <div className="panel grid gap-6">
            <BiField name="aboutHeading" label="Heading" area rows={2} en={site.aboutHeading} id={idText(id, "aboutHeading")} />
            <BiField name="aboutBody" label="Story" area rows={9} en={site.aboutBody} id={idText(id, "aboutBody")} help="Leave a blank line between paragraphs." />
            <BiField name="aboutQuote" label="Quote" area rows={2} en={site.aboutQuote} id={idText(id, "aboutQuote")} help="Shown on a black card beside your story when there is no About image." />
            <BiField name="vision" label="Vision" area rows={3} en={site.vision} id={idText(id, "vision")} />
            <BiField name="mission" label="Mission" area rows={5} en={site.mission} id={idText(id, "mission")} help="One point per line." />
            <BiField
              name="aboutHighlights"
              label="What I build (three cards on the home page)"
              area
              rows={6}
              en={formatHighlights(site.aboutHighlights)}
              id={formatHighlights(idHighlights)}
              help="One per line, written as Title | Detail."
            />
            <AreaField
              name="aboutSkills"
              label="Stack"
              defaultValue={formatSkills(site.aboutSkills)}
              rows={6}
              help="One group per line, written as Group name: item, item, item. Use Languages, Front end, Back end & data and Tools & deploy so the Indonesian page translates the group names."
            />
          </div>

          <div className="panel">
            <ImageField
              name="aboutImage"
              label="About image"
              folder="portfolio/about"
              initialUrl={site.aboutImageUrl}
              initialPublicId={site.aboutImagePublicId}
              hint="Optional. Without one, your quote sits on a black card."
            />
          </div>
        </div>
      </ActionForm>
    </>
  );
}
