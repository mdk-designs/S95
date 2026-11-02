import Link from "next/link";
import { Bleed } from "@/components/Bleed";
import { Figure } from "@/components/Figure";
import { Gallery } from "@/components/Gallery";
import { Reveal } from "@/components/Reveal";
import { TileReveal } from "@/components/TileReveal";
import { Words } from "@/components/Words";
import { pageMeta } from "@/lib/seo";
import { images, projects, services, site } from "@/lib/site";

export const metadata = pageMeta({
  title: `${site.name} — Bespoke interior design & furnishing`,
  description: site.description,
  path: "/",
});

const galleryItems = [
  { image: { src: "/images/modern-living.jpg", alt: "Open-plan living room with a timber feature wall and a soft grey sofa", width: 2400, height: 1632 }, caption: "Living" },
  { image: { src: "/images/bedroom-orange.jpg", alt: "Bedroom with a navy upholstered bench, terracotta cushions and bold artwork", width: 2400, height: 1624 }, caption: "Bedrooms" },
  { image: { src: "/images/rattan-living.jpg", alt: "Living room with woven pendant lamps, a layered rug and plants", width: 2400, height: 2400 }, caption: "Lighting & texture" },
  { image: { src: "/images/apartment.jpg", alt: "Compact kitchen and dining area with warm timber flooring", width: 2400, height: 1600 }, caption: "Kitchens & joinery" },
  { image: { src: "/images/yellow-chair.jpg", alt: "Minimal corner with a yellow armchair and a brass floor lamp", width: 2400, height: 2117 }, caption: "Details" },
  { image: { src: "/images/grey-living.jpg", alt: "Tonal grey living room with a round coffee table and layered rug", width: 2400, height: 1600 }, caption: "Family spaces" },
];

