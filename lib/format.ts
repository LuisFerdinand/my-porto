import type { Highlight, SkillGroup } from "./types";

// The admin edits lists as plain text so the forms need no client-side state.
//   Highlights:  Title | One sentence of detail          (one per line)
//   Skills:      Group name: item, item, item            (one group per line)
//   Tags:        item, item, item

export function parseHighlights(text: string): Highlight[] {
  return text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [title, ...rest] = line.split("|");
      return { title: title.trim(), text: rest.join("|").trim() };
    })
    .filter((h) => h.title);
}

export function formatHighlights(items: Highlight[]): string {
  return items.map((h) => `${h.title} | ${h.text}`).join("\n");
}

export function parseSkills(text: string): SkillGroup[] {
  return text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [group, ...rest] = line.split(":");
      return { group: group.trim(), items: parseList(rest.join(":")) };
    })
    .filter((g) => g.group && g.items.length);
}

export function formatSkills(groups: SkillGroup[]): string {
  return groups.map((g) => `${g.group}: ${g.items.join(", ")}`).join("\n");
}

export function parseList(text: string): string[] {
  const seen = new Set<string>();
  for (const part of text.split(",")) {
    const item = part.trim();
    if (item) seen.add(item);
  }
  return [...seen];
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

export function initialsOf(name: string): string {
  const letters = name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "");
  return letters.join("") || "•";
}

const TAGS = { en: "en-US", id: "id-ID" } as const;

/** "Oct 2026" / "Okt 2026". Dates are plain YYYY-MM-DD strings, formatted in UTC so they never shift. */
export function formatMonth(date: string | null, lang: "en" | "id" = "en"): string {
  if (!date) return "";
  const d = new Date(`${date}T00:00:00Z`);
  return Number.isNaN(d.getTime())
    ? ""
    : d.toLocaleDateString(TAGS[lang], { month: "short", year: "numeric", timeZone: "UTC" });
}

export function yearOf(date: string | null): number | null {
  const y = date ? Number(date.slice(0, 4)) : NaN;
  return Number.isFinite(y) ? y : null;
}
