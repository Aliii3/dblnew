export const SITE = {
  name: "DBLSHOT",
  title: "Double Shot",
  description:
    "Strategic performance marketing and e-commerce partner for FMCG brands across Egypt and the GCC.",
  url: "https://dblshot.co",
  email: "clients@dblshot.co",
  phone: "+20 128 977 2228",
  address: "New Cairo, 5th settlement, Northern 90th Street, Al Tabib 2",
} as const;

export const LOGO_URL = "/brand/logo.png";

/** Values line, shown in the footer. */
export const BRAND_QUOTE =
  "Partner honestly. Grow ethically. Empower locally. Build future leaders. Create deep impact.";

/** Framer CDN fallback for external embeds */
export const LOGO_URL_CDN =
  "https://framerusercontent.com/images/BBeCdJdGDocOQg4RKp3Bx3sU.png";

/** "blogs" is no longer in the nav, but /blogs still exists and sets it. */
export type NavKey = "home" | "services" | "impact" | "about" | "blogs" | "junior" | "careers";

export type NavChild = { label: string; href: string };

export type NavItem = {
  key: NavKey;
  label: string;
  href: string;
  children?: NavChild[];
};

export const NAV_ITEMS: NavItem[] = [
  { key: "home", label: "Home", href: "/" },
  {
    key: "services",
    label: "Solutions",
    href: "/services",
    children: [
      { label: "Strategy", href: "/services/strategy" },
      { label: "Creative", href: "/services/branding" },
      { label: "Performance", href: "/services/performance" },
      { label: "Commerce", href: "/services/commerce" },
      { label: "Amazon Growth", href: "/services/amazon-growth" },
      { label: "Technology", href: "/services/technology" },
    ],
  },
  { key: "impact", label: "Deep Impact", href: "/deep-impact" },
  { key: "about", label: "About Us", href: "/about" },
  { key: "junior", label: "Junior Marketer", href: "/junior-marketer" },
  { key: "careers", label: "Careers", href: "/careers" },
];

export const SOCIAL_LINKS = [
  { label: "Instagram", href: "https://www.instagram.com/dblshot1/" },
  { label: "WhatsApp", href: "https://wa.me/201289772228" },
  { label: "Facebook", href: "https://www.facebook.com/dblshot" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/dblshot/" },
  { label: "YouTube", href: "https://www.youtube.com/@dblshot" },
] as const;
