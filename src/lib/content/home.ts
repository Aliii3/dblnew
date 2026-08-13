import homeData from "./generated/home.json";

export type HomeBlogCard = {
  tag: string;
  title: string;
  excerpt: string;
  image: string;
  slug: string;
  isCaseStudy?: boolean;
  caseStudySlug?: string | null;
};

export type HomeTeamMember = {
  name: string;
  image: string;
  role?: string;
  motif?: TeamMotifName;
  href?: string;
  featured?: boolean;
};

export type TeamMotifName =
  | "leadership"
  | "performance"
  | "design"
  | "analytics"
  | "video"
  | "social"
  | "developer"
  | "finance";

export const HOME = homeData as {
  fetched_at: string;
  team: HomeTeamMember[];
  clients: string[];
  blogPosts: HomeBlogCard[];
  reviewsWidgetUrl: string;
  teamIntro: string[];
};

export const HOME_BLOG_POSTS = HOME.blogPosts;

/**
 * Defined here rather than derived from generated/home.json — that file carries
 * nicknames ("Lolo", "Abdo") and no roles, and is overwritten by the content
 * sync. Ordered leadership first, then by discipline.
 */
export const HOME_TEAM: HomeTeamMember[] = [
  { name: "Radwa Fathi", role: "CEO", motif: "leadership", image: "/media/team/editorial/radwa.webp", href: "/about", featured: true },
  { name: "AbdelRahman Rashad", role: "Performance Marketing Team Leader", motif: "performance", image: "/media/team/editorial/abdo.webp" },
  { name: "Shrouk Moustafa", role: "Senior Graphic Designer — Team Leader", motif: "design", image: "/media/team/editorial/shrouk.webp" },
  { name: "Mariam Ayman", role: "Performance Marketing Supervisor", motif: "performance", image: "/media/team/editorial/mariam.webp" },
  { name: "Rodaina Eldahan", role: "Performance Marketing Specialist", motif: "performance", image: "/media/team/editorial/rodaina.webp" },
  { name: "Laila Sayed", role: "Marketing Performance Analyst", motif: "analytics", image: "/media/team/editorial/laila.webp" },
  { name: "Nour Hisham", role: "Account Manager & Video Editor", motif: "video", image: "/media/team/editorial/nour.webp" },
  { name: "Donia Hossam", role: "Social Media Specialist & Reel Creator", motif: "social", image: "/media/team/editorial/donia.webp" },
  { name: "Lenda Wageh", role: "Senior Graphic Designer", motif: "design", image: "/media/team/editorial/lenda.webp" },
  { name: "Ali Yasser", role: "Senior Software Developer", motif: "developer", image: "/media/team/editorial/ali.webp" },
  { name: "Mazen Yasser", role: "Software Developer", motif: "developer", image: "/media/team/editorial/mazen.webp" },
  { name: "Shady Diab", role: "Senior Accountant", motif: "finance", image: "/media/team/editorial/shady.webp" },
];
export const CLIENT_LOGOS = HOME.clients;
export const REVIEWS_WIDGET_URL = HOME.reviewsWidgetUrl;
