import { Quote } from "lucide-react";
import { TESTIMONIALS } from "@/data/testimonials";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";

/** Renders nothing — not even the heading — until TESTIMONIALS has entries. */
export default function Testimonials() {
  if (TESTIMONIALS.length === 0) return null;

  return (
    <section className="pb-20" id="testimonials">
      <Reveal>
        <SectionHeading label="Testimonials" title="What clients say" />
      </Reveal>
      <div className="grid gap-4 sm:grid-cols-2">
        {TESTIMONIALS.map((t, i) => (
          <Reveal key={`${t.author}-${i}`} delay={(i % 2) * 80} className="h-full">
            <figure className="card flex h-full flex-col p-6">
              <Quote className="text-primary" size={20} aria-hidden="true" />
              <blockquote className="mt-3 flex-1 text-[0.95rem] leading-relaxed">{t.quote}</blockquote>
              <figcaption className="mt-4 text-sm">
                <span className="font-semibold">{t.author}</span>
                <span className="text-ink-mute">
                  {" "}
                  · {t.role}
                  {t.company && `, ${t.company}`}
                </span>
                {t.sourceUrl && (
                  <a href={t.sourceUrl} target="_blank" rel="noreferrer" className="mono-label ml-2 text-primary hover:underline">
                    Source
                  </a>
                )}
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
