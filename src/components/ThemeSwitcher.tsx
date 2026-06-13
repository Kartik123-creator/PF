"use client";

import { useEffect, useRef, useState } from "react";
import { Palette as PaletteIcon } from "lucide-react";
import { THEMES, DEFAULT_THEME, DEFAULT_PALETTE } from "@/data/themes";

export default function ThemeSwitcher() {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState(DEFAULT_THEME);
  const [palette, setPalette] = useState(DEFAULT_PALETTE);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const d = document.documentElement;
    setTheme(d.dataset.theme ?? DEFAULT_THEME);
    setPalette(d.dataset.palette ?? DEFAULT_PALETTE);
  }, []);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  function apply(themeId: string, paletteId: string, e?: React.MouseEvent) {
    const run = () => {
      const d = document.documentElement;
      d.dataset.theme = themeId;
      d.dataset.palette = paletteId;
      localStorage.setItem("kb-theme", themeId);
      localStorage.setItem("kb-palette", paletteId);
      setTheme(themeId);
      setPalette(paletteId);
      setOpen(false);
    };

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const startViewTransition = (
      document as unknown as { startViewTransition?: (cb: () => void) => void }
    ).startViewTransition;

    if (startViewTransition && !reduced) {
      const d = document.documentElement;
      d.style.setProperty("--vt-x", `${e ? e.clientX : window.innerWidth}px`);
      d.style.setProperty("--vt-y", `${e ? e.clientY : 0}px`);
      startViewTransition.call(document, run);
    } else {
      run();
    }
  }

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        aria-label="Switch theme"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 rounded-full border border-hairline px-3 py-1.5 text-ink-mute hover:text-primary hover:border-primary transition-colors"
      >
        <PaletteIcon size={14} />
        <span className="mono-label">{theme}</span>
      </button>

      {open && (
        <div className="card absolute right-0 top-full z-50 mt-2 w-56 p-3 shadow-xl">
          {THEMES.map((t) => (
            <div key={t.id} className="flex items-center justify-between py-1.5">
              <button
                type="button"
                onClick={(e) => apply(t.id, t.palettes[0].id, e)}
                className={`mono-label transition-colors ${
                  theme === t.id ? "text-primary" : "text-ink-mute hover:text-ink"
                }`}
              >
                {t.label}
              </button>
              <div className="flex gap-2">
                {t.palettes.map((p) => {
                  const active = theme === t.id && palette === p.id;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      aria-label={`${t.label} ${p.label}`}
                      onClick={(e) => apply(t.id, p.id, e)}
                      className={`h-5 w-5 rounded-full border transition-transform duration-500 ease-out hover:scale-110 ${
                        active ? "rotate-[135deg] scale-110" : "rotate-0"
                      }`}
                      style={{
                        background: `linear-gradient(135deg, ${p.bg} 0 50%, ${p.primary} 50% 100%)`,
                        borderColor: active ? "var(--ink)" : "var(--hairline)",
                        outline: active ? "2px solid var(--primary)" : "none",
                        outlineOffset: "2px",
                      }}
                    />
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
