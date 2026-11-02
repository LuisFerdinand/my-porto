import type { Locale } from "./i18n/config";
import { LOCALE_NAMES } from "./i18n/config";
import type { TimelineEntry } from "./types";

const fmt = (date: string, lang: Locale, opts: Intl.DateTimeFormatOptions) =>
  new Date(`${date}T00:00:00Z`).toLocaleDateString(LOCALE_NAMES[lang].tag, { timeZone: "UTC", ...opts });

/** "Jun – Aug 2026", "Jun 2025 – Jan 2026", "Oct 2026" or the word for "now". */
export function formatPeriod(entry: TimelineEntry, lang: Locale, presentLabel: string): string {
  if (entry.isCurrent && !entry.startsOn) return presentLabel;
  if (!entry.startsOn) return "";
  const start = entry.startsOn;
  const full = fmt(start, lang, { month: "short", year: "numeric" });
  const end = entry.endsOn;
  const from = entry.isCurrent ? full : null;
  if (entry.isCurrent) return `${from} – ${presentLabel}`;
  if (!end || end.slice(0, 7) === start.slice(0, 7)) return full;
  if (end.slice(0, 4) === start.slice(0, 4)) {
    return `${fmt(start, lang, { month: "short" })} – ${fmt(end, lang, { month: "short", year: "numeric" })}`;
  }
  return `${full} – ${fmt(end, lang, { month: "short", year: "numeric" })}`;
}
