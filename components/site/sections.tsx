import Link from "next/link";
import { ArrowRight, Briefcase, Code, Flag, Globe, Layers, Mail, Target } from "@/components/icons";
import type { Dict } from "@/lib/i18n";
import { localizeHref } from "@/lib/i18n/config";
import type { Locale } from "@/lib/i18n/config";
import type { SiteSettings } from "@/lib/types";

const HIGHLIGHT_ICONS = [Briefcase, Globe, Code];

/** Three cards with an icon in a rounded black square, like the "Upcoming payments" tiles. */
export function Highlights({ site, title }: { site: SiteSettings; title: string }) {
  if (site.aboutHighlights.length === 0) return null;
  return (
    <section className="surface" aria-labelledby="highlights-title" data-reveal>
      <h2 id="highlights-title" className="h2">
        {title}
      </h2>
      <ul className="mt-8 grid gap-4 md:grid-cols-3">
        {site.aboutHighlights.map((h, i) => {
          const Icon = HIGHLIGHT_ICONS[i % HIGHLIGHT_ICONS.length];
          return (
            <li key={h.title} className="card card-hover">
              <span className="icon-tile" aria-hidden="true">
                <Icon />
              </span>
              <h3 className="h3 mt-5">{h.title}</h3>
              <p className="muted mt-2">{h.text}</p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export function ContactCta({ lang, dict, site }: { lang: Locale; dict: Dict; site: SiteSettings }) {
  return (
    <section className="surface surface-dark" aria-labelledby="cta-title" data-reveal>
      <div className="grid12 items-end gap-y-8">
        <div className="col-span-12 lg:col-span-8">
          <h2 id="cta-title" className="h1 !text-[clamp(2rem,1.2rem+3.4vw,3.75rem)]">
            {site.contactHeading}
          </h2>
          {site.contactBody && <p className="lead mt-5 max-w-[34rem]">{site.contactBody}</p>}
        </div>
        <div className="col-span-12 flex flex-wrap gap-3 lg:col-span-4 lg:justify-end">
          <Link href={localizeHref(lang, "/contact")} className="btn btn-light">
            <Mail />
            {dict.home.cta.button}
          </Link>
        </div>
      </div>
    </section>
  );
}

export function VisionMission({ site, dict }: { site: SiteSettings; dict: Dict }) {
  const missions = site.mission
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean);
  if (!site.vision && missions.length === 0) return null;

  return (
    <section className="grid12 gap-y-4" aria-label={`${dict.about.visionTitle} / ${dict.about.missionTitle}`} data-reveal>
      {site.vision && (
        <div className="stack-card card-dark col-span-12 !p-7 lg:col-span-5">
          <span className="icon-tile icon-tile-light" aria-hidden="true">
            <Target />
          </span>
          <h2 className="h2 mt-6">{dict.about.visionTitle}</h2>
          <p className="lead mt-4 !text-white/80">{site.vision}</p>
        </div>
      )}
      {missions.length > 0 && (
        <div className="surface col-span-12 lg:col-span-7">
          <span className="icon-tile" aria-hidden="true">
            <Flag />
          </span>
          <h2 className="h2 mt-6">{dict.about.missionTitle}</h2>
          <ul className="mt-6 grid gap-3">
            {missions.map((m, i) => (
              <li key={m} className="card-white flex items-start gap-4">
                <span className="grid size-8 flex-none place-items-center rounded-full bg-ink text-sm font-extrabold text-white" aria-hidden="true">
                  {i + 1}
                </span>
                <span className="font-semibold leading-snug">{m}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}

export function StackGrid({ site, dict }: { site: SiteSettings; dict: Dict }) {
  if (site.aboutSkills.length === 0) return null;
  return (
    <section className="surface" aria-labelledby="stack-title" data-reveal>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <h2 id="stack-title" className="h2">
          {dict.about.stackTitle}
        </h2>
        <p className="lead max-w-[28rem]">{dict.about.stackIntro}</p>
      </div>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {site.aboutSkills.map((g) => (
          <div key={g.group} className="card">
            <span className="icon-tile icon-tile-sm" aria-hidden="true">
              <Layers />
            </span>
            <h3 className="h3 mt-4">{dict.about.groups[g.group] ?? g.group}</h3>
            <ul className="mt-4 flex flex-wrap gap-1.5">
              {g.items.map((item) => (
                <li key={item} className="chip">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

export function SeeMore({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="btn btn-ink">
      {children}
      <ArrowRight />
    </Link>
  );
}
