"use client";

import { useState } from "react";
import { PROJECTS, type ProjectCategory } from "@/data/projects";
import ProjectCard from "@/components/ProjectCard";

const FILTERS: { id: "all" | ProjectCategory; label: string }[] = [
  { id: "all", label: "All" },
  { id: "web", label: "Web" },
  { id: "mobile", label: "Mobile" },
  { id: "ai", label: "AI" },
];

export default function ProjectsGrid() {
  const [filter, setFilter] = useState<"all" | ProjectCategory>("all");
  const visible = filter === "all" ? PROJECTS : PROJECTS.filter((p) => p.category === filter);

  return (
    <>
      <div className="mb-8 flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => setFilter(f.id)}
            className={`mono-label rounded-full border px-4 py-2 transition-colors ${
              filter === f.id
                ? "border-primary bg-primary text-primary-ink"
                : "border-hairline text-ink-mute hover:border-primary hover:text-primary"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>
    </>
  );
}
