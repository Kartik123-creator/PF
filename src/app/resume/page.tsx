import type { Metadata } from "next";
import { Github, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { PROFILE } from "@/data/profile";
import { EXPERIENCE, EDUCATION } from "@/data/experience";
import { SKILL_GROUPS } from "@/data/skills";
import { PROJECTS } from "@/data/projects";
import PrintButton from "@/components/PrintButton";

export const metadata: Metadata = {
  title: "Resume — Kartik Bosmiya",
  description: "Resume of Kartik Bosmiya — Software Engineer & End-to-End Product Builder.",
  alternates: { canonical: "/resume" },
};

const SELECTED = [
  ...PROJECTS.filter((p) => p.featured),
  ...PROJECTS.filter((p) => !p.featured).slice(0, 3),
];

export default function ResumePage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12 print:py-0">
      {/* header */}
      <header className="flex flex-wrap items-start justify-between gap-4 border-b border-hairline pb-6">
        <div>
          <h1 className="text-3xl font-bold">{PROFILE.name}</h1>
          <p className="mt-1 font-semibold text-primary">{PROFILE.headline}</p>
          <div className="mono-label mt-3 flex flex-wrap gap-x-4 gap-y-1 text-ink-mute">
            <a href={`mailto:${PROFILE.email}`} className="inline-flex items-center gap-1.5 hover:text-primary">
              <Mail size={12} /> {PROFILE.email}
            </a>
            <a href={`tel:${PROFILE.phoneHref}`} className="inline-flex items-center gap-1.5 hover:text-primary">
              <Phone size={12} /> {PROFILE.phone}
            </a>
            <span className="inline-flex items-center gap-1.5">
              <MapPin size={12} /> {PROFILE.location}
            </span>
            <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 hover:text-primary">
              <Linkedin size={12} /> LinkedIn
            </a>
            <a href={PROFILE.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 hover:text-primary">
              <Github size={12} /> GitHub
            </a>
          </div>
        </div>
        <PrintButton />
      </header>

      {/* summary */}
      <section className="mt-6">
        <p className="text-sm leading-relaxed text-ink-mute">{PROFILE.tagline}</p>
      </section>

      {/* experience */}
      <section className="mt-8">
        <h2 className="mono-label text-primary">Experience</h2>
        <div className="mt-3 space-y-5">
          {EXPERIENCE.map((e) => (
            <div key={e.id}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                <h3 className="font-semibold">{e.phase}</h3>
                <span className="mono-label text-ink-mute">{e.period}</span>
              </div>
              <p className="text-sm text-ink-mute">{e.role} · {e.focus}</p>
              <ul className="mt-2 space-y-1 text-sm">
                {e.bullets.map((b) => (
                  <li key={b} className="flex gap-2">
                    <span aria-hidden="true" className="text-primary">▸</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* skills */}
      <section className="mt-8">
        <h2 className="mono-label text-primary">Skills</h2>
        <div className="mt-3 space-y-2">
          {SKILL_GROUPS.map((g) => (
            <p key={g.label} className="text-sm">
              <span className="font-semibold">{g.label}: </span>
              <span className="text-ink-mute">{g.items.join(", ")}</span>
            </p>
          ))}
        </div>
      </section>

      {/* selected projects */}
      <section className="mt-8">
        <h2 className="mono-label text-primary">Selected Projects</h2>
        <div className="mt-3 space-y-3">
          {SELECTED.map((p) => (
            <div key={p.id}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                <h3 className="font-semibold">{p.name}</h3>
                <span className="mono-label text-ink-mute">{p.categoryLabel}</span>
              </div>
              <p className="text-sm text-ink-mute">{p.description}</p>
              <p className="mt-1 text-sm text-primary">{p.highlights.join(" · ")}</p>
            </div>
          ))}
        </div>
      </section>

      {/* education */}
      <section className="mt-8">
        <h2 className="mono-label text-primary">Education</h2>
        <div className="mt-3 space-y-2">
          {EDUCATION.map((ed) => (
            <div key={ed.degree} className="flex flex-wrap items-baseline justify-between gap-x-4">
              <p className="text-sm font-semibold">{ed.degree} <span className="font-normal text-ink-mute">· {ed.school}</span></p>
              <span className="mono-label text-ink-mute">{ed.period}</span>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
