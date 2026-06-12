import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { PROFILE } from "@/data/profile";
import SectionHeading from "@/components/SectionHeading";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact — Kartik Bosmiya",
  description: "Get in touch — replies within 24 hours.",
};

const CARDS = [
  { icon: Mail, label: "Email", value: PROFILE.email, href: `mailto:${PROFILE.email}` },
  { icon: Phone, label: "Phone", value: PROFILE.phone, href: `tel:${PROFILE.phoneHref}` },
  { icon: MapPin, label: "Location", value: `${PROFILE.location} (${PROFILE.timezone})` },
  { icon: Clock, label: "Response time", value: PROFILE.responseSla },
];

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-16">
      <SectionHeading label="Contact" title="Let's talk" />
      <div className="grid gap-8 lg:grid-cols-[1fr_1.5fr]">
        <div className="space-y-4">
          {CARDS.map((c) => (
            <div key={c.label} className="card flex items-center gap-4 p-4">
              <c.icon className="shrink-0 text-primary" size={20} />
              <div>
                <p className="mono-label text-ink-mute">{c.label}</p>
                {c.href ? (
                  <a href={c.href} className="text-sm font-medium text-primary hover:underline">{c.value}</a>
                ) : (
                  <p className="text-sm font-medium">{c.value}</p>
                )}
              </div>
            </div>
          ))}
        </div>
        <ContactForm />
      </div>
    </main>
  );
}
