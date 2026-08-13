import caseStudiesData from "./generated/case-studies.json";
import { CASE_STUDY_LOGOS } from "./clients";
import type { CaseStudyPage } from "./sync";

export type CaseStudyCard = {
  slug: string;
  title: string;
  subtitle: string;
  excerpt: string;
  image: string;
  logo?: string;
  metrics?: { value: string; label: string }[];
  comingSoon?: boolean;
};

/** Case studies not yet published — shown as "Coming Soon" and not clickable. */
const COMING_SOON = new Set<string>([]);

const CARD_META: Record<string, Pick<CaseStudyCard, "image" | "metrics">> = {
  "isis-organic": {
    image: "/media/case-studies/isis-teas.jpg",
    metrics: [
      { value: "245%", label: "E-commerce growth" },
      { value: "2,740%", label: "YOY Amazon sales" },
    ],
  },
  spritz: {
    image: "/media/case-studies/spritz-kitchen-essentials.jpg",
    metrics: [{ value: "360°", label: "Campaign scaling" }],
  },
  rehana: {
    image: "/media/case-studies/rehana-table.jpg",
    metrics: [{ value: "350%", label: "Ramadan growth" }],
  },
  ltf: {
    image: "/media/case-studies/ltf.png",
  },
  raw: {
    image: "/media/case-studies/ecommerce/p07.jpg",
    metrics: [
      { value: "370%", label: "Amazon growth" },
      { value: "5.6×", label: "ROAS (from 2.11×)" },
    ],
  },
  "cimento-forca": {
    image: "/media/case-studies/ecommerce/p06.jpg",
    metrics: [
      { value: "2", label: "Logo systems" },
      { value: "12+", label: "Collateral pieces" },
    ],
  },
  wingo: {
    // Placeholder: no Wingo-specific asset exists yet. Deliberately a neutral
    // results card — p12 showed iSiS/Goodsmart branding, i.e. another client's work.
    image: "/media/case-studies/ecommerce/p21.jpg",
    metrics: [
      { value: "65+", label: "Guideline pages" },
      { value: "9+", label: "Product lines" },
    ],
  },
  zeina: {
    image: "/media/case-studies/ecommerce/p16.jpg",
    metrics: [
      { value: "1979", label: "Heritage brand" },
      { value: "AR + EN", label: "Bilingual system" },
    ],
  },
};

const STUDIES = caseStudiesData as CaseStudyPage[];

export function getAllCaseStudies(): CaseStudyCard[] {
  return STUDIES.map((study) => {
    const meta = CARD_META[study.slug] ?? {};
    return {
      slug: study.slug,
      title: study.title,
      subtitle: study.subtitle,
      excerpt: study.intro.slice(0, 180) + (study.intro.length > 180 ? "…" : ""),
      // Neutral fallback — must not carry any client's branding
      image: meta.image ?? "/media/case-studies/ecommerce/p17.jpg",
      logo: CASE_STUDY_LOGOS[study.slug],
      metrics: meta.metrics,
      comingSoon: COMING_SOON.has(study.slug),
    };
  });
}
