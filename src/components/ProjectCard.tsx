import type { Project } from "@/data/projects";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="card flex h-full flex-col p-5 transition-shadow hover:shadow-lg">
      <p className="mono-label text-primary">{project.categoryLabel}</p>
      <h3 className="mt-1.5 text-lg font-semibold">{project.name}</h3>
      <p className="mono-label mt-0.5 text-ink-mute">{project.role}</p>
      <p className="mt-2 text-sm text-ink-mute">{project.description}</p>
      <ul className="mt-3 flex-1 space-y-1.5 text-sm">
        {project.bullets.map((b) => (
          <li key={b} className="flex gap-2">
            <span className="text-primary">▸</span>
            <span>{b}</span>
          </li>
        ))}
      </ul>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {project.tech.map((t) => (
          <span key={t} className="mono-label rounded-full border border-hairline px-2.5 py-1 text-ink-mute">
            {t}
          </span>
        ))}
      </div>
    </article>
  );
}
