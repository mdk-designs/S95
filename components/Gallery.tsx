import Image from "next/image";
import type { Img } from "@/lib/site";
import { Words } from "./Words";
import { Reveal } from "./Reveal";

type Item = { image: Img; caption: string };

/**
 * Horizontal gallery. Where scroll-driven animation is supported (and motion is allowed) the section
 * pins and the strip travels sideways as you scroll down. Everywhere else it is a normal
 * keyboard-focusable, swipeable horizontal scroller, so nothing depends on the effect.
 */
export function Gallery({ eyebrow, title, items }: { eyebrow: string; title: string; items: Item[] }) {
  return (
    <section className="hscroll" aria-labelledby="gallery-title">
      <div className="hscroll__pin">
        <div className="container hscroll__head">
          <Reveal>
            <p className="eyebrow">{eyebrow}</p>
          </Reveal>
          <Reveal variant="words">
            <h2 id="gallery-title">
              <Words text={title} />
            </h2>
          </Reveal>
        </div>
        <div className="hscroll__viewport" tabIndex={0} role="region" aria-label={`${title}, scrollable image gallery`}>
          <ul className="hscroll__track">
            {items.map((it, i) => (
              <li key={it.caption} className={`hscroll__item ${i % 2 ? "hscroll__item--short" : ""}`}>
                <figure>
                  <div className="media">
                    <Image src={it.image.src} alt={it.image.alt} width={it.image.width} height={it.image.height} sizes="(min-width: 48rem) 38vw, 80vw" />
                  </div>
                  <figcaption>
                    <span aria-hidden="true">{String(i + 1).padStart(2, "0")}</span> {it.caption}
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
