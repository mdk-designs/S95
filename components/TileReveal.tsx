import Image from "next/image";
import type { CSSProperties } from "react";
import type { Img } from "@/lib/site";
import { Reveal } from "./Reveal";

const COLS = 12;
const ROWS = 6;

/**
 * Full-width image revealed tile by tile: a grid of brand-sand tiles covers the photo and
 * shrinks away in a diagonal wave once the section scrolls into view. The tiles only exist
 * visually when JavaScript is running and motion is allowed (see globals.css), so the image
 * is never hidden for anyone else. Delays are derived from the tile index, so server and
 * client render identically.
 */
export function TileReveal({ image, decorative = true }: { image: Img; decorative?: boolean }) {
  const tiles = Array.from({ length: COLS * ROWS }, (_, i) => {
    const col = i % COLS;
    const row = Math.floor(i / COLS);
    const delay = (col + row) * 55 + ((i * 53) % 7) * 35;
    return <span key={i} className="tile" style={{ "--d": `${delay}ms` } as CSSProperties} />;
  });

  return (
    <Reveal variant="tiles" className="tilereveal">
      <div className="tilereveal__img">
        <Image src={image.src} alt={decorative ? "" : image.alt} fill sizes="100vw" style={{ objectFit: "cover" }} />
      </div>
      <div className="tilereveal__grid" aria-hidden="true" style={{ "--cols": COLS, "--rows": ROWS } as CSSProperties}>
        {tiles}
      </div>
    </Reveal>
  );
}
