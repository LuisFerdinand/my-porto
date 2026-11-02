import Link from "next/link";
import { PageHeader } from "@/components/admin/admin-ui";
import { getAdminMessages, getAdminProjects, getAdminSite, getAdminTimeline } from "@/lib/admin-data";
import { getCloudinaryConfig } from "@/lib/cloudinary";
import { mailConfigured } from "@/lib/mail";

export default async function OverviewPage() {
  const [site, projects, timeline, messages] = await Promise.all([
    getAdminSite(),
    getAdminProjects(),
    getAdminTimeline(),
    getAdminMessages(),
  ]);
  const cloudinaryReady = getCloudinaryConfig() !== null;
  const mailReady = mailConfigured();
  const published = projects.filter((p) => p.published).length;
  const unread = messages.filter((m) => !m.isRead).length;
  const unsent = messages.filter((m) => !m.emailed).length;

  const cards = [
    { href: "/admin/hero", title: "Hero", text: `${site.heroTitle}, ${site.heroSubtitle}`, note: site.heroImageUrl ? "Portrait uploaded" : "No portrait yet" },
    { href: "/admin/about", title: "About", text: site.aboutHeading, note: site.vision ? "Vision and mission set" : "No vision yet" },
    { href: "/admin/timeline", title: "Timeline", text: `${timeline.length} entries`, note: `${timeline.filter((t) => t.published).length} visible` },
    { href: "/admin/projects", title: "Projects", text: `${published} published`, note: `${projects.length - published} drafts` },
    { href: "/admin/contact", title: "Contact", text: site.contactEmail || "No email set", note: site.address ? "Address set" : "No address yet" },
    { href: "/admin/messages", title: "Messages", text: `${messages.length} received`, note: unread ? `${unread} unread` : "All read" },
  ];

  return (
    <>
      <PageHeader title="Overview" intro="Everything on the site is edited from here, in English and Indonesian. Changes go live as soon as you save." viewHref="/" />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {cards.map((c) => (
          <Link key={c.href} href={c.href} className="panel card-hover block">
            <h2 className="text-xl font-extrabold tracking-tight">{c.title}</h2>
            <p className="mt-2 text-lg font-bold">{c.text}</p>
            <p className="small muted mt-1 font-bold">{c.note}</p>
          </Link>
        ))}
      </div>

      <div className="panel mt-4">
        <h2 className="text-xl font-extrabold tracking-tight">Setup checks</h2>
        <ul className="mt-4 grid gap-3">
          <li className="flex items-start gap-3">
            <span className="chip">Database</span>
            <span className="muted">Connected. {projects.length} projects, {timeline.length} timeline entries.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="chip">Email</span>
            <span className="muted">
              {mailReady
                ? `Contact form messages are emailed to ${process.env.CONTACT_TO || "ferdinandluis88@gmail.com"}.`
                : "Not set up yet. Messages are saved in Messages, but not emailed. Add SMTP_USER and SMTP_PASS (a Gmail App Password) to .env.local and restart."}
              {unsent > 0 && ` ${unsent} saved message${unsent === 1 ? " was" : "s were"} not emailed.`}
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="chip">Cloudinary</span>
            <span className="muted">
              {cloudinaryReady
                ? "Configured. Image uploads are ready."
                : "Not configured. Add CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET to .env.local and restart. Until then you can paste image links."}
            </span>
          </li>
        </ul>
      </div>
    </>
  );
}
