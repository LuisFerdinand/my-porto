import type { CSSProperties } from "react";
import { ArrowUpRight, Building } from "@/components/icons";
import { SmartImage } from "@/components/smart-image";
import { initialsOf } from "@/lib/format";
import type { Dict } from "@/lib/i18n";
import { localizeHref } from "@/lib/i18n/config";
import type { Locale } from "@/lib/i18n/config";
import type { SiteSettings } from "@/lib/types";

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

export function Hero({
  lang,
  dict,
  site,
  stats,
}: {
  lang: Locale;
  dict: Dict;
  site: SiteSettings;
  stats: { projects: number; live: number; tech: number };
}) {
  const handle = site.githubUrl.replace(/^https?:\/\//, "");

  return (
    <section className="surface" aria-labelledby="hero-title">
      <div className="grid12 items-center gap-y-12">
        <div className="col-span-12 lg:col-span-7">
          {site.heroAvailability && (
            <p className="hero-in small inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-2 font-bold" style={delay(0)}>
              <span className="live-dot" aria-hidden="true" />
              {site.heroAvailability}
            </p>
          )}
          <h1 id="hero-title" className="h1 hero-in mt-6" style={delay(80)}>
            {site.heroTitle}
          </h1>
          <p className="hero-in mt-3 text-[clamp(1.25rem,1.1rem+0.7vw,1.75rem)] font-bold tracking-tight" style={delay(160)}>
            {site.heroSubtitle}
          </p>
          <p className="lead hero-in mt-5 max-w-[36rem]" style={delay(240)}>
            {site.heroDescription}
          </p>

          <div className="hero-in mt-8 flex flex-wrap gap-3" style={delay(320)}>
            {site.heroPrimaryLabel && (
              <a href={localizeHref(lang, site.heroPrimaryHref || "/portfolio")} className="btn btn-ink">
                {site.heroPrimaryLabel}
                <ArrowUpRight />
              </a>
            )}
            {site.heroSecondaryLabel && (
              <a href={localizeHref(lang, site.heroSecondaryHref || "/contact")} className="btn btn-light">
                {site.heroSecondaryLabel}
              </a>
            )}
          </div>

          <dl className="hero-in mt-10 grid max-w-xl grid-cols-3 gap-3" style={delay(400)}>
            {[
              { value: stats.projects, label: dict.home.stats.projects },
              { value: stats.live, label: dict.home.stats.live },
              { value: stats.tech, label: dict.home.stats.tech },
            ].map((s) => (
              <div key={s.label} className="card !p-4">
                <dd className="text-[1.9rem] font-extrabold leading-none tracking-tight tabular-nums">{s.value}</dd>
                <dt className="small muted mt-2 font-bold">{s.label}</dt>
              </div>
            ))}
          </dl>
        </div>

        {/* A black profile card with two lighter cards underneath, like the card in the reference. */}
        <div className="hero-in col-span-12 lg:col-span-5" style={delay(220)}>
          {site.heroImageUrl && (
            <div className="portrait">
              <SmartImage
                src={site.heroImageUrl}
                alt={`Portrait of ${site.heroTitle}`}
                sizes="(min-width: 1024px) 34vw, 92vw"
                priority
                className="object-cover"
              />
            </div>
          )}
          <div className={`stack-card profile-card float ${site.heroImageUrl ? "relative z-10 -mt-14 mx-4" : ""}`}>
            <div className="flex items-start justify-between gap-4">
              <span className="logo !bg-white !text-ink">{initialsOf(site.heroTitle)}</span>
              <span className="chip">{site.heroSubtitle}</span>
            </div>
            <p className="mt-9 break-all text-[clamp(1.05rem,0.9rem+0.7vw,1.4rem)] font-bold tracking-[0.12em]">{handle}</p>
            <div className="mt-7 flex items-end justify-between gap-4">
              <div>
                <p className="small text-white/60">{dict.home.heroCardHolder}</p>
                <p className="text-lg font-bold">{site.heroTitle}</p>
              </div>
              {site.company && (
                <p className="small inline-flex items-center gap-2 text-right font-bold text-white/80">
                  <Building className="size-4" />
                  {site.company}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
