import { CaseStudyDetail, type CaseStudySpec } from "@/components/ui/CaseStudyDetail";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Zeina — Branding Case Study",
  description:
    "Rebranding a Saudi food-heritage name (est. 1979) for a new generation — a complete brand identity system by Double Shot that honors four decades of trust.",
  path: "/case-studies/zeina",
});

const spec: CaseStudySpec = {
  slug: "zeina",
  category: "Branding",
  brand: (
    <>
      <span className="text-gold">Zeina</span>
    </>
  ),
  tagline: "Rebranding a Saudi heritage name for a new generation.",
  meta: [
    { label: "Client", value: "Zeina" },
    { label: "Industry", value: "FMCG — Specialty Foods (est. 1979)" },
    { label: "Market", value: "Saudi Arabia" },
    { label: "Scope", value: "Full Brand Identity & Visual System" },
  ],
  heroStats: [
    { value: "1979", label: "Heritage brand since" },
    { value: "40+ yrs", label: "Of family trust" },
    { value: "AR + EN", label: "Bilingual system" },
  ],
  sections: [
    {
      heading: "Overview",
      paragraphs: [
        "Zeina is a Saudi food-heritage brand in households across the Kingdom since 1979 — nuts, dried fruits, legumes, spices, and pantry staples rooted in everyday hospitality. Double Shot led a complete brand identity overhaul, repositioning a beloved legacy name for a new generation while honoring four decades of trust.",
      ],
    },
    {
      heading: "The Challenge",
      bullets: [
        "A legacy visual identity that no longer reflected the product's quality and craft",
        "A broad product range lacking a unifying visual system",
        "The need to modernize without abandoning the emotional equity built with Saudi families",
        "A growing premium/gifting segment the old identity wasn't positioned to compete in",
      ],
    },
    {
      heading: "Strategic Foundation: Every Flavor Holds a Story",
      paragraphs: [
        "Rather than starting from the logo, the work started from Zeina's emotional core — the role its products play in Saudi hospitality and family rituals passed between generations. This became the new tagline and guiding principle.",
      ],
    },
    {
      heading: "Logo Concept",
      paragraphs: [
        "The new typography pairs a custom Arabic and Latin lockup with a small botanical mark above the Arabic letter alef — a leaf cluster symbolizing freshness, purity, and natural origin.",
      ],
    },
    {
      heading: "Typography",
      paragraphs: [
        "Philosopher serves as the display serif for English titles, signaling heritage without feeling dated. DIN Next LT Arabic handles Arabic titles, subtitles, and body copy with a full weight range from Ultra Light to Black.",
      ],
    },
    {
      heading: "Bringing the Brand to Life",
      bullets: [
        "Category-specific illustrated patterns for nuts, legumes, herbs, cardamom, seeds, popcorn, spices, vinegar, and dried fruits",
        "Premium packaging across tins, jars, pouches, and gift boxes",
        "Retail environment design — in-store shelf displays and branded kiosk concepts",
        "Corporate identity suite — business cards, stationery, notebooks, gift bags, and tote packaging",
        "Uniform and signage applications, from staff polos to building facades and vehicle livery",
        "Digital presence groundwork — social media profile design and e-commerce storefront direction",
      ],
    },
    {
      heading: "Outcome",
      paragraphs: [
        "The result is a complete, flexible brand system repositioning Zeina as a premium, design-forward Saudi heritage brand — ready to compete in modern retail and gifting channels while preserving the trust built over more than four decades.",
      ],
    },
  ],
  palette: [
    { name: "Deep Forest Green", hex: "#254432" },
    { name: "Fresh Leaf Green", hex: "#A8C73C" },
    { name: "Warm Cream", hex: "#EAE3D6" },
  ],
  related: [
    { label: "Branding", href: "/services/branding" },
    { label: "Performance", href: "/services/performance" },
    { label: "Technology", href: "/services/technology" },
  ],
};

export default function ZeinaCaseStudyPage() {
  return <CaseStudyDetail spec={spec} />;
}
