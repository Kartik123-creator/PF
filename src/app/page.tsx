import { Fragment } from "react";
import Link from "next/link";
import { ArrowRight, BadgeCheck, Bot, Building2, Cloud, Download, Globe, PenTool, Rocket, Search, Smartphone, Sparkles, Users, Zap } from "lucide-react";
import { PROFILE } from "@/data/profile";
import { EXPERIENCE } from "@/data/experience";
import { PROJECTS } from "@/data/projects";
import { SKILL_GROUPS } from "@/data/skills";
import { getAllPosts } from "@/lib/blog";
import SectionHeading from "@/components/SectionHeading";
import StatCounter from "@/components/StatCounter";
import ProjectCard from "@/components/ProjectCard";
import TimelineItem from "@/components/TimelineItem";
import BlogCard from "@/components/BlogCard";

const CAPABILITIES = [
  { icon: Globe, title: "B2B & B2C Products", desc: "SaaS platforms, e-commerce and consumer apps — from marketplace flows to checkout." },
  { icon: Building2, title: "Enterprise & ERP", desc: "Large-scale systems: ERP, HRMS, payroll, role-based access and multi-tenant architectures." },
  { icon: Smartphone, title: "Mobile Applications", desc: "Android & iOS apps with Ionic, Capacitor and React Native." },
  { icon: Bot, title: "AI Integrations", desc: "LLM APIs, AI-powered features and automation woven into real products." },
  { icon: Cloud, title: "DevOps, AWS & Migrations", desc: "CI/CD pipelines, cloud deployments, load balancing, and platform/data migrations." },
  { icon: Zap, title: "Real-time Systems", desc: "Live chat, notifications and presence with Socket.IO at scale." },
  { icon: Search, title: "SEO & Performance", desc: "Technical SEO, Core Web Vitals, lazy loading and code splitting that move rankings." },
  { icon: PenTool, title: "Design & Branding", desc: "Marketing brochures, templates, logos and canvas design tools built on Fabric.js." },
  { icon: Users, title: "Client Consulting", desc: "Direct client collaboration — requirements to demos to delivery." },
];

/* FACT-CHECK: "Now" items drafted from Kartik's AI claims — verify tools and current work */
const NOW_ITEMS = [
  {
    icon: Sparkles,
    tag: "USING",
    title: "AI-first development workflow",
    desc: "Claude, ChatGPT and Copilot in the daily loop — faster delivery without losing code quality.",
  },
  {
    icon: Rocket,
    tag: "BUILDING",
    title: "LLM features in client products",
    desc: "Chat assistants, prompt pipelines and AI-powered automation shipped into production apps.",
  },
  {
    icon: BadgeCheck,
    tag: "AVAILABLE",
    title: "Full-time roles",
    desc: "Open to remote or hybrid software engineering roles — replies within 24 hours.",
  },
];

export default function Home() {
  const featured = PROJECTS.filter((p) => p.featured);
  const posts = getAllPosts().slice(0, 2);
  const marqueeItems = SKILL_GROUPS.flatMap((g) => g.items);

  return (
    <main className="mx-auto max-w-5xl px-4">
      {/* hero */}
      <section className="py-20 text-center sm:py-28">
        <p className="mono-label animate-fade-up inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-hairline px-3 py-1.5 text-ink-mute">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-500" />
          Open to work
          <span className="hidden sm:inline">· {PROFILE.location} · {PROFILE.timezone}</span>
        </p>
        <p className="mono-label animate-fade-up mt-2 text-ink-mute sm:hidden">
          {PROFILE.location} · {PROFILE.timezone}
        </p>
        <h1 className="animate-fade-up mt-6 text-5xl font-bold sm:text-6xl" style={{ animationDelay: "80ms" }}>
          {PROFILE.name}
        </h1>
        <p className="text-gradient animate-fade-up mt-3 text-xl font-semibold sm:text-2xl" style={{ animationDelay: "160ms" }}>
          {PROFILE.headline}
        </p>
        <p className="animate-fade-up mx-auto mt-4 max-w-xl text-ink-mute" style={{ animationDelay: "240ms" }}>
          {PROFILE.tagline}
        </p>
        <div className="animate-fade-up mt-8 flex flex-wrap items-center justify-center gap-3" style={{ animationDelay: "320ms" }}>
          <Link
            href="/projects"
            className="mono-label inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-primary-ink transition-transform hover:scale-105"
          >
            View projects <ArrowRight size={14} />
          </Link>
          <a
            href={PROFILE.resumeUrl}
            className="mono-label inline-flex items-center gap-2 rounded-full border border-hairline px-5 py-3 text-ink transition-colors hover:border-primary hover:text-primary"
          >
            <Download size={14} /> Resume
          </a>
        </div>
      </section>

      {/* stats */}
      <section className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {PROFILE.stats.map((s) => (
          <StatCounter key={s.label} value={s.value} suffix={s.suffix} label={s.label} />
        ))}
      </section>

      {/* capabilities */}
      <section className="py-20">
        <SectionHeading label="What I do" title="End-to-end product engineering" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CAPABILITIES.map((c) => (
            <div key={c.title} className="card p-5">
              <c.icon className="text-primary" size={22} />
              <h3 className="mt-3 text-base font-semibold">{c.title}</h3>
              <p className="mt-1.5 text-sm text-ink-mute">{c.desc}</p>
            </div>
          ))}
        </div>
        <Link href="/services" className="mono-label mt-6 inline-flex items-center gap-2 text-primary hover:underline">
          All services in detail <ArrowRight size={14} />
        </Link>
      </section>

      {/* featured projects */}
      <section className="pb-20">
        <SectionHeading label="Selected work" title="Featured projects" />
        <div className="grid gap-4 lg:grid-cols-3">
          {featured.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
        <Link href="/projects" className="mono-label mt-6 inline-flex items-center gap-2 text-primary hover:underline">
          All projects <ArrowRight size={14} />
        </Link>
      </section>

      {/* experience */}
      <section className="pb-20">
        <SectionHeading label="Experience" title="How the experience compounds" />
        <div>
          {EXPERIENCE.map((e) => (
            <TimelineItem key={e.id} exp={e} />
          ))}
        </div>
      </section>

      {/* now / AI focus */}
      <section className="pb-20">
        <SectionHeading label="Now" title="What I'm working with right now" />
        <div className="grid gap-4 sm:grid-cols-3">
          {NOW_ITEMS.map((n) => (
            <div key={n.tag} className="card p-5">
              <div className="flex items-center justify-between">
                <n.icon className="text-primary" size={22} />
                <span className="mono-label rounded-full border border-hairline px-2 py-0.5 text-ink-mute">{n.tag}</span>
              </div>
              <h3 className="mt-3 text-base font-semibold">{n.title}</h3>
              <p className="mt-1.5 text-sm text-ink-mute">{n.desc}</p>
            </div>
          ))}
        </div>
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
          <SectionHeading label="Writing" title="Latest from the blog" />
          <div className="grid gap-4 sm:grid-cols-2">
            {posts.map((p) => (
              <BlogCard key={p.slug} post={p} />
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="card mb-4 p-10 text-center">
        <h2 className="text-2xl font-bold">Let&apos;s build something together</h2>
        <p className="mx-auto mt-2 max-w-md text-ink-mute">
          Open to full-time roles — remote or hybrid. I reply within 24 hours.
        </p>
        <Link
          href="/contact"
          className="mono-label mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-primary-ink transition-transform hover:scale-105"
        >
          Get in touch <ArrowRight size={14} />
        </Link>
      </section>
    </main>
  );
}
