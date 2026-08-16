import { SITE } from "@/lib/site";

/** A single answerable intent: keywords → a short answer + optional direct links. */
export type ChatIntent = {
  id: string;
  /** Lowercase keywords/phrases; any match (word-boundary) selects this intent. */
  keywords: string[];
  answer: string;
  links?: { label: string; href: string }[];
};

/** Ordered by priority — the first intent with a keyword hit wins. */
export const CHAT_INTENTS: ChatIntent[] = [
  {
    id: "contact",
    keywords: [
      "contact", "reach", "talk", "get in touch", "email", "phone", "call",
      "book", "meeting", "appointment", "quote", "start", "hire", "work with",
      "get started", "consultation",
    ],
    answer: "Let's talk. Book a meeting or send us your brief and the team will get back to you.",
    links: [
      { label: "Contact / Book a Meeting", href: "/contact" },
      { label: `Email ${SITE.email}`, href: `mailto:${SITE.email}` },
    ],
  },
  {
    id: "amazon",
    keywords: [
      "amazon", "ppc", "sponsored", "listing", "a+ content", "brand store",
      "buy box", "acos", "roas amazon", "marketplace amazon",
    ],
    answer:
      "We manage Amazon end-to-end — catalogue and listing optimization, A+ content, Brand Stores, and full-funnel Sponsored Products/Brands/Display advertising across Egypt, KSA & UAE.",
    links: [{ label: "Amazon Growth", href: "/services/amazon-growth" }],
  },
  {
    id: "ecommerce",
    keywords: [
      "ecommerce", "e-commerce", "noon", "talabat", "breadfast", "goodsmart",
      "marketplace", "catalogue", "catalog", "quick commerce", "online store",
      "full management",
    ],
    answer:
      "We run full e-commerce management across Amazon, Noon, Talabat Mart, HungerStation, Breadfast and more — listings, ads, promotions, brand stores, and live reporting.",
    links: [{ label: "Commerce", href: "/services/commerce" }],
  },
  {
    id: "social",
    keywords: [
      "social", "instagram", "tiktok", "facebook", "content", "community",
      "reels", "posts", "paid social", "social media",
    ],
    answer:
      "We manage social media as a growth function — strategy, quarterly content, paid social, and community management across Instagram, Facebook, TikTok, LinkedIn, and X.",
    links: [{ label: "Performance", href: "/services/performance" }],
  },
  {
    id: "website",
    keywords: [
      "website", "web", "site", "wordpress", "framer", "landing page", "cro",
      "development", "ux", "ui", "conversion",
    ],
    answer:
      "We build conversion-focused websites — e-commerce and lead-gen builds on WordPress, Framer, and native platforms, with CRO baked in.",
    links: [{ label: "Technology", href: "/services/technology" }],
  },
  {
    id: "branding",
    keywords: [
      "brand", "branding", "logo", "identity", "naming", "packaging", "guidelines",
      "rebrand", "visual identity", "csi",
    ],
    answer:
      "We build complete brand identities — strategy, naming, logo, visual systems, corporate identity, and full guidelines. Bilingual Arabic/English.",
    links: [
      { label: "Branding", href: "/services/branding" },
      { label: "Wingo case study", href: "/case-studies/wingo" },
      { label: "Zeina case study", href: "/case-studies/zeina" },
    ],
  },
  {
    id: "market-research",
    keywords: ["research", "market research", "competitor", "insights", "strategy", "market entry"],
    answer:
      "We run data-driven market research and competitor analysis to inform positioning, pricing, and channel strategy before you launch.",
    links: [{ label: "Strategy", href: "/services/strategy" }],
  },
  {
    id: "results",
    keywords: [
      "result", "results", "case study", "case studies", "proof", "portfolio",
      "success", "growth story", "examples", "clients", "isis", "spritz", "raw",
      "rehana", "cimento", "wingo", "zeina",
    ],
    answer:
      "See the numbers — 2,740% Amazon growth for ISIS Organic, 410% for Spritz, 370% for RAW, and more across our case studies.",
    links: [{ label: "All Case Studies", href: "/case-studies" }],
  },
  {
    id: "services",
    keywords: ["service", "services", "what do you do", "offer", "help with", "capabilities"],
    answer:
      "We cover Strategy, Creative, Performance, Commerce, Amazon Growth, and Technology — all built for FMCG growth.",
    links: [{ label: "All Services", href: "/services" }],
  },
  {
    id: "junior-marketer",
    keywords: ["junior", "marketer program", "internship", "training", "apply", "career", "careers", "job", "jobs", "hiring", "vacancy"],
    answer:
      "The Junior Marketer program trains the next generation of Egyptian marketers, mentored by our CEO Radwa Fathi. Careers and openings are on our Careers page.",
    links: [
      { label: "Junior Marketer Program", href: "/junior-marketer" },
      { label: "Careers", href: "/careers" },
    ],
  },
  {
    id: "about",
    keywords: ["about", "who are you", "who is", "radwa", "founder", "ceo", "story", "company", "team", "experience", "years"],
    answer:
      "DBLSHOT is a performance-marketing and e-commerce agency for FMCG brands across Egypt and the GCC — led by CEO Radwa Fathi, with 18+ years of experience and 100M+ in sales managed.",
    links: [{ label: "About Us", href: "/about" }],
  },
  {
    id: "blog",
    keywords: ["blog", "blogs", "article", "articles", "insights", "read", "learn"],
    answer: "Insights, guides, and case studies for FMCG brands scaling in Egypt and the GCC.",
    links: [{ label: "Blogs", href: "/blogs" }],
  },
  {
    id: "pricing",
    keywords: ["price", "pricing", "cost", "how much", "budget", "fees", "packages", "rates"],
    answer:
      "Pricing depends on scope and platforms — the fastest way to a real number is a quick call. Tell us your brand and goals and we'll scope it.",
    links: [{ label: "Book a Meeting", href: "/contact" }],
  },
];

