import type { Metadata } from "next";
import Image from "next/image";
import { Clock, Download, Github, Linkedin, MapPin, Phone } from "lucide-react";
import { PROFILE } from "@/data/profile";
import SectionHeading from "@/components/SectionHeading";
import ContactForm from "@/components/ContactForm";
import CopyEmailButton from "@/components/CopyEmailButton";

export const metadata: Metadata = {
  title: "Contact — Kartik Bosmiya",
  description: "Get in touch — replies within 24 hours.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-16">
      <SectionHeading as="h1" label="Contact" title="Let's work together" />
      <p className="-mt-4 mb-10 max-w-2xl text-ink-mute">
        Send me a few lines on what you&apos;re building, your stack, and your rough timeline.
        I reply within 24 hours.
      </p>

      <div className="grid gap-8 lg:grid-cols-[1fr_1.5fr]">
        <div className="card h-fit p-6">
          <div className="flex items-center gap-4">
            <Image
              src="/img/profile.jpg"
              alt={`Portrait of ${PROFILE.name}`}
              width={64}
              height={64}
              className="h-16 w-16 rounded-2xl object-cover"
            />
            <div>
              <p className="text-lg font-semibold leading-tight">{PROFILE.name}</p>
              <p className="mono-label mt-1 flex items-center gap-1.5 text-ink-mute">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-500" />
                Open to work
              </p>
            </div>
          </div>
          <p className="mt-4 text-sm text-ink-mute">
            {PROFILE.headline}. {PROFILE.tagline}
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <a
              href={PROFILE.resumeUrl}
              className="mono-label inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2.5 text-primary-ink transition-transform hover:scale-105"
            >
              <Download size={14} /> Resume
            </a>
            <CopyEmailButton />
          </div>
          <dl className="mt-6 space-y-3 border-t border-hairline pt-5 text-sm">
            <div className="flex items-center gap-3">
              <Phone size={16} className="shrink-0 text-primary" />
              <a href={`tel:${PROFILE.phoneHref}`} className="hover:text-primary">{PROFILE.phone}</a>
            </div>
            <div className="flex items-center gap-3">
              <MapPin size={16} className="shrink-0 text-primary" />
              <span>{PROFILE.location} ({PROFILE.timezone})</span>
            </div>
            <div className="flex items-center gap-3">
              <Clock size={16} className="shrink-0 text-primary" />
              <span>Responds {PROFILE.responseSla}</span>
            </div>
          </dl>
          <div className="mt-5 flex items-center gap-2 border-t border-hairline pt-5">
            <span className="mono-label text-ink-mute">Follow</span>
            <a aria-label="GitHub" href={PROFILE.github} target="_blank" rel="noreferrer" className="rounded-full border border-hairline p-2 text-ink-mute transition-colors hover:border-primary hover:text-primary">
              <Github size={15} />
            </a>
            <a aria-label="LinkedIn" href={PROFILE.linkedin} target="_blank" rel="noreferrer" className="rounded-full border border-hairline p-2 text-ink-mute transition-colors hover:border-primary hover:text-primary">
              <Linkedin size={15} />
            </a>
          </div>
        </div>
        <ContactForm />
      </div>
    </main>
  );
}
