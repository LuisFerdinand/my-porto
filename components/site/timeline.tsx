import { ArrowUpRight, Briefcase, Code, Flag, Layers } from "@/components/icons";
import { TechIconList } from "@/components/tech-icon";
import type { Dict } from "@/lib/i18n";
import { localizeHref } from "@/lib/i18n/config";
import type { Locale } from "@/lib/i18n/config";
import { formatPeriod } from "@/lib/timeline";
import type { TimelineEntry, TimelineKind } from "@/lib/types";

const ICONS: Record<TimelineKind, typeof Code> = {
  work: Briefcase,
  project: Code,
  education: Layers,
  milestone: Flag,
};

/** One line is a paragraph; several lines (one per line break in /admin) become a bulleted list. */
function Description({ text }: { text: string }) {
  const lines = text
    .split(/\n+/)
    .map((l) => l.trim())
    .filter(Boolean);
  if (lines.length === 0) return null;
  if (lines.length === 1) return <p className="muted mt-3 max-w-[44rem]">{lines[0]}</p>;
  return (
    <ul className="muted mt-3 grid max-w-[44rem] list-disc gap-1.5 pl-5 marker:text-ink">
      {lines.map((line) => (
        <li key={line}>{line}</li>
      ))}
    </ul>
  );
}

/** The full timeline for the About page: a rail with dots, one card per entry, newest first. */
export function TimelineList({ entries, lang, dict }: { entries: TimelineEntry[]; lang: Locale; dict: Dict }) {
  return (
    <ol className="tl">
      {entries.map((e) => {
        const Icon = ICONS[e.kind];
        const period = formatPeriod(e, lang, dict.common.present);
        return (
          <li key={e.id} className="tl-item" data-current={e.isCurrent} data-reveal>
            <div className="tl-rail" aria-hidden="true">
              <span className="tl-dot" />
            </div>
            <article className="card-white">
              <div className="flex flex-wrap items-center gap-2">
                <span className="icon-tile icon-tile-sm" aria-hidden="true">
                  <Icon />
                </span>
                {period && <span className="chip !bg-card">{period}</span>}
                <span className="small muted font-bold">{dict.about.kinds[e.kind]}</span>
              </div>
              <h3 className="h3 mt-4">{e.title}</h3>
              {e.org && <p className="small muted mt-0.5 font-bold">{e.org}</p>}
              <Description text={e.description} />
              {e.tags.length > 0 && <TechIconList names={e.tags} className="mt-4" />}
              {e.linkUrl && (
                <a
                  href={localizeHref(lang, e.linkUrl)}
                  className="link small mt-4 inline-flex items-center gap-1.5"
                  {...(e.linkUrl.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  {e.linkUrl.startsWith("http") ? dict.common.source : dict.nav.portfolio}
                  <ArrowUpRight className="size-4" />
                </a>
              )}
            </article>
          </li>
        );
      })}
    </ol>
  );
}

/** The newest few entries as rows, like the "Recent Transaction" list in the reference. */
export function RecentRows({ entries, lang, dict }: { entries: TimelineEntry[]; lang: Locale; dict: Dict }) {
  return (
    <ul className="rows" data-reveal>
      {entries.map((e) => {
        const Icon = ICONS[e.kind];
        return (
          <li key={e.id} className="row">
            <span className="icon-tile icon-tile-sm icon-tile-light" aria-hidden="true">
              <Icon />
            </span>
            <div className="min-w-0">
              <p className="truncate font-bold">{e.title}</p>
              <p className="small muted truncate">{e.org || dict.about.kinds[e.kind]}</p>
            </div>
            <p className="small muted text-right font-bold">{formatPeriod(e, lang, dict.common.present)}</p>
          </li>
        );
      })}
    </ul>
  );
}
