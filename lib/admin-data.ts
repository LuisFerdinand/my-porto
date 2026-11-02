import "server-only";
import {
  EMPTY_SITE,
  PROJECT_COLUMNS,
  TIMELINE_COLUMNS,
  getSql,
  rowToMessage,
  rowToProject,
  rowToSite,
  rowToTimeline,
} from "./db";
import { requireAdmin } from "./session";
import type { ContactMessage, Project, SiteSettings, TimelineEntry } from "./types";

// Uncached reads for the admin panel, always fresh and always with both languages (idContent).
// Each one checks the session itself, because layouts don't re-run on client-side navigation.

export async function getAdminSite(): Promise<SiteSettings> {
  await requireAdmin();
  const rows = await getSql().query("select * from site_settings where id = 1");
  return rows[0] ? rowToSite(rows[0]) : EMPTY_SITE;
}

export async function getAdminProjects(): Promise<Project[]> {
  await requireAdmin();
  const rows = await getSql().query(`select ${PROJECT_COLUMNS} from projects order by sort_order, id`);
  return rows.map(rowToProject);
}

export async function getAdminProject(id: number): Promise<Project | null> {
  await requireAdmin();
  const rows = await getSql().query(`select ${PROJECT_COLUMNS} from projects where id = $1`, [id]);
  return rows[0] ? rowToProject(rows[0]) : null;
}

export async function getAdminTimeline(): Promise<TimelineEntry[]> {
  await requireAdmin();
  const rows = await getSql().query(
    `select ${TIMELINE_COLUMNS} from timeline order by is_current desc, starts_on desc nulls last, id desc`,
  );
  return rows.map(rowToTimeline);
}

export async function getAdminTimelineEntry(id: number): Promise<TimelineEntry | null> {
  await requireAdmin();
  const rows = await getSql().query(`select ${TIMELINE_COLUMNS} from timeline where id = $1`, [id]);
  return rows[0] ? rowToTimeline(rows[0]) : null;
}

export async function getAdminMessages(): Promise<ContactMessage[]> {
  await requireAdmin();
  const rows = await getSql().query("select * from messages order by created_at desc limit 200");
  return rows.map(rowToMessage);
}
