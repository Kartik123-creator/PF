"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_LINKS } from "@/data/profile";
import ThemeSwitcher from "@/components/ThemeSwitcher";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-hairline bg-paper/90 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3">
        <Link href="/" className="mono-label font-bold text-ink hover:text-primary transition-colors">
          KB<span className="text-primary">.</span>
        </Link>
        <nav className="flex items-center gap-1 overflow-x-auto">
          {NAV_LINKS.map((l) => {
            const active = l.href === "/" ? pathname === "/" : pathname.startsWith(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`mono-label rounded-full px-3 py-1.5 transition-colors ${
                  active ? "text-primary" : "text-ink-mute hover:text-ink"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>
        <ThemeSwitcher />
      </div>
    </header>
  );
}
