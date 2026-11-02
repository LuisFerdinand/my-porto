import { cacheLife, cacheTag } from "next/cache";
import { EMPTY_SITE, PROJECT_COLUMNS, TIMELINE_COLUMNS, getSql, rowToProject, rowToSite, rowToTimeline } from "./db";
import type { Locale } from "./i18n/config";
import { PROJECT_TRANSLATABLE, SITE_TRANSLATABLE, TIMELINE_TRANSLATABLE, applyTranslation } from "./i18n/overlay";
import type { Project, SiteSettings, TimelineEntry } from "./types";

// Public reads, in the visitor's language. Cached per language so the pages prerender;
// admin actions call updateTag() to refresh them.

export async function getSite(lang: Locale): Promise<SiteSettings> {
  "use cache";
  cacheTag("site");
  cacheLife("days");

  const rows = await getSql().query("select * from site_settings where id = 1");
  const site = rows[0] ? rowToSite(rows[0]) : EMPTY_SITE;
  return { ...applyTranslation(site, lang, site.idContent, SITE_TRANSLATABLE), idContent: {} };
}

export async function getProjects(lang: Locale): Promise<Project[]> {
  "use cache";
  cacheTag("projects");
  cacheLife("days");

  const rows = await getSql().query(
    `select ${PROJECT_COLUMNS} from projects where published order by sort_order, id`,
  );
  return rows
    .map(rowToProject)
    .map((p) => ({ ...applyTranslation(p, lang, p.idContent, PROJECT_TRANSLATABLE), idContent: {} }));
}

export async function getTimeline(lang: Locale): Promise<TimelineEntry[]> {
  "use cache";
  cacheTag("timeline");
  cacheLife("days");

  // Newest first. The entry marked "current" has no start date and leads the list.
  const rows = await getSql().query(
    `select ${TIMELINE_COLUMNS} from timeline where published
     order by is_current desc, starts_on desc nulls last, id desc`,
  );
  return rows
    .map(rowToTimeline)
    .map((e) => ({ ...applyTranslation(e, lang, e.idContent, TIMELINE_TRANSLATABLE), idContent: {} }));
}
