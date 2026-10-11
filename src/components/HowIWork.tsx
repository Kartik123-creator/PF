import { ClipboardList, Clock, GitBranch, MonitorPlay } from "lucide-react";
import { HOW_I_WORK } from "@/data/services";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";

const ICONS = { scope: ClipboardList, demos: MonitorPlay, repo: GitBranch, reply: Clock } as const;

export default function HowIWork({ className = "mt-20" }: { className?: string }) {
  return (
    <section className={className}>
      <Reveal>
        <SectionHeading label="How I work" title="What working with me looks like" />
      </Reveal>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {HOW_I_WORK.map((h, i) => {
          const Icon = ICONS[h.id];
          return (
            <Reveal key={h.id} delay={i * 80} className="h-full">
              <div className="card h-full p-5">
                <Icon className="text-primary" size={20} aria-hidden="true" />
                <h3 className="mt-3 text-sm font-semibold">{h.title}</h3>
                <p className="mt-1.5 text-sm text-ink-mute">{h.desc}</p>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
