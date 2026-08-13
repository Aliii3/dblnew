import ecommerce from "./ecommerce.json";
import ramadanPreparation from "./ramadan-preparation.json";
import egyptDessertMarket from "./egypt-dessert-market.json";

export type ArticleSection = {
  heading: string | null;
  paragraphs: string[];
};

const ARTICLES: Record<string, ArticleSection[]> = {
  ecommerce: ecommerce as ArticleSection[],
  "ramadan-preparation": ramadanPreparation as ArticleSection[],
  "egypt-dessert-market": egyptDessertMarket as ArticleSection[],
};

/** Deduplicate consecutive identical paragraphs from Framer export */
function dedupeParagraphs(paragraphs: string[]): string[] {
  const out: string[] = [];
  for (const p of paragraphs) {
    const trimmed = p.replace(/^;\s*/, "").trim();
    if (!trimmed) continue;
    if (out.length && out[out.length - 1] === trimmed) continue;
    out.push(trimmed);
  }
  return out;
}

export function getArticleSections(slug: string): ArticleSection[] | undefined {
  const raw = ARTICLES[slug];
  if (!raw) return undefined;
  return raw.map((s) => ({
    heading: s.heading,
    paragraphs: dedupeParagraphs(s.paragraphs),
  }));
}
