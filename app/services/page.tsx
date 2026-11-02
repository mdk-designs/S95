import Link from "next/link";
import { Bleed } from "@/components/Bleed";
import { PageIntro } from "@/components/PageIntro";
import { Reveal } from "@/components/Reveal";
import { Words } from "@/components/Words";
import { pageMeta } from "@/lib/seo";
import { services, site } from "@/lib/site";

export const metadata = pageMeta({
  title: "Services",
  description:
    "Consultancy, FF&E sourcing, art & styling, and bespoke craftsmanship: S95’s three verticals, available standalone or in tandem.",
  path: "/services",
  image: "/images/modern-living.jpg",
});

export default function ServicesPage() {
  return (
    <>
      <PageIntro eyebrow="What we do" title="Our Services">
        <p>Three verticals, available either as standalone services, or in tandem, from first brief to final installation.</p>
      </PageIntro>

      {services.map((s) => (
        <div key={s.slug} id={s.slug}>
          <Bleed image={s.image} height="70svh" align="end" labelledBy={`${s.slug}-title`}>
            <span className="bleed__num" aria-hidden="true">
              {s.number}
            </span>
            <h2 id={`${s.slug}-title`} style={{ fontSize: "clamp(2.5rem, 1.4rem + 4.5vw, 5.5rem)", fontWeight: 300, maxWidth: "16ch" }}>
              <Reveal as="span" variant="words">
                <Words text={s.title} />
              </Reveal>
            </h2>
            <p className="lead" style={{ marginTop: "1.5rem" }}>
              {s.summary}
            </p>
          </Bleed>

          <section className="section" aria-label={`${s.title} in detail`}>
            <ul className="container grid-3">
              {s.points.map((pt, i) => (
                <li key={pt.title}>
                  <Reveal delay={i * 120}>
                    <p className="project__meta" style={{ marginTop: 0 }}>
                      {String(i + 1).padStart(2, "0")}
                    </p>
                    <h3 style={{ fontSize: "1.6rem", marginBottom: "1rem" }}>{pt.title}</h3>
                    <p style={{ fontSize: "1rem" }}>{pt.body}</p>
                  </Reveal>
                </li>
              ))}
            </ul>
            {s.slug === "bespoke-craftsmanship" && (
              <div className="container actions">
                <Link href="/our-partners#segmento" className="btn btn--ghost">
                  S95 Segmento
                </Link>
              </div>
            )}
          </section>
        </div>
      ))}

      <section className="section section--accent" aria-labelledby="svc-cta">
        <div className="container">
          <Reveal>
            <h2 id="svc-cta" className="statement">
              Tell us about your space.
            </h2>
            <p style={{ marginTop: "1.5rem" }}>Planning a renovation or a new interior? {site.shortName} can lead, or support, any stage.</p>
            <div className="actions">
              <Link href="/contact-us" className="btn">
                Start your project
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
