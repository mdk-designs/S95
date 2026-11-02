import type { Metadata } from "next";
import { SITE_URL, site } from "./site";

export function pageMeta(opts: { title: string; description: string; path: string; image?: string; noindex?: boolean }): Metadata {
  const url = `${SITE_URL}${opts.path}`;
  const image = opts.image ?? "/images/hero.jpg";
  return {
    title: opts.title,
    description: opts.description,
    alternates: { canonical: opts.path },
    robots: opts.noindex ? { index: false, follow: true } : undefined,
    openGraph: {
      type: "website",
      url,
      siteName: site.name,
      title: opts.title,
      description: opts.description,
      locale: "en_GB",
      images: [{ url: image, width: 1800, height: 949 }],
    },
    twitter: { card: "summary_large_image", title: opts.title, description: opts.description, images: [image] },
  };
}

export const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${SITE_URL}/#organization`,
  name: site.name,
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  image: `${SITE_URL}/images/hero.jpg`,
  description: site.description,
  email: site.email,
  founder: { "@type": "Person", name: site.founder },
  areaServed: ["United Arab Emirates", "Middle East", "Worldwide"],
  knowsAbout: ["Interior design", "FF&E sourcing", "Bespoke furniture", "Joinery", "Project consultancy"],
  makesOffer: ["Consultancy", "FF&E Sourcing, Art & Styling", "Bespoke Craftsmanship"].map((name) => ({
    "@type": "Offer",
    itemOffered: { "@type": "Service", name },
  })),
};
