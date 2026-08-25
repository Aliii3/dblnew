import { CaseStudyDetail, type CaseStudySpec } from "@/components/ui/CaseStudyDetail";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Spritz — Case Study",
  description:
    "410% growth in under six months for a low-calorie cooking-oil-spray brand across Amazon, Noon, website, and social — plus 202% social-driven sales growth, by Dblshot.",
  path: "/case-studies/spritz",
  image: "/media/case-studies/spritz-kitchen-essentials.jpg",
});

const spec: CaseStudySpec = {
  slug: "spritz",
  category: "E-Commerce Management · Amazon Ads · Social Media",
  brand: (
    <>
      <span className="text-gold">Spritz</span>
    </>
  ),
  tagline: "410% growth in under six months.",
  meta: [
    { label: "Client", value: "Spritz" },
    { label: "Industry", value: "FMCG — Low-Calorie Cooking Oil Sprays" },
    { label: "Market", value: "Egypt" },
    { label: "Scope", value: "Amazon Ads + Noon + Website + Social" },
  ],
  heroImage: "/media/case-studies/spritz-kitchen-essentials.jpg",
  heroStats: [
    { value: "410%", label: "Overall growth (Q1 YoY)" },
    { value: "275%", label: "Sustained growth (Q2 YoY)" },
    { value: "9%", label: "CIR maintained" },
    { value: "11×", label: "ROAS achieved" },
  ],
  sections: [
    {
      heading: "Overview",
      paragraphs: [
        "Spritz is a health-focused brand specializing in low-calorie cooking oil sprays. While it had a strong offline reputation, its e-commerce presence was early-stage when it partnered with Dblshot in February 2025 — limited to just 3 SKUs with non-compliant imagery.",
      ],
    },
    {
      heading: "Phase 1 — Building the Foundation",
      bullets: [
        "Visual overhaul: a full professional photoshoot replacing all non-compliant Amazon images",
        "SEO & copywriting: keyword-rich product descriptions communicating the brand's USPs",
        "Premium A+ Content: immersive branded modules covering value proposition and lifestyle use",
        "The same upgraded assets redeployed across Noon listings simultaneously",
      ],
    },
    {
      heading: "Phase 2 — Ads Pilot & Forecasting",
      paragraphs: [
        "With a stronger catalog in place, pilot campaigns on Amazon and Noon established baseline data, used to build quarterly sales forecasts and firm CIR/ROAS targets.",
      ],
    },
    {
      heading: "Phase 3 — Scaling With 360° Campaigns",
      bullets: [
        "Amazon: Sponsored Brands, Sponsored Products, and Sponsored Display deployed full-funnel",
        "Noon: premium homepage and Best Sellers-section banner placements plus Sponsored Products",
        "Ramadan 2025: targeted seasonal keywords across Amazon and Noon for peak visibility",
        "Amazon Prime Day (July 2025): aggressive advertising plus catalog readiness to dominate the category",
      ],
    },
    {
      heading: "Phase 4 — Website Revamp & Social Media",
      paragraphs: [
        "By mid-2025, growth on Amazon and Noon set the stage for a full WordPress website revamp (June 2025) with modern UX/UI and frictionless D2C checkout, followed by a social media activation (July 2025) with a fresh, healthy-living content strategy.",
      ],
    },
    {
      heading: "Social Media Management — An Always-On Presence",
      paragraphs: [
        "Dblshot managed Spritz's social presence end-to-end across Instagram and Facebook — a content strategy and always-on publishing calendar, day-to-day community management, and layered paid social — turning presence into a consistent revenue channel.",
      ],
      image: "/media/case-studies/spritz-into-summer.jpg",
      imageAlt: "Spritz Into Summer — the full cooking-spray lineup styled in a beach picnic basket, part of Spritz's seasonal social content strategy",
      stats: [
        { value: "202%", label: "Social-driven sales growth YoY" },
        { value: "167%", label: "Order growth YoY" },
        { value: "116%", label: "Units-sold growth" },
      ],
    },
  ],
  results: [
    { value: "410%", label: "Overall growth Q1 YoY" },
    { value: "275%", label: "Sustained growth Q2 YoY" },
    { value: "9%", label: "CIR" },
    { value: "11×", label: "ROAS" },
  ],
  related: [
    { label: "Commerce", href: "/services/commerce" },
    { label: "Amazon Growth", href: "/services/amazon-growth" },
    { label: "Technology", href: "/services/technology" },
    { label: "Performance", href: "/services/performance" },
  ],
  caseBarActive: "spritz",
};

export default function SpritzCaseStudyPage() {
  return <CaseStudyDetail spec={spec} />;
}
