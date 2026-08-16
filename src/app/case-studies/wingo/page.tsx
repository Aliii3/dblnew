import { CaseStudyDetail, type CaseStudySpec } from "@/components/ui/CaseStudyDetail";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Wingo — Branding Case Study",
  description:
    "Building a new Egyptian poultry and eggs brand from the ground up — name, mascot, color system, packaging architecture, and every operational touchpoint, by Double Shot.",
  path: "/case-studies/wingo",
});

const spec: CaseStudySpec = {
  slug: "wingo",
  category: "Branding",
  brand: (
    <>
      Wingo <span className="text-gold">وينجو</span>
    </>
  ),
  tagline: "Building a new poultry brand from the ground up.",
  meta: [
    { label: "Client", value: "Wingo (وينجو)" },
    { label: "Industry", value: "FMCG — Poultry & Eggs" },
    { label: "Market", value: "Egypt" },
    { label: "Scope", value: "Full Brand Identity & Visual System" },
  ],
  heroStats: [
    { value: "65+", label: "Guideline pages & applications" },
    { value: "9+", label: "Product lines unified" },
    { value: "2", label: "Mascot builds (2D + 3D)" },
    { value: "AR + EN", label: "Bilingual system" },
  ],
  sections: [
    {
      heading: "Overview",
      paragraphs: [
        "Wingo is a poultry and eggs brand built for the Egyptian retail market, covering fresh and frozen whole chicken, chicken cuts, and eggs. With no prior visual equity, Double Shot was engaged to create a complete brand identity from a blank page: name, mascot, color system, packaging architecture, and every operational touchpoint.",
      ],
    },
    {
      heading: "The Challenge",
      bullets: [
        "No existing visual identity, name recognition, or packaging system — a true ground-up launch",
        "A wide, growing product range needing one cohesive visual system",
        "A commodity category where shelf differentiation and instant trust signals are critical",
        "An identity that had to scale across uniforms, delivery vehicles, kiosks, and digital",
      ],
    },
    {
      heading: "Strategic Foundation: Quality and Care, Worth a Story",
      paragraphs: [
        "The identity was built around warmth and trust rather than a generic poultry mark — reflected in the guiding line “quality and care, for a flavor worth a story.”",
      ],
    },
    {
      heading: "Logo Concept",
      paragraphs: [
        "The typography was hand-built on a full geometric construction grid, giving bilingual Arabic/English lockups identical proportions and rhythm — with a chicken-foot flourish woven into the type as an instant category cue.",
      ],
    },
    {
      heading: "Mascot Character",
      paragraphs: [
        "A friendly chicken character was developed in two stages: a simple, expressive 2D line illustration for fast applications, and a fully rendered 3D hero version for packaging, the storefront, and delivery-truck livery.",
      ],
    },
    {
      heading: "Packaging System",
      bullets: [
        "Eggs — six-egg carton with vitamin callouts, QR traceability code, and full regulatory panel",
        "Fresh line — whole chicken, drumsticks, and liver with halal-certified, traceable tray labels",
        "Frozen line — whole chicken, fillet, and cuts with a 9-size weight-range selector and flow-wrap pouches",
        "Shipping cartons — for eggs and chicken cuts, with full Arabic regulatory copy",
      ],
    },
    {
      heading: "Retail & Operational Touchpoints",
      bullets: [
        "Staff uniform — branded vest, cap, polo, lanyard, ID badge, and apron",
        "Corporate stationery — notebook, letterhead, envelope, business cards, and branded pen",
        "Delivery system — branded delivery bag, shipping box, motorcycle box, and full truck livery",
        "Store signage and an in-store retail kiosk concept",
      ],
    },
    {
      heading: "Typography",
      paragraphs: [
        "Montserrat serves as the display and body typeface for English copy; Montserrat Arabic carries the same character into Arabic titles and body copy across packaging, signage, and digital.",
      ],
    },
    {
      heading: "Outcome",
      bullets: [
        "One unified visual language carried across 65+ brand guideline pages and applications",
        "A packaging system built to scale across 9+ product lines without fragmenting recognition",
        "A mascot-driven identity designed to outperform purely typographic competitors on shelf",
      ],
    },
  ],
  palette: [
    { name: "Wingo Orange", hex: "#F06324" },
    { name: "Sunny Yellow", hex: "#FDC831" },
    { name: "Ink Black", hex: "#000000" },
  ],
  related: [
    { label: "Branding", href: "/services/branding" },
    { label: "Performance", href: "/services/performance" },
    { label: "Technology", href: "/services/technology" },
  ],
};

export default function WingoCaseStudyPage() {
  return <CaseStudyDetail spec={spec} />;
}
