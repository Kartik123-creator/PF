"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Fades + lifts its children into view once they scroll near the viewport.
 * The motion itself lives in CSS (`[data-reveal]` in globals.css) — this only
 * flips `data-visible` via IntersectionObserver, so it stays cheap and never
 * runs a scroll handler. Pass `delay` (ms) to stagger siblings in a grid.
 */
export default function Reveal({
  children,
  delay = 0,
  variant,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  /** entrance direction — default rises + scales; "left"/"right" slide in; "scale" pops */
  variant?: "left" | "right" | "scale";
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // No observer / reduced motion → show immediately (CSS also no-ops the motion).
    if (
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setVisible(true);
      return;
    }

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-reveal={variant ?? ""}
      data-visible={visible || undefined}
      // delay only the entrance, not the (instant) initial state
      style={delay ? { transitionDelay: visible ? `${delay}ms` : "0ms" } : undefined}
      className={className}
    >
      {children}
    </div>
  );
}