export default function Home() {
  return (
    <>
      {/* 1 — Full-screen hero */}
      <Bleed image={images.hero} hero priority labelledBy="hero-title">
        <p className="eyebrow rise">Interior design · Furnishing · Craftsmanship</p>
        <h1 id="hero-title" className="words-load">
          <Words text="Elevating spaces through bespoke interior solutions." />
        </h1>
        <p className="lead rise" style={{ "--d": "900ms", marginTop: "2rem" } as React.CSSProperties}>
          At S95, we foster an integrated approach, where creativity and functionality intertwine.
        </p>
        <div className="actions rise" style={{ "--d": "1050ms" } as React.CSSProperties}>
          <Link href="/contact-us" className="btn btn--light">
            Start your project
          </Link>
          <Link href="/services" className="link-arrow link-arrow--light">
            Our services <span aria-hidden="true" />
          </Link>
        </div>
        <span className="scroll-cue" aria-hidden="true">
          Scroll
        </span>
      </Bleed>

      {/* 2 — Introduction */}
      <section className="section" aria-labelledby="intro-title">
        <div className="container split split--top">
          <div>
            <Reveal>
              <p className="eyebrow">About S95</p>
            </Reveal>
            <Reveal variant="words">
              <h2 id="intro-title">
                <Words text="Soulful, sophisticated spaces, made to work as beautifully as they look." />
              </h2>
            </Reveal>
          </div>
          <Reveal delay={200}>
            <p>
              We specialise in crafting soulful, sophisticated homes, luxury hospitality spaces, and design-led, functional workplaces that
              enable people and businesses to thrive.
            </p>
            <p>
              Experienced in sourcing and manufacturing custom furniture, fixtures, accessories &amp; art direct from manufacturers, we manage
              every element to ensure seamless collaboration and synergy among all stakeholders.
            </p>
            <p>
              Our interdisciplinary team combines expertise in interior design, bespoke fabrication, procurement, and fit-out, to deliver
              mindful and aesthetically considered indoor and outdoor FF&amp;E furnishing solutions.
            </p>
            <div className="actions">
              <Link href="/about-us" className="link-arrow">
                Read more <span className="sr-only">about S95</span>
                <span aria-hidden="true" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 3 — Services: full-screen panels that stack as you scroll */}
      <section aria-labelledby="services-title">
        <div className="section section--tint" style={{ paddingBottom: "clamp(3rem, 5vw, 5rem)" }}>
          <div className="container split split--top">
            <div>
              <Reveal>
                <p className="eyebrow">What we do</p>
              </Reveal>
              <Reveal variant="words">
                <h2 id="services-title">
                  <Words text="Our Services" />
                </h2>
              </Reveal>
            </div>
            <Reveal delay={150}>
              <p className="lead">
                We combine quality production and craftsmanship to deliver luxury interior design solutions for clients. Our expertise can be
                categorised into three main verticals, available either as standalone services, or in tandem.
              </p>
            </Reveal>
          </div>
        </div>
        <div className="stack">
          {services.map((s) => (
            <Bleed key={s.slug} image={s.image} panel align="end" labelledBy={`panel-${s.slug}`}>
              <span className="bleed__num" aria-hidden="true">
                {s.number}
              </span>
              <h3 id={`panel-${s.slug}`} style={{ fontSize: "clamp(2.25rem, 1.4rem + 3.4vw, 4.5rem)", fontWeight: 300 }}>
                {s.title}
              </h3>
              <p className="lead" style={{ marginTop: "1.5rem" }}>
                {s.summary}
              </p>
              <div className="actions">
                <Link href={`/services#${s.slug}`} className="link-arrow link-arrow--light">
                  Learn more <span className="sr-only">about {s.title}</span>
                  <span aria-hidden="true" />
                </Link>
              </div>
            </Bleed>
          ))}
        </div>
      </section>

      {/* 4 — Statement over full-bleed image */}
      <Bleed image={images.statement} align="center" height="90svh" labelledBy="statement-title">
        <h2 id="statement-title" className="statement">
          <Reveal as="span" variant="words">
            <Words text="Introducing designers & architects to" />{" "}
            <em>
              <Words text="exquisite craftsmanship." start={5} />
            </em>
          </Reveal>
        </h2>
      </Bleed>

      {/* 5 — Horizontal gallery that travels sideways while you scroll down */}
      <Gallery eyebrow="A closer look" title="Spaces, considered in every detail." items={galleryItems} />

      {/* 6 — Selected projects */}
      <section className="section" aria-labelledby="projects-title">
        <div className="container">
          <div className="split split--top">
            <div>
              <Reveal>
                <p className="eyebrow">Selected work</p>
              </Reveal>
              <Reveal variant="words">
                <h2 id="projects-title">
                  <Words text="Our Projects" />
                </h2>
              </Reveal>
            </div>
            <Reveal delay={150}>
              <p className="lead">
                Boasting a combination of exquisite artistry and premium quality, our unparalleled expertise in craftsmanship, personalisation,
                and customisation truly sets us apart in the industry.
              </p>
            </Reveal>
          </div>
          <ul className="grid-2" style={{ marginTop: "clamp(3rem, 6vw, 5rem)" }}>
            {projects.map((p, i) => (
              <li key={p.title} className="project">
                <Figure image={p.image} ratio="4x3" parallax sizes="(min-width: 52rem) 40vw, 100vw" delay={(i % 2) * 120} />
                <Reveal>
                  <p className="project__meta">{p.place}</p>
                  <h3>{p.title}</h3>
                </Reveal>
              </li>
            ))}
          </ul>
          <div className="actions" style={{ marginTop: "3.5rem" }}>
            <Link href="/portfolio" className="link-arrow">
              View the portfolio <span aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* 7 — Partners: window opens to full width, then text */}
      <section className="section section--tint" style={{ paddingTop: 0 }} aria-labelledby="partners-title">
        <TileReveal image={images.partners} />
        <div className="container split split--top" style={{ paddingTop: "clamp(3.5rem, 7vw, 7rem)" }}>
          <div>
            <Reveal>
              <p className="eyebrow">Craft &amp; collaboration</p>
            </Reveal>
            <Reveal variant="words">
              <h2 id="partners-title">
                <Words text="Our Partners" />
              </h2>
            </Reveal>
          </div>
          <Reveal delay={150}>
            <p>
              Passionate about matchmaking and showcasing skilled manufacturers and innovative design, we have formed trusted partnerships with
              both emerging and well-established artisans with luxury projects delivered around the Middle East and globally.
            </p>
            <p>
              Through the artful juxtaposition of contemporary and vintage, architectural and organic, graphic and instinctual elements, we
              craft unique and captivating narratives. These narratives inspire, evoke emotions, and make a lasting impact on both individuals
              and spaces.
            </p>
            <div className="actions">
              <Link href="/our-partners" className="btn btn--ghost">
                Our Partners
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 8 — Closing call to action over full-bleed image */}
      <Bleed image={{ src: "/images/bedroom-cream.jpg", alt: "", width: 2400, height: 1600 }} align="center" height="85svh" labelledBy="cta-title">
        <p className="eyebrow">Let’s talk</p>
        <h2 id="cta-title" className="statement">
          <Reveal as="span" variant="words">
            <Words text="Delivering spaces that enable people and businesses to thrive." />
          </Reveal>
        </h2>
        <div className="actions">
          <Link href="/contact-us" className="btn btn--light">
            Contact us
          </Link>
        </div>
      </Bleed>
    </>
  );
}
