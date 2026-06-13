import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Bot,
  Building2,
  Cloud,
  Layers,
  Search,
  ShoppingCart,
  Smartphone,
  Zap,
} from "lucide-react";
import { SERVICES, ENGAGEMENT_MODES } from "@/data/services";
import SectionHeading from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "Services — Kartik Bosmiya",
  description:
    "Eight areas owned end-to-end: full-stack apps, ERP, e-commerce, mobile, real-time, AI integration, DevOps and SEO.",
  alternates: { canonical: "/services" },
};

const ICONS = {
  fullstack: Layers,
  erp: Building2,
  ecommerce: ShoppingCart,
  mobile: Smartphone,
  realtime: Zap,
  ai: Bot,
  devops: Cloud,
  "seo-design": Search,
} as const;

export default function ServicesPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-16">
      <SectionHeading as="h1" label="Services" title="Eight areas I own. All production-grade." />
      <p className="-mt-4 mb-10 max-w-2xl text-ink-mute">
        Everything below has shipped to real users — with hand-offs your team can run with
        and a reply within 24 hours. No demos that never leave the demo.
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        {SERVICES.map((s) => {
          const Icon = ICONS[s.id as keyof typeof ICONS] ?? Layers;
          return (
            <div key={s.id} className="card p-6">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                  <Icon size={20} />
                </div>
                <h2 className="text-base font-semibold">{s.title}</h2>
              </div>
              <p className="mt-3 text-sm text-ink-mute">{s.intro}</p>
              <ul className="mt-3 space-y-1.5 text-sm">
                {s.items.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span aria-hidden="true" className="text-primary">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      <section className="mt-20">
        <SectionHeading label="How we work together" title="Three engagement modes" />
        <div className="grid gap-4 sm:grid-cols-3">
          {ENGAGEMENT_MODES.map((m) => (
            <div key={m.id} className="card flex flex-col p-6">
              <span className="mono-label self-start rounded-full bg-primary/10 px-2.5 py-1 text-primary">
                {m.tag}
              </span>
              <h3 className="mt-3 text-lg font-semibold">{m.title}</h3>
              <p className="mt-2 flex-1 text-sm text-ink-mute">{m.desc}</p>
            </div>
          ))}
        </div>
        <div className="card mt-10 p-10 text-center">
          <h2 className="text-2xl font-bold">Have something in mind?</h2>
          <p className="mx-auto mt-2 max-w-md text-ink-mute">
            Tell me what you&apos;re building and where it has to be — I reply within 24 hours.
          </p>
          <Link
            href="/contact"
            className="mono-label mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-primary-ink transition-transform hover:scale-105"
          >
            Start the conversation <ArrowRight size={14} />
          </Link>
        </div>
      </section>
    </main>
  );
}
