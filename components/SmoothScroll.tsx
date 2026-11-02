"use client";

import Lenis from "lenis";
import { useEffect } from "react";

/**
 * Inertial wheel scrolling. Lenis only eases the *real* scroll position, so CSS scroll-driven
 * animations, sticky panels, keyboard scrolling, find-in-page and anchor links keep working natively.
 * Off entirely for visitors who prefer reduced motion.
 */
export function SmoothScroll() {
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    let lenis: Lenis | null = null;

    const start = () => {
      if (lenis || mq.matches) return;
      lenis = new Lenis({ lerp: 0.085, wheelMultiplier: 0.9, smoothWheel: true, autoRaf: true });
    };
    const stop = () => {
      lenis?.destroy();
      lenis = null;
    };
    const onChange = () => (mq.matches ? stop() : start());

    start();
    mq.addEventListener("change", onChange);
    return () => {
      mq.removeEventListener("change", onChange);
      stop();
    };
  }, []);

  return null;
}
