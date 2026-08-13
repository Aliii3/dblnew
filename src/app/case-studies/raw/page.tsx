import { CaseStudyDetail, type CaseStudySpec } from "@/components/ui/CaseStudyDetail";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "RAW Kettle Cooked Potatoes — Case Study",
  description:
    "370% Amazon growth through AOV engineering and ROAS optimization — the RAW Kettle Cooked Potatoes story by Double Shot.",
  path: "/case-studies/raw",
  image: "/media/case-studies/ecommerce/p07.jpg",
});

const spec: CaseStudySpec = {
  slug: "raw",
  category: "Amazon Ads",
  brand: (
    <>
      RAW <span className="text-gold">Kettle Cooked Potatoes</span>
    </>
  ),
  tagline: "370% Amazon growth through AOV engineering & ROAS optimization.",
  meta: [
    { label: "Client", value: "RAW Kettle Cooked Potatoes" },
    { label: "Industry", value: "FMCG — Premium Snacks" },
    { label: "Market", value: "Egypt" },
    { label: "Scope", value: "Amazon Ads — Bundle & Catalog Strategy" },
  ],
  heroImage: "/media/case-studies/ecommerce/p07.jpg",
  heroStats: [
    { value: "370%", label: "Amazon sales growth (Nov)" },
    { value: "2.11→5.6", label: "ROAS before → after" },
    { value: "25%", label: "Bundle discount (Buy 3 Get)" },
    { value: "3×", label: "New bundle SKUs created" },
  ],
  sections: [
    {
      heading: "The Brand",
      paragraphs: [
        "RAW Kettle Cooked Potatoes is an Egyptian snack brand offering a premium kettle-cooked chip product across several flavors. With a quality product and a strong brand identity, RAW had the foundations to perform well on Amazon but wasn't yet unlocking its full commercial potential.",
      ],
    },
    {
      heading: "The Opportunity",
      paragraphs: [
        "The challenge wasn't simply driving more traffic. It was increasing the value of each transaction — getting already-interested buyers to spend more per order. Double Shot identified Average Order Value (AOV) as the primary lever to transform RAW's Amazon economics without increasing ad spend.",
      ],
    },
    {
      heading: "The Strategy — Buy 3, Get 25% Off",
      paragraphs: [
        "A bundle promotion mechanic was introduced as a controlled test: incentivizing multi-unit purchases instead of competing on unit-level price. Performance was monitored for sales lift, ROAS impact, and margin health.",
      ],
      stats: [
        { value: "2.11", label: "ROAS before bundle" },
        { value: "5.6", label: "ROAS after bundle" },
        { value: "+165%", label: "ROAS improvement" },
      ],
    },
    {
      heading: "Expanding the Model — Bundle Listings",
      paragraphs: [
        "After validating the promotion, Double Shot extended the AOV strategy into permanent catalog architecture: Box of 3, Box of 6, and Box of 10 — available to all shoppers at all times, providing a cleaner, higher-value advertising surface.",
      ],
    },
  ],
  results: [
    { value: "370%", label: "Amazon sales growth in November" },
    { value: "5.6×", label: "Final ROAS after bundle strategy" },
    { value: "3", label: "New bundle SKUs permanently listed" },
  ],
  related: [
    { label: "Amazon Ads", href: "/services/amazon-management-advertising-egypt" },
    { label: "Full E-Commerce Management", href: "/services/ecommerce-management-egypt" },
  ],
};

export default function RawCaseStudyPage() {
  return <CaseStudyDetail spec={spec} />;
}
