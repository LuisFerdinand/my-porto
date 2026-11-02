import Link from "next/link";
import { Github, Instagram, Linkedin, Mail } from "@/components/icons";
import { initialsOf } from "@/lib/format";
import type { Dict } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n/config";
import type { SiteSettings } from "@/lib/types";

export function Footer({ lang, dict, site }: { lang: Locale; dict: Dict; site: SiteSettings }) {
  const pages = [
    { href: `/${lang}`, label: dict.nav.home },
    { href: `/${lang}/about`, label: dict.nav.about },
    { href: `/${lang}/portfolio`, label: dict.nav.portfolio },
    { href: `/${lang}/contact`, label: dict.nav.contact },
  ];
  const socials = [
    site.githubUrl && { href: site.githubUrl, label: "GitHub", icon: Github },
    site.linkedinUrl && { href: site.linkedinUrl, label: "LinkedIn", icon: Linkedin },
    site.instagramUrl && { href: site.instagramUrl, label: "Instagram", icon: Instagram },
    site.contactEmail && { href: `mailto:${site.contactEmail}`, label: dict.contact.email, icon: Mail },
  ].filter(Boolean) as { href: string; label: string; icon: typeof Github }[];

  return (
    <footer className="surface surface-dark">
      <div className="grid12 gap-y-10">
        <div className="col-span-12 lg:col-span-5">
          <div className="flex items-center gap-3">
            <span className="logo !bg-white !text-ink">{initialsOf(site.heroTitle)}</span>
            <p className="h3">{site.heroTitle}</p>
          </div>
          <p className="muted mt-4 max-w-[24rem]">{site.heroSubtitle}</p>
        </div>

        <nav aria-label="Footer" className="col-span-6 lg:col-span-3">
          <ul className="grid gap-2">
            {pages.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="font-bold hover:underline">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <ul className="col-span-6 grid content-start gap-2 lg:col-span-4">
          {socials.map(({ href, label, icon: Icon }) => (
            <li key={label}>
              <a href={href} className="inline-flex items-center gap-2.5 font-bold hover:underline" target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
                <Icon className="size-5" />
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="small muted mt-12 flex flex-wrap items-center justify-between gap-3 font-semibold">
        <p>{dict.common.builtWith}</p>
        <Link href="/admin" className="hover:underline">
          {dict.common.admin}
        </Link>
      </div>
    </footer>
  );
}
