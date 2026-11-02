import { saveContact } from "@/app/admin/actions";
import { ActionForm } from "@/components/admin/action-form";
import { BiField, PageHeader, TextField, idText } from "@/components/admin/admin-ui";
import { getAdminSite } from "@/lib/admin-data";

export default async function ContactAdminPage() {
  const site = await getAdminSite();
  const id = site.idContent;

  return (
    <>
      <PageHeader title="Contact" intro="How people reach you. The form on the Contact page emails your address below." viewHref="/contact" />
      <ActionForm action={saveContact}>
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="panel grid content-start gap-6">
            <h2 className="text-xl font-extrabold tracking-tight">Contact page text</h2>
            <BiField name="contactHeading" label="Heading" area rows={2} en={site.contactHeading} id={idText(id, "contactHeading")} />
            <BiField name="contactBody" label="Text" area rows={3} en={site.contactBody} id={idText(id, "contactBody")} />
          </div>

          <div className="grid content-start gap-6">
            <div className="panel grid gap-5">
              <h2 className="text-xl font-extrabold tracking-tight">Details</h2>
              <TextField name="contactEmail" label="Email" type="email" defaultValue={site.contactEmail} help="Shown on the site. Messages from the form are sent here (set CONTACT_TO in .env.local to change the inbox)." />
              <TextField name="address" label="Address" defaultValue={site.address} help="Shown with an “Open in Google Maps” link." />
              <TextField name="location" label="City and country" defaultValue={site.location} />
              <div className="grid gap-5 sm:grid-cols-2">
                <TextField name="phone" label="Phone" defaultValue={site.phone} />
                <TextField name="whatsapp" label="WhatsApp" defaultValue={site.whatsapp} help="With country code, e.g. +62 812…" />
              </div>
              <TextField name="company" label="Company" defaultValue={site.company} />
              <TextField name="companyUrl" label="Company website" defaultValue={site.companyUrl} placeholder="https://…" />
            </div>
            <div className="panel grid gap-5">
              <h2 className="text-xl font-extrabold tracking-tight">Links</h2>
              <TextField name="githubUrl" label="GitHub" defaultValue={site.githubUrl} placeholder="https://github.com/…" />
              <TextField name="linkedinUrl" label="LinkedIn" defaultValue={site.linkedinUrl} placeholder="https://linkedin.com/in/…" />
              <TextField name="instagramUrl" label="Instagram" defaultValue={site.instagramUrl} placeholder="https://instagram.com/…" />
              <TextField name="resumeUrl" label="CV link" defaultValue={site.resumeUrl} help="Link to a PDF, for example in Google Drive." />
            </div>
          </div>
        </div>
      </ActionForm>
    </>
  );
}
