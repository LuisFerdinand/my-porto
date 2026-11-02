// Read-only: reports what already exists in the configured database. Never prints the connection string.
import { neon } from "@neondatabase/serverless";

const url = process.env.DATABASE_URL;
if (!url) {
  console.log("DATABASE_URL is not set");
  process.exit(1);
}
const sql = neon(url);
try {
  const [info] = await sql`select current_database() as db, current_user as role, split_part(version(), ' ', 2) as pg`;
  console.log("connected:", info);
  const tables = await sql`
    select table_name from information_schema.tables
    where table_schema = 'public' order by table_name`;
  console.log("public tables:", tables.length ? tables.map((t) => t.table_name).join(", ") : "(none)");
} catch (err) {
  console.log("connection failed:", err.code ?? "", String(err.message).replace(/postgres(ql)?:\/\/[^\s]+/g, "<url>"));
  process.exit(1);
}
