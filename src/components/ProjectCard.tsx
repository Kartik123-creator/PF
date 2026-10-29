import Image from "next/image";
import {
  ArrowUpRight,
  CalendarDays,
  LayoutGrid,
  MessagesSquare,
  Spade,
  Sparkles,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import { type CoverGlyph, type Project, projectTitle } from "@/data/projects";

const GLYPHS: Record<CoverGlyph, LucideIcon> = {
  grid: LayoutGrid,
  calendar: CalendarDays,
  cards: Spade,
  chat: MessagesSquare,
  sparkle: Sparkles,
};

/**
 * Generated cover used when a project has no `images`.
 * Colours come from the active theme (see `.project-cover` in globals.css);
 * each project shifts the hue by `cover.hue` so the covers are distinct.
 */
function ProjectCover({ project, title }: { project: Project; title: string }) {
  const Glyph = GLYPHS[project.cover.glyph];
  return (
    <div
      className="project-cover relative flex aspect-video flex-col justify-end overflow-hidden border-b border-hairline p-5 text-primary-ink"
      style={{ "--cover-hue": project.cover.hue } as React.CSSProperties}
    >
      <Glyph
        aria-hidden="true"
        strokeWidth={1.25}
        className="pointer-events-none absolute -right-6 -top-6 h-44 w-44 rotate-12 opacity-[0.18] sm:h-52 sm:w-52"
      />
      <p className="mono-label relative">{project.categoryLabel}</p>
      <h3 className="relative mt-1 text-2xl font-bold leading-tight">{title}</h3>
    </div>
  );
}

export default function ProjectCard({ project }: { project: Project }) {
  const title = projectTitle(project);
  const image = project.images[0];
  const stack = project.stack ?? [];
  const links = project.links ?? [];

  return (
    <article className="card flex h-full flex-col overflow-hidden transition duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg">
      {image ? (
        // 4:3 diagrams sit inside the 16:9 cover uncropped; the backdrop matches the diagrams' own background
        <Image
          src={image.src}
          alt={image.alt}
          width={1600}
          height={1200}
          sizes="(min-width: 640px) 50vw, 100vw"
          className="aspect-video w-full border-b border-hairline bg-[#0d0b1a] object-contain"
        />
      ) : (
        <ProjectCover project={project} title={title} />
      )}

      <div className="flex flex-1 flex-col p-5">
        {/* with an image the cover carries no text, so the body names the project */}
        {image && (
          <>
            <p className="mono-label text-primary">{project.categoryLabel}</p>
            <h3 className="mt-1.5 mb-2 text-lg font-semibold">{title}</h3>
          </>
        )}
        <p className="text-sm text-ink-mute">{project.description}</p>

        <p className="mt-3 text-sm">
          <span className="mono-label mr-2 text-ink-mute">Role</span>
          {project.role}
        </p>

        {project.outcome && (
          <p className="mt-3 flex items-start gap-2 rounded-lg border border-primary/30 bg-primary/5 px-3 py-2 text-sm font-semibold text-primary">
            <TrendingUp size={16} className="mt-0.5 shrink-0" aria-hidden="true" />
            <span>{project.outcome}</span>
          </p>
        )}

        <ul className="mt-3 flex-1 space-y-1.5 text-sm">
          {project.bullets.map((b) => (
            <li key={b} className="flex gap-2">
              <span aria-hidden="true" className="text-primary">▸</span>
              <span>{b}</span>
            </li>
          ))}
        </ul>

        <div className="mt-4 rounded-xl bg-primary/5 p-3.5">
          <p className="mono-label mb-2 flex items-center gap-1.5 text-primary">
            <Sparkles size={12} aria-hidden="true" /> Highlights
          </p>
          <ul className="space-y-1.5">
            {project.highlights.map((h) => (
              <li key={h} className="flex items-start gap-2 text-[0.8rem] font-medium leading-snug text-primary">
                <span aria-hidden="true" className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary" />
                <span>{h}</span>
              </li>
            ))}
          </ul>
        </div>

        {stack.length > 0 && (
          <ul aria-label="Tech stack" className="mt-4 flex flex-wrap gap-1.5">
            {stack.map((t) => (
              <li key={t} className="mono-label rounded-full border border-hairline px-2.5 py-1 text-ink-mute">
                {t}
              </li>
            ))}
          </ul>
        )}

        {links.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-3 border-t border-hairline pt-4">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noreferrer"
                className="mono-label inline-flex items-center gap-1 text-primary hover:underline"
              >
                {l.label} <ArrowUpRight size={12} aria-hidden="true" />
              </a>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
