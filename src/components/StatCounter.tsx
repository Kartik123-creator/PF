"use client";

import { useEffect, useRef, useState } from "react";
import type { Stat } from "@/data/profile";

/**
 * Renders the final value on the server (so crawlers and no-JS visitors see it),
 * then — client-side only — replays a count-up for numeric stats that start
 * below the fold. Stats already on screen at load are left alone (no flash to 0).
 */
export default function StatCounter({ stat }: { stat: Stat }) {
  const target = typeof stat.value === "number" ? stat.value : null;
  // null = show the real value; a number = mid-animation frame
  const [frame, setFrame] = useState<number | null>(null);
  const [popped, setPopped] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const raf = useRef(0);

  useEffect(() => {
    const el = ref.current;
    if (target === null || !el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight) return;

    setFrame(0);
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        obs.disconnect();
        const t0 = performance.now();
        const dur = 900;
        const tick = (t: number) => {
          const p = Math.min((t - t0) / dur, 1);
          // ease-out expo — fast off the line, snappy settle
          const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
          if (p < 1) {
            setFrame(Math.round(target * eased));
            raf.current = requestAnimationFrame(tick);
          } else {
            setFrame(null);
            setPopped(true); // trigger the landing pop
          }
        };
        raf.current = requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => {
      obs.disconnect();
      cancelAnimationFrame(raf.current);
    };
  }, [target]);

  return (
    <div ref={ref} className="card h-full px-3 py-5 text-center transition duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg sm:px-5">
      <p
        className={`font-bold text-primary ${
          stat.compact
            ? "flex min-h-9 items-center justify-center whitespace-nowrap text-[0.9rem] tracking-tight sm:text-2xl lg:text-xl"
            : "text-3xl"
        } ${popped ? "animate-count-pop" : ""}`}
      >
        {frame ?? stat.value}
        {stat.suffix}
      </p>
      <p className="mono-label mt-1 text-ink-mute">{stat.label}</p>
    </div>
  );
}
