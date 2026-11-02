import type { ReactNode } from "react";
import { getSite } from "@/lib/content";
import { initialsOf } from "@/lib/format";
import { getDictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n/config";
import { Footer } from "./footer";
import { SiteNav } from "./site-nav";

/** Nav, page content and footer for every public page. `children` are the panels of the page. */
export async function SiteShell({ lang, children }: { lang: Locale; children: ReactNode }) {
  const site = await getSite(lang);
  const dict = getDictionary(lang);

  return (
    <>
      <SiteNav lang={lang} labels={dict.nav} name={site.heroTitle} initials={initialsOf(site.heroTitle)} />
      <main className="page">
        {children}
        <Footer lang={lang} dict={dict} site={site} />
      </main>
    </>
  );
}
