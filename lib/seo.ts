import type { Metadata } from "next";
import type { Locale } from "./i18n/config";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

/** Title, description and the language alternates (hreflang) for one page. `path` is "" for the home page. */
export function pageMetadata(lang: Locale, path: string, title: string, description: string): Metadata {
  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    alternates: {
      canonical: `/${lang}${path}`,
      languages: { en: `/en${path}`, id: `/id${path}`, "x-default": `/en${path}` },
    },
    openGraph: {
      title,
      description,
      locale: lang === "id" ? "id_ID" : "en_US",
      type: "website",
      images: [{ url: "/opengraph-image.png", width: 1200, height: 630, alt: "Luis Ferdinand, full-stack web developer" }],
    },
  };
}
