// Replaces ONLY the career timeline (the About page) with the entries in db/seed-data.mjs.
// Site text, projects and messages are left alone. Entries you added or edited in /admin/timeline are replaced.
//
//   npm run db:timeline            shows what would change
//   npm run db:timeline -- --yes   does it
import { neon } from "@neondatabase/serverless";
import { timeline } from "../db/seed-data.mjs";

const url = process.env.DATABASE_URL;
if (!url) {
  console.error("DATABASE_URL is not set. Run through npm so .env.local is loaded.");
  process.exit(1);
}
const sql = neon(url);
const confirmed = process.argv.includes("--yes");

const existing = await sql.query("select title, org from timeline order by id");
console.log(`timeline now: ${existing.length} entries`);
for (const e of existing) console.log(`  - ${e.title}${e.org ? ` (${e.org})` : ""}`);
console.log(`timeline from the CV: ${timeline.length} entries`);
for (const e of timeline) console.log(`  + ${e.title} (${e.org})`);

if (!confirmed) {
  console.log("\nNothing changed. Run again with --yes to replace the timeline.");
  process.exit(0);
}

// One transaction: either the whole timeline is swapped or nothing is.
await sql.transaction((tx) => [
  tx.query("delete from timeline"),
  ...timeline.map((e) =>
    tx.query(
      `insert into timeline (kind, starts_on, ends_on, is_current, title, org, description, tags, link_url, published, id_content)
       values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)`,
      [e.kind, e.starts_on, e.ends_on, e.is_current, e.title, e.org, e.description, e.tags, e.link_url, e.published, JSON.stringify(e.id ?? {})],
    ),
  ),
]);
console.log(`\ntimeline replaced: ${timeline.length} entries. The site updates within a day, or at once after any save in /admin.`);
