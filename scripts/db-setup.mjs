// Creates the tables and seeds starter content. Safe to re-run:
//   - site text is refreshed once per SEED_VERSION, never your images
//   - projects and timeline entries you have edited are left alone
// Pass --force to overwrite every seeded text and project again.
//
//   npm run db:setup
//   npm run db:setup -- --force
import { readFileSync } from "node:fs";
import { neon } from "@neondatabase/serverless";
import { SEED_VERSION, legacySlugs, projects, site, siteId, timeline } from "../db/seed-data.mjs";

const force = process.argv.includes("--force");
const url = process.env.DATABASE_URL;
if (!url) {
  console.error("DATABASE_URL is not set. Run through npm so .env.local is loaded.");
  process.exit(1);
}
const sql = neon(url);

const schema = readFileSync(new URL("../db/schema.sql", import.meta.url), "utf8");
for (const statement of schema.split(/;\s*\n/).map((s) => s.trim()).filter(Boolean)) {
  await sql.query(statement);
}
console.log("schema ready");

// ---- site settings ----
await sql.query("insert into site_settings (id) values (1) on conflict (id) do nothing");
const [{ seed_version: current }] = await sql.query("select seed_version from site_settings where id = 1");
if (force || current < SEED_VERSION) {
  const cols = Object.keys(site);
  const jsonCols = new Set(["about_highlights", "about_skills"]);
  const values = cols.map((c) => (jsonCols.has(c) ? JSON.stringify(site[c]) : site[c]));
  const sets = cols.map((c, i) => `${c} = $${i + 1}`).join(", ");
  await sql.query(
    `update site_settings set ${sets}, id_content = $${cols.length + 1}, seed_version = $${cols.length + 2}, updated_at = now() where id = 1`,
    [...values, JSON.stringify(siteId), SEED_VERSION],
  );
  console.log(`site text seeded (version ${SEED_VERSION})`);
} else {
  console.log("site text already at the current seed version");
}

// ---- projects ----
// Rows from the earlier seed: delete the untouched ones, unpublish any you edited.
await sql.query("delete from projects where slug = any($1) and updated_at = created_at", [legacySlugs]);
await sql.query("update projects set published = false where slug = any($1)", [legacySlugs]);

for (const pr of projects) {
  const values = [
    pr.slug, pr.title, pr.summary ?? "", pr.description ?? "", pr.role, pr.kind, pr.tags, pr.repo_url, pr.live_url,
    pr.image_url, pr.started_on, pr.last_activity, pr.sort_order, pr.published, pr.featured, JSON.stringify(pr.id ?? {}),
  ];
  await sql.query(
    `insert into projects (slug, title, summary, description, role, kind, tags, repo_url, live_url, image_url,
       started_on, last_activity, sort_order, published, featured, id_content)
     values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16)
     on conflict (slug) do update set title = excluded.title, summary = excluded.summary,
       description = excluded.description, role = excluded.role, kind = excluded.kind, tags = excluded.tags,
       repo_url = excluded.repo_url, live_url = excluded.live_url, image_url = excluded.image_url,
       started_on = excluded.started_on, last_activity = excluded.last_activity, sort_order = excluded.sort_order,
       published = excluded.published, featured = excluded.featured, id_content = excluded.id_content, updated_at = now()
     ${force ? "" : "where projects.updated_at = projects.created_at"}`,
    values,
  );
}
const [{ n: projectCount }] = await sql.query("select count(*)::int as n from projects");
console.log(`projects in database: ${projectCount}`);

// ---- timeline ----
const [{ n: timelineCount }] = await sql.query("select count(*)::int as n from timeline");
if (force || timelineCount === 0) {
  if (force) await sql.query("delete from timeline");
  for (const e of timeline) {
    await sql.query(
      `insert into timeline (kind, starts_on, ends_on, is_current, title, org, description, tags, link_url, published, id_content)
       values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)`,
      [e.kind, e.starts_on, e.ends_on, e.is_current, e.title, e.org, e.description, e.tags, e.link_url, e.published, JSON.stringify(e.id ?? {})],
    );
  }
  console.log(`timeline seeded: ${timeline.length} entries`);
} else {
  console.log(`timeline already has ${timelineCount} entries`);
}
