import Image from "next/image";
import type { Img } from "@/lib/site";
import { Reveal } from "./Reveal";

type Props = {
  image: Img;
  ratio?: "16x9" | "wide" | "4x3" | "4x5" | "sq";
  sizes?: string;
  priority?: boolean;
  parallax?: boolean;
  delay?: number;
  /** Decorative images get empty alt text so screen readers skip them. */
  decorative?: boolean;
};

export function Figure({ image, ratio = "4x3", sizes = "(min-width: 82rem) 1312px, 100vw", priority, parallax, delay, decorative }: Props) {
  return (
    <Reveal variant="image" delay={delay} className={`media media--${ratio}${parallax ? " parallax" : ""}`}>
      <Image
        src={image.src}
        alt={decorative ? "" : image.alt}
        width={image.width}
        height={image.height}
        sizes={sizes}
        priority={priority}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    </Reveal>
  );
}
