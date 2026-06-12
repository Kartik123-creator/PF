import type { Experience } from "@/data/experience";

export default function TimelineItem({ exp, detailed = false }: { exp: Experience; detailed?: boolean }) {
  return (
    <div className="relative border-l-2 border-hairline pl-6 pb-8 last:pb-0">
      <span className="absolute -left-[7px] top-1 h-3 w-3 rounded-full border-2 border-paper bg-primary" />
      <p className="mono-label text-primary">{exp.period}</p>
      <h3 className="mt-1 text-lg font-semibold">{exp.role}</h3>
      <p className="text-sm text-ink-mute">
        {exp.company} · {exp.location} · {exp.type}
      </p>
      <ul className="mt-2 space-y-1.5 text-sm">
        {(detailed ? exp.bullets : exp.bullets.slice(0, 3)).map((b) => (
          <li key={b} className="flex gap-2">
            <span aria-hidden="true" className="text-primary">▸</span>
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
