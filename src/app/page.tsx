import { Fragment } from "react";
import Link from "next/link";
import { ArrowRight, BadgeCheck, Download } from "lucide-react";
import { AVAILABILITY, PROFILE, STATS } from "@/data/profile";
import { SERVICES } from "@/data/services";
import { EXPERIENCE } from "@/data/experience";
import { PROJECTS } from "@/data/projects";
import { SKILL_GROUPS } from "@/data/skills";
import { getAllPosts } from "@/lib/blog";
import SectionHeading from "@/components/SectionHeading";
import StatCounter from "@/components/StatCounter";
import ProjectCard from "@/components/ProjectCard";
import TimelineItem from "@/components/TimelineItem";
import BlogCard from "@/components/BlogCard";
import Reveal from "@/components/Reveal";
import HeroFx from "@/components/HeroFx";
import TiltCard from "@/components/TiltCard";
import Testimonials from "@/components/Testimonials";
import HowIWork from "@/components/HowIWork";
import { serviceIcon } from "@/components/serviceIcons";


export default function Home() {
  const featured = PROJECTS.filter((p) => p.onHome);
  const posts = getAllPosts().slice(0, 2);
  const marqueeItems = SKILL_GROUPS.flatMap((g) => g.items);

  return (
    <main className="mx-auto max-w-5xl px-4">
      {/* hero */}
      <section className="relative py-20 text-center sm:py-28">
        <HeroFx />
        <p className="mono-label animate-fade-up inline-flex items-center gap-2 rounded-full border border-hairline px-3 py-1.5 text-ink-mute">
          <span className="h-1.5 w-1.5 shrink-0 animate-pulse rounded-full bg-green-500" />
          {AVAILABILITY.label}
          <span className="hidden sm:inline">· {PROFILE.location} · {PROFILE.timezone}</span>
        </p>
        <p className="mono-label animate-fade-up mt-2 text-ink-mute sm:hidden">
          {PROFILE.location} · {PROFILE.timezone}
        </p>
        <h1 className="animate-fade-up mt-6 text-5xl font-bold sm:text-6xl" style={{ animationDelay: "80ms" }}>
          {PROFILE.name}
        </h1>
        <p className="shimmer animate-fade-up mt-3 text-xl font-semibold sm:text-2xl" style={{ animationDelay: "160ms" }}>
          {PROFILE.headline}
        </p>
        <p className="animate-fade-up mx-auto mt-4 max-w-xl text-ink-mute" style={{ animationDelay: "240ms" }}>
          {PROFILE.tagline}
        </p>
        <div className="animate-fade-up mt-8 flex flex-wrap items-center justify-center gap-3" style={{ animationDelay: "320ms" }}>
          <Link
            href="/projects"
            className="btn-press btn-shine mono-label inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-primary-ink"
          >
            View projects <ArrowRight size={14} />
          </Link>
          <a
            href={PROFILE.resumeUrl}
            className="btn-press mono-label inline-flex items-center gap-2 rounded-full border border-hairline px-5 py-3 text-ink hover:border-primary hover:text-primary"
          >
            <Download size={14} /> Resume
          </a>
        </div>
      </section>

      {/* stats */}
      <section className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {STATS.map((s, i) => (
          <Reveal key={s.label} delay={i * 80} className="h-full">
            <StatCounter stat={s} />
          </Reveal>
        ))}
      </section>

      {/* capabilities */}
      <section className="py-20">
        <Reveal>
          <SectionHeading label="What I do" title="End-to-end product engineering" />
        </Reveal>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((svc, i) => {
            const Icon = serviceIcon(svc.id);
            return (
              <Reveal key={svc.id} delay={(i % 3) * 80} className="h-full">
                <div className="group card h-full p-5 transition duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg">
                  <Icon className="text-primary transition-transform duration-300 group-hover:scale-110" size={22} />
                  <h3 className="mt-3 text-base font-semibold">{svc.title}</h3>
                  <p className="mt-1.5 text-sm text-ink-mute">{svc.summary}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
        <Link href="/services" className="mono-label mt-6 inline-flex items-center gap-2 text-primary hover:underline">
          All services in detail <ArrowRight size={14} />
        </Link>
        <HowIWork className="mt-16" />
      </section>

      {/* featured projects */}
      <section className="pb-20">
        <Reveal>
          <SectionHeading label="Selected work" title="Featured projects" />
        </Reveal>
        <div className="grid gap-4 sm:grid-cols-2">
          {featured.map((p, i) => (
            <Reveal key={p.id} delay={(i % 2) * 80} className="h-full">
              <TiltCard className="h-full">
                <ProjectCard project={p} />
              </TiltCard>
            </Reveal>
          ))}
        </div>
        <Link href="/projects" className="mono-label mt-6 inline-flex items-center gap-2 text-primary hover:underline">
          All projects <ArrowRight size={14} />
        </Link>
      </section>

      <Testimonials />

      {/* experience */}
      <section className="pb-20">
        <Reveal>
          <SectionHeading label="Experience" title="How the experience compounds" />
        </Reveal>
        <div>
          {EXPERIENCE.map((e, i) => (
            <Reveal key={e.id} delay={i * 90}>
              <TimelineItem exp={e} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* now / availability */}
      <section className="pb-20">
        <Reveal>
          <SectionHeading label="Now" title="Current availability" />
        </Reveal>
        <Reveal>
          <div className="group card flex items-start gap-4 p-5 transition duration-300 hover:border-primary/40 hover:shadow-lg">
            <BadgeCheck className="mt-0.5 shrink-0 text-primary" size={22} />
            <div>
              <h3 className="text-base font-semibold">{AVAILABILITY.nowTitle}</h3>
              <p className="mt-1.5 text-sm text-ink-mute">{AVAILABILITY.nowDesc}</p>
            </div>
            <Link
              href="/contact"
              className="mono-label ml-auto hidden shrink-0 items-center gap-2 self-center text-primary hover:underline sm:inline-flex"
            >
              Get in touch <ArrowRight size={14} />
            </Link>
          </div>
        </Reveal>
      </section>

      {/* tech marquee */}
      <section className="overflow-hidden border-y border-hairline py-6" aria-hidden>
        <div className="marquee-track items-center gap-6">
          {[...marqueeItems, ...marqueeItems].map((t, i) => (
            <Fragment key={`${t}-${i}`}>
              <span className="mono-label whitespace-nowrap text-ink-mute">{t}</span>
              <span className="h-1 w-1 shrink-0 rounded-full bg-primary" />
            </Fragment>
          ))}
        </div>
      </section>

      {/* blog teaser */}
      {posts.length > 0 && (
        <section className="py-20">
          <Reveal>
            <SectionHeading label="Writing" title="Latest from the blog" />
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2">
            {posts.map((p, i) => (
              <Reveal key={p.slug} delay={i * 80} className="h-full">
                <BlogCard post={p} />
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <Reveal>
        <section className="card mb-4 p-10 text-center">
          <h2 className="text-2xl font-bold">Let&apos;s build something together</h2>
          <p className="mx-auto mt-2 max-w-md text-ink-mute">
            {AVAILABILITY.cta}
          </p>
          <Link
            href="/contact"
            className="btn-press btn-shine mono-label mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-primary-ink"
          >
            Get in touch <ArrowRight size={14} />
          </Link>
        </section>
      </Reveal>
    </main>
  );
}
