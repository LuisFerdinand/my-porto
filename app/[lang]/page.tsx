import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ActivityPanel } from "@/components/site/activity-panel";
import { Hero } from "@/components/site/hero";
import { ProjectCard } from "@/components/site/project-card";
import { ContactCta, Highlights, SeeMore } from "@/components/site/sections";
import { SiteShell } from "@/components/site/site-shell";
import { RecentRows } from "@/components/site/timeline";
import { getProjects, getSite, getTimeline } from "@/lib/content";
import { getDictionary } from "@/lib/i18n";
import { isLocale } from "@/lib/i18n/config";
import { pageMetadata } from "@/lib/seo";
import { buildActivity, buildStackShare, projectStats } from "@/lib/stats";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const site = await getSite(lang);
  return pageMetadata(lang, "", `${site.heroTitle} · ${site.heroSubtitle}`, site.heroDescription);
}

export default async function HomePage({ params }: Props) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const [site, projects, timeline] = await Promise.all([getSite(lang), getProjects(lang), getTimeline(lang)]);
  const dict = getDictionary(lang);

  const featured = (projects.some((p) => p.featured) ? projects.filter((p) => p.featured) : projects).slice(0, 3);
  const activity = buildActivity(projects, lang);
  const ring = buildStackShare(projects);

  return (
    <SiteShell lang={lang}>
      <Hero lang={lang} dict={dict} site={site} stats={projectStats(projects)} stack={[ring.name, ...ring.others.map((o) => o.name)].filter(Boolean)} />

      <Highlights site={site} title={dict.home.build.title} />

      <section className="surface" aria-labelledby="featured-title" data-reveal>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 id="featured-title" className="h2">
              {dict.home.featured.title}
            </h2>
            <p className="lead mt-3 max-w-[34rem]">{dict.home.featured.intro}</p>
          </div>
          <SeeMore href={`/${lang}/portfolio`}>{dict.home.featured.cta}</SeeMore>
        </div>
        <ul className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((p) => (
            <li key={p.slug}>
              <ProjectCard project={p} lang={lang} dict={dict} />
            </li>
          ))}
        </ul>
      </section>

      <ActivityPanel
        points={activity}
        ring={ring}
        text={{
          title: dict.home.activity.title,
          caption: dict.home.activity.caption,
          totalLabel: dict.home.activity.total,
          stackTitle: dict.home.activity.stackTitle,
          stackCaption: dict.home.activity.stackCaption,
        }}
      />

      {timeline.length > 0 && (
        <section className="surface" aria-labelledby="recent-title">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 id="recent-title" className="h2">
              {dict.home.timeline.title}
            </h2>
            <SeeMore href={`/${lang}/about#timeline`}>{dict.home.timeline.cta}</SeeMore>
          </div>
          <div className="mt-6">
            <RecentRows entries={timeline.slice(0, 4)} lang={lang} dict={dict} />
          </div>
        </section>
      )}

      <ContactCta lang={lang} dict={dict} site={site} />
    </SiteShell>
  );
}
