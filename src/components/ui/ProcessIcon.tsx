export type ProcessIconName =
  | "kickoff"
  | "research"
  | "data"
  | "planning"
  | "launch"
  | "optimization"
  | "growth";

/**
 * Line-art icons for the Impact Process row, drawn to match the brand icon set.
 * `base` strokes carry the structure in the tile's own ink; `accent` strokes are
 * the highlight detail. The tiles are gold, so the accent is white rather than
 * gold — gold-on-gold would vanish.
 */
export function ProcessIcon({ name }: { name: ProcessIconName }) {
  const base = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  const accent = { ...base, stroke: "#fff" };

  switch (name) {
    case "kickoff":
      return (
        <svg viewBox="0 0 64 64" aria-hidden="true">
          {/* launch gantry */}
          <path {...base} d="M12 56V10" />
          <path {...base} d="M12 16h9M12 26h7M12 36h7M12 46h9" />
          {/* rocket body */}
          <path {...base} d="M36 14c5 6 7.5 13 7.5 20v12h-15V34c0-7 2.5-14 7.5-20z" />
          <circle {...accent} cx="36" cy="31" r="4" />
          {/* fins */}
          <path {...base} d="M28.5 40l-6 6v6h6M43.5 40l6 6v6h-6" />
          {/* exhaust */}
          <path {...accent} d="M32 50v6M36 50v8M40 50v6" />
          {/* ground */}
          <path {...base} d="M6 58h52" />
        </svg>
      );
    case "research":
      return (
        <svg viewBox="0 0 64 64" aria-hidden="true">
          {/* document */}
          <path {...base} d="M10 8h26l8 8v18" />
          <path {...base} d="M10 8v46h12" />
          <path {...base} d="M36 8v8h8" />
          {/* text lines */}
          <path {...accent} d="M17 22h14M17 29h10M17 36h8" />
          {/* magnifier */}
          <circle {...base} cx="38" cy="38" r="12" />
          <path {...accent} d="M33 38h10M38 33v10" />
          <path {...base} d="M47 47l7 7" />
        </svg>
      );
    case "data":
      return (
        <svg viewBox="0 0 64 64" aria-hidden="true">
          {/* source documents */}
          <rect {...base} x="7" y="6" width="13" height="16" rx="2" />
          <rect {...base} x="25.5" y="6" width="13" height="16" rx="2" />
          <rect {...base} x="44" y="6" width="13" height="16" rx="2" />
          <path {...accent} d="M11 11h5M11 15h5M29.5 11h5M29.5 15h5M48 11h5M48 15h5" />
          {/* flow arrows */}
          <path {...base} d="M13.5 26v6m0 0l-3-3m3 3l3-3M32 26v6m0 0l-3-3m3 3l3-3M50.5 26v6m0 0l-3-3m3 3l3-3" />
          {/* stacked store */}
          <rect {...base} x="10" y="37" width="44" height="9" rx="2" />
          <rect {...base} x="10" y="49" width="44" height="9" rx="2" />
          <circle {...accent} cx="17" cy="41.5" r="1.6" />
          <circle {...accent} cx="17" cy="53.5" r="1.6" />
          <path {...accent} d="M24 41.5h22M24 53.5h22" />
        </svg>
      );
    case "planning":
      return (
        <svg viewBox="0 0 64 64" aria-hidden="true">
          {/* board */}
          <rect {...base} x="8" y="12" width="48" height="44" rx="3" />
          <path {...base} d="M8 24h48" />
          {/* hangers */}
          <circle {...base} cx="19" cy="12" r="3" />
          <circle {...base} cx="32" cy="12" r="3" />
          <circle {...base} cx="45" cy="12" r="3" />
          {/* gantt columns */}
          <path {...base} d="M32 28v24" />
          <path {...accent} d="M16 32h10M16 40h8M16 48h11" strokeWidth={4} />
          <path {...accent} d="M38 36h10M38 44h8" strokeWidth={4} />
        </svg>
      );
    case "launch":
      return (
        <svg viewBox="0 0 64 64" aria-hidden="true">
          {/* laptop */}
          <path {...base} d="M14 46V32a3 3 0 013-3h30a3 3 0 013 3v14" />
          <path {...base} d="M8 46h48l-4 6H12z" />
          {/* rocket rising out of the screen */}
          <path {...base} d="M32 6c4.5 4.5 6.5 9.5 6.5 14.5 0 4-2 7.5-6.5 10.5-4.5-3-6.5-6.5-6.5-10.5C25.5 15.5 27.5 10.5 32 6z" />
          <circle {...accent} cx="32" cy="18" r="3" />
          <path {...base} d="M25.5 22l-4.5 4.5M38.5 22l4.5 4.5" />
          <path {...accent} d="M29 34v4M35 34v4M32 34v6" />
        </svg>
      );
    case "optimization":
      return (
        <svg viewBox="0 0 64 64" aria-hidden="true">
          {/* browser window */}
          <rect {...base} x="8" y="12" width="48" height="40" rx="3" />
          <path {...base} d="M8 22h48" />
          <circle {...accent} cx="15" cy="17" r="1.6" />
          <circle {...accent} cx="21" cy="17" r="1.6" />
          <circle {...accent} cx="27" cy="17" r="1.6" />
          {/* gear */}
          <circle {...base} cx="32" cy="37" r="6" />
          <circle {...accent} cx="32" cy="37" r="2" />
          <path
            {...base}
            d="M32 26v4M32 44v4M21 37h4M39 37h4M24.5 29.5l3 3M36.5 41.5l3 3M39.5 29.5l-3 3M27.5 41.5l-3 3"
          />
        </svg>
      );
    case "growth":
      return (
        <svg viewBox="0 0 64 64" aria-hidden="true">
          {/* banknote */}
          <rect {...base} x="6" y="14" width="44" height="26" rx="3" />
          <circle {...base} cx="28" cy="27" r="6" />
          <path {...accent} d="M28 22v10M25.5 24.5h5M25.5 29.5h5" />
          <path {...accent} d="M12 20h3M41 34h3" />
          {/* rising indicator */}
          <circle {...base} cx="47" cy="45" r="11" />
          <path {...base} d="M47 51V39m0 0l-4.5 4.5M47 39l4.5 4.5" />
        </svg>
      );
  }
}
