export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://s95creativesolutions.com").replace(/\/$/, "");

export const site = {
  name: "S95 Creative Solutions",
  shortName: "S95",
  tagline: "Elevating spaces through bespoke interior solutions.",
  description:
    "S95 Creative Solutions delivers bespoke interior design, FF&E sourcing and custom craftsmanship for homes, hospitality and workplaces. Consultancy, procurement and fit-out under one roof.",
  email: "info@s95creativesolutions.com",
  founder: "Samantha Nasser",
  // Segmento's public URL was not supplied; leave empty and the CTA falls back to the contact page.
  segmentoUrl: "",
};

export const nav = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/about-us", label: "About Us" },
  { href: "/our-partners", label: "Our Partners" },
  { href: "/contact-us", label: "Contact Us" },
] as const;

export type Img = { src: string; alt: string; width: number; height: number };

/* ── Stock placeholders (Unsplash licence). Swap `src` for real project photography. ── */
export const images = {
  hero: { src: "/images/hero.jpg", alt: "Bright, calm living room with large windows, natural textures and soft greenery", width: 1800, height: 949 },
  consultancy: { src: "/images/modern-living.jpg", alt: "Open-plan living space with timber feature wall and a soft grey sofa", width: 1800, height: 1224 },
  ffe: { src: "/images/rattan-living.jpg", alt: "Styled living room with woven pendant lamps, layered rug and plants", width: 1800, height: 1800 },
  bespoke: { src: "/images/herringbone.jpg", alt: "Entry hall with herringbone timber floor, round mirror and a rattan sideboard", width: 1800, height: 3200 },
  statement: { src: "/images/beige-living.jpg", alt: "Neutral living room with curated wall decor and a linen sofa", width: 1800, height: 1013 },
  partners: { src: "/images/plants-living.jpg", alt: "Airy living room with a tan leather sofa, framed prints and large plants", width: 1800, height: 1350 },
  founder: { src: "/images/yellow-chair.jpg", alt: "Minimal corner with a yellow armchair, brass floor lamp and framed artwork", width: 1800, height: 1588 },
  suppliers: { src: "/images/open-bright.jpg", alt: "Sunlit open-plan living area with panoramic windows", width: 1800, height: 1200 },
  segmento: { src: "/images/apartment.jpg", alt: "Compact kitchen and living area with fitted joinery and warm timber floor", width: 1800, height: 1200 },
};

export const services = [
  {
    slug: "consultancy",
    number: "01",
    title: "Consultancy",
    summary:
      "As the client’s representative, we coordinate and manage all elements, seamlessly delivering unique and refined spaces. Our role covers everything from the coordination of stakeholders, to technical advisory, to supplier review.",
    image: images.consultancy,
    points: [
      {
        title: "Client representation",
        body: "Drawing upon decades of experience both in the region and worldwide, we act as the client’s representative, helping to navigate the technical aspects of design. We take the lead in managing and coordinating with all stakeholders, including the client, designers, architects, contractors, and suppliers.",
      },
      {
        title: "Site & technical analysis",
        body: "Our dedicated team will analyse project requirements, evaluate site conditions, and adeptly handle any constraints or challenges that may arise. With our support, the final outcome is sure to surpass aesthetic expectations while also seamlessly addressing functional, structural, and technical considerations.",
      },
      {
        title: "Commercial & procurement rigour",
        body: "We meticulously evaluate and assess supplier quotations and material samples to ensure their alignment with project requirements, budget, quality standards, and design intent. With our assistance, you can be certain of competitive pricing, reliable delivery schedules, and high-quality products that perfectly align with your vision while meeting all necessary specifications.",
      },
    ],
  },
  {
    slug: "ffe-sourcing-art-styling",
    number: "02",
    title: "FF&E Sourcing, Art & Styling",
    summary:
      "We handle the sourcing, installation, and styling of all your FF&E requirements in order to deliver beautifully crafted interiors that not only capture the essence of our clients’ vision, but also evoke an emotional experience.",
    image: images.ffe,
    points: [
      {
        title: "Strategic partnerships",
        body: "We have cultivated trusted partnerships with exclusive luxury brands, high street retailers, and bespoke artisans. These strategic partnerships enable us to deliver the perfect combination of furniture, fixtures, and equipment (FF&E), along with art and accessories, all tailored to meet the requirements of your commercial, residential, and workplace projects.",
      },
      {
        title: "Curation & emotional resonance",
        body: "At S95, art curation is vital to our approach. After all, our mission is to deliver distinctive interior design solutions that leave a lasting impression. By bringing together the right designers, architects, and artists for your project, we work with you to craft captivating and immersive experiences that activate social connection.",
      },
      {
        title: "Value engineering",
        body: "We do this while remaining mindful of your budget but without compromising its design intent. We proactively identify cost-saving and value engineering opportunities and we even review the design schedule and bills of quantities to ensure any potential red flags are highlighted from the outset.",
      },
    ],
  },
  {
    slug: "bespoke-craftsmanship",
    number: "03",
    title: "Bespoke Craftsmanship",
    summary:
      "Utilising both our local and overseas factories, we manufacture bespoke solutions that align with your specifications, ensuring a personalised interior that reflects your individual style, all within the confines of your budget.",
    image: images.bespoke,
    points: [
      {
        title: "Tailored manufacturing",
        body: "We employ local and overseas artists, artisans, and brands to craft custom furniture, accessories, and artwork that is not only rich in character and story, but also aligns with your unique design specifications.",
      },
      {
        title: "S95 Segmento",
        body: "Our dedicated S95 Segmento team specialise in delivering bespoke kitchens, baths, joinery, and doors, characterised by innovative design, impeccable craftsmanship, and meticulous attention to detail.",
      },
      {
        title: "Process transparency",
        body: "We also provide frequent progress updates to ensure that every step of the design process is guided by your preferences, resulting in an interior that truly resonates with your individual style. Doing so allows us to bring your design concepts to life, while remaining within the confines of your budget.",
      },
    ],
  },
] as const;

