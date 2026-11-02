-- Portfolio schema. Safe to run repeatedly (scripts/db-setup.mjs does).

create table if not exists site_settings (
  id integer primary key default 1 check (id = 1),

  -- hero
  hero_title text not null default '',
  hero_subtitle text not null default '',
  hero_description text not null default '',
  hero_primary_label text not null default 'View my work',
  hero_primary_href text not null default '#work',
  hero_secondary_label text not null default 'Get in touch',
  hero_secondary_href text not null default '#contact',
  hero_availability text not null default '',
  hero_image_url text,
  hero_image_public_id text,

  -- about
  about_heading text not null default '',
  about_body text not null default '',
  about_quote text not null default '',
  about_image_url text,
  about_image_public_id text,
  about_highlights jsonb not null default '[]'::jsonb,
  about_skills jsonb not null default '[]'::jsonb,

  -- work + contact
  work_heading text not null default 'Selected work',
  work_intro text not null default '',
  contact_heading text not null default '',
  contact_body text not null default '',
  contact_email text not null default '',
  location text not null default '',
  github_url text not null default '',
  linkedin_url text not null default '',
  resume_url text not null default '',

  updated_at timestamptz not null default now()
);

create table if not exists projects (
  id serial primary key,
  slug text not null unique,
  title text not null,
  summary text not null default '',
  description text not null default '',
  role text not null default '',
  kind text not null default 'personal' check (kind in ('personal', 'collaboration')),
  tags text[] not null default '{}',
  repo_url text not null default '',
  live_url text not null default '',
  image_url text,
  image_public_id text,
  last_activity date,
  published boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists projects_order_idx on projects (published, sort_order);

-- Removed from earlier designs
alter table site_settings drop column if exists hero_greeting;
alter table site_settings drop column if exists work_heading;
alter table site_settings drop column if exists work_intro;
-- The current employer is deliberately not shown on the site
alter table site_settings drop column if exists company;
alter table site_settings drop column if exists company_url;
alter table projects drop column if exists day_time;
alter table projects drop column if exists day_note;

-- Multi-page, bilingual site. Every translatable text lives in English in its own column, and the
-- Indonesian version sits in id_content (a JSON object keyed by field name). Empty means "use English".
alter table site_settings add column if not exists vision text not null default '';
alter table site_settings add column if not exists mission text not null default '';
alter table site_settings add column if not exists address text not null default '';
alter table site_settings add column if not exists phone text not null default '';
alter table site_settings add column if not exists whatsapp text not null default '';
alter table site_settings add column if not exists instagram_url text not null default '';
alter table site_settings add column if not exists id_content jsonb not null default '{}'::jsonb;
alter table site_settings add column if not exists seed_version integer not null default 1;

alter table projects add column if not exists started_on date;
alter table projects add column if not exists featured boolean not null default false;
alter table projects add column if not exists id_content jsonb not null default '{}'::jsonb;

-- The career timeline shown on the About page
create table if not exists timeline (
  id serial primary key,
  kind text not null default 'project' check (kind in ('work', 'project', 'education', 'milestone')),
  starts_on date,
  ends_on date,
  is_current boolean not null default false,
  title text not null,
  org text not null default '',
  description text not null default '',
  tags text[] not null default '{}',
  link_url text not null default '',
  published boolean not null default true,
  id_content jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

-- Messages sent from the contact form
create table if not exists messages (
  id serial primary key,
  name text not null,
  email text not null,
  subject text not null default '',
  message text not null,
  locale text not null default 'en',
  ip text not null default '',
  emailed boolean not null default false,
  email_error text not null default '',
  is_read boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists messages_created_idx on messages (created_at desc);
create index if not exists timeline_order_idx on timeline (published, starts_on desc)
