# S95 Creative Solutions — website (Next.js)

Next.js 16 (App Router) · React 19 · TypeScript · no UI framework, plain CSS tokens.

```bash
npm install
cp .env.example .env.local   # fill in contact-form keys
npm run dev                  # http://localhost:3000
npm run build && npm start   # production
```

## Where things live

| What | Where |
| --- | --- |
| All copy, projects, services, sample journal posts, image paths | `lib/site.ts` |
| Brand tokens (colours, fonts, spacing), all styles | `app/globals.css` (`:root`) |
| Pages | `app/*/page.tsx` (URLs match the old WordPress site) |
| Contact form UI / API | `components/ContactForm.tsx`, `app/api/contact/route.ts` |
| SEO: metadata, JSON-LD, sitemap, robots | `lib/seo.ts`, `app/layout.tsx`, `app/sitemap.ts`, `app/robots.ts` |

## Motion & full-bleed imagery

| Effect | Component / class |
| --- | --- |
| Full-screen photo sections with parallax and a contrast scrim | `components/Bleed.tsx` (`.bleed`) |
| Hero: slow zoom-out on load, drifts and fades as you scroll away | `<Bleed hero>` |
| Services as full-screen panels that stack on top of each other | `<Bleed panel>` inside `.stack` |
| Word-by-word masked headline reveal | `components/Words.tsx` + `<Reveal variant="words">` |
| Image window that opens to full width while scrolling | `components/ExpandImage.tsx` |
| Pinned horizontal gallery that slides sideways as you scroll down | `components/Gallery.tsx` |
| Reading-progress line at the top | `.scroll-progress` |
| Inertial smooth wheel-scrolling (Lenis); off for reduced motion | `components/SmoothScroll.tsx` |
| Canvas cursor: springy trailing ribbons that follow the mouse (native cursor stays visible); mouse only, off for reduced motion | `components/CanvasCursor.tsx`, `hooks/use-canvasCursor.ts` |
| Tile-by-tile image reveal (home, Our Partners) | `components/TileReveal.tsx` |
| "Explore in 360° / AR" button + dialog on a portfolio project (360° panorama + AR model viewer; libraries load only when opened) | `components/ImmersiveViewer.tsx`, data in `lib/site.ts` (`immersiveExamples`) |
| Portfolio projects pinned one-per-viewport | `<Bleed panel>` inside `.stack` |

Scroll-linked effects use native CSS scroll-driven animations (no JS animation library, so they stay smooth and light). Chrome, Edge and Safari 26+ support them; elsewhere the page shows the same content statically, and the gallery becomes a swipeable scroller. With `prefers-reduced-motion` all effects are off, panels un-stick, and nothing is hidden. Text over photos sits on a dark scrim; measured contrast against the brightest 2% of background pixels is ≥ 5.9:1 (AA needs 4.5:1). If you swap in your own photos, re-check very bright images.

### 360° / AR button (portfolio)

The first project (Mövenpick) carries a working example; add another entry to `immersiveExamples` in `lib/site.ts` (keyed by project title) to give any project the button. For real projects supply a 2:1 equirectangular panorama JPG (shoot with a 360 camera, or have a virtual tour exported) in `public/360/` and an optimised `.glb` model in `public/models/` (keep under about 5 MB). AR placement works on supported phones and tablets (Android Scene Viewer / WebXR, iOS Quick Look); on desktop the model can be rotated and zoomed.

Sample assets and their licences (keep the credit lines, or replace the assets): panorama "Small Empty House" by Greg Zaal, Poly Haven, CC0; model "Glam Velvet Sofa" © 2021 Wayfair, LLC, CC BY 4.0 (Khronos glTF Sample Assets).

## Placeholders to replace before launch

- **Photography**: all images in `public/images/` are Unsplash stock (free licence). Replace the files, or edit paths and `alt` text in `lib/site.ts`. Write alt text that describes the real photo.
- **Journal posts**: three sample articles in `lib/site.ts` (`placeholder: true`). They are `noindex` and excluded from the sitemap until you set `placeholder: false`.
- **Segmento link**: set `segmentoUrl` in `lib/site.ts`. Until then the button goes to the contact page.
- **Contact details**: only `info@s95creativesolutions.com` (from the audit) is shown. Confirm it, and add phone / address / social links in `Footer.tsx` and the contact page if wanted.
- **Project details**: the scope lines under each project come from the audit document. Confirm they are accurate.
- **Favicon**: currently the full logo. Supply a square mark when available.

## Contact form

Validates in the browser and again on the server, has a honeypot and a basic rate limit, and sends via [Resend](https://resend.com). Set `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` (and verify the sending domain in Resend). Without keys it logs in development and returns 503 in production, so it never silently drops leads.

## Accessibility (WCAG 2.2 AA)

Skip link · landmarks · one `h1` per page · visible 3px focus ring with offset · sticky header with `scroll-padding` so focus is never hidden (2.4.11) · 44px interaction targets (2.5.8) · accessible mobile menu (Esc, focus trap, focus return, `aria-expanded`) · form labels, `aria-invalid`, `aria-describedby`, focus-moved error summary (3.3.1) · `prefers-reduced-motion` disables all animation · content visible without JavaScript · forced-colors support.

Colour: the sand accent `#DDCCC2` is used only for backgrounds. Accent-coloured *text* uses the derived darker `#6B594F` (6.9:1 on white). Form borders use `#767070` (4.8:1) rather than the hairline `#EBEBEB`.

Automated check (axe-core, WCAG 2 A/AA, 2.1 AA, 2.2 AA + best practice) on all pages at 1440px and 390px: 0 violations. Automated tools find roughly a third of issues, so also do a manual pass with a screen reader (VoiceOver/NVDA) and keyboard-only before launch.

## SEO

Per-page title, description, canonical, Open Graph and Twitter cards; `ProfessionalService` JSON-LD sitewide and `BlogPosting` on articles; `sitemap.xml` and `robots.txt`; optimised `next/image` (AVIF/WebP, responsive sizes); legacy WordPress URLs are preserved and old sitemap/lorem-ipsum URLs are 301-redirected (`next.config.mjs`). Set `NEXT_PUBLIC_SITE_URL` in production.

## Not included yet

Analytics (GA4 / GTM / Meta Pixel) and a cookie-consent banner; privacy policy page. Add after you decide on tooling; a privacy policy is needed once the form collects personal data.