export const projects = [
  {
    title: "Mövenpick Resort Al Marjan Island",
    place: "Ras Al Khaimah, United Arab Emirates",
    sector: "Luxury island resort & hospitality",
    scope: "Bespoke interior fit-out, FF&E procurement, public space and guest suite furnishing.",
    image: { src: "/images/open-bright.jpg", alt: "Placeholder: sunlit resort-style lounge with panoramic windows", width: 1800, height: 1200 },
  },
  {
    title: "Ula",
    place: "Al Marjan Island, Ras Al Khaimah, UAE",
    sector: "Beachfront hospitality, culinary & lifestyle venue",
    scope: "Organic rustic-luxury furnishings, custom artisan woodwork, indoor/outdoor lifestyle fit-out.",
    image: { src: "/images/exterior-timber.jpg", alt: "Placeholder: contemporary timber-clad building with glazed entrance", width: 1800, height: 1200 },
  },
  {
    title: "Private Residence",
    place: "United States",
    sector: "Ultra-prime residential",
    scope: "Full-scale residential interior curation, custom millwork, custom furniture pieces.",
    image: { src: "/images/exterior-night.jpg", alt: "Placeholder: modern home at dusk framed by a large tree", width: 1800, height: 1200 },
  },
  {
    title: "Chalet Le Petit Palais",
    place: "Courchevel 1850, France",
    sector: "Ultra-luxury alpine ski chalet",
    scope: "Bespoke chalet interior finishes, luxury joinery, and bespoke alpine furnishings.",
    image: { src: "/images/bedroom-cream.jpg", alt: "Placeholder: warm bedroom with tufted headboard and plush textiles", width: 1800, height: 1200 },
  },
] as const;

/* ── Journal: sample posts so the section is not empty. Replace before launch. ── */
export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string; // ISO
  image: Img;
  body: string[];
  placeholder: boolean;
};

export const posts: Post[] = [
  {
    slug: "planning-a-renovation-start-with-the-brief",
    title: "Planning a renovation: start with the brief",
    excerpt: "Before choosing finishes, decide how the space needs to work. A clear brief saves time, budget and second-guessing.",
    date: "2026-11-02",
    image: { src: "/images/grey-living.jpg", alt: "Placeholder: well-proportioned living room with considered furniture layout", width: 1800, height: 1200 },
    placeholder: true,
    body: [
      "Sample article. Replace with your own writing before launch.",
      "A good renovation starts with how you live, not with a mood board. List what the space must do each day, who uses it, and what frustrates you today. That list becomes the brief your designer and contractor work from.",
      "Agree a budget range and the priorities inside it early. Knowing which elements are non-negotiable makes every later decision, from joinery to lighting, faster and calmer.",
    ],
  },
  {
    slug: "why-bespoke-joinery-changes-a-room",
    title: "Why bespoke joinery changes a room",
    excerpt: "Fitted cabinetry makes use of every centimetre and gives a home its quiet, tailored finish.",
    date: "2026-11-02",
    image: { src: "/images/apartment.jpg", alt: "Placeholder: kitchen with fitted cabinetry and warm timber floor", width: 1800, height: 1200 },
    placeholder: true,
    body: [
      "Sample article. Replace with your own writing before launch.",
      "Off-the-shelf furniture rarely meets walls, ceilings and awkward corners cleanly. Bespoke joinery is drawn for the room, so proportions, handles and finishes feel intentional.",
      "It also lets you plan storage around real belongings, which is often the difference between a space that looks good once and one that stays that way.",
    ],
  },
  {
    slug: "layering-texture-in-a-neutral-palette",
    title: "Layering texture in a neutral palette",
    excerpt: "Warm neutrals feel rich when materials do the talking: linen, timber, stone, woven fibres.",
    date: "2026-11-02",
    image: { src: "/images/rattan-living.jpg", alt: "Placeholder: neutral living room with woven lamps and layered textiles", width: 1800, height: 1800 },
    placeholder: true,
    body: [
      "Sample article. Replace with your own writing before launch.",
      "A restrained colour palette lets texture lead. Combine matte and soft-sheen surfaces, natural fibres and one or two pieces of considered art for depth without clutter.",
      "Light matters as much as material. Test samples in the room at different times of day before committing.",
    ],
  },
];

/* ── 360° / AR examples, keyed by project title. Add an entry to give another project the button. ──
   Sample assets only: replace with your own panorama (equirectangular, 2:1) and a .glb model. */
export const immersiveExamples: Record<
  string,
  { panorama: string; panoramaAlt: string; panoramaCredit: string; model: string; modelAlt: string; modelCredit: string }
> = {
  "Mövenpick Resort Al Marjan Island": {
    panorama: "/360/small-empty-house.jpg",
    panoramaAlt: "Placeholder 360° view of an empty, sunlit interior with timber floors and tall windows.",
    panoramaCredit: "Sample panorama: “Small Empty House” by Greg Zaal, Poly Haven (CC0).",
    model: "/models/GlamVelvetSofa.glb",
    modelAlt: "Placeholder 3D model of a tufted velvet sofa on slim legs.",
    modelCredit: "Sample model: “Glam Velvet Sofa” © 2021 Wayfair, LLC, CC BY 4.0, via Khronos glTF Sample Assets.",
  },
};