export type IntentResult = {
  answer: string;
  links: { label: string; href: string }[];
  matched: boolean;
  /** Other relevant topics, so a broad query can surface more than one destination. */
  related: { label: string; href: string }[];
};

export type IntentSuggestion = { id: string; title: string; href: string };

const NO_MATCH: Omit<IntentResult, "matched" | "related"> = {
  answer:
    "I didn't quite catch that. Try one of the topics below, or reach the team directly and we'll help right away.",
  links: [
    { label: "All Services", href: "/services" },
    { label: "Contact Us", href: "/contact" },
  ],
};

/** Tokenize a query into meaningful lowercase words. */
function tokenize(query: string): string[] {
  return query
    .toLowerCase()
    .replace(/[^a-z0-9+\s]/g, " ")
    .split(/\s+/)
    .filter((t) => t.length >= 2);
}

/** Score an intent against query tokens — exact > prefix > substring, so partials/typos still hit. */
function scoreIntent(intent: ChatIntent, tokens: string[]): number {
  let score = 0;
  for (const kw of intent.keywords) {
    const multi = kw.includes(" ");
    for (const t of tokens) {
      if (kw === t) score += multi ? 4 : 3;
      else if (kw.startsWith(t) || t.startsWith(kw)) score += 2;
      else if (kw.includes(t) || t.includes(kw)) score += 1;
    }
    // whole multi-word phrase present in the raw query
    if (multi && tokens.join(" ").includes(kw)) score += 3;
  }
  return score;
}

function rank(query: string): { intent: ChatIntent; score: number }[] {
  const tokens = tokenize(query);
  if (!tokens.length) return [];
  return CHAT_INTENTS.map((intent) => ({ intent, score: scoreIntent(intent, tokens) }))
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score);
}

/** Match a free-text query to the best intent, with a couple of related topics. */
export function matchIntent(query: string): IntentResult {
  const ranked = rank(query);
  if (!ranked.length) return { ...NO_MATCH, matched: false, related: [] };

  const best = ranked[0].intent;
  const related = ranked
    .slice(1, 3)
    .map((r) => r.intent.links?.[0])
    .filter((l): l is { label: string; href: string } => Boolean(l));

  return { answer: best.answer, links: best.links ?? [], matched: true, related };
}

/** Live search-as-you-type — ranked, de-duplicated destinations for the query. */
export function searchIntents(query: string, limit = 5): IntentSuggestion[] {
  const seen = new Set<string>();
  const out: IntentSuggestion[] = [];
  for (const r of rank(query)) {
    const link = r.intent.links?.[0];
    const href = link?.href ?? "/";
    if (seen.has(href)) continue;
    seen.add(href);
    out.push({ id: r.intent.id, title: link?.label ?? r.intent.id, href });
    if (out.length >= limit) break;
  }
  return out;
}
