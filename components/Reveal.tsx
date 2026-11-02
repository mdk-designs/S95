"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  variant?: "fade" | "image" | "words" | "tiles";
  delay?: number;
  className?: string;
  as?: "div" | "span" | "section" | "li" | "article" | "figure" | "header";
};

/**
 * Adds `is-visible` once the element enters the viewport. The hidden start state
 * only applies when <html class="js"> is set, so content is always readable
 * without JavaScript and for reduced-motion users (see globals.css).
 */
export function Reveal({ children, variant = "fade", delay = 0, className, as: Tag = "div" }: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      el.classList.add("is-visible");
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const style = delay ? ({ "--d": `${delay}ms` } as CSSProperties) : undefined;

  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <Tag ref={ref as any} data-reveal={variant} className={className} style={style}>
      {children}
    </Tag>
  );
}
