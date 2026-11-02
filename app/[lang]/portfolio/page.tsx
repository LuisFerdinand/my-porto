import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PortfolioGrid } from "@/components/site/portfolio-grid";
import { SiteShell } from "@/components/site/site-shell";
import { getProjects, getSite } from "@/lib/content";
import { getDictionary } from "@/lib/i18n";
import { isLocale } from "@/lib/i18n/config";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const [site, dict] = [await getSite(lang), getDictionary(lang)];
  return pageMetadata(lang, "/portfolio", `${dict.portfolio.title} · ${site.heroTitle}`, dict.portfolio.intro);
}

export default async function PortfolioPage({ params }: Props) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const projects = await getProjects(lang);
  const dict = getDictionary(lang);

  return (
    <SiteShell lang={lang}>
      <section className="surface" aria-labelledby="portfolio-title">
        <h1 id="portfolio-title" className="h1 !text-[clamp(2.25rem,1.2rem+3.6vw,4rem)]">
          {dict.portfolio.title}
        </h1>
        <p className="lead mt-4 max-w-[40rem]">{dict.portfolio.intro}</p>
        <div className="mt-10">
          <PortfolioGrid projects={projects} lang={lang} dict={dict} />
        </div>
      </section>
    </SiteShell>
  );
}
