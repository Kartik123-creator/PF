"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FolderKanban, Home, Mail, Menu, Newspaper, User, X } from "lucide-react";
import { NAV_LINKS, PROFILE } from "@/data/profile";
import ThemeSwitcher from "@/components/ThemeSwitcher";

const NAV_ICONS: Record<string, typeof Home> = {
  "/": Home,
  "/about": User,
  "/projects": FolderKanban,
  "/blog": Newspaper,
  "/contact": Mail,
};

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header className="sticky top-0 z-40 border-b border-hairline bg-paper/90 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3">
        <Link href="/" className="mono-label font-bold text-ink hover:text-primary transition-colors">
          KB<span className="text-primary">.</span>
        </Link>
        <nav className="hidden items-center gap-1 sm:flex">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`mono-label rounded-full px-3 py-1.5 transition-colors ${
                isActive(l.href) ? "text-primary" : "text-ink-mute hover:text-ink"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <ThemeSwitcher />
          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
            className="rounded-lg border border-hairline p-2 text-ink sm:hidden"
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="absolute inset-x-0 top-full z-50 h-[calc(100dvh-100%)] sm:hidden" role="dialog" aria-label="Menu">
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
            className="absolute inset-0 bg-black/40"
          />
          <div className="absolute right-0 top-0 flex h-full w-72 max-w-[85vw] flex-col gap-1 overflow-y-auto bg-paper-2 p-4 shadow-2xl">
            {NAV_LINKS.map((l) => {
              const Icon = NAV_ICONS[l.href] ?? Home;
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                    isActive(l.href)
                      ? "bg-primary/10 text-primary"
                      : "text-ink hover:bg-paper"
                  }`}
                >
                  <Icon size={18} />
                  {l.label}
                </Link>
              );
            })}
            <Link
              href="/contact"
              onClick={() => setMenuOpen(false)}
              className="mono-label mt-3 rounded-full bg-primary px-5 py-3 text-center text-primary-ink"
            >
              Let&apos;s talk
            </Link>
            <a
              href={`mailto:${PROFILE.email}`}
              className="mt-4 border-t border-hairline pt-4 text-center text-sm text-ink-mute"
            >
              {PROFILE.email}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
