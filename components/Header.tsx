"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { nav, site } from "@/lib/site";

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const close = useCallback((restoreFocus = true) => {
    setOpen(false);
    if (restoreFocus) btnRef.current?.focus();
  }, []);

  // Close on route change.
  useEffect(() => setOpen(false), [pathname]);

  // Overlay behaviour: Esc to close, focus trap, scroll lock, close when viewport becomes desktop.
  useEffect(() => {
    if (!open) return;
    const overlay = overlayRef.current;
    const first = overlay?.querySelector<HTMLElement>(FOCUSABLE);
    first?.focus();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
        return;
      }
      if (e.key !== "Tab" || !overlay) return;
      // Trap focus between the menu button and the overlay links.
      const items = [btnRef.current, ...Array.from(overlay.querySelectorAll<HTMLElement>(FOCUSABLE))].filter(Boolean) as HTMLElement[];
      const firstEl = items[0];
      const lastEl = items[items.length - 1];
      if (e.shiftKey && document.activeElement === firstEl) {
        e.preventDefault();
        lastEl.focus();
      } else if (!e.shiftKey && document.activeElement === lastEl) {
        e.preventDefault();
        firstEl.focus();
      }
    };
    const mq = window.matchMedia("(min-width: 62rem)");
    const onMq = () => mq.matches && setOpen(false);

    document.addEventListener("keydown", onKey);
    mq.addEventListener("change", onMq);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onMq);
    };
  }, [open, close]);

  const isCurrent = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <Link href="/" className="brand" aria-label={`${site.name} — home`}>
          <Image src="/logo.png" alt="" width={747} height={544} priority style={{ height: "3.75rem", width: "auto" }} />
        </Link>

        <nav className="nav-desktop" aria-label="Main">
          <ul>
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="nav-link" aria-current={isCurrent(item.href) ? "page" : undefined}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <button
          ref={btnRef}
          type="button"
          className="menu-btn"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => (open ? close(false) : setOpen(true))}
        >
          <span>{open ? "Close" : "Menu"}</span>
          <span className="menu-btn__bars" aria-hidden="true" />
        </button>
      </div>

      {open && (
        <div id="mobile-menu" ref={overlayRef} className="menu-overlay" data-lenis-prevent role="dialog" aria-modal="true" aria-label="Site menu">
          <nav aria-label="Main mobile">
            <ul>
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} aria-current={isCurrent(item.href) ? "page" : undefined}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <p className="menu-overlay__foot">
            <a href={`mailto:${site.email}`}>{site.email}</a>
          </p>
        </div>
      )}
    </header>
  );
}
