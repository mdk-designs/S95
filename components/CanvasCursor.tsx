"use client";

import useCanvasCursor from "@/hooks/use-canvasCursor";

const CanvasCursor = () => {
  useCanvasCursor();
  return <canvas className="canvas-cursor" id="canvas" aria-hidden="true" />;
};

export default CanvasCursor;
