import type { Project } from "./types";

const MONTHS = {
  en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  id: ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"],
} as const;

export type ActivityPoint = { label: string; full: string; value: number };

/** Cumulative projects by month over the last `window` months, from each project's start date. */
export function buildActivity(projects: Project[], lang: "en" | "id", window = 8): ActivityPoint[] {
  const starts = projects.map((p) => p.startedOn).filter((d): d is string => !!d).sort();
  if (starts.length === 0) return [];

  const last = starts[starts.length - 1];
  let year = Number(last.slice(0, 4));
  let month = Number(last.slice(5, 7)) - 1;

  const points: ActivityPoint[] = [];
  for (let i = 0; i < window; i++) {
    const key = `${year}-${String(month + 1).padStart(2, "0")}`;
    const value = starts.filter((d) => d.slice(0, 7) <= key).length;
    points.unshift({ label: MONTHS[lang][month], full: `${MONTHS[lang][month]} ${year}`, value });
    month -= 1;
    if (month < 0) {
      month = 11;
      year -= 1;
    }
  }
  return points;
}

/** Which technology appears in the most projects, and the next few, for the ring chart. */
export function buildStackShare(projects: Project[]) {
  const counts = new Map<string, number>();
  for (const p of projects) for (const t of new Set(p.tags)) counts.set(t, (counts.get(t) ?? 0) + 1);
  const ranked = [...counts].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
  const total = projects.length || 1;
  const [top, ...rest] = ranked;
  return {
    name: top?.[0] ?? "",
    pct: top ? Math.round((top[1] / total) * 100) : 0,
    others: rest.slice(0, 4).map(([name, count]) => ({ name, count })),
    distinct: ranked.length,
  };
}

export function projectStats(projects: Project[]) {
  return {
    projects: projects.length,
    live: projects.filter((p) => p.liveUrl).length,
    tech: new Set(projects.flatMap((p) => p.tags)).size,
  };
}
