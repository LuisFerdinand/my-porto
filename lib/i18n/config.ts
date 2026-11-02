export const LOCALES = ["en", "id"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";
export const LOCALE_COOKIE = "NEXT_LOCALE";

export const LOCALE_NAMES: Record<Locale, { short: string; name: string; tag: string }> = {
  en: { short: "EN", name: "English", tag: "en-US" },
  id: { short: "ID", name: "Bahasa Indonesia", tag: "id-ID" },
};

export function isLocale(value: string | undefined | null): value is Locale {
  return !!value && (LOCALES as readonly string[]).includes(value);
}

/** Internal links stored in the database ("/portfolio") get the current language in front. */
export function localizeHref(lang: Locale, href: string): string {
  if (!href.startsWith("/") || href.startsWith("//")) return href;
  return href === "/" ? `/${lang}` : `/${lang}${href}`;
}

/** Picks a locale from an Accept-Language header such as "id-ID,id;q=0.9,en;q=0.8". */
export function localeFromAcceptLanguage(header: string | null): Locale {
  if (!header) return DEFAULT_LOCALE;
  const ranked = header
    .split(",")
    .map((part) => {
      const [tag, q] = part.trim().split(";q=");
      return { code: tag.slice(0, 2).toLowerCase(), q: q ? Number(q) : 1 };
    })
    .sort((a, b) => b.q - a.q);
  for (const { code } of ranked) {
    if (code === "id" || code === "in") return "id";
    if (code === "en") return "en";
  }
  return DEFAULT_LOCALE;
}
