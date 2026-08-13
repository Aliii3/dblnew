import servicesData from "./generated/services.json";
import caseStudiesData from "./generated/case-studies.json";
import careersData from "./generated/careers.json";

export type ContentSection = {
  heading: string | null;
  paragraphs: string[];
};

export type ServicePage = {
  slug: string;
  hero: string;
  intro: string;
  detail: string;
  benefits: string[];
  closing: string;
  sections: ContentSection[];
};

export type CaseStudyPage = {
  slug: string;
  title: string;
  subtitle: string;
  intro: string;
  sections: ContentSection[];
};

export type CareerPage = {
  slug: string;
  title: string;
  sections: ContentSection[];
  paragraphs: string[];
};

const SERVICES = servicesData as ServicePage[];
const CASE_STUDIES = caseStudiesData as CaseStudyPage[];
const CAREERS = careersData as CareerPage[];

export function getService(slug: string): ServicePage | undefined {
  return SERVICES.find((s) => s.slug === slug);
}

const DEDICATED_SERVICE_PAGES = new Set([
  "amazon",
  "e-commerce-management",
  "social-media",
  "market-research",
  "website-development",
  "branding",
]);

export function getAllServiceSlugs(): string[] {
  return SERVICES.map((s) => s.slug).filter((s) => !DEDICATED_SERVICE_PAGES.has(s));
}

export function getCaseStudy(slug: string): CaseStudyPage | undefined {
  return CASE_STUDIES.find((s) => s.slug === slug);
}

const DEDICATED_CASE_STUDIES = new Set(["isis-organic", "spritz", "rehana", "raw", "cimento-forca", "wingo", "zeina"]);

export function getAllCaseStudySlugs(): string[] {
  return CASE_STUDIES.map((s) => s.slug).filter((s) => !DEDICATED_CASE_STUDIES.has(s));
}

export function getCareer(slug: string): CareerPage | undefined {
  return CAREERS.find((c) => c.slug === slug);
}

export function getAllCareerSlugs(): string[] {
  return CAREERS.map((c) => c.slug);
}
