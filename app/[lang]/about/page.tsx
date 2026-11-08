import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Code, FileText, Github, Instagram, Linkedin, MapPin } from "@/components/icons";
import { SmartImage } from "@/components/smart-image";
import { SeeMore, StackGrid, VisionMission } from "@/components/site/sections";
import { SiteShell } from "@/components/site/site-shell";
import { TimelineList } from "@/components/site/timeline";
import { getSite, getTimeline } from "@/lib/content";
import { cvUrl } from "@/lib/cv";
import { getDictionary } from "@/lib/i18n";
import { isLocale } from "@/lib/i18n/config";
import { fmt } from "@/lib/i18n/format-client";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const [site, dict] = [await getSite(lang), getDictionary(lang)];
  return pageMetadata(lang, "/about", `${dict.about.title} · ${site.heroTitle}`, site.aboutHeading);
}

export default async function AboutPage({ params }: Props) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const [site, timeline] = await Promise.all([getSite(lang), getTimeline(lang)]);
  const dict = getDictionary(lang);
  const paragraphs = site.aboutBody
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <SiteShell lang={lang}>
      <section className="surface" aria-labelledby="about-title">
        <div className="grid12 items-start gap-y-10">
          <div className="col-span-12 lg:col-span-7">
            <p className="chip">{dict.about.title}</p>
            <h1 id="about-title" className="h1 mt-5 !text-[clamp(2.25rem,1.2rem+3.6vw,4rem)]">
              {site.aboutHeading}
            </h1>
            <div className="lead mt-6 grid max-w-[40rem] gap-4">
              {paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              {site.githubUrl && (
                <a href={site.githubUrl} className="btn btn-ink" target="_blank" rel="noopener noreferrer">
                  <Github /> GitHub
                </a>
              )}
              {site.linkedinUrl && (
                <a href={site.linkedinUrl} className="btn btn-light" target="_blank" rel="noopener noreferrer">
                  <Linkedin /> LinkedIn
                </a>
              )}
              {site.instagramUrl && (
                <a href={site.instagramUrl} className="btn btn-light" target="_blank" rel="noopener noreferrer">
                  <Instagram /> Instagram
                </a>
              )}
              <a href={cvUrl(site)} className="btn btn-light" target="_blank" rel="noopener noreferrer">
                <FileText /> CV
              </a>
            </div>
          </div>

          <div className="col-span-12 mx-auto grid w-full max-w-[30rem] gap-4 lg:col-span-5 lg:max-w-none">
            <div>
              {site.aboutImageUrl && (
                <div className="portrait dot-grid">
                  <SmartImage
                    src={site.aboutImageUrl}
                    alt={fmt(dict.about.photoAlt, { name: site.heroTitle })}
                    sizes="(min-width: 1024px) 34vw, 92vw"
                    priority
                    className="object-cover object-center"
                  />
                  {site.heroSubtitle && (
                    <span className="tech-chip tech-chip-0">
                      <span className="grid size-6 place-items-center rounded-full bg-ink text-white" aria-hidden="true">
                        <Code className="size-3.5" />
                      </span>
                      {site.heroSubtitle}
                    </span>
                  )}
                </div>
              )}
              {site.aboutQuote && (
                <figure className={`stack-card card-dark !p-6 ${site.aboutImageUrl ? "relative z-10 mx-4 -mt-14" : ""}`}>
                  <blockquote className="text-[clamp(1.2rem,1rem+0.9vw,1.6rem)] font-bold leading-tight tracking-tight">{site.aboutQuote}</blockquote>
                </figure>
              )}
            </div>

            {site.location && (
              <div className="card-white mt-3 flex items-start gap-3">
                <span className="icon-tile icon-tile-sm" aria-hidden="true">
                  <MapPin />
                </span>
                <dl>
                  <dt className="small muted font-bold">{dict.about.basedIn}</dt>
                  <dd className="font-bold leading-snug">{site.location}</dd>
                </dl>
              </div>
            )}
          </div>
        </div>
      </section>

      <VisionMission site={site} dict={dict} />
      <StackGrid site={site} dict={dict} />

      {timeline.length > 0 && (
        <section id="timeline" className="surface" aria-labelledby="timeline-title">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 id="timeline-title" className="h2">
              {dict.about.timelineTitle}
            </h2>
            <p className="lead max-w-[30rem]">{dict.about.timelineIntro}</p>
          </div>
          <div className="mt-10">
            <TimelineList entries={timeline} lang={lang} dict={dict} />
          </div>
        </section>
      )}

      <section className="surface surface-dark" aria-labelledby="about-cta" data-reveal>
        <div className="flex flex-wrap items-center justify-between gap-6">
          <h2 id="about-cta" className="h2">
            {dict.about.ctaTitle}
          </h2>
          <SeeMore href={`/${lang}/portfolio`}>{dict.about.ctaButton}</SeeMore>
        </div>
      </section>
    </SiteShell>
  );
}
