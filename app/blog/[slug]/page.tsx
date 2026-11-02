import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Figure } from "@/components/Figure";
import { pageMeta } from "@/lib/seo";
import { SITE_URL, posts, site } from "@/lib/site";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return {};
  return pageMeta({ title: post.title, description: post.excerpt, path: `/blog/${post.slug}`, image: post.image.src, noindex: post.placeholder });
}

export default async function PostPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    datePublished: post.date,
    image: `${SITE_URL}${post.image.src}`,
    author: { "@type": "Organization", name: site.name },
    publisher: { "@id": `${SITE_URL}/#organization` },
    mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
  };

  return (
    <article className="section" style={{ paddingTop: "clamp(2.5rem, 5vw, 5rem)" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="container">
        <nav aria-label="Breadcrumb" style={{ marginBottom: "2rem" }}>
          <Link href="/blog" className="link-arrow">
            Journal
          </Link>
        </nav>
        <header className="prose" style={{ marginBottom: "3rem" }}>
          <p className="eyebrow">
            <time dateTime={post.date}>{new Intl.DateTimeFormat("en-GB", { dateStyle: "long" }).format(new Date(post.date))}</time>
          </p>
          <h1 style={{ fontSize: "clamp(2.5rem, 1.5rem + 4vw, 4.5rem)" }}>{post.title}</h1>
        </header>
        <Figure image={post.image} ratio="wide" priority />
        <div className="prose" style={{ marginTop: "3.5rem" }}>
          {post.placeholder && (
            <p className="draft-note" role="note">
              Sample article, replace before launch. This page is excluded from search engines until then.
            </p>
          )}
          {post.body.slice(post.placeholder ? 1 : 0).map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </div>
    </article>
  );
}
