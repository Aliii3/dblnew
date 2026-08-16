import { CaseStudyDetail, type CaseStudySpec } from "@/components/ui/CaseStudyDetail";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Cimento Força — Case Study",
  description:
    "Mapping a market, building a brand, and winning share of voice in an uncontested digital category — Cimento Força's Mozambique market entry, brand identity, and social launch by Dblshot.",
  path: "/case-studies/cimento-forca",
  image: "/media/case-studies/ecommerce/p06.jpg",
});

const spec: CaseStudySpec = {
  slug: "cimento-forca",
  category: "Market Research · Branding · Social Media",
  brand: (
    <>
      Cimento <span className="text-gold">Força</span>
    </>
  ),
  tagline: "Mapping a market, building a brand, and winning an uncontested digital category.",
  meta: [
    { label: "Client", value: "Cimento Força (FESCO)" },
    { label: "Industry", value: "Cement / Construction" },
    { label: "Market", value: "Mozambique" },
    { label: "Scope", value: "Market Research, Branding & Social Strategy" },
  ],
  heroImage: "/media/case-studies/ecommerce/p06.jpg",
  heroStats: [
    { value: "4–5M t/yr", label: "Market size 2023 (~$500M)" },
    { value: "$6B/yr", label: "Infrastructure spend by 2025" },
    { value: "2", label: "Logo systems (Força + FESCO)" },
    { value: "12+", label: "Collateral pieces designed" },
  ],
  sections: [
    {
      heading: "Phase I — Market Entry Research",
      paragraphs: [
        "Ahead of launching Cimento Força under parent company FESCO, Dblshot conducted a full market research study to map Mozambique's cement industry — sizing the opportunity, profiling competitors, and identifying the strategic gap Cimento Força could exploit. The research underpinned every later decision, from positioning to channel strategy.",
      ],
      bullets: [
        "Population 32M+, 90% smartphone penetration, median age 17",
        "GDP growth forecast 6.5% (2023); infrastructure spend forecast $6B/year by 2025",
        "13 active mega-projects identified — from a $200M rail rehabilitation to a $20B LNG development",
        "Competitive landscape: Dugongo 51.4% share (low price), CIMPOR 17.1%, Limak 17.1%",
        "Tete identified as an under-penetrated expansion opportunity (5.38% population growth)",
      ],
    },
    {
      heading: "Cement Market Sizing",
      stats: [
        { value: "4–5M t/yr", label: "Market size 2023 (~$500M)" },
        { value: "120–150K t", label: "Monthly production capacity" },
        { value: "6.5%", label: "Projected CAGR 2023–2028" },
      ],
    },
    {
      heading: "Phase II — Full Brand Identity",
      paragraphs: [
        "The research converged on positioning Cimento Força as “The Specialist” — efficiency, affordability, and convenient market presence. Dblshot then designed a complete brand identity flexing across retail packaging, B2B stationery, vehicle and street branding, and merchandise.",
      ],
      bullets: [
        "Positioning: “The Specialist”; brand line: O cimento campeão (“The champion cement”)",
        "Visual anchor: a bold red elephant-head mark — intelligence, social cohesion, and durability",
        "A secondary geometric pattern system inspired by regional textiles across packaging and collateral",
        "A five-typeface hierarchy and two logo systems (Cimento Força + FESCO)",
      ],
    },
    {
      heading: "Phase III — Digital & Social Launch",
      paragraphs: [
        "With competitors largely absent or weak on social channels, the brief was to design a first-mover digital presence that built trust quickly with a young, mobile-first population.",
      ],
      bullets: [
        "Facebook — flagship channel for brand storytelling, community, and customer service",
        "Instagram — product/project visual content and behind-the-scenes plant footage",
        "LinkedIn — B2B content for contractors, engineers, and distributors",
        "WhatsApp Business — a direct line for distributor orders and customer queries",
        "Launch video series introducing the mascot and 'Building Stronger Together' positioning",
      ],
    },
    {
      heading: "The Result",
      paragraphs: [
        "Cimento Força entered the market as the only cement brand with a fully localized, consistently branded social media presence across Facebook, Instagram, LinkedIn, and WhatsApp — capturing share of voice in a category where digital was almost entirely uncontested.",
      ],
    },
  ],
  palette: [
    { name: "Força Green", hex: "#007452" },
    { name: "Força Red", hex: "#E51E2D" },
    { name: "Charcoal", hex: "#241F20" },
    { name: "Gold", hex: "#F89C1C" },
  ],
  results: [
    { value: "2", label: "Logo systems (Força + FESCO)" },
    { value: "12+", label: "Collateral pieces designed" },
    { value: "5", label: "Typeface hierarchy" },
  ],
  related: [
    { label: "Strategy", href: "/services/strategy" },
    { label: "Branding", href: "/services/branding" },
    { label: "Performance", href: "/services/performance" },
  ],
};

export default function CimentoForcaCaseStudyPage() {
  return <CaseStudyDetail spec={spec} />;
}
