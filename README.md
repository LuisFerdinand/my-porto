# Portfolio

A bilingual (English and Indonesian) portfolio on Next.js 16. Content lives in Neon Postgres, images in Cloudinary, and everything is edited from a password-protected admin panel.

## Pages

| URL | What it is |
| --- | --- |
| `/en`, `/id` | Home: a short landing page that uses all the data (hero, what I build, selected projects, activity chart, recent timeline, contact call to action) |
| `/en/about` | About: story, vision and mission, stack, and the full career timeline |
| `/en/portfolio` | Portfolio: every published project, filterable by technology |
| `/en/contact` | Contact: address, company and social links, and a form that emails you |
| `/admin` | Admin panel (English only) |

Visiting `/` redirects to the visitor's saved language, or the browser's language, or English. The `EN` menu in the floating nav switches language and remembers the choice.

## Run it

```bash
npm install
npm run db:setup     # creates the tables and seeds starter content (safe to re-run)
npm run dev
```

Open <http://localhost:3000>, then <http://localhost:3000/admin> to sign in.

`npm run db:setup -- --force` overwrites the seeded text, projects and timeline again. It replaces edits you made to those rows, so use it only to reset.

## Environment variables (`.env.local`)

| Variable | What it is |
| --- | --- |
| `DATABASE_URL` | Neon / Postgres connection string |
| `ADMIN_USERNAME`, `ADMIN_PASSWORD` | The admin login. Choose your own password |
| `SESSION_SECRET` | 32+ random characters; signs the admin session cookie |
| `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` | Image uploads. Or one `CLOUDINARY_URL=cloudinary://KEY:SECRET@CLOUD_NAME` |
| `RESEND_API_KEY`, `CONTACT_TO`, `CONTACT_FROM` | Contact form email through Resend (below) |

### Making the contact form email you

Every message from the form is **saved in the database first** (see `/admin/messages`), then emailed to `CONTACT_TO` (default `ferdinandluis88@gmail.com`) through [Resend](https://resend.com). Until `RESEND_API_KEY` is set, messages are saved but not emailed, and the admin Overview says so.

1. Sign up at resend.com with the email address that should receive the messages (ferdinandluis88@gmail.com).
2. API Keys, Create API Key, permission **Sending access**. Copy the key (it starts with `re_`).
3. Put it in `.env.local` as `RESEND_API_KEY=re_…` and restart. On Vercel, add it under Settings, Environment Variables.

Out of the box the mail is sent from Resend's test sender (`onboarding@resend.dev`), which Resend only delivers to your own account email, so it works for this inbox with no domain. To send from your own address, verify a domain under Resend, Domains, then set `CONTACT_FROM="Portfolio <contact@yourdomain.com>"`. Replying to the email answers the visitor directly.

Spam protection: a hidden honeypot field, validation, and a limit of 5 messages per hour per visitor.

## Editing content

Everything on the site is edited in `/admin`. Each translatable text has an English box and a **Bahasa Indonesia** box side by side. If the Indonesian box is empty, the Indonesian page shows the English text.

- **Hero, About, Contact**: your name, role, description, story, vision, mission, stack, address, links.
- **Timeline**: add or edit entries (work, projects, education, milestones) with dates, tags and a link.
- **Projects**: add, edit, reorder, feature on the home page, and publish or keep as a draft. The **Started** date drives the activity chart on the home page.
- **Messages**: the inbox for the contact form.

## How it fits together

- Routes live under `app/[lang]/…`; `proxy.ts` handles the language redirect and guards `/admin`.
- UI text is in `lib/i18n/en.ts` and `id.ts`. Database content is stored in English with the Indonesian text in an `id_content` JSON column (`lib/i18n/overlay.ts`).
- `lib/content.ts` reads public data inside `"use cache"` functions tagged `site`, `projects` and `timeline`; every admin save calls `updateTag()`, so the site updates at once.
- Admin auth is a signed cookie (`lib/session*.ts`); every admin page, server action and route handler re-checks it.
- Image uploads go from the browser straight to Cloudinary with a short-lived signature from `/api/admin/upload-signature`; the API secret never leaves the server.

## Design

The look follows a dashboard reference: a cool blue-grey ground, rounded off-white panels, near-black cards, black pill buttons, soft layering and a geometric sans (Urbanist). Tokens are at the top of `app/globals.css`. The nav floats at the top on desktop and sits at the bottom on phones.

## Checking a production build while `npm run dev` is running

```bash
NEXT_DIST_DIR=.next-verify npm run build
node scripts/verify-start.mjs      # serves it on http://localhost:3010
```

## Before deploying

Set the same environment variables on the host, use a strong `ADMIN_PASSWORD`, set `NEXT_PUBLIC_SITE_URL` to your domain, and rotate any credential that was ever pasted into a repo or chat.
