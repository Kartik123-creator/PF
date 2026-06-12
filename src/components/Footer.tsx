import { Github, Linkedin, Mail } from "lucide-react";
import { PROFILE } from "@/data/profile";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-hairline">
      <div className="mx-auto grid max-w-5xl gap-8 px-4 py-12 sm:grid-cols-3">
        <div>
          <p className="font-heading text-lg font-semibold">{PROFILE.name}</p>
          <p className="mt-2 text-sm text-ink-mute">
            {PROFILE.headline}. Building web, mobile and AI products from first wireframe to deployment.
          </p>
        </div>
        <div>
          <p className="mono-label text-ink-mute">Contact</p>
          <a
            href={`mailto:${PROFILE.email}`}
            className="mt-2 block break-all text-sm text-primary hover:underline"
          >
            {PROFILE.email}
          </a>
          <p className="mt-1 text-sm text-ink-mute">{PROFILE.location}</p>
          <p className="mt-1 text-sm text-ink-mute">
            {PROFILE.timezone} · responds {PROFILE.responseSla}
          </p>
        </div>
        <div>
          <p className="mono-label text-ink-mute">Follow</p>
          <div className="mt-2 flex items-center gap-3 text-ink-mute">
            <a aria-label="GitHub" href={PROFILE.github} target="_blank" rel="noreferrer" className="rounded-full border border-hairline p-2.5 transition-colors hover:border-primary hover:text-primary">
              <Github size={16} />
            </a>
            <a aria-label="LinkedIn" href={PROFILE.linkedin} target="_blank" rel="noreferrer" className="rounded-full border border-hairline p-2.5 transition-colors hover:border-primary hover:text-primary">
              <Linkedin size={16} />
            </a>
            <a aria-label="Email" href={`mailto:${PROFILE.email}`} className="rounded-full border border-hairline p-2.5 transition-colors hover:border-primary hover:text-primary">
              <Mail size={16} />
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-hairline">
        <div className="mono-label mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-2 px-4 py-4 text-ink-mute">
          <span>© {new Date().getFullYear()} · {PROFILE.name}</span>
          <span>All rights reserved</span>
        </div>
      </div>
    </footer>
  );
}
