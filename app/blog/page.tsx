import Image from "next/image";
import Link from "next/link";
import { PageIntro } from "@/components/PageIntro";
import { Reveal } from "@/components/Reveal";
import { pageMeta } from "@/lib/seo";
import { posts } from "@/lib/site";

export const metadata = pageMeta({
  title: "Journal",
  description: "Notes on interior design, bespoke craftsmanship and renovation from the S95 team.",
  path: "/blog",
  noindex: posts.every((p) => p.placeholder),
});

const fmt = new Intl.DateTimeFormat("en-GB", { dateStyle: "long" });

export default function BlogPage() {
  return (
    <>
      <PageIntro eyebrow="Journal" title="Notes from the studio">
        <p>Ideas on interiors, craftsmanship and the renovation process.</p>
      </PageIntro>
      <section className="section" style={{ paddingTop: 0 }} aria-label="Articles">
        <ul className="container grid-3">
          {posts.map((p, i) => (
            <li key={p.slug} className="post-card">
              <Reveal delay={i * 100}>
                <Link href={`/blog/${p.slug}`}>
                  <div className="media media--4x3">
                    <Image src={p.image.src} alt="" width={p.image.width} height={p.image.height} sizes="(min-width: 52rem) 30vw, 100vw" />
                  </div>
                  <h2>{p.title}</h2>
                  <p style={{ fontSize: "1rem" }}>{p.excerpt}</p>
                  <time dateTime={p.date}>{fmt.format(new Date(p.date))}</time>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
