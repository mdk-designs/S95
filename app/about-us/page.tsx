import Link from "next/link";
import { Bleed } from "@/components/Bleed";
import { ExpandImage } from "@/components/ExpandImage";
import { PageIntro } from "@/components/PageIntro";
import { Reveal } from "@/components/Reveal";
import { pageMeta } from "@/lib/seo";
import { images, site } from "@/lib/site";

export const metadata = pageMeta({
  title: "About Us",
  description: `Meet S95 Creative Solutions, founded by ${site.founder}: an interdisciplinary team delivering spaces that enable people and businesses to thrive.`,
  path: "/about-us",
  image: "/images/yellow-chair.jpg",
});

export default function AboutPage() {
  return (
    <>
      <PageIntro eyebrow="About S95" title="We are passionate about delivering spaces that enable people and businesses to thrive." />

      <ExpandImage image={images.suppliers} />

      <section className="section" aria-labelledby="how-title">
        <div className="container split split--top">
          <Reveal>
            <h2 id="how-title">About Us</h2>
            <p className="lead" style={{ marginTop: "1.5rem" }}>
              An integrated approach, where creativity and functionality intertwine.
            </p>
          </Reveal>
          <Reveal delay={150}>
            <ul className="checklist">
              <li>Coordinates all project dynamics across client, design, architecture, contractor, and supply tiers.</li>
              <li>Rigorous analysis of architectural drawings, bills of quantities, site conditions, and engineering constraints.</li>
              <li>Quality benchmarking, physical material sample inspections, and transparent quotation evaluations.</li>
            </ul>
          </Reveal>
        </div>
      </section>

      <Bleed image={images.founder} align="center" height="95svh" labelledBy="founder-title">
        <h2 id="founder-title" className="sr-only">
          A word from our founder
        </h2>
        <figure style={{ margin: 0, maxWidth: "52rem" }}>
          <blockquote style={{ margin: 0 }}>
            <p style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.5rem, 1.1rem + 1.7vw, 2.4rem)", lineHeight: 1.35, maxWidth: "none" }}>
              “Inspired by my years in the region, I wanted to establish an environment that fosters support for both homegrown and overseas
              artisans, allowing them to showcase their traditional techniques in a contemporary context. The objective was to enable a wider
              audience to appreciate and enjoy the timeless beauty and unique character of their craftsmanship.
            </p>
            <p style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.5rem, 1.1rem + 1.7vw, 2.4rem)", lineHeight: 1.35, maxWidth: "none" }}>
              Leveraging a wealth of experience and expertise, my initial vision naturally evolved into a thriving business that provides
              end-to-end turn-key solutions, all while staying true to its core values.”
            </p>
          </blockquote>
          <figcaption className="eyebrow" style={{ marginTop: "2rem", marginBottom: 0 }}>
            {site.founder}, Founder of S95
          </figcaption>
        </figure>
      </Bleed>

      <section className="section section--accent" aria-labelledby="about-cta">
        <div className="container">
          <Reveal>
            <h2 id="about-cta" className="statement">
              Would you like to get to know us?
            </h2>
            <div className="actions">
              <Link href="/contact-us" className="btn">
                Get in touch
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
