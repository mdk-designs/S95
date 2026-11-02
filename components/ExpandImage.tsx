import Image from "next/image";
import type { Img } from "@/lib/site";

/** A window that opens to the full screen width as it scrolls into view (CSS scroll-driven; static where unsupported). */
export function ExpandImage({ image, decorative = true }: { image: Img; decorative?: boolean }) {
  return (
    <div className="expand">
      <div className="expand__inner">
        <Image src={image.src} alt={decorative ? "" : image.alt} fill sizes="100vw" style={{ objectFit: "cover" }} />
      </div>
    </div>
  );
}
