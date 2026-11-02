import type { Locale } from "./config";

/**
 * Translatable content is stored in English in its own columns, with the Indonesian text in an
 * `id_content` JSON object keyed by field name. Anything left empty there falls back to English.
 */
export function applyTranslation<T extends object>(
  base: T,
  lang: Locale,
  overrides: Record<string, unknown> | undefined,
  keys: readonly (keyof T & string)[],
): T {
  if (lang === "en" || !overrides) return base;
  const out = { ...base } as Record<string, unknown>;
  for (const key of keys) {
    const value = overrides[key];
    if (typeof value === "string" && value.trim()) out[key] = value;
    else if (Array.isArray(value) && value.length > 0) out[key] = value;
  }
  return out as T;
}

export const SITE_TRANSLATABLE = [
  "heroSubtitle",
  "heroDescription",
  "heroPrimaryLabel",
  "heroSecondaryLabel",
  "heroAvailability",
  "aboutHeading",
  "aboutBody",
  "aboutQuote",
  "aboutHighlights",
  "vision",
  "mission",
  "contactHeading",
  "contactBody",
] as const;

export const PROJECT_TRANSLATABLE = ["summary", "description", "role"] as const;
export const TIMELINE_TRANSLATABLE = ["title", "org", "description"] as const;
