import type { Metadata } from "next";
import {
  Briefcase,
  Code2,
  FolderGit2,
  GraduationCap,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  type LucideIcon,
} from "lucide-react";
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

// Resume-specific summary — leads with impact. (Truthful rephrase of existing
// profile facts: 6+ yrs, web/mobile/AI, end-to-end, AWS, real-time, LLM, CI/CD.)
const SUMMARY =
  "Software engineer with 6+ years shipping web, mobile and AI-powered products end-to-end — from first wireframe to AWS deployment. I own the full stack: scalable architecture, real-time systems, LLM integrations, CI/CD and performance. Trusted by clients worldwide to turn ambiguous briefs into reliable production software.";

const SELECTED = [
  ...PROJECTS.filter((p) => p.featured),
  ...PROJECTS.filter((p) => !p.featured).slice(0, 3),
];

function SectionTitle({ icon: Icon, children }: { icon: LucideIcon; children: React.ReactNode }) {
  return (
    <h2 className="mono-label flex items-center gap-2 border-b border-hairline pb-2 text-primary">
      <Icon size={14} aria-hidden="true" /> {children}
    </h2>
  );
}

/** Splits "Label: detail" bullets so the lead-in reads bold for fast scanning. */
function Bullet({ text }: { text: string }) {
  const idx = text.indexOf(": ");
  const label = idx > -1 ? text.slice(0, idx) : null;
  const rest = idx > -1 ? text.slice(idx + 2) : text;
  return (
    <li className="flex gap-2">
      <span aria-hidden="true" className="mt-px text-primary">▸</span>
      <span>
        {label && <span className="font-semibold text-ink">{label}:</span>} {rest}
      </span>
    </li>
  );
}

export default function ResumePage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12 print:py-0">
      {/* header */}
      <header className="flex flex-wrap items-start justify-between gap-4 border-b border-hairline pb-6">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-3xl font-bold">{PROFILE.name}</h1>
            <span className="mono-label inline-flex items-center gap-1.5 rounded-full border border-hairline px-2.5 py-1 text-ink-mute">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
              Open to work
            </span>
          </div>
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
        <p className="text-sm leading-relaxed">{SUMMARY}</p>
      </section>

      {/* experience */}
      <section className="mt-8">
        <SectionTitle icon={Briefcase}>Experience</SectionTitle>
        <div className="mt-4 space-y-5">
          {EXPERIENCE.map((e) => (
            <div key={e.id} className="break-inside-avoid">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                <h3 className="font-semibold">{e.phase}</h3>
                <span className="mono-label text-ink-mute">{e.period}</span>
              </div>
              <p className="text-sm text-ink-mute">
                {e.role} · {e.focus}
              </p>
              <ul className="mt-2 space-y-1 text-sm">
                {e.bullets.map((b) => (
                  <Bullet key={b} text={b} />
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* education — promoted up the page and rendered as cards (screen only; hidden in the PDF) */}
      <section className="mt-8 break-inside-avoid print:hidden">
        <SectionTitle icon={GraduationCap}>Education</SectionTitle>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {EDUCATION.map((ed) => (
            <div key={ed.degree} className="card flex items-start gap-3 p-4">
              <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                <GraduationCap size={18} aria-hidden="true" />
              </span>
              <div>
                <h3 className="font-semibold leading-snug">{ed.degree}</h3>
                <p className="text-sm text-ink-mute">{ed.school}</p>
                <p className="mono-label mt-1.5 text-primary">{ed.period}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* skills */}
      <section className="mt-8 break-inside-avoid">
        <SectionTitle icon={Code2}>Skills</SectionTitle>
        <div className="mt-4 space-y-2">
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
        <SectionTitle icon={FolderGit2}>Selected Projects</SectionTitle>
        <div className="mt-4 space-y-3">
          {SELECTED.map((p) => (
            <div key={p.id} className="break-inside-avoid">
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
    </main>
  );
}
