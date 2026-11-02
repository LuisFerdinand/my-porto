import type { CSSProperties } from "react";
import { ArrowUpRight } from "@/components/icons";
import { SmartImage } from "@/components/smart-image";
import { TechIcon } from "@/components/tech-icon";
import { initialsOf } from "@/lib/format";
import type { Dict } from "@/lib/i18n";
import { localizeHref } from "@/lib/i18n/config";
import type { Locale } from "@/lib/i18n/config";
import { fmt } from "@/lib/i18n/format-client";
import type { SiteSettings } from "@/lib/types";

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

export function Hero({
  lang,
  dict,
  site,
  stats,
  stack,
}: {
  lang: Locale;
  dict: Dict;
  site: SiteSettings;
  stats: { projects: number; live: number; tech: number };
  stack: string[];
}) {
  const handle = site.githubUrl.replace(/^https?:\/\//, "").replace(/\/$/, "");
  const nick = handle.split("/").pop() || site.heroTitle;
  const top = stack.slice(0, 3);

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

        <div className="hero-in col-span-12 mx-auto w-full max-w-[30rem] lg:col-span-5 lg:max-w-none" style={delay(220)}>
          {site.heroImageUrl ? (
            <div>
              {/* A cut-out photo on a dotted grid, with the stack as floating chips and a terminal card in front. */}
              <div className="hero-stage dot-grid">
                <SmartImage
                  src={site.heroImageUrl}
                  alt={fmt(dict.home.heroPhotoAlt, { name: site.heroTitle })}
                  sizes="(min-width: 1024px) 34vw, 92vw"
                  priority
                  className="object-cover object-top"
                />
                {top.map((name, i) => (
                  <span key={name} className={`tech-chip tech-chip-${i}`}>
                    <TechIcon name={name} size="sm" className="!rounded-full" />
                    {name}
                  </span>
                ))}
              </div>

              <div className="stack-card terminal relative z-10 mx-3 -mt-9 sm:mx-6">
                <div className="flex items-center justify-between gap-3">
                  <span className="flex gap-1.5" aria-hidden="true">
                    <i className="size-2.5 rounded-full bg-white/35" />
                    <i className="size-2.5 rounded-full bg-white/20" />
                    <i className="size-2.5 rounded-full bg-white/20" />
                  </span>
                  <span className="text-xs text-white/50">~/portfolio</span>
                </div>
                <p className="mt-3">
                  <span className="text-white/45">$</span> whoami
                </p>
                <p className="pl-4 font-bold">{nick}</p>
                {top.length > 0 && (
                  <>
                    <p className="mt-1">
                      <span className="text-white/45">$</span> stack --top {top.length}
                    </p>
                    <p className="pl-4 font-bold">{top.join(" · ")}</p>
                  </>
                )}
                {site.heroAvailability && (
                  <>
                    <p className="mt-1">
                      <span className="text-white/45">$</span> status
                    </p>
                    <p className="flex items-center gap-2 pl-4 font-bold">
                      <span className="live-dot" aria-hidden="true" />
                      {site.heroAvailability}
                    </p>
                  </>
                )}
              </div>
            </div>
          ) : (
            // No photo yet: the black profile card on its own.
            <div className="stack-card profile-card float">
              <div className="flex items-start justify-between gap-4">
                <span className="logo !bg-white !text-ink">{initialsOf(site.heroTitle)}</span>
                <span className="chip">{site.heroSubtitle}</span>
              </div>
              <p className="mt-9 break-all text-[clamp(1.05rem,0.9rem+0.7vw,1.4rem)] font-bold tracking-[0.12em]">{handle}</p>
              <div className="mt-7">
                <p className="small text-white/60">{dict.home.heroCardHolder}</p>
                <p className="text-lg font-bold">{site.heroTitle}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
