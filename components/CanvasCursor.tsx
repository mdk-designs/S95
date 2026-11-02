"use client";

import { usePathname } from "next/navigation";
import useCanvasCursor from "@/hooks/use-canvasCursor";

const CursorCanvas = () => {
  useCanvasCursor();
  return <canvas className="canvas-cursor" id="canvas" aria-hidden="true" />;
};

// The effect is switched off on the contact page so the form stays distraction-free.
const CanvasCursor = () => {
  const pathname = usePathname();
  if (pathname.startsWith("/contact-us")) return null;
  return <CursorCanvas />;
};

export default CanvasCursor;
