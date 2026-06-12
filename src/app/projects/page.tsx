import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import ProjectsGrid from "./ProjectsGrid";

export const metadata: Metadata = {
  title: "Projects — Kartik Bosmiya",
  description: "ERP systems, booking SaaS, AI platforms and design tools — selected work by Kartik Bosmiya.",
};

export default function ProjectsPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-16">
      <SectionHeading label="Projects" title="Things I've shipped" />
      <ProjectsGrid />
    </main>
  );
}
