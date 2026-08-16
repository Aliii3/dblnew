import type { MetadataRoute } from "next";
import { ALL_BLOG_SLUGS } from "@/lib/content/blogs";
import { getAllCareerSlugs, getAllCaseStudySlugs } from "@/lib/content/sync";
import { SITE } from "@/lib/site";

/** Actual live service page routes (kept explicit — some use SEO-specific slugs). */
const SERVICE_ROUTES = [
  "/services/amazon-growth",
  "/services/commerce",
  "/services/performance",
  "/services/technology",
  "/services/branding",
  "/services/strategy",
];

const STATIC_ROUTES = [
  "",
  "/about",
  "/blogs",
  "/careers",
  "/case-studies",
  "/contact",
  "/deep-impact",
  "/junior-marketer",
  "/privacy-policy",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.url;
  const now = new Date();

  const entries: MetadataRoute.Sitemap = STATIC_ROUTES.map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.8,
  }));

  for (const slug of ALL_BLOG_SLUGS) {
    entries.push({
      url: `${base}/blogs/${slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  for (const slug of getAllCaseStudySlugs()) {
    entries.push({
      url: `${base}/case-studies/${slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.75,
    });
  }

  for (const slug of getAllCareerSlugs()) {
    entries.push({
      url: `${base}/careers/${slug}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.6,
    });
  }

  for (const path of SERVICE_ROUTES) {
    entries.push({
      url: `${base}${path}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.75,
    });
  }

  return entries;
}
