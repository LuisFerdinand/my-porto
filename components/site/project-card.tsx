import { ArrowUpRight, Github } from "@/components/icons";
import { TechIconList } from "@/components/tech-icon";
import { SmartImage } from "@/components/smart-image";
import { formatMonth, initialsOf } from "@/lib/format";
import type { Dict } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n/config";
import type { Project } from "@/lib/types";

function Cover({ project }: { project: Project }) {
  return (
    <div className="relative aspect-[16/10] overflow-hidden rounded-[1.1rem] bg-card">
      {project.imageUrl ? (
        <SmartImage
          src={project.imageUrl}
          alt={`Screenshot of ${project.title}`}
          sizes="(min-width: 1024px) 28vw, (min-width: 768px) 45vw, 92vw"
          className="object-cover object-top"
        />
      ) : (
        <div className="absolute inset-0 grid place-items-center bg-ink text-white" aria-hidden="true">
          <span className="text-[clamp(2.75rem,2rem+3vw,4.5rem)] font-extrabold tracking-tight">{initialsOf(project.title)}</span>
          <span className="absolute bottom-3 left-4 text-sm font-bold text-white/60">{project.tags.slice(0, 3).join(" · ")}</span>
        </div>
      )}
    </div>
  );
}

export function ProjectCard({
  project,
  lang,
  dict,
  detailed = false,
}: {
  project: Project;
  lang: Locale;
  dict: Dict;
  detailed?: boolean;
}) {
  return (
    <article className="card-white card-hover flex h-full flex-col !p-3">
      <Cover project={project} />
      <div className="flex flex-1 flex-col gap-3 px-2 pb-2 pt-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="h3">{project.title}</h3>
          <span className="small muted shrink-0 pt-0.5 font-bold">{formatMonth(project.startedOn, lang)}</span>
        </div>
        {project.summary && <p className="muted">{project.summary}</p>}
        {detailed && project.description && <p className="small muted">{project.description}</p>}
        <TechIconList names={project.tags} max={detailed ? 10 : 6} />
        {(project.liveUrl || project.repoUrl) && (
          <div className="mt-auto flex flex-wrap gap-2 pt-3">
            {project.liveUrl && (
              <a href={project.liveUrl} className="btn btn-ink btn-sm" target="_blank" rel="noopener noreferrer">
                {dict.common.visitSite} <ArrowUpRight />
              </a>
            )}
            {project.repoUrl && (
              <a href={project.repoUrl} className="btn btn-soft btn-sm" target="_blank" rel="noopener noreferrer">
                <Github /> {dict.common.source}
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
