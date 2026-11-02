import type { MetadataRoute } from "next";
import { SITE_URL, posts } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages = ["", "/services", "/portfolio", "/about-us", "/our-partners", "/blog", "/contact-us"];
  return [
    ...pages.map((p) => ({
      url: `${SITE_URL}${p}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: p === "" ? 1 : 0.8,
    })),
    // Sample posts are noindex, so keep them out of the sitemap too.
    ...posts
      .filter((p) => !p.placeholder)
      .map((p) => ({ url: `${SITE_URL}/blog/${p.slug}`, lastModified: new Date(p.date), priority: 0.6 })),
  ];
}
