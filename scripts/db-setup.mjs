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

// The current employer is deliberately not shown on the site. Earlier seeds included it, so scrub those once,
// before the schema drops the old company columns. This only does anything while those columns still exist.
const [{ has: hadCompany }] = await sql.query(
  "select exists (select 1 from information_schema.columns where table_name = 'site_settings' and column_name = 'company') as has",
);
if (hadCompany) {
  await sql.query(`
    update site_settings set
      address = case when address like 'Jl. Daan Mogot%' then '' else address end,
      location = case when location = 'Jakarta, Indonesia' then 'Indonesia' else location end,
      about_body = replace(replace(about_body, ' I work at PT Panatrade Caraka in West Jakarta.', ''), 'based in Jakarta', 'based in Indonesia'),
      id_content = case when id_content ? 'aboutBody'
        then jsonb_set(id_content, '{aboutBody}', to_jsonb(replace(replace(id_content->>'aboutBody', ' Saya bekerja di PT Panatrade Caraka, Jakarta Barat.', ''), 'berbasis di Jakarta', 'berbasis di Indonesia')))
        else id_content end,
      hero_image_url = coalesce(hero_image_url, '/people/hero.webp'),
      about_image_url = coalesce(about_image_url, '/people/about.webp')
    where id = 1`);
  await sql.query("delete from timeline where title = 'PT Panatrade Caraka'");
  await sql.query("update timeline set org = 'Company Service' where org = 'Company Service · Panatrade Prestasi'");
  await sql.query("delete from projects where slug = 'panatrade-prestasi' and updated_at = created_at");
  console.log("company identity removed from earlier seeds; default photos set");
}

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

// Social links added after the first seed: fill them only while the field is still empty, so edits made in /admin win.
await sql.query("update site_settings set linkedin_url = $1 where id = 1 and linkedin_url = ''", [site.linkedin_url]);
await sql.query("update site_settings set phone = $1 where id = 1 and phone = ''", [site.phone]);
await sql.query("update site_settings set whatsapp = $1 where id = 1 and whatsapp = ''", [site.whatsapp]);
await sql.query("update site_settings set instagram_url = $1 where id = 1 and instagram_url = ''", [site.instagram_url]);

// ---- projects ----
// Seeding keeps updated_at equal to created_at, which is how an unedited row is told apart from one changed in /admin.
// The two Knock/KINY drafts were published by this seed after being drafts; no one had edited them, so release them once.
await sql.query("update projects set updated_at = created_at where slug in ('knock-website', 'kimi-group') and published = false and image_url is null");
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
       published = excluded.published, featured = excluded.featured, id_content = excluded.id_content,
       updated_at = projects.created_at
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
  await sql.query("update timeline set org = replace(org, 'Kimi Group', 'KINY GROUP') where org like '%Kimi Group%'");
}
