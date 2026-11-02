import Link from "next/link";
import { Bleed } from "@/components/Bleed";
import { ExpandImage } from "@/components/ExpandImage";
import { PageIntro } from "@/components/PageIntro";
import { Reveal } from "@/components/Reveal";
import { Words } from "@/components/Words";
import { pageMeta } from "@/lib/seo";
import { images, site } from "@/lib/site";

export const metadata = pageMeta({
  title: "Our Partners",
  description:
    "S95’s partnerships with international brands, manufacturers and artisans, including S95 Segmento, our Italian alliance for bespoke kitchens, baths, joinery and doors.",
  path: "/our-partners",
  image: "/images/plants-living.jpg",
});

export default function PartnersPage() {
  return (
    <>
      <PageIntro eyebrow="Craft & collaboration" title="Our Partners">
        <p>
          By merging traditional craftsmanship with contemporary design practices, we are continuously pushing the boundaries and challenging
          traditional design principles.
        </p>
        <p style={{ marginTop: "1.25rem" }}>
          Our strategic partnerships with a wide range of internationally established and emerging brands, manufacturers, and artisans,
          enable us to deliver bespoke interior furnishings that embody the highest level of craftsmanship and design excellence.
        </p>
      </PageIntro>

      <ExpandImage image={images.partners} />

      <Bleed image={images.segmento} id="segmento" align="end" height="90svh" labelledBy="segmento-title">
        <p className="eyebrow">Italian alliance</p>
        <h2 id="segmento-title" style={{ fontSize: "clamp(2.5rem, 1.3rem + 4.8vw, 5.75rem)", fontWeight: 300 }}>
          <Reveal as="span" variant="words">
            <Words text="S95 Segmento" />
          </Reveal>
        </h2>
        <p className="lead" style={{ marginTop: "1.75rem" }}>
          An exceptional selection of bespoke kitchens, baths, joinery, and doors, in partnership with the renowned Italian brand, Segmento.
        </p>
      </Bleed>

      <section className="section" aria-label="About S95 Segmento">
        <div className="container split split--top">
          <Reveal>
            <p>
              At S95, we embrace a philosophy of constant evolution and exploration, always seeking new opportunities to elevate our client
              experience. As a testament to our growth strategy, we are thrilled to announce our recent partnership with the renowned Italian
              brand, Segmento. The partnership has enabled us to expand our offerings and provide our clients with an exceptional selection
              of bespoke kitchens, baths, joinery, and doors.
            </p>
          </Reveal>
          <Reveal delay={150}>
            <p>
              S95 Segmento, as an extension of the S95 brand, is solely dedicated to the pursuit of delivering exquisitely crafted interior
              finishes, characterised by innovative design, impeccable craftsmanship, and meticulous attention to detail.
            </p>
            <div className="actions">
              {site.segmentoUrl ? (
                <a href={site.segmentoUrl} className="btn" target="_blank" rel="noopener noreferrer">
                  Visit Segmento <span className="sr-only">(opens in a new tab)</span>
                </a>
              ) : (
                <Link href="/contact-us" className="btn">
                  Enquire about Segmento
                </Link>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      <Bleed image={images.suppliers} align="center" height="85svh" labelledBy="suppliers-title">
        <p className="eyebrow">Direct from the maker</p>
        <h2 id="suppliers-title" style={{ fontSize: "clamp(2.5rem, 1.3rem + 4.8vw, 5.75rem)", fontWeight: 300 }}>
          <Reveal as="span" variant="words">
            <Words text="Our Suppliers" />
          </Reveal>
        </h2>
        <p className="lead" style={{ marginTop: "1.75rem" }}>
          We source products directly from the factory and leverage our close relationships to secure the most competitive pricing and the
          best possible value for you.
        </p>
      </Bleed>

      <section className="section" aria-label="About our suppliers">
        <div className="container split split--top">
          <Reveal>
            <p>
              Continuously dedicated to providing bespoke interior solutions that exceed expectations, we work with a selection of trusted
              suppliers to elevate our capabilities to new heights. Through the synergy of our collective strengths, we tackle even the most
              ambitious projects with confidence and precision.
            </p>
          </Reveal>
          <Reveal delay={150}>
            <p>
              We regularly visit our partner factories to explore the newest product ranges and ensure that these products align with our
              high standards of quality. To read more about some of our recent visits, check out our <Link href="/blog">journal</Link>.
            </p>
            <div className="actions">
              <Link href="/contact-us" className="link-arrow">
                Contact us about our partnerships <span aria-hidden="true" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
