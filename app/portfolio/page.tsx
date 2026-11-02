import Link from "next/link";
import { Bleed } from "@/components/Bleed";
import { PageIntro } from "@/components/PageIntro";
import { Reveal } from "@/components/Reveal";
import { Words } from "@/components/Words";
import { pageMeta } from "@/lib/seo";
import { ImmersiveViewer } from "@/components/ImmersiveViewer";
import { defaultImmersive, immersiveExamples, projects } from "@/lib/site";

export const metadata = pageMeta({
  title: "Portfolio",
  description:
    "Selected S95 projects: luxury hospitality, residential and commercial interiors across the UAE, the USA and the French Alps.",
  path: "/portfolio",
  image: "/images/exterior-timber.jpg",
});

export default function PortfolioPage() {
  return (
    <>
      <PageIntro eyebrow="Selected work" title="Our Projects">
        <p>
          Boasting a combination of exquisite artistry and premium quality, our unparalleled expertise in craftsmanship, personalisation, and
          customisation truly sets us apart in the industry.
        </p>
        <p style={{ marginTop: "1.25rem" }}>
          Our extensive portfolio, encompassing a wide range of luxury hospitality, residential and commercial projects, is a testament to
          our track record in delivering exceptional bespoke interior design solutions on a global scale.
        </p>
      </PageIntro>

      <div className="stack">
        {projects.map((p, i) => (
          <Bleed key={p.title} image={p.image} panel className="bleed--flow" align="end" labelledBy={`p-${i}`}>
              <p className="eyebrow">
                <span>
                  <span aria-hidden="true">{String(i + 1).padStart(2, "0")} · </span>
                  {p.sector}
                </span>
              </p>
              <h2 id={`p-${i}`} style={{ fontSize: "clamp(2.5rem, 1.3rem + 4.8vw, 5.75rem)", fontWeight: 300, maxWidth: "16ch" }}>
                <Reveal as="span" variant="words">
                  <Words text={p.title} />
                </Reveal>
              </h2>
              <dl style={{ margin: "1.75rem 0 0", maxWidth: "46ch" }}>
                <dt className="sr-only">Location</dt>
                <dd style={{ margin: 0, fontSize: "1.2rem" }}>{p.place}</dd>
                <dt className="sr-only">Scope</dt>
                <dd style={{ margin: "0.75rem 0 0" }}>{p.scope}</dd>
              </dl>
              <div className="actions">
                <ImmersiveViewer title={p.title} data={immersiveExamples[p.title] ?? defaultImmersive} />
              </div>
          </Bleed>
        ))}
      </div>

      <section className="section section--accent" aria-labelledby="pf-cta">
        <div className="container">
          <Reveal>
            <h2 id="pf-cta" className="statement">
              Your project could be next.
            </h2>
            <div className="actions">
              <Link href="/contact-us" className="btn">
                Contact us
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
