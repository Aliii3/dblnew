export type BlogPostMeta = {
  slug: string;
  tag: string;
  title: string;
  excerpt: string;
  image: string;
  isCaseStudy?: boolean;
  caseStudySlug?: string;
};

/** Exact titles/copy from dblshot.co Knowledge Drop */
export const BLOG_POSTS: BlogPostMeta[] = [
  {
    slug: "ramadan-preparation",
    tag: "Ramadan Preparation",
    title:
      "An FMCG Guide on How to Capitalize on Ramadan Seasons on E-commerce Platforms",
    excerpt:
      "An FMCG Guide on How to Capitalize on Ramadan Seasons on e-commerce Platforms",
    image: "/media/blogs/ramadan-preparation.png",
  },
  {
    slug: "egypt-dessert-market",
    tag: "Egypt's Dessert Market",
    title: "From Regular Konafa, to ALL THINGS PISTACHIO",
    excerpt: "From Regular Konafa, to ALL THINGS PISTACHIO",
    image: "/media/blogs/egypt-dessert-market.png",
  },
  {
    slug: "ecommerce",
    tag: "Ecommerce",
    title: "From Stage to Backstage: How the Gulf Outpaces Egypt in the E-commerce Play",
    excerpt: "From Stage to Backstage: How the Gulf Outpaces Egypt in the E-commerce Play",
    image: "/media/blogs/ecommerce.png",
  },
];

export const CASE_STUDY_CARD = {
  slug: "isis-organic",
  tag: "iSiS-Organic",
  title: "245% growth in e-commerce, 2,740% YOY growth in Amazon Sales",
  excerpt: "245% growth in e-commerce, 2,740% YOY growth in Amazon Sales",
  image: "/media/blogs/isis-organic.png",
  isCaseStudy: true,
  caseStudySlug: "isis-organic",
} as const;

export function getBlogPost(slug: string): BlogPostMeta | undefined {
  if (slug === CASE_STUDY_CARD.slug) return CASE_STUDY_CARD;
  return BLOG_POSTS.find((p) => p.slug === slug);
}

export const ALL_BLOG_SLUGS = [...BLOG_POSTS.map((p) => p.slug)];
