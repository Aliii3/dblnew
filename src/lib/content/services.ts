export const SERVICES = [
  {
    title: "Amazon Ads",
    description: "End-to-end Amazon management — listing optimization, PPC mastery, and marketplace dominance.",
    href: "/services/amazon-management-advertising-egypt",
    icon: "amazon",
  },
  {
    title: "E-Commerce Management",
    description: "Full e-commerce management across Amazon, Noon, Breadfast, and GoodsMart.",
    href: "/services/ecommerce-management-egypt",
    icon: "cart",
  },
  {
    title: "Social Media Management",
    description: "Strategy, content, paid social, and community management across all major platforms.",
    href: "/services/social-media",
    icon: "chart",
  },
  {
    title: "Website Development",
    description: "High-converting websites built for performance, CRO, and brand growth.",
    href: "/services/website-development",
    icon: "web",
  },
  {
    title: "Market Research",
    description: "Data-driven insights and competitor analysis to inform your FMCG growth strategy.",
    href: "/services/market-research",
    icon: "research",
  },
  {
    title: "Branding",
    description: "Complete brand identity — strategy, naming, visual systems, and full guidelines built to last.",
    href: "/services/branding",
    icon: "brand",
  },
] as const;

export const AMAZON_BENEFITS = [
  "Proven strategies to boost visibility & sales",
  "Amazon experts across Sponsored Products, Brands & Display",
  "Clear dashboards, real ROI, and consistent scaling",
  "Customized campaigns built for your brand's growth",
] as const;

export type ServiceIconName = (typeof SERVICES)[number]["icon"];
