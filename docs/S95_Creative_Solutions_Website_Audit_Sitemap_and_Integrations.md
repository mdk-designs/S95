# S95 Creative Solutions — Website Audit, Sitemap & Integrations Architecture

**Website URL:** [https://s95creativesolutions.com/](https://s95creativesolutions.com/)  
**Company:** S95 Creative Solutions  
**Founder & Managing Partner:** Samantha Nasser  
**Document Type:** Comprehensive Architectural Audit, Full Sitemap, Page Content Inventory & Integrations Dossier  
**Generated Date:** November 2026  

---

## Table of Contents
1. [Executive Summary & Technical Infrastructure](#1-executive-summary--technical-infrastructure)
2. [CMS Core Architecture & Builder Integration](#2-cms-core-architecture--builder-integration)
3. [Full Sitemap & Route Index](#3-full-sitemap--route-index)
4. [Comprehensive Page-by-Page Content Documentation](#4-comprehensive-page-by-page-content-documentation)
   - [4.1 Home Page (ID: 10)](#41-home-page-id-10)
   - [4.2 Services Page (ID: 15)](#42-services-page-id-15)
   - [4.3 Portfolio / Our Projects Page (ID: 17)](#43-portfolio--our-projects-page-id-17)
   - [4.4 About Us Page (ID: 19)](#44-about-us-page-id-19)
   - [4.5 Our Partners & S95 Segmento Page (ID: 21)](#45-our-partners--s95-segmento-page-id-21)
   - [4.6 Blog Page (ID: 23) & Posts](#46-blog-page-id-23--posts)
   - [4.7 Contact Us Page (ID: 25)](#47-contact-us-page-id-25)
   - [4.8 Global Header & Footer Templates](#48-global-header--footer-templates)
5. [Brand Design System & Style Tokens](#5-brand-design-system--style-tokens)
6. [Integrations & Third-Party Services Breakdown](#6-integrations--third-party-services-breakdown)
7. [Media Library Asset Inventory](#7-media-library-asset-inventory)
8. [Technical Gap Analysis & Strategic Recommendations](#8-technical-gap-analysis--strategic-recommendations)

---

## 1. Executive Summary & Technical Infrastructure

S95 Creative Solutions operates a multi-disciplinary interior design, project management, and turnkey furnishing consultancy platform. The digital property is built on an enterprise content management system powered by **WordPress** coupled with a visual theme builder system.

### Infrastructure & Server Headers

| Parameter | Observed Production Value |
| :--- | :--- |
| **Primary Domain** | `https://s95creativesolutions.com/` |
| **Hosting Provider** | Bluehost / Newfold Digital (Endurance International Group) |
| **Internal Host Signature** | `shared.bluehost.com` (Base64: `c2hhcmVkLmJsdWVob3N0LmNvbQ==`) |
| **Web Server** | Apache / 2.4.x with Nginx Reverse Proxy |
| **Caching Layer** | `x-endurance-cache-level: 2`, `x-nginx-cache: WordPress` |
| **Cache Lifetime** | `max-age=7200` (2 hours HTTP caching) |
| **Protocol & Security** | HTTP/2, TLS 1.3, Let's Encrypt / Sectigo SSL Certificate |
| **WordPress Core Version** | WordPress 7.0.x Branch |
| **Database Engine** | MySQL / MariaDB via PDO |
| **REST API Base** | `https://s95creativesolutions.com/wp-json/` |

---

## 2. CMS Core Architecture & Builder Integration

### 2.1 Theme & Builder Engine

* **Active Theme:** `Hello Elementor` (`hello-elementor`, v2.8.1)
  * A lightweight, un-opinionated blank canvas theme developed specifically to defer all layout, styling, and DOM rendering to Elementor.
* **Core Page Builder:** `Elementor` (v3.29.1)
  * Features active: `additional_custom_breakpoints`, `e_local_google_fonts`.
  * CSS Print Method: External stylesheet rendering (`/wp-content/uploads/elementor/css/post-[id].css`).
  * Font Display: `font-display: swap`.
* **Pro Extensions Engine:** `PRO Elements` (v3.15.1)
  * An open-source, GPL-compliant clone/derivative of Elementor Pro providing access to Pro widgets (Forms, Theme Builder, Nav Menu, Custom CSS, Dynamic Tags) without licensing overhead.

### 2.2 WordPress REST API Namespaces & Endpoints

A deep query of the root REST endpoint reveals the following registered namespaces:

```json
[
  "oembed/1.0",
  "elementor/v1",
  "elementor/v1/documents",
  "elementor-ai/v1",
  "elementor-pro/v1",
  "wp/v2",
  "wp-site-health/v1",
  "wp-block-editor/v1",
  "wp-abilities/v1"
]
```

#### Key API Observations:
* **Exposed REST Routes:** 25 core routes exposed including `/wp/v2/pages`, `/wp/v2/posts`, `/wp/v2/media`, `/wp/v2/types`, and `/wp/v2/users`.
* **Author / User Discovery:** The primary administrator user is exposed via API endpoint `/wp/v2/users`:
  * **User ID:** `1`
  * **Username / Slug:** `s95dev`
  * **Author Archive:** `https://s95creativesolutions.com/author/s95dev/`

---

## 3. Full Sitemap & Route Index

The website relies on the native WordPress Core XML Sitemap index structure (`/wp-sitemap.xml`) referenced in `/robots.txt`.

### 3.1 Robots.txt Configuration
```text
User-agent: *
Disallow: /wp-admin/
Allow: /wp-admin/admin-ajax.php

Sitemap: https://s95creativesolutions.com/wp-sitemap.xml
```

### 3.2 Master Sitemap Matrix

| Type | Page ID | Page Title | Permanent URL | Template Engine | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Page** | `10` | Home | `https://s95creativesolutions.com/` | Elementor Canvas / Header-Footer | Published |
| **Page** | `15` | Services | `https://s95creativesolutions.com/services/` | Elementor Canvas / Header-Footer | Published |
| **Page** | `17` | Portfolio | `https://s95creativesolutions.com/portfolio/` | Elementor Canvas / Header-Footer | Published |
| **Page** | `19` | About Us | `https://s95creativesolutions.com/about-us/` | Elementor Canvas / Header-Footer | Published |
| **Page** | `21` | Our Partners | `https://s95creativesolutions.com/our-partners/` | Elementor Canvas / Header-Footer | Published |
| **Page** | `23` | Blog | `https://s95creativesolutions.com/blog/` | Elementor Canvas / Archive | Published |
| **Page** | `25` | Contact Us | `https://s95creativesolutions.com/contact-us/` | Elementor Canvas / Header-Footer | Published |
| **Post** | `264` | Lorem Ipsum is simply dummy text | `https://s95creativesolutions.com/2023/09/08/lorem-ipsum-is-simply-dummy-text/` | Single Post | Published (Draft Placeholder) |
| **Post** | `266` | There are many variations of passages | `https://s95creativesolutions.com/2023/09/08/there-are-many-variations-of-passages/` | Single Post | Published (Draft Placeholder) |
| **Taxonomy** | `1` | Category: Uncategorized | `https://s95creativesolutions.com/category/uncategorized/` | Category Archive | Published |
| **Author** | `1` | Author: s95dev | `https://s95creativesolutions.com/author/s95dev/` | Author Archive | Published |

---

## 4. Comprehensive Page-by-Page Content Documentation

### 4.1 Home Page (ID: 10)
* **URL:** `https://s95creativesolutions.com/`
* **Page Title:** Home | Welcome to S95creativesolutions
* **Template:** `elementor_header_footer`
* **Stylesheet:** `/wp-content/uploads/elementor/css/post-10.css`

#### Section 1: Hero Banner
* **Primary H2 Headline:** `Elevating spaces through bespoke interior solutions.`
* **Body Copy:**
  > "At S95, we foster an integrated approach, where creativity and functionality intertwine."  
  > "We specialise in crafting soulful, sophisticated homes, luxury hospitality spaces, and design-led, functional workplaces that enable people and businesses to thrive."  
  > "Experienced in sourcing and manufacturing custom furniture, fixtures, accessories & art direct from manufacturers, we manage every element to ensure seamless collaboration and synergy among all stakeholders."  
  > "Our interdisciplinary team combines expertise in interior design, bespoke fabrication, procurement, and fit-out, to deliver mindful and aesthetically considered indoor and outdoor FF&E furnishing solutions."
* **Call to Action (CTA):** `Read More` (Link: `/about-us/`)
* **Hero Background / Visuals:** High-resolution interior imagery (`hero-banner.jpg` / `HP-1-1.jpg`).

#### Section 2: Core Services Overview
* **Section H2 Headline:** `Our Services`
* **Lead Copy:**
  > "We combine quality production and craftsmanship to deliver luxury interior design solutions for clients. Our expertise can be categorised into three main verticals, available either as standalone services, or in tandem."
* **CTA Button:** `Read More` (Link: `/services/`)
* **Service Cards (H3 Grids):**
  1. **`CONSULTANCY`**  
     *Description:* "As the client’s representative, we coordinate and manage all elements, seamlessly delivering unique and refined spaces. Our role covers everything from the coordination of stakeholders, to technical advisory, to supplier review."
  2. **`FF&E SOURCING, ART & STYLING`**  
     *Description:* "We handle the sourcing, installation, and styling of all your FF&E requirements in order to deliver beautifully crafted interiors that not only capture the essence of our clients’ vision, but also evoke an emotional experience."
  3. **`BESPOKE CRAFTSMANSHIP`**  
     *Description:* "Utilising both our local and overseas factories, we manufacture bespoke solutions that align with your specifications, ensuring a personalised interior that reflects your individual style, all within the confines of your budget."

#### Section 3: Mid-Page Statement Banner
* **H2 Heading:** `Introducing designers & architects to exquisite craftsmanship.`

#### Section 4: Partners & Strategic Alliances Teaser
* **Section H2 Headline:** `Our Partners`
* **Body Copy:**
  > "Passionate about matchmaking and showcasing skilled manufacturers and innovative design, we have formed trusted partnerships with both emerging and well-established artisans with luxury projects delivered around the Middle East and globally."  
  > "Through the artful juxtaposition of contemporary and vintage, architectural and organic, graphic and instinctual elements, we craft unique and captivating narratives. These narratives inspire, evoke emotions, and make a lasting impact on both individuals and spaces."
* **CTA Button:** `Our Partners` (Link: `/our-partners/`)

#### Section 5: Closing Statement Banner
* **H2 Heading:** `Delivering spaces that enable people and businesses to thrive.`

---

### 4.2 Services Page (ID: 15)
* **URL:** `https://s95creativesolutions.com/services/`
* **Page Title:** Services
* **Stylesheet:** `/wp-content/uploads/elementor/css/post-15.css`

#### Section 1: Page Header & Consultancy Vertical
* **H2 Headline:** `Our Services`
* **H2 Vertical Title:** `Consultancy`
* **Detailed Copy:**
  * **Client Representation:** "Drawing upon decades of experience both in the region and worldwide, we act as the client’s representative, helping to navigate the technical aspects of design. We take the lead in managing and coordinating with all stakeholders, including the client, designers, architects, contractors, and suppliers."
  * **Site & Technical Analysis:** "Our dedicated team will analyse project requirements, evaluate site conditions, and adeptly handle any constraints or challenges that may arise. With our support, the final outcome is sure to surpass aesthetic expectations while also seamlessly addressing functional, structural, and technical considerations."
  * **Commercial & Procurement Rigor:** "We meticulously evaluate and assess supplier quotations and material samples to ensure their alignment with project requirements, budget, quality standards, and design intent. With our assistance, you can be certain of competitive pricing, reliable delivery schedules, and high-quality products that perfectly align with your vision while meeting all necessary specifications."

#### Section 2: FF&E Sourcing, Art & Styling Vertical
* **H2 Vertical Title:** `FF&E Sourcing, Art & Styling`
* **Detailed Copy:**
  * **Strategic Partnerships:** "We have cultivated trusted partnerships with exclusive luxury brands, high street retailers, and bespoke artisans. These strategic partnerships enable us to deliver the perfect combination of furniture, fixtures, and equipment (FF&E), along with art and accessories, all tailored to meet the requirements of your commercial, residential, and workplace projects."
  * **Curation & Emotional Resonance:** "At S95, art curation is vital to our approach. After all, our mission is to deliver distinctive interior design solutions that leave a lasting impression. By bringing together the right designers, architects, and artists for your project, we work with you to craft captivating and immersive experiences that activate social connection."
  * **Value Engineering:** "We do this while remaining mindful of your budget but without compromising its design intent. We proactively identify cost-saving and value engineering opportunities and we even review the design schedule and bills of quantities to ensure any potential red flags are highlighted from the outset."

#### Section 3: Bespoke Craftsmanship Vertical
* **H2 Vertical Title:** `Bespoke Craftsmanship`
* **Detailed Copy:**
  * **Tailored Manufacturing:** "We employ local and overseas artists, artisans, and brands to craft custom furniture, accessories, and artwork that is not only rich in character and story, but also aligns with your unique design specifications."
  * **Segmento Specialization:** "Our dedicated S95 Segmento team specialise in delivering bespoke kitchens, baths, joinery, and doors, characterised by innovative design, impeccable craftsmanship, and meticulous attention to detail."
  * **Process Transparency:** "We also provide frequent progress updates to ensure that every step of the design process is guided by your preferences, resulting in an interior that truly resonates with your individual style. Doing so allows us to bring your design concepts to life, while remaining within the confines of your budget."
* **CTA Button:** `S95 Segmento`

---

### 4.3 Portfolio / Our Projects Page (ID: 17)
* **URL:** `https://s95creativesolutions.com/portfolio/`
* **Page Title:** Portfolio
* **Stylesheet:** `/wp-content/uploads/elementor/css/post-17.css`

#### Header & Intro Copy
* **H2 Heading:** `Our Projects`
* **Introductory Narrative:**
  > "Boasting a combination of exquisite artistry and premium quality, our unparalleled expertise in craftsmanship, personalisation, and customisation truly sets us apart in the industry."  
  > "Our extensive portfolio, encompassing a wide range of luxury hospitality, residential and commercial projects, is a testament to our track record in delivering exceptional bespoke interior design solutions on a global scale."

#### Featured Project Directory
The portfolio showcases four key benchmark international projects:

1. **`Mövenpick Resort Al Marjan Island, Ras Al Khaimah`**
   * *Sector:* Luxury Island Resort & Hospitality
   * *Location:* Ras Al Khaimah, United Arab Emirates
   * *Scope:* Bespoke interior fit-out, FF&E procurement, public space and guest suite furnishing.
2. **`Ula, Ras Al Khaimah`**
   * *Sector:* Luxury Beachfront Hospitality, Culinary & Lifestyle Venue
   * *Location:* Al Marjan Island, Ras Al Khaimah, UAE
   * *Scope:* Organic rustic-luxury furnishings, custom artisan woodwork, indoor/outdoor lifestyle fit-out.
3. **`Private Residence, USA`**
   * *Sector:* Ultra-Prime Residential
   * *Location:* United States
   * *Scope:* Full-scale residential interior curation, custom millwork, custom furniture pieces.
4. **`Chalet Le Petit Palais, France`**
   * *Sector:* Ultra-Luxury Alpine Ski Chalet
   * *Location:* Courchevel 1850, French Alps
   * *Scope:* Bespoke chalet interior finishes, luxury joinery, and bespoke alpine furnishings.

---

### 4.4 About Us Page (ID: 19)
* **URL:** `https://s95creativesolutions.com/about-us/`
* **Page Title:** About Us
* **Stylesheet:** `/wp-content/uploads/elementor/css/post-19.css`

#### Section 1: Core Mission Statement
* **H2 Headline:** `We are passionate about delivering spaces that enable people and businesses to thrive.`

#### Section 2: Narrative & Methodology
* **H2 Heading:** `About Us`
* **Operational Scope:**
  * Coordinates all project dynamics across client, design, architecture, contractor, and supply tiers.
  * Rigorous analysis of architectural drawings, bills of quantities, site conditions, and engineering constraints.
  * Quality benchmarking, physical material sample inspections, and transparent quotation evaluations.

#### Section 3: Founder's Perspective (Samantha Nasser)
* **Quote Display:**
  > *“Inspired by my years in the region, I wanted to establish an environment that fosters support for both homegrown and overseas artisans, allowing them to showcase their traditional techniques in a contemporary context. The objective was to enable a wider audience to appreciate and enjoy the timeless beauty and unique character of their craftsmanship.*  
  > *Leveraging a wealth of experience and expertise, my initial vision naturally evolved into a thriving business that provides end-to-end turn-key solutions, all while staying true to its core values.”*
* **Attribution:** `– Samantha Nasser, Founder of S95`
* **Visual Asset:** Portrait / Brand Image (`A-1.jpg`).

---

### 4.5 Our Partners & S95 Segmento Page (ID: 21)
* **URL:** `https://s95creativesolutions.com/our-partners/`
* **Page Title:** Our Partners
* **Stylesheet:** `/wp-content/uploads/elementor/css/post-21.css`

#### Section 1: Partnership Philosophy
* **H2 Heading:** `Our Partners`
* **Copy:**
  > "By merging traditional craftsmanship with contemporary design practices, we are continuously pushing the boundaries and challenging traditional design principles."  
  > "Our strategic partnerships with a wide range of internationally established and emerging brands, manufacturers, and artisans, enable us to deliver bespoke interior furnishings that embody the highest level of craftsmanship and design excellence."

#### Section 2: S95 Segmento (Italian Strategic Alliance)
* **H2 Heading:** `S95 Segmento`
* **Copy:**
  > "At S95, we embrace a philosophy of constant evolution and exploration, always seeking new opportunities to elevate our client experience. As a testament to our growth strategy, we are thrilled to announce our recent partnership with the renowned Italian brand, Segmento. The partnership has enabled us to expand our offerings and provide our clients with an exceptional selection of bespoke kitchens, baths, joinery, and doors."  
  > "S95 Segmento, as an extension of the S95 brand, is solely dedicated to the pursuit of delivering exquisitely crafted interior finishes, characterised by innovative design, impeccable craftsmanship, and meticulous attention to detail."
* **CTA Button:** `Visit Segmento`

#### Section 3: Supply Chain Transparency & Direct Sourcing
* **H2 Heading:** `Our Suppliers`
* **Copy:**
  > "Continuously dedicated to providing bespoke interior solutions that exceed expectations, we work with a selection of trusted suppliers to elevate our capabilities to new heights. Through the synergy of our collective strengths, we tackle even the most ambitious projects with confidence and precision."  
  > "We source products directly from the factory and leverage our close relationships to secure the most competitive pricing and the best possible value for you. We regularly visit our partner factories to explore the newest product ranges and ensure that these products align with our high standards of quality. To read more about some of our recent visits, check out our blog."
* **CTA Note:** `Contact us for more information about our strategic partnerships.`

---

### 4.6 Blog Page (ID: 23) & Posts
* **URL:** `https://s95creativesolutions.com/blog/`
* **Page Title:** Blog
* **Stylesheet:** `/wp-content/uploads/elementor/css/post-23.css`
* **Active Posts:**
  1. **Post ID 266:** `There are many variations of passages` (Date: September 8, 2023)
     * *Excerpt:* "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form..."
     * *Thumbnail Media:* `OPa-4-1.jpg`
  2. **Post ID 264:** `Lorem Ipsum is simply dummy text` (Date: September 8, 2023)
     * *Excerpt:* "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text..."
     * *Thumbnail Media:* `OPa-2-1.jpg`
* *Note:* The blog currently retains sample/placeholder content from initial template commissioning.

---

### 4.7 Contact Us Page (ID: 25)
* **URL:** `https://s95creativesolutions.com/contact-us/`
* **Page Title:** Contact Us
* **Stylesheet:** `/wp-content/uploads/elementor/css/post-25.css`

#### Content & Copy
* **H2 Heading:** `Contact Us`
* **Introductory Text:**
  > "Would you like to get to know more about us or our services?  
  > We’d love to hear from you.  
  > Contact us for project inquiries and collaborations."

#### Interactive Lead Form Specification
* **Form Engine:** Elementor Pro Form Widget (`elementor-widget-form`)
* **Widget ID:** `0520c75` | **Post ID:** `25`
* **Form Name:** `New Form`
* **Fields Schema:**

| Field Label | HTML Name Attribute | Field Type | Required | Placeholder Text |
| :--- | :--- | :--- | :--- | :--- |
| **Name** | `form_fields[name]` | `text` | Yes | `Name*` |
| **Company** | `form_fields[field_27b5179]` | `text` | No | `Company` |
| **Email** | `form_fields[email]` | `email` | Yes | `Email` |
| **Message** | `form_fields[message]` | `textarea` (4 rows) | Yes | `Write Your Message..` |
| **Action Button** | *Submit Button* | `submit` | — | `Send` |

---

### 4.8 Global Header & Footer Templates

The site utilizes Elementor Theme Builder (`elementor_library`) to deploy global headers and footers across all routes.

#### Header Template (Post ID: 12)
* **Asset:** `/wp-content/uploads/elementor/css/post-12.css`
* **Components:**
  * **Branding:** S95 logo graphic (`grey.png` / `grey-1-e1694326106415.png` / `Screenshot_617.png`) hyperlinked to `/`.
  * **Navigation Menu:** Powered by SmartMenus jQuery library.
  * **Menu Destinations:**
    1. Home (`/`)
    2. Services (`/services/`)
    3. Portfolio (`/portfolio/`)
    4. About Us (`/about-us/`)
    5. Our Partners (`/our-partners/`)
    6. Contact Us (`/contact-us/`)

#### Footer Template (Post ID: 41)
* **Asset:** `/wp-content/uploads/elementor/css/post-41.css`
* **Components:**
  * Secondary brand display.
  * Replicated navigational links.
  * Native Speculation Rules / Prefetch API JSON block injected to accelerate document navigation.

---

## 5. Brand Design System & Style Tokens

Extracted directly from Elementor Global Kit 8 (`/wp-content/uploads/elementor/css/post-8.css`) and individual post stylesheets:

### 5.1 Color Palette

```
/* Primary Brand Accent (Warm Greige / Sandstone) */
--s95-accent-sand: #DDCCC2;

/* Primary Dark / High-Contrast Headings */
--s95-black: #000000;
--s95-dark-charcoal: #020101;

/* Body Copy & Neutral Dark */
--s95-body-charcoal: #434243;
--s95-muted-charcoal: #444444;

/* Surface & Border Neutrals */
--s95-border-light: #EBEBEB;
--s95-pure-white: #FFFFFF;
```

### 5.2 Typography System

* **Primary Heading Font:** `"Poppins", sans-serif` (Weights: 400 Regular, 500 Medium, 600 SemiBold)
* **Secondary / Statement Font:** `"Roboto Slab", serif` (Weight: 400 Regular)
* **Body & Text Font:** `"Roboto", sans-serif` (Weights: 400 Regular, 500 Medium)
* **Icons:** Font Awesome 5 Free (`font-awesome/5.15.3`) and Elementor Icons (`eicons/5.40.0`).

---

## 6. Integrations & Third-Party Services Breakdown

### 6.1 CMS & Application Framework
* **Core CMS:** WordPress on Linux / Apache / PHP.
* **Layout Engine:** Elementor Visual Builder + Elementor Theme Builder (Headers, Footers, Kit settings).
* **Extended Pro Licensing Integration:** PRO Elements plugin providing Elementor Pro parity features without third-party key registration.

### 6.2 Forms & Lead Capture Pipeline
* **Submission Protocol:** Asynchronous XMLHttpRequest / Fetch submitted to WordPress core AJAX endpoint:
  * `POST https://s95creativesolutions.com/wp-admin/admin-ajax.php`
  * Action: `elementor_pro_forms_send_form`
* **Payload Verification:** Form ID `0520c75` + Post ID `25`.
* **Lead Delivery:** Dispatched via standard PHP `wp_mail()` transport to the configured administrator inbox (`info@s95creativesolutions.com` or internal forwarding aliases).

### 6.3 Performance & CDN Integration
* **Server-Side Cache:** Bluehost Endurance Cache Level 2.
* **Edge Proxy:** Nginx caching layer (`x-nginx-cache: WordPress`).
* **Client-Side Speculation API:** HTML Speculation Rules script prefetching internal links for zero-latency page transitions.

### 6.4 Font & Asset Delivery
* **Font Asset Pipeline:** Google Fonts hosted and served locally (`e_local_google_fonts` feature flag active), reducing external DNS lookups to `fonts.googleapis.com`.
* **JavaScript Utilities:**
  * jQuery v3.7.1 & jQuery Migrate v3.4.1
  * SmartMenus v1.0.1 (Responsive mobile-drawer and touch-friendly desktop navigation)
  * Webpack Runtime & Frontend Modules for Elementor

---

## 7. Media Library Asset Inventory

All 26 assets currently indexed in the WordPress Media Library (`/wp-content/uploads/2023/09/`):

| Media ID | Filename | Dimensions | Intended Usage / Location |
| :---: | :--- | :---: | :--- |
| `345` | `hero-banner.jpg` | 1920 × 700 | Homepage Hero Section Header |
| `47` | `HP-1-1.jpg` | 1500 × 2055 | Homepage Feature Imagery |
| `60` | `HP-2.jpg` | 1000 × 597 | Homepage Services Grid (Consultancy) |
| `81` | `HP-3.jpg` | 1000 × 592 | Homepage Services Grid (FF&E Sourcing) |
| `82` | `HP-4.jpg` | 1000 × 601 | Homepage Services Grid (Bespoke Craftsmanship) |
| `90` | `HP-5.jpg` | 1920 × 569 | Homepage Craftsmanship Feature Banner |
| `106` | `HP-6.jpg` | 800 × 903 | Homepage Partners Feature Card |
| `108` | `HP-7.jpg` | 1920 × 588 | Homepage Bottom Full-Width Banner |
| `142` | `S1.jpg` | 2162 × 1424 | Services Page (Consultancy Visual) |
| `152` | `S2-1.jpg` | 2368 × 1424 | Services Page (FF&E & Styling Visual) |
| `156` | `S3-1.jpg` | 1500 × 1000 | Services Page (Bespoke Craftsmanship Visual) |
| `169` | `OP-1-1.jpg` | 2418 × 1420 | Our Partners Header & S95 Segmento Showcase |
| `179` | `OP-2.jpg` | 1920 × 550 | Partners Page Factory & Suppliers Banner |
| `186` | `OP-3.jpeg` | 640 × 640 | Portfolio Showcase (Chalet Le Petit Palais) |
| `205` | `OP-4.jpg` | 1484 × 1422 | Portfolio Showcase (Private Residence, USA) |
| `206` | `OP-5.jpg` | 2382 × 1424 | Portfolio Showcase (Mövenpick Resort Al Marjan Island) |
| `207` | `OP-5-1.jpg` | 1400 × 836 | Portfolio Showcase (Ula, Ras Al Khaimah) |
| `217` | `A-1.jpg` | 1412 × 1424 | About Us Page (Samantha Nasser / Studio Feature) |
| `230` | `OPa-1.jpg` | 2200 × 1424 | Blog Archive Header Graphic |
| `235` | `OPa-2-1.jpg` | 1500 × 896 | Blog Article Thumbnail (Post 264) |
| `231` | `OPa-4-1.jpg` | 1500 × 999 | Blog Article Thumbnail (Post 266) |
| `124` | `pink.png` | 747 × 544 | S95 Logo Variant (Pink / Tinted) |
| `125` | `grey.png` | 747 × 544 | S95 Primary Brand Logo (Grey) |
| `362` | `grey-1-e1694326106415.png` | 189 × 189 | S95 Header Brand Icon / Square Favicon |
| `363` | `grey-1-e1694326106415-1.png` | 189 × 189 | S95 Web App / Mobile Icon |
| `34` | `Screenshot_617.png` | 146 × 75 | Temporary Header Logo Placement |

---

## 8. Technical Gap Analysis & Strategic Recommendations

Based on the inspection of the live WordPress deployment, here is an objective evaluation of opportunities to elevate performance, security, and brand authority:

### 8.1 Critical Gaps
1. **Analytics & Marketing Attribution:**
   * **Finding:** No Google Tag Manager (`GTM`), Google Analytics 4 (`GA4`), or Meta Pixel scripts are currently active in the page DOM.
   * **Impact:** Inbound visitor behavior, project portfolio engagement, and contact form conversions cannot be measured.
2. **Dedicated SEO Meta Framework:**
   * **Finding:** Neither Yoast SEO nor Rank Math is installed; the site relies solely on default WordPress title tags and lacks Open Graph (`og:image`, `og:description`) and Schema.org Structured Data (`InteriorDesigner`, `LocalBusiness`).
   * **Impact:** Shared links across LinkedIn or WhatsApp lack rich media cards, and Google search snippets cannot display structured knowledge panels.
3. **Draft / Placeholder Content in Production:**
   * **Finding:** Two generic "Lorem Ipsum" blog posts (IDs 264 & 266) dating back to September 2023 remain publicly indexed in Google and in the XML sitemap.
   * **Recommendation:** Unpublish or replace them with real case studies (e.g., behind-the-scenes factory visits in Italy, resort fit-out in Ras Al Khaimah).
4. **Third-Party CRM / Lead Integration:**
   * **Finding:** Forms rely exclusively on standard WordPress mail (`wp_mail()`).
   * **Recommendation:** Integrate webhook actions to deliver leads directly into HubSpot, Salesforce, Notion, or Slack to ensure no luxury project lead is missed or caught in spam filters.

### 8.2 Modernization & Headless Roadmap
If S95 Creative Solutions seeks to match the cinematic 3D digital presence of sites like *Belgrade Arbor*:
* **Headless Architecture:** Maintain WordPress as the headless CMS via GraphQL / REST API while migrating the frontend to **Next.js 14/15** or **Astro**.
* **3D Visualizations & WebGL:** Incorporate Three.js / React Three Fiber interactive project walkthroughs and spatial renders for bespoke luxury residences.
* **Micro-Interactions:** Implement GSAP smooth scrolling and fluid viewport transitions to evoke the sophistication of high-end interior architecture.

