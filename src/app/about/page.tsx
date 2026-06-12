import type { Metadata } from "next";
import Image from "next/image";
import { PROFILE } from "@/data/profile";
import { EXPERIENCE, EDUCATION } from "@/data/experience";
import SectionHeading from "@/components/SectionHeading";
import TimelineItem from "@/components/TimelineItem";
import SkillGrid from "@/components/SkillGrid";

export const metadata: Metadata = {
  title: "About — Kartik Bosmiya",
  description: "Software engineer with 5+ years building web, mobile and AI products end-to-end.",
};

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-16">
      <SectionHeading as="h1" label="About" title="The story so far" />

      <div className="grid gap-10 lg:grid-cols-[280px_1fr]">
        <div>
          <Image
            src="/img/profile.jpg"
            alt={`Portrait of ${PROFILE.name}`}
            width={280}
            height={280}
            sizes="(min-width: 1024px) 280px, 100vw"
            className="card aspect-square w-full object-cover"
            priority
          />
          <div className="card mt-4 space-y-2 p-4 text-sm">
            <p><span className="mono-label text-ink-mute">Location · </span>{PROFILE.location}</p>
            <p><span className="mono-label text-ink-mute">Timezone · </span>{PROFILE.timezone}</p>
            <p><span className="mono-label text-ink-mute">Email · </span>
              <a className="text-primary hover:underline" href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a>
            </p>
            <p><span className="mono-label text-ink-mute">Responds · </span>{PROFILE.responseSla}</p>
          </div>
        </div>

        <div className="space-y-5 text-[0.95rem] leading-relaxed">
          <p>
            I&apos;m Kartik — a software engineer from Ahmedabad who has spent the last 5+ years
            building products end-to-end: web apps, mobile apps and, increasingly, AI-powered
            features that make software feel alive.
          </p>
          <p>
            I started at a digital agency, working directly with clients and learning that
            shipping the <em>right</em> thing matters more than shipping the clever thing. Since
            then I&apos;ve converted an e-commerce site into a full ERP (CASSA Group), launched a
            UK booking SaaS with payments and native mobile apps (THAT TIME), and built AI-driven
            platforms with Next.js.
          </p>
          <p>
            My sweet spot is owning a feature from first wireframe to AWS deployment — frontend,
            backend, database, pipeline. I&apos;ve worked across B2B and B2C products, enterprise
            systems and platform migrations, and I handle the surrounding work too: technical SEO,
            marketing brochures and design assets when a project needs them. I work in agile teams,
            run code reviews, and communicate with clients like a partner, not a ticket-taker.
          </p>
          <p>
            Beyond code: exploring new AI tooling, building side projects (this portfolio and its
            chatbot are one), and keeping up with where software is heading next.
          </p>
        </div>
      </div>

      <section className="mt-20">
        <SectionHeading label="Experience" title="Full history" />
        {EXPERIENCE.map((e) => (
          <TimelineItem key={e.id} exp={e} detailed />
        ))}
      </section>

      <section className="mt-20">
        <SectionHeading label="Education" title="Where I studied" />
        <div className="grid gap-4 sm:grid-cols-2">
          {EDUCATION.map((ed) => (
            <div key={ed.degree} className="card p-5">
              <p className="mono-label text-primary">{ed.period}</p>
              <h3 className="mt-1 text-base font-semibold">{ed.degree}</h3>
              <p className="text-sm text-ink-mute">{ed.school}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-20">
        <SectionHeading label="Skills" title="The toolkit" />
        <SkillGrid />
      </section>
    </main>
  );
}
