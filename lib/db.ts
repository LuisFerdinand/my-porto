import "server-only";
import { neon } from "@neondatabase/serverless";
import type { NeonQueryFunction } from "@neondatabase/serverless";
import type { ContactMessage, Project, SiteSettings, TimelineEntry, TranslationMap } from "./types";

type Row = Record<string, unknown>;

let client: NeonQueryFunction<false, false> | undefined;

export function getSql() {
  if (!client) {
    const url = process.env.DATABASE_URL;
    if (!url) throw new Error("DATABASE_URL is not set");
    client = neon(url);
  }
  return client;
}

export const EMPTY_SITE: SiteSettings = {
  heroTitle: "Your Name",
  heroSubtitle: "Your role",
  heroDescription: "Run `npm run db:setup` to seed the database, then edit this from /admin.",
  heroPrimaryLabel: "View portfolio",
  heroPrimaryHref: "/portfolio",
  heroSecondaryLabel: "Get in touch",
  heroSecondaryHref: "/contact",
  heroAvailability: "",
  heroImageUrl: null,
  heroImagePublicId: null,
  aboutHeading: "About me",
  aboutBody: "",
  aboutQuote: "",
  aboutImageUrl: null,
  aboutImagePublicId: null,
  aboutHighlights: [],
  aboutSkills: [],
  vision: "",
  mission: "",
  contactHeading: "Get in touch",
  contactBody: "",
  contactEmail: "",
  location: "",
  address: "",
  phone: "",
  whatsapp: "",
  githubUrl: "",
  linkedinUrl: "",
  instagramUrl: "",
  resumeUrl: "",
  idContent: {},
};

const str = (v: unknown) => (typeof v === "string" ? v : "");
const nullableStr = (v: unknown) => (typeof v === "string" && v ? v : null);
const map = (v: unknown): TranslationMap => (v && typeof v === "object" && !Array.isArray(v) ? (v as TranslationMap) : {});
const iso = (v: unknown) => (v instanceof Date ? v.toISOString() : str(v));

export function rowToSite(r: Row): SiteSettings {
  return {
    heroTitle: str(r.hero_title),
    heroSubtitle: str(r.hero_subtitle),
    heroDescription: str(r.hero_description),
    heroPrimaryLabel: str(r.hero_primary_label),
    heroPrimaryHref: str(r.hero_primary_href),
    heroSecondaryLabel: str(r.hero_secondary_label),
    heroSecondaryHref: str(r.hero_secondary_href),
    heroAvailability: str(r.hero_availability),
    heroImageUrl: nullableStr(r.hero_image_url),
    heroImagePublicId: nullableStr(r.hero_image_public_id),
    aboutHeading: str(r.about_heading),
    aboutBody: str(r.about_body),
    aboutQuote: str(r.about_quote),
    aboutImageUrl: nullableStr(r.about_image_url),
    aboutImagePublicId: nullableStr(r.about_image_public_id),
    aboutHighlights: Array.isArray(r.about_highlights) ? (r.about_highlights as SiteSettings["aboutHighlights"]) : [],
    aboutSkills: Array.isArray(r.about_skills) ? (r.about_skills as SiteSettings["aboutSkills"]) : [],
    vision: str(r.vision),
    mission: str(r.mission),
    contactHeading: str(r.contact_heading),
    contactBody: str(r.contact_body),
    contactEmail: str(r.contact_email),
    location: str(r.location),
    address: str(r.address),
    phone: str(r.phone),
    whatsapp: str(r.whatsapp),
    githubUrl: str(r.github_url),
    linkedinUrl: str(r.linkedin_url),
    instagramUrl: str(r.instagram_url),
    resumeUrl: str(r.resume_url),
    idContent: map(r.id_content),
  };
}

export function rowToProject(r: Row): Project {
  return {
    id: Number(r.id),
    slug: str(r.slug),
    title: str(r.title),
    summary: str(r.summary),
    description: str(r.description),
    role: str(r.role),
    kind: r.kind === "collaboration" ? "collaboration" : "personal",
    tags: Array.isArray(r.tags) ? (r.tags as string[]) : [],
    repoUrl: str(r.repo_url),
    liveUrl: str(r.live_url),
    imageUrl: nullableStr(r.image_url),
    imagePublicId: nullableStr(r.image_public_id),
    startedOn: nullableStr(r.started_on),
    lastActivity: nullableStr(r.last_activity),
    featured: Boolean(r.featured),
    published: Boolean(r.published),
    sortOrder: Number(r.sort_order ?? 0),
    idContent: map(r.id_content),
  };
}

export function rowToTimeline(r: Row): TimelineEntry {
  const kind = str(r.kind);
  return {
    id: Number(r.id),
    kind: kind === "work" || kind === "education" || kind === "milestone" ? kind : "project",
    startsOn: nullableStr(r.starts_on),
    endsOn: nullableStr(r.ends_on),
    isCurrent: Boolean(r.is_current),
    title: str(r.title),
    org: str(r.org),
    description: str(r.description),
    tags: Array.isArray(r.tags) ? (r.tags as string[]) : [],
    linkUrl: str(r.link_url),
    published: Boolean(r.published),
    idContent: map(r.id_content),
  };
}

export function rowToMessage(r: Row): ContactMessage {
  return {
    id: Number(r.id),
    name: str(r.name),
    email: str(r.email),
    subject: str(r.subject),
    message: str(r.message),
    locale: str(r.locale),
    emailed: Boolean(r.emailed),
    emailError: str(r.email_error),
    isRead: Boolean(r.is_read),
    createdAt: iso(r.created_at),
  };
}

/** Dates are selected as plain text so they never shift with the time zone. */
export const PROJECT_COLUMNS = `id, slug, title, summary, description, role, kind, tags, repo_url, live_url,
  image_url, image_public_id, to_char(started_on, 'YYYY-MM-DD') as started_on,
  to_char(last_activity, 'YYYY-MM-DD') as last_activity, featured, published, sort_order, id_content`;

export const TIMELINE_COLUMNS = `id, kind, to_char(starts_on, 'YYYY-MM-DD') as starts_on,
  to_char(ends_on, 'YYYY-MM-DD') as ends_on, is_current, title, org, description, tags, link_url, published, id_content`;
