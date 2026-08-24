export const SERVICES = [
  {
    title: "Strategy",
    description: "Data-driven insights and competitor analysis to inform your FMCG growth strategy.",
    href: "/services/strategy",
    icon: "research",
  },
  {
    title: "Branding",
    description: "Complete brand identity — strategy, naming, visual systems, and full guidelines built to last.",
    href: "/services/branding",
    icon: "brand",
  },
  {
    title: "Performance",
    description: "Full-funnel paid media across Meta, Google, TikTok, and Snapchat — tested and optimized daily.",
    href: "/services/performance",
    icon: "chart",
  },
  {
    title: "E-Commerce",
    description: "Full e-commerce management across Amazon, Noon, Breadfast, and GoodsMart.",
    href: "/services/commerce",
    icon: "cart",
  },
  {
    title: "Amazon Growth",
    description: "End-to-end Amazon management — listing optimization, PPC mastery, and marketplace dominance.",
    href: "/services/amazon-growth",
    icon: "amazon",
  },
  {
    title: "Website Development",
    description: "High-converting websites built for performance, CRO, and brand growth.",
    href: "/services/technology",
    icon: "web",
  },
] as const;

export const AMAZON_BENEFITS = [
  "Proven strategies to boost visibility & sales",
  "Amazon experts across Sponsored Products, Brands & Display",
  "Clear dashboards, real ROI, and consistent scaling",
  "Customized campaigns built for your brand's growth",
] as const;

export type ServiceIconName = (typeof SERVICES)[number]["icon"];
