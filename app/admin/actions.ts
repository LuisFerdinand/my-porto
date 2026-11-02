"use server";

import { redirect } from "next/navigation";
import { updateTag } from "next/cache";
import { z } from "zod";
import { getSql } from "@/lib/db";
import { requireAdmin } from "@/lib/session";
import { parseHighlights, parseList, parseSkills, slugify } from "@/lib/format";

export type FormState = { ok?: boolean; message?: string; error?: string };

const text = (max: number) => z.string().trim().max(max, `Keep this under ${max} characters`);
const link = z
  .string()
  .trim()
  .max(500)
  .refine((v) => v === "" || /^(https?:\/\/|\/(?!\/)|#|mailto:)/i.test(v), "Use a link starting with https://, /, # or mailto:");
const imageUrl = z
  .string()
  .trim()
  .max(1000)
  .refine((v) => v === "" || /^(https:\/\/|\/(?!\/))/i.test(v), "Image URLs must start with https:// or /");
const date = z.union([z.literal(""), z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Use the date picker")]);

const field = (formData: FormData, key: string) => String(formData.get(key) ?? "");
const blankToNull = (v: string) => (v ? v : null);

function fail(error: z.ZodError): FormState {
  const issue = error.issues[0];
  const where = issue.path.length ? `${String(issue.path[0]).replace("__id", " (Indonesian)")}: ` : "";
  return { error: `${where}${issue.message}` };
}

/**
 * Every translatable field has an English input `name` and an Indonesian one `name__id`.
 * These collect the Indonesian ones into the object stored in id_content.
 */
const idText = (d: Record<string, unknown>, keys: string[]) =>
  Object.fromEntries(keys.map((k) => [k, String(d[`${k}__id`] ?? "")]));

/** Upserts the single settings row. Column names come from this file only, never from user input. */
async function saveSite(fields: Record<string, string | null>, idPatch: Record<string, unknown> = {}) {
  const cols = Object.keys(fields);
  const values = cols.map((_, i) => `$${i + 1}`).join(", ");
  const sets = cols.map((c) => `${c} = excluded.${c}`).join(", ");
  await getSql().query(
    `insert into site_settings (id, ${cols.join(", ")}, id_content) values (1, ${values}, $${cols.length + 1}::jsonb)
     on conflict (id) do update set ${sets},
       id_content = coalesce(site_settings.id_content, '{}'::jsonb) || excluded.id_content, updated_at = now()`,
    [...Object.values(fields), JSON.stringify(idPatch)],
  );
  updateTag("site");
}

// ---------------------------------------------------------------- hero
export async function saveHero(_prev: FormState, formData: FormData): Promise<FormState> {
  await requireAdmin();
  const parsed = z
    .object({
      heroTitle: text(80).min(1, "Your name is required"),
      heroSubtitle: text(100),
      heroSubtitle__id: text(100),
      heroDescription: text(500),
      heroDescription__id: text(500),
      heroPrimaryLabel: text(40),
      heroPrimaryLabel__id: text(40),
      heroPrimaryHref: link,
      heroSecondaryLabel: text(40),
      heroSecondaryLabel__id: text(40),
      heroSecondaryHref: link,
      heroAvailability: text(80),
      heroAvailability__id: text(80),
      heroImageUrl: imageUrl,
      heroImagePublicId: text(300),
    })
    .safeParse(Object.fromEntries(formData));
  if (!parsed.success) return fail(parsed.error);
  const d = parsed.data;

  await saveSite(
    {
      hero_title: d.heroTitle,
      hero_subtitle: d.heroSubtitle,
      hero_description: d.heroDescription,
      hero_primary_label: d.heroPrimaryLabel,
      hero_primary_href: d.heroPrimaryHref,
      hero_secondary_label: d.heroSecondaryLabel,
      hero_secondary_href: d.heroSecondaryHref,
      hero_availability: d.heroAvailability,
      hero_image_url: blankToNull(d.heroImageUrl),
      hero_image_public_id: blankToNull(d.heroImageUrl ? d.heroImagePublicId : ""),
    },
    idText(d, ["heroSubtitle", "heroDescription", "heroPrimaryLabel", "heroSecondaryLabel", "heroAvailability"]),
  );
  return { ok: true, message: "Hero saved in both languages." };
}

// ---------------------------------------------------------------- about
export async function saveAbout(_prev: FormState, formData: FormData): Promise<FormState> {
  await requireAdmin();
  const parsed = z
    .object({
      aboutHeading: text(160),
      aboutHeading__id: text(160),
      aboutBody: text(3000),
      aboutBody__id: text(3000),
      aboutQuote: text(240),
      aboutQuote__id: text(240),
      aboutImageUrl: imageUrl,
      aboutImagePublicId: text(300),
      aboutHighlights: text(2000),
      aboutHighlights__id: text(2000),
      aboutSkills: text(2000),
      vision: text(600),
      vision__id: text(600),
      mission: text(2000),
      mission__id: text(2000),
    })
    .safeParse(Object.fromEntries(formData));
  if (!parsed.success) return fail(parsed.error);
  const d = parsed.data;

  await saveSite(
    {
      about_heading: d.aboutHeading,
      about_body: d.aboutBody,
      about_quote: d.aboutQuote,
      about_image_url: blankToNull(d.aboutImageUrl),
      about_image_public_id: blankToNull(d.aboutImageUrl ? d.aboutImagePublicId : ""),
      about_highlights: JSON.stringify(parseHighlights(d.aboutHighlights)),
      about_skills: JSON.stringify(parseSkills(d.aboutSkills)),
      vision: d.vision,
      mission: d.mission,
    },
    {
      ...idText(d, ["aboutHeading", "aboutBody", "aboutQuote", "vision", "mission"]),
      aboutHighlights: parseHighlights(d.aboutHighlights__id),
    },
  );
  return { ok: true, message: "About page saved in both languages." };
}

// ---------------------------------------------------------------- contact
export async function saveContact(_prev: FormState, formData: FormData): Promise<FormState> {
  await requireAdmin();
  const parsed = z
    .object({
      contactHeading: text(160),
      contactHeading__id: text(160),
      contactBody: text(500),
      contactBody__id: text(500),
      contactEmail: z.union([z.literal(""), z.email("Enter a valid email address")]),
      location: text(120),
      address: text(300),
      phone: text(40),
      whatsapp: text(40),
      company: text(120),
      companyUrl: link,
      githubUrl: link,
      linkedinUrl: link,
      instagramUrl: link,
      resumeUrl: link,
    })
    .safeParse(Object.fromEntries(formData));
  if (!parsed.success) return fail(parsed.error);
  const d = parsed.data;

  await saveSite(
    {
      contact_heading: d.contactHeading,
      contact_body: d.contactBody,
      contact_email: d.contactEmail,
      location: d.location,
      address: d.address,
      phone: d.phone,
      whatsapp: d.whatsapp,
      company: d.company,
      company_url: d.companyUrl,
      github_url: d.githubUrl,
      linkedin_url: d.linkedinUrl,
      instagram_url: d.instagramUrl,
      resume_url: d.resumeUrl,
    },
    idText(d, ["contactHeading", "contactBody"]),
  );
  return { ok: true, message: "Contact details saved." };
}

// ---------------------------------------------------------------- projects
const projectSchema = z.object({
  id: z.string().regex(/^\d*$/),
  title: text(120).min(1, "A title is required"),
  slug: text(60),
  summary: text(180),
  summary__id: text(180),
  description: text(1500),
  description__id: text(1500),
  role: text(100),
  role__id: text(100),
  kind: z.enum(["personal", "collaboration"]),
  tags: text(300),
  repoUrl: link,
  liveUrl: link,
  imageUrl,
  imagePublicId: text(300),
  startedOn: date,
  lastActivity: date,
  sortOrder: z.string().regex(/^-?\d{0,6}$/, "Order must be a whole number"),
});

export async function saveProject(_prev: FormState, formData: FormData): Promise<FormState> {
  await requireAdmin();
  const parsed = projectSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return fail(parsed.error);
  const d = parsed.data;
  const published = formData.get("published") === "on";
  const featured = formData.get("featured") === "on";
  const slug = slugify(d.slug || d.title);
  if (!slug) return { error: "slug: Use letters or numbers" };

  const db = getSql();
  const id = d.id ? Number(d.id) : null;
  let sortOrder = d.sortOrder === "" ? null : Number(d.sortOrder);
  if (sortOrder === null) {
    const [{ next }] = await db.query("select coalesce(max(sort_order), 0) + 10 as next from projects");
    sortOrder = Number(next);
  }

  const values = [
    slug,
    d.title,
    d.summary,
    d.description,
    d.role,
    d.kind,
    parseList(d.tags),
    d.repoUrl,
    d.liveUrl,
    blankToNull(d.imageUrl),
    blankToNull(d.imageUrl ? d.imagePublicId : ""),
    blankToNull(d.startedOn),
    blankToNull(d.lastActivity),
    published,
    featured,
    sortOrder,
    JSON.stringify(idText(d, ["summary", "description", "role"])),
  ];

  try {
    if (id) {
      await db.query(
        `update projects set slug=$1, title=$2, summary=$3, description=$4, role=$5, kind=$6, tags=$7,
           repo_url=$8, live_url=$9, image_url=$10, image_public_id=$11, started_on=$12, last_activity=$13,
           published=$14, featured=$15, sort_order=$16, id_content=$17::jsonb, updated_at=now()
         where id=$18`,
        [...values, id],
      );
    } else {
      await db.query(
        `insert into projects (slug, title, summary, description, role, kind, tags, repo_url, live_url,
           image_url, image_public_id, started_on, last_activity, published, featured, sort_order, id_content)
         values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17::jsonb)`,
        values,
      );
    }
  } catch (err) {
    if (typeof err === "object" && err && "code" in err && err.code === "23505") {
      return { error: `slug: “${slug}” is already used by another project` };
    }
    throw err;
  }

  updateTag("projects");
  if (!id) redirect("/admin/projects");
  return { ok: true, message: published ? "Project saved and live." : "Project saved as a draft." };
}

export async function deleteProject(formData: FormData) {
  await requireAdmin();
  const id = Number(field(formData, "id"));
  if (!Number.isInteger(id) || id <= 0) return;
  await getSql().query("delete from projects where id = $1", [id]);
  updateTag("projects");
  redirect("/admin/projects");
}

// ---------------------------------------------------------------- timeline
const timelineSchema = z.object({
  id: z.string().regex(/^\d*$/),
  kind: z.enum(["work", "project", "education", "milestone"]),
  startsOn: date,
  endsOn: date,
  title: text(140).min(1, "A title is required"),
  title__id: text(140),
  org: text(160),
  org__id: text(160),
  description: text(800),
  description__id: text(800),
  tags: text(300),
  linkUrl: link,
});

export async function saveTimeline(_prev: FormState, formData: FormData): Promise<FormState> {
  await requireAdmin();
  const parsed = timelineSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return fail(parsed.error);
  const d = parsed.data;
  const isCurrent = formData.get("isCurrent") === "on";
  const published = formData.get("published") === "on";
  if (d.startsOn && d.endsOn && d.endsOn < d.startsOn) return { error: "endsOn: The end date is before the start date" };

  const db = getSql();
  const id = d.id ? Number(d.id) : null;
  const values = [
    d.kind,
    blankToNull(d.startsOn),
    blankToNull(isCurrent ? "" : d.endsOn),
    isCurrent,
    d.title,
    d.org,
    d.description,
    parseList(d.tags),
    d.linkUrl,
    published,
    JSON.stringify(idText(d, ["title", "org", "description"])),
  ];

  if (id) {
    await db.query(
      `update timeline set kind=$1, starts_on=$2, ends_on=$3, is_current=$4, title=$5, org=$6, description=$7,
         tags=$8, link_url=$9, published=$10, id_content=$11::jsonb where id=$12`,
      [...values, id],
    );
  } else {
    await db.query(
      `insert into timeline (kind, starts_on, ends_on, is_current, title, org, description, tags, link_url, published, id_content)
       values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11::jsonb)`,
      values,
    );
  }

  updateTag("timeline");
  if (!id) redirect("/admin/timeline");
  return { ok: true, message: published ? "Entry saved and live." : "Entry saved as hidden." };
}

export async function deleteTimeline(formData: FormData) {
  await requireAdmin();
  const id = Number(field(formData, "id"));
  if (!Number.isInteger(id) || id <= 0) return;
  await getSql().query("delete from timeline where id = $1", [id]);
  updateTag("timeline");
  redirect("/admin/timeline");
}

// ---------------------------------------------------------------- messages
export async function toggleMessageRead(formData: FormData) {
  await requireAdmin();
  const id = Number(field(formData, "id"));
  if (!Number.isInteger(id) || id <= 0) return;
  await getSql().query("update messages set is_read = not is_read where id = $1", [id]);
  redirect("/admin/messages");
}

export async function deleteMessage(formData: FormData) {
  await requireAdmin();
  const id = Number(field(formData, "id"));
  if (!Number.isInteger(id) || id <= 0) return;
  await getSql().query("delete from messages where id = $1", [id]);
  redirect("/admin/messages");
}
