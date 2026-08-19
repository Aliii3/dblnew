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
  bio?: string;
  motif?: TeamMotifName;
  href?: string;
  featured?: boolean;
  /** Short looping clip shown in place of the static photo. */
  video?: string;
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
  { name: "Radwa Fathi", role: "CEO", motif: "leadership", image: "/media/team/editorial/radwa.webp", href: "/about", featured: true, bio: "Radwa leads DBLSHOT with a sharp mix of FMCG strategy, performance discipline, and founder-level instinct. She turns ambitious growth goals into clear operating systems for brands across Egypt and the GCC." },
  { name: "AbdelRahman Rashad", role: "Performance Marketing Team Leader", motif: "performance", image: "/media/team/editorial/abdo.webp", bio: "AbdelRahman owns the performance rhythm: campaign structure, testing logic, media efficiency, and daily optimization. He keeps growth focused, measurable, and moving." },
  { name: "Shrouk Moustafa", role: "Senior Graphic Designer - Team Leader", motif: "design", image: "/media/team/editorial/shrouk.webp", video: "/media/team/editorial/shrouk-motion.mp4", bio: "Shrouk leads the design language behind DBLSHOT work, shaping visuals that feel bold, polished, and commercially useful. She connects brand clarity with scroll-stopping creative." },
  { name: "Mariam Ayman", role: "Performance Marketing Supervisor", motif: "performance", image: "/media/team/editorial/mariam.webp", bio: "Mariam supervises performance execution with a close eye on pacing, learning cycles, and results. She helps campaigns stay organized, responsive, and aligned with client targets." },
  { name: "Rodaina Eldahan", role: "Performance Marketing Specialist", motif: "performance", image: "/media/team/editorial/rodaina.webp", bio: "Rodaina works across media buying, campaign setup, and optimization details. She brings the careful follow-through that keeps performance work clean and accountable." },
  { name: "Laila Sayed", role: "Marketing Performance Analyst", motif: "analytics", image: "/media/team/editorial/laila.webp", bio: "Laila reads the numbers behind the noise. She turns campaign data into useful insights, helping the team spot what is working, what needs pressure, and where the next opportunity sits." },
  { name: "Nour Hisham", role: "Account Manager & Video Editor", motif: "video", image: "/media/team/editorial/nour.webp", bio: "Nour bridges client communication and creative production, keeping projects moving while shaping video content with momentum. She brings structure, taste, and quick creative judgment." },
  { name: "Donia Hossam", role: "Social Media Specialist & Reel Creator", motif: "social", image: "/media/team/editorial/donia.webp", bio: "Donia builds social content with platform instinct, pace, and personality. She translates brand messages into reels and social moments designed to feel native, fresh, and useful." },
  { name: "Lenda Wageh", role: "Senior Graphic Designer", motif: "design", image: "/media/team/editorial/lenda.webp", bio: "Lenda crafts visual systems, campaign assets, and polished design details that keep brands looking consistent and confident across every touchpoint." },
  { name: "Ali Yasser", role: "Senior Software Developer", motif: "developer", image: "/media/team/editorial/ali.webp", bio: "Ali builds the technical side of growth, from websites to performance-minded digital experiences. He keeps the work fast, responsive, and grounded in clean implementation." },
  { name: "Mazen Yasser", role: "Software Developer", motif: "developer", image: "/media/team/editorial/mazen.webp", bio: "Mazen supports the development layer with careful builds, interface details, and technical problem solving. He helps turn ideas into usable digital products." },
  { name: "Shady Diab", role: "Senior Accountant", motif: "finance", image: "/media/team/editorial/shady.webp", bio: "Shady keeps the financial side steady, accurate, and organized. His work supports the operational clarity behind the agency's growth and client delivery." },
];
export const CLIENT_LOGOS = HOME.clients;
export const REVIEWS_WIDGET_URL = HOME.reviewsWidgetUrl;
