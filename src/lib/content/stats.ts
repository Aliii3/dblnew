export type Stat = {
  value: number;
  suffix: string;
  label: string;
  featured?: boolean;
  prefix?: string;
};

/** Proven Impact — featured homepage stat */
export const PROVEN_STATS: Stat[] = [
  { value: 80, suffix: "+", label: "Satisfied Clients", featured: true },
];

/** Deep Impact — "The Numbers That Define Us" (official 2026 content) */
export const DEEP_IMPACT_STATS: Stat[] = [
  { value: 100, suffix: "M+", label: "In Total Sales Managed" },
  { value: 7, suffix: "+", label: "Platforms Operated On" },
  { value: 18, suffix: "+", label: "Years of Experience" },
  { value: 100, suffix: "+", label: "Campaigns Launched" },
];

/** @deprecated use PROVEN_STATS / DEEP_IMPACT_STATS */
export const STATS = [...PROVEN_STATS, ...DEEP_IMPACT_STATS];
