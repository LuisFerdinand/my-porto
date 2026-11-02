import { ArrowUpRight, Building, Chat, FileText, Github, Instagram, Linkedin, Mail, MapPin, Phone } from "@/components/icons";
import type { Dict } from "@/lib/i18n";
import type { SiteSettings } from "@/lib/types";

type Item = { icon: typeof Mail; label: string; value: string; href?: string };

export function ContactInfo({ site, dict }: { site: SiteSettings; dict: Dict }) {
  const t = dict.contact;
  const whatsappDigits = site.whatsapp.replace(/\D/g, "");

  const items: Item[] = [
    site.contactEmail && { icon: Mail, label: t.email, value: site.contactEmail, href: `mailto:${site.contactEmail}` },
    site.address && {
      icon: MapPin,
      label: t.address,
      value: site.address,
      href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.address)}`,
    },
    site.phone && { icon: Phone, label: t.phone, value: site.phone, href: `tel:${site.phone.replace(/[^\d+]/g, "")}` },
    whatsappDigits && { icon: Chat, label: t.whatsapp, value: site.whatsapp, href: `https://wa.me/${whatsappDigits}` },
    site.company && { icon: Building, label: t.company, value: site.company, href: site.companyUrl || undefined },
  ].filter(Boolean) as Item[];

  const socials = [
    site.githubUrl && { href: site.githubUrl, label: "GitHub", icon: Github },
    site.linkedinUrl && { href: site.linkedinUrl, label: "LinkedIn", icon: Linkedin },
    site.instagramUrl && { href: site.instagramUrl, label: "Instagram", icon: Instagram },
    site.resumeUrl && { href: site.resumeUrl, label: "CV", icon: FileText },
  ].filter(Boolean) as { href: string; label: string; icon: typeof Github }[];

  return (
    <div className="grid gap-4">
      <ul className="grid gap-3">
        {items.map(({ icon: Icon, label, value, href }) => {
          const external = href?.startsWith("http");
          const body = (
            <>
              <span className="icon-tile icon-tile-sm" aria-hidden="true">
                <Icon />
              </span>
              <span className="min-w-0">
                <span className="small muted block font-bold">{label}</span>
                <span className="block break-words font-bold leading-snug">{value}</span>
                {label === t.address && <span className="small mt-1 inline-flex items-center gap-1 font-bold underline underline-offset-4">{t.openMap}<ArrowUpRight className="size-3.5" /></span>}
              </span>
            </>
          );
          return (
            <li key={label}>
              {href ? (
                <a href={href} className="card-white card-hover flex items-start gap-4" {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                  {body}
                </a>
              ) : (
                <div className="card-white flex items-start gap-4">{body}</div>
              )}
            </li>
          );
        })}
      </ul>

      {socials.length > 0 && (
        <div>
          <h3 className="small muted mb-3 font-bold">{t.social}</h3>
          <ul className="flex flex-wrap gap-3">
            {socials.map(({ href, label, icon: Icon }) => (
              <li key={label}>
                <a href={href} className="btn btn-light" target="_blank" rel="noopener noreferrer">
                  <Icon />
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
