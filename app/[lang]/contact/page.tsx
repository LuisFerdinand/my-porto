import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContactForm } from "@/components/site/contact-form";
import { ContactInfo } from "@/components/site/contact-info";
import { SiteShell } from "@/components/site/site-shell";
import { getSite } from "@/lib/content";
import { getDictionary } from "@/lib/i18n";
import { isLocale } from "@/lib/i18n/config";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const [site, dict] = [await getSite(lang), getDictionary(lang)];
  return pageMetadata(lang, "/contact", `${dict.contact.title} · ${site.heroTitle}`, site.contactBody);
}

export default async function ContactPage({ params }: Props) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const site = await getSite(lang);
  const dict = getDictionary(lang);

  return (
    <SiteShell lang={lang}>
      <section className="surface" aria-labelledby="contact-title">
        <p className="chip">{dict.contact.title}</p>
        <h1 id="contact-title" className="h1 mt-5 max-w-[16ch] !text-[clamp(2.25rem,1.2rem+3.6vw,4rem)]">
          {site.contactHeading}
        </h1>
        {site.contactBody && <p className="lead mt-4 max-w-[36rem]">{site.contactBody}</p>}

        <div className="grid12 mt-10 items-start gap-y-8">
          <div className="col-span-12 lg:col-span-5">
            <h2 className="h3 mb-4">{dict.contact.infoTitle}</h2>
            <ContactInfo site={site} dict={dict} />
          </div>
          <div className="col-span-12 lg:col-span-7">
            <h2 className="h3 mb-4">{dict.contact.formTitle}</h2>
            <ContactForm lang={lang} dict={dict} />
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
