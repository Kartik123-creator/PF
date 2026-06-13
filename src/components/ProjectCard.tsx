import { Sparkles } from "lucide-react";
import type { Project } from "@/data/projects";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="card flex h-full flex-col p-5 transition hover:-translate-y-1 hover:shadow-lg">
      <p className="mono-label text-primary">{project.categoryLabel}</p>
      <h3 className="mt-1.5 text-lg font-semibold">{project.name}</h3>
      <p className="mt-2 text-sm text-ink-mute">{project.description}</p>
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
    </article>
  );
}
