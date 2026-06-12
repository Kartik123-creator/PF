import { SKILL_GROUPS } from "@/data/skills";

export default function SkillGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {SKILL_GROUPS.map((g) => (
        <div key={g.label} className="card p-5">
          <p className="mono-label text-primary">{g.label}</p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {g.items.map((s) => (
              <span key={s} className="mono-label rounded-full border border-hairline px-2.5 py-1 text-ink-mute">
                {s}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
