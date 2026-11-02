import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import CanvasCursor from "@/components/CanvasCursor";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { SmoothScroll } from "@/components/SmoothScroll";
import { orgJsonLd } from "@/lib/seo";
import { SITE_URL, site } from "@/lib/site";
import "./globals.css";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const body = Jost({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jost",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: `${site.name} — Bespoke interior design & furnishing`, template: `%s | ${site.name}` },
  description: site.description,
  applicationName: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_GB",
    url: SITE_URL,
    title: `${site.name} — Bespoke interior design & furnishing`,
    description: site.description,
    images: [{ url: "/images/hero.jpg", width: 1800, height: 949 }],
  },
  twitter: { card: "summary_large_image" },
  icons: { icon: "/logo.png", apple: "/logo.png" },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className={`${display.variable} ${body.variable}`} suppressHydrationWarning>
      <head>
        {/* Arms scroll-reveal styles only when JS is running, so content is never hidden without it. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
      </head>
      <body>
        <a href="#main" className="skip-link">
          Skip to main content
        </a>
        <SmoothScroll />
        <CanvasCursor />
        <div className="scroll-progress" aria-hidden="true" />
        <Header />
        <main id="main" tabIndex={-1} style={{ outline: "none" }}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
