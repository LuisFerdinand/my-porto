"use client";

import { useMemo, useState } from "react";
import type { Dict } from "@/lib/i18n";
import { fmt } from "@/lib/i18n/format-client";
import type { Locale } from "@/lib/i18n/config";
import type { Project } from "@/lib/types";
import { ProjectCard } from "./project-card";

export function PortfolioGrid({ projects, lang, dict }: { projects: Project[]; lang: Locale; dict: Dict }) {
  const [tag, setTag] = useState<string | null>(null);

  // Most-used technologies first, so the filter reads as a summary of the stack.
  const options = useMemo(() => {
    const counts = new Map<string, number>();
    for (const p of projects) for (const t of p.tags) counts.set(t, (counts.get(t) ?? 0) + 1);
    return [...counts].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])).slice(0, 8);
  }, [projects]);

  const visible = tag ? projects.filter((p) => p.tags.includes(tag)) : projects;
  const t = dict.portfolio;

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="segmented" role="group" aria-label={t.filterLabel}>
          <button type="button" className="seg" aria-pressed={tag === null} onClick={() => setTag(null)}>
            {t.all}
          </button>
          {options.map(([name, count]) => (
            <button key={name} type="button" className="seg" aria-pressed={tag === name} onClick={() => setTag(tag === name ? null : name)}>
              {name} <span className="opacity-60">{count}</span>
            </button>
          ))}
        </div>
        <p className="small muted font-bold" role="status" aria-live="polite">
          {visible.length === 1 ? t.countOne : fmt(t.count, { n: visible.length })}
        </p>
      </div>

      {visible.length === 0 ? (
        <p className="card mt-6 muted">{t.empty}</p>
      ) : (
        <ul className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {visible.map((p) => (
            <li key={p.slug}>
              <ProjectCard project={p} lang={lang} dict={dict} detailed />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
