import { CaseStudyDetail, type CaseStudySpec } from "@/components/ui/CaseStudyDetail";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "iSiS Organic — Case Study",
  description:
    "From zero online presence to Egypt's fastest-growing FMCG brand in e-commerce — 2,740% Amazon YoY growth and 245% total e-commerce growth across seven platforms, by Double Shot.",
  path: "/case-studies/isis-organic",
  image: "/media/case-studies/ecommerce/p05.jpg",
});

const spec: CaseStudySpec = {
  slug: "isis-organic",
  category: "E-Commerce Management · Amazon Ads",
  brand: (
    <>
      iSiS <span className="text-gold">Organic</span>
    </>
  ),
  tagline: "From zero online presence to Egypt's fastest-growing FMCG brand in e-commerce.",
  meta: [
    { label: "Client", value: "ISIS Organic" },
    { label: "Industry", value: "FMCG — Organic & Natural Products" },
    { label: "Market", value: "Egypt" },
    { label: "Scope", value: "Amazon Ads + Full E-Commerce Management" },
  ],
  heroImage: "/media/case-studies/ecommerce/p05.jpg",
  heroVideo: "/media/case-studies/isis-water.mp4",
  heroStats: [
    { value: "2,740%", label: "Amazon YoY growth" },
    { value: "245%", label: "Total e-commerce growth" },
    { value: "350%", label: "Breadfast growth" },
    { value: "477%", label: "GoodsMart growth" },
  ],
  sections: [
    {
      heading: "Overview",
      paragraphs: [
        "ISIS Organic is a leading Egyptian FMCG brand with over 40 years of heritage in the organic and natural products space — spanning honey, herbal teas, natural water, oils, snacks, and juices. Despite strong retail equity, the brand had almost no e-commerce footprint when it partnered with Double Shot in April 2024.",
      ],
    },
    {
      heading: "The Challenge",
      bullets: [
        "Unoptimized product listings with poor search visibility and weak conversion rates",
        "A fragmented catalog — only a fraction of the product range was available online",
        "Zero advertising activity across any marketplace",
        "Inconsistent purchase-order fulfillment, costing sales even when demand existed",
        "No unified digital commerce strategy connecting platforms",
      ],
    },
    {
      heading: "Phase 1 — Building the Amazon Foundation (April 2024)",
      paragraphs: [
        "Double Shot rebuilt ISIS Organic's Amazon presence from the ground up — every listing restructured for search relevance and conversion, paired with a full-funnel advertising strategy (Sponsored Brands, Sponsored Products, Sponsored Display) and a dedicated Amazon Brand Store to increase basket size and AOV.",
      ],
      stats: [
        { value: "900%", label: "Amazon growth in 4 months" },
        { value: "0 → Full Funnel", label: "Ad spend before Double Shot" },
        { value: "8/10", label: "Amazon IDQ score reached" },
      ],
    },
    {
      heading: "Phase 2 — Full Digital Commerce Takeover (August 2024)",
      paragraphs: [
        "ISIS Organic expanded the partnership to cover the entire digital commerce operation — Noon, Breadfast, GoodsMart, plus new launches on Botit, Rabbit, and Talabat — executed through five pillars:",
      ],
      bullets: [
        "The Audit — platform-by-platform performance mapping by SKU, category, and channel",
        "Catalog Strengthening — expanding, refining, and digitizing offline retail winners across all platforms",
        "Promotions Strategy — a seasonality-driven plan tied to the full Egyptian shopping calendar",
        "Demand Forecasting & Fulfillment — purchase-order fulfillment lifted above 80%",
        "KPI Framework — sales growth, CIR targets, and conversion benchmarks in one unified view",
      ],
    },
    {
      heading: "The Result",
      paragraphs: [
        "After implementing a platform-specific strategy, promotional planning, and operational enhancements, iSiS Organic became one of the fastest-growing FMCG brands online across seven platforms in under twelve months.",
      ],
    },
  ],
  results: [
    { value: "2,740%", label: "Amazon YoY growth" },
    { value: "245%", label: "Total e-commerce growth" },
    { value: "350%", label: "Breadfast" },
    { value: "140%", label: "Noon" },
    { value: "477%", label: "GoodsMart" },
  ],
  related: [
    { label: "Amazon Ads", href: "/services/amazon-management-advertising-egypt" },
    { label: "Full E-Commerce Management", href: "/services/ecommerce-management-egypt" },
  ],
  caseBarActive: "isis-organic",
};

export default function IsisCaseStudyPage() {
  return <CaseStudyDetail spec={spec} />;
}
