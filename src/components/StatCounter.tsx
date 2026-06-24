"use client";

import { useEffect, useRef, useState } from "react";
import { type StatSpec, statTarget } from "@/data/profile";

export default function StatCounter({ spec }: { spec: StatSpec }) {
  const [display, setDisplay] = useState(0);
  const [popped, setPopped] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);
  const raf = useRef(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const value = statTarget(spec); // computed on the client → grows over real time
    if (started.current) {
      setDisplay(value);
      return;
    }
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return;
        started.current = true;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
          setDisplay(value);
          return;
        }
        const t0 = performance.now();
        const dur = 900;
        const tick = (t: number) => {
          const p = Math.min((t - t0) / dur, 1);
          // ease-out expo — fast off the line, snappy settle
          const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
          setDisplay(Math.round(value * eased));
          if (p < 1) raf.current = requestAnimationFrame(tick);
          else setPopped(true); // trigger the landing pop
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
  }, [spec]);

  return (
    <div ref={ref} className="card h-full p-5 text-center transition duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg">
      <p className={`text-3xl font-bold text-primary ${popped ? "animate-count-pop" : ""}`}>
        {display}
        {spec.suffix}
      </p>
      <p className="mono-label mt-1 text-ink-mute">{spec.label}</p>
    </div>
  );
}
