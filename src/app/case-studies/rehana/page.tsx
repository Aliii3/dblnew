import { CaseStudyDetail, type CaseStudySpec } from "@/components/ui/CaseStudyDetail";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Rehana — Case Study",
  description:
    "One month. One chance. How Rehana won Ramadan on Amazon — a full store build and full-funnel ads campaign executed in just 30 days, driving 350% growth on Ramadan SKUs.",
  path: "/case-studies/rehana",
  image: "/media/case-studies/rehana-table.jpg",
});

const spec: CaseStudySpec = {
  slug: "rehana",
  category: "Amazon Ads",
  brand: (
    <>
      Rehana <span className="text-gold">Wins Ramadan</span>
    </>
  ),
  tagline: "One month. One chance. How Rehana won Ramadan on Amazon.",
  meta: [
    { label: "Client", value: "Rehana" },
    { label: "Industry", value: "FMCG — Pantry Essentials" },
    { label: "Market", value: "Egypt" },
    { label: "Scope", value: "Amazon Store Build + Full-Funnel Ads (30 Days)" },
  ],
  heroImage: "/media/case-studies/rehana-table.jpg",
  heroStats: [
    { value: "350%", label: "Growth on Ramadan SKUs" },
    { value: "40%", label: "Total Amazon sales uplift MoM" },
    { value: "40%", label: "Growth on aged inventory" },
    { value: "30 Days", label: "Zero to live" },
  ],
  sections: [
    {
      heading: "The Challenge",
      paragraphs: [
        "Ahead of Ramadan 2025, Rehana — a household pantry-essentials name — needed a significant Amazon impact in just one month. With no existing store, a vast SKU catalog, and Ramadan approaching, planning, execution, and results all had to happen within 30 days.",
      ],
    },
    {
      heading: "Week 1 — Strategic Planning",
      bullets: [
        "Inventory analysis to identify Ramadan-relevant SKUs and aging stock needing a push",
        "A precision promotions map tied to stock levels, margin goals, and seasonality",
        "A data-driven advertising budget and performance forecast",
      ],
    },
    {
      heading: "Week 2 — Store Creation, Built From Scratch",
      bullets: [
        "Conversion-optimized Amazon Storefront with a Ramadan-specific visual identity",
        "A dedicated 'Deals of the Month' landing page for all promoted SKUs",
        "Mobile-first navigation across every product category",
      ],
    },
    {
      heading: "Weeks 3–4 — Full-Funnel Advertising Execution",
      bullets: [
        "Sponsored Products dominating category-level and high-intent Ramadan keyword searches",
        "Sponsored Brands driving brand discovery and cross-sell across the catalog",
        "Sponsored Display for strategic retargeting and category defense",
        "Video Ads funneling high-quality traffic directly into the new Rehana store",
      ],
    },
  ],
  results: [
    { value: "350%", label: "Growth on Ramadan SKUs" },
    { value: "40%", label: "Total Amazon sales growth MoM" },
    { value: "40%", label: "Growth on aged inventory" },
  ],
  related: [
    { label: "Amazon Growth", href: "/services/amazon-growth" },
    { label: "E-Commerce", href: "/services/commerce" },
  ],
  caseBarActive: "rehana",
};

export default function RehanaCaseStudyPage() {
  return <CaseStudyDetail spec={spec} />;
}
