"use client";

import "@photo-sphere-viewer/core/index.css";
import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";

export type Immersive = {
  panorama: string;
  panoramaAlt: string;
  panoramaCredit: string;
  model: string;
  modelAlt: string;
  modelCredit: string;
};

type Tab = "360" | "ar";

/**
 * "Explore in 360° / AR" button + dialog.
 *  - 360° tour: equirectangular panorama (Photo Sphere Viewer). Drag, swipe, arrow keys or the on-screen controls.
 *  - AR view: a glTF model (Google model-viewer). On supported phones/tablets the button places it in your room
 *    (Android Scene Viewer / WebXR, iOS Quick Look); on desktop you can still rotate and zoom it.
 * Both libraries are loaded only when the dialog is opened. Uses the native <dialog> for focus trapping,
 * Esc to close and an inert background.
 */
export function ImmersiveViewer({ title, data }: { title: string; data: Immersive }) {
  const uid = useId();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const panoRef = useRef<HTMLDivElement>(null);
  const arRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<Tab>("360");
  const [status, setStatus] = useState("");

  const openDialog = () => {
    setTab("360");
    setOpen(true);
    dialogRef.current?.showModal();
    document.body.style.overflow = "hidden";
  };

  // Native <dialog> closes on Esc or .close(); keep React state and page scroll in sync.
  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    const onClose = () => {
      setOpen(false);
      document.body.style.overflow = "";
    };
    d.addEventListener("close", onClose);
    return () => d.removeEventListener("close", onClose);
  }, []);

  // 360° viewer
  useEffect(() => {
    if (!open || tab !== "360" || !panoRef.current) return;
    const container = panoRef.current;
    let cancelled = false;
    let viewer: import("@photo-sphere-viewer/core").Viewer | undefined;
    setStatus("Loading 360° tour…");
    (async () => {
      const { Viewer } = await import("@photo-sphere-viewer/core");
      if (cancelled) return;
      viewer = new Viewer({
        container,
        panorama: data.panorama,
        defaultYaw: "20deg",
        navbar: ["zoom", "move", "fullscreen"],
        mousewheel: false, // don't hijack page scrolling; zoom buttons and +/- keys are available
        keyboard: false, // enabled only while the viewer itself has focus (below), so Tab/arrow keys elsewhere behave normally
        loadingTxt: "Loading…",
      });
      (window as unknown as { __psv?: unknown }).__psv = viewer;
      viewer.addEventListener("ready", () => !cancelled && setStatus("360° tour ready. Drag, swipe, or use the arrow keys to look around."), { once: true });
      container.addEventListener("focusin", () => viewer?.startKeyboardControl());
      container.addEventListener("focusout", () => viewer?.stopKeyboardControl());
    })();
    return () => {
      cancelled = true;
      viewer?.destroy();
    };
  }, [open, tab, data.panorama]);

  // AR viewer
  useEffect(() => {
    if (!open || tab !== "ar" || !arRef.current) return;
    const container = arRef.current;
    let cancelled = false;
    setStatus("Loading 3D model…");
    (async () => {
      await import("@google/model-viewer");
      if (cancelled) return;
      const mv = document.createElement("model-viewer");
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const attrs: Record<string, string> = {
        src: data.model,
        alt: data.modelAlt,
        ar: "",
        "ar-modes": "webxr scene-viewer quick-look",
        "ar-scale": "auto",
        "camera-controls": "",
        "touch-action": "pan-y",
        "shadow-intensity": "1",
        "shadow-softness": "1",
        exposure: "1",
        loading: "eager",
      };
      if (!reduce) attrs["auto-rotate"] = "";
      for (const [k, v] of Object.entries(attrs)) mv.setAttribute(k, v);
      mv.style.cssText = "width:100%;height:100%;background:transparent;--poster-color:transparent";
      const btn = document.createElement("button");
      btn.slot = "ar-button";
      btn.type = "button";
      btn.className = "btn btn--light immersive__ar-btn";
      btn.textContent = "View in your space";
      mv.appendChild(btn);
      mv.addEventListener("load", () => !cancelled && setStatus("3D model ready. Drag to rotate; on a supported phone, use View in your space."), { once: true });
      container.appendChild(mv);
    })();
    return () => {
      cancelled = true;
      container.replaceChildren();
    };
  }, [open, tab, data.model, data.modelAlt]);

  const onTabKey = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key !== "ArrowLeft" && e.key !== "ArrowRight" && e.key !== "Home" && e.key !== "End") return;
    e.preventDefault();
    const next: Tab = e.key === "ArrowLeft" || e.key === "Home" ? "360" : "ar";
    setTab(next);
    document.getElementById(`${uid}-tab-${next}`)?.focus();
  };

  return (
    <>
      <button type="button" className="btn btn--outline-light immersive__trigger" onClick={openDialog} aria-haspopup="dialog">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" focusable="false">
          <path d="M12 3 4 7.5v9L12 21l8-4.5v-9L12 3Zm0 9L4 7.5M12 12l8-4.5M12 12v9" strokeLinejoin="round" />
        </svg>
        Explore in 360° / AR <span className="sr-only">for {title}</span>
      </button>

      <dialog
        ref={dialogRef}
        className="immersive on-dark"
        aria-labelledby={`${uid}-title`}
        data-lenis-prevent
        onClick={(e) => e.target === dialogRef.current && dialogRef.current?.close()}
      >
        <div className="immersive__bar">
          <div>
            <p className="eyebrow" style={{ margin: 0 }}>
              Sample immersive experience
            </p>
            <h2 id={`${uid}-title`} className="immersive__title">
              {title}
            </h2>
          </div>
          <button type="button" className="immersive__close" onClick={() => dialogRef.current?.close()} aria-label="Close immersive view">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true" focusable="false">
              <path d="M5 5l14 14M19 5 5 19" />
            </svg>
          </button>
        </div>

        <div role="tablist" aria-label="Choose a view" className="immersive__tabs">
          {(["360", "ar"] as const).map((t) => (
            <button
              key={t}
              id={`${uid}-tab-${t}`}
              role="tab"
              type="button"
              aria-selected={tab === t}
              aria-controls={`${uid}-panel`}
              tabIndex={tab === t ? 0 : -1}
              onClick={() => setTab(t)}
              onKeyDown={onTabKey}
            >
              {t === "360" ? "360° tour" : "AR view"}
            </button>
          ))}
        </div>

        <div id={`${uid}-panel`} role="tabpanel" aria-labelledby={`${uid}-tab-${tab}`} className="immersive__stage">
          {tab === "360" ? (
            <div ref={panoRef} className="immersive__pano" tabIndex={0} role="group" aria-label={`360° panorama. ${data.panoramaAlt} Use arrow keys to look around, plus and minus to zoom.`} />
          ) : (
            <div ref={arRef} className="immersive__ar" />
          )}
        </div>

        <p className="immersive__status sr-only" role="status" aria-live="polite">
          {status}
        </p>
        <p className="immersive__hint">
          {tab === "360"
            ? "Drag or swipe to look around. Arrow keys also work once the view is focused."
            : "On a supported phone or tablet, tap View in your space to place it in the room. On desktop you can rotate and zoom."}
        </p>
        <p className="immersive__credit">{tab === "360" ? data.panoramaCredit : data.modelCredit}</p>
      </dialog>
    </>
  );
}
