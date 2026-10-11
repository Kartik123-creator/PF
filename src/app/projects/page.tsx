import type { Metadata } from "next";
import { ChevronDown } from "lucide-react";
import { PROJECTS } from "@/data/projects";
import SectionHeading from "@/components/SectionHeading";
import ProjectCard from "@/components/ProjectCard";
import Reveal from "@/components/Reveal";
import TiltCard from "@/components/TiltCard";

export const metadata: Metadata = {
  title: "Projects — Kartik Bosmiya",
  description: "ERP systems and booking SaaS — selected work by Kartik Bosmiya.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  const featured = PROJECTS.filter((p) => p.featured);
  const more = PROJECTS.filter((p) => !p.featured);

  return (
    <main className="mx-auto max-w-5xl px-4 py-16">
      <SectionHeading as="h1" label="Projects" title="Things I've shipped" />
      <div className="grid gap-4 sm:grid-cols-2">
        {featured.map((p, i) => (
          <Reveal key={p.id} delay={(i % 2) * 80} className="h-full">
            <TiltCard className="h-full">
              <ProjectCard project={p} />
            </TiltCard>
          </Reveal>
        ))}
      </div>

      {more.length > 0 && (
        <details className="group mt-12">
          <summary className="mono-label inline-flex cursor-pointer list-none items-center gap-2 rounded-full border border-hairline px-4 py-2 text-ink-mute hover:border-primary hover:text-primary">
            More projects ({more.length})
            <ChevronDown size={14} className="transition-transform group-open:rotate-180" aria-hidden="true" />
          </summary>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {more.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        </details>
      )}
    </main>
  );
}
