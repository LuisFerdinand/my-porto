import { saveHero } from "@/app/admin/actions";
import { ActionForm } from "@/components/admin/action-form";
import { BiField, PageHeader, TextField, idText } from "@/components/admin/admin-ui";
import { ImageField } from "@/components/admin/image-field";
import { getAdminSite } from "@/lib/admin-data";

export default async function HeroAdminPage() {
  const site = await getAdminSite();
  const id = site.idContent;

  return (
    <>
      <PageHeader title="Hero" intro="The first panel of your home page: your name, what you do, and your portrait." viewHref="/" />
      <ActionForm action={saveHero}>
        <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_18rem]">
          <div className="panel grid gap-6">
            <TextField name="heroTitle" label="Your name" defaultValue={site.heroTitle} required help="The same in both languages." />
            <BiField name="heroSubtitle" label="Role" en={site.heroSubtitle} id={idText(id, "heroSubtitle")} />
            <BiField name="heroDescription" label="Description" area rows={4} en={site.heroDescription} id={idText(id, "heroDescription")} help="One or two sentences." />
            <BiField name="heroPrimaryLabel" label="Main button text" en={site.heroPrimaryLabel} id={idText(id, "heroPrimaryLabel")} />
            <TextField name="heroPrimaryHref" label="Main button link" defaultValue={site.heroPrimaryHref} help="A page such as /portfolio (the language is added for you), or https://…" />
            <BiField name="heroSecondaryLabel" label="Second button text" en={site.heroSecondaryLabel} id={idText(id, "heroSecondaryLabel")} />
            <TextField name="heroSecondaryHref" label="Second button link" defaultValue={site.heroSecondaryHref} />
            <BiField name="heroAvailability" label="Availability line" en={site.heroAvailability} id={idText(id, "heroAvailability")} help="For example “Open to new projects”. Leave both blank to hide it." />
          </div>

          <div className="panel">
            <ImageField
              name="heroImage"
              label="Portrait"
              folder="portfolio/hero"
              initialUrl={site.heroImageUrl}
              initialPublicId={site.heroImagePublicId}
              hint="A portrait, taller than wide. Shown above your profile card. Up to 10 MB."
            />
          </div>
        </div>
      </ActionForm>
    </>
  );
}
