import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import type { Img } from "@/lib/site";

type Props = {
  image: Img;
  children: ReactNode;
  /** Section height, any CSS length. Defaults to 80svh. */
  height?: string;
  align?: "start" | "center" | "end";
  /** First-screen hero: zooms out on load and fades the content away as you scroll. */
  hero?: boolean;
  /** Stacked panel: sticks to the top while the next panel slides over it (desktop only). */
  panel?: boolean;
  priority?: boolean;
  id?: string;
  labelledBy?: string;
  className?: string;
};

/**
 * Full-bleed background image with a dark scrim so overlaid white text keeps ≥ 4.5:1 contrast.
 * The image is decorative (empty alt); the text carries the meaning.
 */
export function Bleed({ image, children, height, align = "end", hero, panel, priority, id, labelledBy, className = "" }: Props) {
  const cls = ["bleed", `bleed--${align}`, hero && "bleed--hero", panel && "bleed--panel", className].filter(Boolean).join(" ");
  return (
    <section id={id} className={cls} aria-labelledby={labelledBy} style={height ? ({ "--h": height } as CSSProperties) : undefined}>
      <div className="bleed__bg" aria-hidden="true">
        <Image src={image.src} alt="" fill sizes="100vw" priority={priority} style={{ objectFit: "cover" }} />
      </div>
      <div className="container bleed__content on-dark">{children}</div>
    </section>
  );
}
