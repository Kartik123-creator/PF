import type { Metadata } from "next";
import Image from "next/image";
import { PROFILE } from "@/data/profile";
import { EXPERIENCE, EDUCATION } from "@/data/experience";
import SectionHeading from "@/components/SectionHeading";
import TimelineItem from "@/components/TimelineItem";
import SkillGrid from "@/components/SkillGrid";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "About — Kartik Bosmiya",
  description: "Software engineer with 6+ years building web, mobile and AI products end-to-end.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-16">
      <SectionHeading as="h1" label="About" title="The story so far" />

      <div className="grid gap-10 lg:grid-cols-[280px_1fr]">
        <Reveal variant="left">
          <Image
            src="/img/profile.jpg"
            alt={`Portrait of ${PROFILE.name}`}
            width={280}
            height={280}
            sizes="(min-width: 1024px) 280px, 100vw"
            className="card aspect-square w-full object-cover"
            priority
          />
          <dl className="card mt-4 space-y-3 p-4 text-sm">
            <div>
              <dt className="mono-label text-ink-mute">Location</dt>
              <dd className="mt-0.5">{PROFILE.location}</dd>
            </div>
            <div>
              <dt className="mono-label text-ink-mute">Timezone</dt>
              <dd className="mt-0.5">{PROFILE.timezone}</dd>
            </div>
            <div>
              <dt className="mono-label text-ink-mute">Email</dt>
              <dd className="mt-0.5">
                <a className="break-all text-primary hover:underline" href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a>
              </dd>
            </div>
            <div>
              <dt className="mono-label text-ink-mute">Responds</dt>
              <dd className="mt-0.5">{PROFILE.responseSla}</dd>
            </div>
          </dl>
        </Reveal>

        <Reveal variant="right" className="space-y-5 text-[0.95rem] leading-relaxed">
          <p>
            I&apos;m Kartik — a software engineer from Ahmedabad who has spent the last 6+ years
            building products end-to-end: web apps, mobile apps and, increasingly, AI-powered
            features that make software feel alive.
          </p>
          <p>
            I started at a digital agency, working directly with clients and learning that
            shipping the <em>right</em> thing matters more than shipping the clever thing. Since
            then I&apos;ve converted an e-commerce site into a full ERP (CASSA Group), launched a
            UK booking SaaS with payments and native mobile apps (Booksphere), and built AI-driven
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
        </Reveal>
      </div>

      <section className="mt-20">
        <Reveal>
          <SectionHeading label="Experience" title="The journey in depth" />
        </Reveal>
        {EXPERIENCE.map((e, i) => (
          <Reveal key={e.id} delay={i * 90}>
            <TimelineItem exp={e} detailed />
          </Reveal>
        ))}
      </section>

      <section className="mt-20">
        <Reveal>
          <SectionHeading label="Education" title="Where I studied" />
        </Reveal>
        <div className="grid gap-4 sm:grid-cols-2">
          {EDUCATION.map((ed, i) => (
            <Reveal key={ed.degree} delay={i * 80} className="h-full">
              <div className="card h-full p-5 transition duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg">
                <p className="mono-label text-primary">{ed.period}</p>
                <h3 className="mt-1 text-base font-semibold">{ed.degree}</h3>
                <p className="text-sm text-ink-mute">{ed.school}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mt-20">
        <Reveal>
          <SectionHeading label="Skills" title="The toolkit" />
        </Reveal>
        <Reveal>
          <SkillGrid />
        </Reveal>
      </section>
    </main>
  );
}
