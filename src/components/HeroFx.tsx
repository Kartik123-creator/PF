"use client";

import { useEffect, useRef } from "react";

/**
 * Renders the hero's layered glow field and parallaxes it against pointer
 * movement and scroll. A single rAF loop lerps the current offset toward its
 * target, so motion stays smooth (no per-event layout work) and gently trails
 * the cursor for a premium feel. Disabled entirely under reduced motion;
 * pointer tracking is skipped on coarse (touch) pointers.
 */
export default function HeroFx() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const finePointer = window.matchMedia("(pointer: fine)").matches;
    let targetX = 0;
    let targetY = 0;
    let curX = 0;
    let curY = 0;
    let scrollY = 0;
    let raf = 0;
    let running = true;

    const onMove = (e: PointerEvent) => {
      targetX = (e.clientX / window.innerWidth - 0.5) * 38;
      targetY = (e.clientY / window.innerHeight - 0.5) * 38;
    };
    const onScroll = () => {
      scrollY = window.scrollY;
    };
    const loop = () => {
      if (!running) return;
      // only spend frames while the hero is still on screen
      if (scrollY < window.innerHeight) {
        curX += (targetX - curX) * 0.07;
        curY += (targetY + scrollY * 0.18 - curY) * 0.07;
        el.style.transform = `translate3d(${curX.toFixed(2)}px, ${curY.toFixed(2)}px, 0)`;
      }
      raf = requestAnimationFrame(loop);
    };

    if (finePointer) window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    raf = requestAnimationFrame(loop);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div ref={ref} aria-hidden="true" className="hero-fx">
      <div className="hero-glow" />
      <div className="hero-glow hero-glow--accent" />
    </div>
  );
}
