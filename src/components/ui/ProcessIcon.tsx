export type ProcessIconName =
  | "kickoff"
  | "research"
  | "data"
  | "planning"
  | "launch"
  | "optimization"
  | "growth";

/**
 * Line-art icons for the Impact Process row. White strokes carry the structure,
 * gold strokes the accent detail — matching the brand's two-tone icon style.
 */
export function ProcessIcon({ name }: { name: ProcessIconName }) {
  const base = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  const gold = { ...base, stroke: "var(--gold)" };

  switch (name) {
    case "kickoff":
      return (
        <svg viewBox="0 0 64 64" aria-hidden="true">
          {/* launch tower */}
          <path {...base} d="M10 54V12m0 0h8M10 22h8M10 32h8M10 42h8" />
          {/* rocket */}
          <path {...base} d="M38 12c6 6 9 14 9 22v12H29V34c0-8 3-16 9-22z" />
          <circle {...gold} cx="38" cy="30" r="4" />
          <path {...base} d="M29 40l-6 6v6h6M47 40l6 6v6h-6" />
          <path {...gold} d="M34 52v5M42 52v5M38 52v8" />
          <path {...base} d="M6 58h52" />
        </svg>
      );
    case "research":
      return (
        <svg viewBox="0 0 64 64" aria-hidden="true">
          <rect {...base} x="12" y="8" width="34" height="46" rx="3" />
          <path {...gold} d="M19 18h12M19 26h8M19 34h10M19 42h6" />
          <circle {...base} cx="41" cy="36" r="11" />
          <path {...base} d="M49 44l7 7" />
        </svg>
      );
    case "data":
      return (
        <svg viewBox="0 0 64 64" aria-hidden="true">
          {/* source documents */}
          <rect {...base} x="8" y="8" width="12" height="15" rx="2" />
          <rect {...base} x="26" y="6" width="12" height="17" rx="2" />
          <rect {...base} x="44" y="8" width="12" height="15" rx="2" />
          {/* flow arrows */}
          <path {...gold} d="M14 27v6m0 0l-3-3m3 3l3-3M32 27v6m0 0l-3-3m3 3l3-3M50 27v6m0 0l-3-3m3 3l3-3" />
          {/* stacked store */}
          <rect {...base} x="10" y="38" width="44" height="9" rx="2" />
          <rect {...base} x="10" y="49" width="44" height="9" rx="2" />
          <path {...gold} d="M16 42.5h4M16 53.5h4" />
        </svg>
      );
    case "planning":
      return (
        <svg viewBox="0 0 64 64" aria-hidden="true">
          <rect {...base} x="8" y="12" width="48" height="44" rx="3" />
          <path {...base} d="M8 24h48" />
          <path {...base} d="M18 8v8M32 8v8M46 8v8" />
          {/* gantt bars */}
          <path {...gold} d="M16 32h16M24 40h20M16 48h12" strokeWidth={5} />
        </svg>
      );
    case "launch":
      return (
        <svg viewBox="0 0 64 64" aria-hidden="true">
          {/* laptop */}
          <path {...base} d="M14 46V30a3 3 0 013-3h30a3 3 0 013 3v16" />
          <path {...base} d="M8 46h48l-4 6H12z" />
          {/* rocket rising */}
          <path {...gold} d="M32 6c4 4 6 9 6 14 0 4-2 7-6 10-4-3-6-6-6-10 0-5 2-10 6-14z" />
          <path {...gold} d="M26 20l-4 4M38 20l4 4" />
        </svg>
      );
    case "optimization":
      return (
        <svg viewBox="0 0 64 64" aria-hidden="true">
          <rect {...base} x="8" y="12" width="48" height="40" rx="3" />
          <path {...base} d="M8 22h48" />
          <circle {...base} cx="15" cy="17" r="1.5" />
          <circle {...base} cx="21" cy="17" r="1.5" />
          <circle {...base} cx="27" cy="17" r="1.5" />
          {/* gear */}
          <circle {...gold} cx="32" cy="37" r="6" />
          <path
            {...gold}
            d="M32 25v4M32 45v4M20 37h4M40 37h4M24 29l3 3M37 42l3 3M40 29l-3 3M27 42l-3 3"
          />
        </svg>
      );
    case "growth":
      return (
        <svg viewBox="0 0 64 64" aria-hidden="true">
          <rect {...base} x="6" y="16" width="42" height="26" rx="3" />
          <path {...base} d="M13 22h3M38 36h3" />
          <path {...gold} d="M27 24v10M24 26.5h6M24 31.5h6" />
          <circle {...gold} cx="47" cy="42" r="11" />
          <path {...gold} d="M47 48V36m0 0l-4 4m4-4l4 4" />
        </svg>
      );
  }
}
