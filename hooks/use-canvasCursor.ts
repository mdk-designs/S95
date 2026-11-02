import { useEffect } from "react";

/**
 * Trailing-line canvas cursor: a bundle of springy ribbons that chase the pointer.
 * Each ribbon is a chain of nodes; every node is pulled toward the one before it, so the
 * bundle fans out and settles into a soft, fluid wake.
 *
 * Expects a <canvas id="canvas"> in the DOM (see components/CanvasCursor.tsx). The canvas starts
 * below the sticky header (see .canvas-cursor in globals.css), so the trail never draws over it.
 * Only runs for mouse-like pointers and when motion is allowed; otherwise the canvas is hidden
 * and the normal cursor is untouched. It never replaces the native cursor.
 */

const CONFIG = {
  trails: 20, // ribbons in the bundle
  size: 50, // nodes per ribbon
  friction: 0.5,
  dampening: 0.25,
  tension: 0.98,
  spring: 0.45,
  idleMs: 2600, // stop drawing this long after the pointer rests
};

class Node {
  x = 0;
  y = 0;
  vx = 0;
  vy = 0;
}

/** Slow sine wave used to drift the hue through a warm range. */
class Wave {
  constructor(
    private phase: number,
    private offset: number,
    private amplitude: number,
    private frequency: number,
  ) {}
  next() {
    this.phase += this.frequency;
    return this.offset + Math.sin(this.phase) * this.amplitude;
  }
}

class Ribbon {
  private nodes: Node[] = [];
  private spring: number;
  private friction: number;

  constructor(index: number, start: { x: number; y: number }) {
    this.spring = CONFIG.spring + (index / CONFIG.trails) * 0.025 + 0.1 * Math.random() - 0.05;
    this.friction = CONFIG.friction + 0.01 * Math.random() - 0.005;
    for (let i = 0; i < CONFIG.size; i++) {
      const n = new Node();
      n.x = start.x;
      n.y = start.y;
      this.nodes.push(n);
    }
  }

  update(target: { x: number; y: number }) {
    let spring = this.spring;
    let node = this.nodes[0];
    node.vx += (target.x - node.x) * spring;
    node.vy += (target.y - node.y) * spring;
    for (let i = 0; i < this.nodes.length; i++) {
      node = this.nodes[i];
      if (i > 0) {
        const prev = this.nodes[i - 1];
        node.vx += (prev.x - node.x) * spring + prev.vx * CONFIG.dampening;
        node.vy += (prev.y - node.y) * spring + prev.vy * CONFIG.dampening;
      }
      node.vx *= this.friction;
      node.vy *= this.friction;
      node.x += node.vx;
      node.y += node.vy;
      spring *= CONFIG.tension;
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    const nodes = this.nodes;
    ctx.beginPath();
    ctx.moveTo(nodes[0].x, nodes[0].y);
    let i = 1;
    for (; i < nodes.length - 2; i++) {
      const a = nodes[i];
      const b = nodes[i + 1];
      ctx.quadraticCurveTo(a.x, a.y, (a.x + b.x) / 2, (a.y + b.y) / 2);
    }
    const a = nodes[i];
    const b = nodes[i + 1];
    ctx.quadraticCurveTo(a.x, a.y, b.x, b.y);
    ctx.stroke();
    ctx.closePath();
  }
}

export default function useCanvasCursor() {
  useEffect(() => {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement | null;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches || reduce.matches) {
      canvas.style.display = "none";
      return;
    }

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    // (re-based on the first pointer move)
    const hue = new Wave(Math.random() * Math.PI * 2, 30, 14, 0.0015 * 16); // warm range ~16–44°
    let ribbons: Ribbon[] = [];
    let raf = 0;
    let lastMove = 0;
    let running = false;

    // Canvas origin in viewport coordinates; pointer positions are converted into canvas space.
    let originX = 0;
    let originY = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect(); // size and offset come from CSS (below the header)
      originX = rect.left;
      originY = rect.top;
      canvas.width = Math.floor(rect.width * dpr);
      canvas.height = Math.floor(rect.height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const frame = (now: number) => {
      if (now - lastMove > CONFIG.idleMs) {
        running = false;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        return;
      }
      ctx.globalCompositeOperation = "source-over";
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = "lighter";
      ctx.strokeStyle = `hsla(${Math.round(hue.next())}, 45%, 86%, 0.07)`;
      ctx.lineWidth = 1.25;
      for (const r of ribbons) {
        r.update(pos);
        r.draw(ctx);
      }
      raf = requestAnimationFrame(frame);
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      pos.x = e.clientX - originX;
      pos.y = e.clientY - originY;
      lastMove = performance.now();
      if (!ribbons.length) ribbons = Array.from({ length: CONFIG.trails }, (_, i) => new Ribbon(i, pos));
      if (!running) {
        running = true;
        raf = requestAnimationFrame(frame);
      }
    };

    // Fade out if the pointer leaves the window.
    const onLeave = () => (lastMove = 0);

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    };
  }, []);
}
