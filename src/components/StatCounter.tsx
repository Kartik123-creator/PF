"use client";

import { useEffect, useRef, useState } from "react";

export default function StatCounter({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);
  const raf = useRef(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
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
        const dur = 1200;
        const tick = (t: number) => {
          const p = Math.min((t - t0) / dur, 1);
          setDisplay(Math.round(value * (1 - Math.pow(1 - p, 3)))); // ease-out cubic
          if (p < 1) raf.current = requestAnimationFrame(tick);
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
  }, [value]);

  return (
    <div ref={ref} className="card p-5 text-center">
      <p className="text-3xl font-bold text-primary">
        {display}
        {suffix}
      </p>
      <p className="mono-label mt-1 text-ink-mute">{label}</p>
    </div>
  );
}
