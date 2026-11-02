export type Highlight = { title: string; text: string };
export type SkillGroup = { group: string; items: string[] };
export type ProjectKind = "personal" | "collaboration";
export type TimelineKind = "work" | "project" | "education" | "milestone";

/** Raw Indonesian text keyed by field name. Only the admin reads it. */
export type TranslationMap = Record<string, unknown>;

export type SiteSettings = {
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  heroPrimaryLabel: string;
  heroPrimaryHref: string;
  heroSecondaryLabel: string;
  heroSecondaryHref: string;
  heroAvailability: string;
  heroImageUrl: string | null;
  heroImagePublicId: string | null;

  aboutHeading: string;
  aboutBody: string;
  aboutQuote: string;
  aboutImageUrl: string | null;
  aboutImagePublicId: string | null;
  aboutHighlights: Highlight[];
  aboutSkills: SkillGroup[];
  vision: string;
  mission: string;

  contactHeading: string;
  contactBody: string;
  contactEmail: string;
  location: string;
  address: string;
  phone: string;
  whatsapp: string;
  githubUrl: string;
  linkedinUrl: string;
  instagramUrl: string;
  resumeUrl: string;

  idContent: TranslationMap;
};

export type Project = {
  id: number;
  slug: string;
  title: string;
  summary: string;
  description: string;
  role: string;
  kind: ProjectKind;
  tags: string[];
  repoUrl: string;
  liveUrl: string;
  imageUrl: string | null;
  imagePublicId: string | null;
  startedOn: string | null;
  lastActivity: string | null;
  featured: boolean;
  published: boolean;
  sortOrder: number;
  idContent: TranslationMap;
};

export type TimelineEntry = {
  id: number;
  kind: TimelineKind;
  startsOn: string | null;
  endsOn: string | null;
  isCurrent: boolean;
  title: string;
  org: string;
  description: string;
  tags: string[];
  linkUrl: string;
  published: boolean;
  idContent: TranslationMap;
};

export type ContactMessage = {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  locale: string;
  emailed: boolean;
  emailError: string;
  isRead: boolean;
  createdAt: string;
};
