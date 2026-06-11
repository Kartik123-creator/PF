import { Github, Linkedin, Mail } from "lucide-react";
import { PROFILE } from "@/data/profile";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-hairline">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 px-4 py-10 sm:flex-row sm:justify-between">
        <div>
          <p className="font-heading text-lg font-semibold">{PROFILE.name}</p>
          <p className="mono-label mt-1 text-ink-mute">
            {PROFILE.location} · {PROFILE.timezone}
          </p>
        </div>
        <div className="flex items-center gap-4 text-ink-mute">
          <a aria-label="GitHub" href={PROFILE.github} target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">
            <Github size={18} />
          </a>
          <a aria-label="LinkedIn" href={PROFILE.linkedin} target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">
            <Linkedin size={18} />
          </a>
          <a aria-label="Email" href={`mailto:${PROFILE.email}`} className="hover:text-primary transition-colors">
            <Mail size={18} />
          </a>
        </div>
        <p className="mono-label text-ink-mute">© {new Date().getFullYear()} · built with Next.js</p>
      </div>
    </footer>
  );
}
