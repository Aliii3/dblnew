import type { TeamMotifName } from "@/lib/content/home";

type TeamMotifProps = {
  name: TeamMotifName;
};

export function TeamMotif({ name }: TeamMotifProps) {
  const props = {
    className: "team-card__motif",
    width: 140,
    height: 140,
    viewBox: "0 0 140 140",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 3,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  switch (name) {
    case "leadership":
      return (
        <svg {...props}>
          <circle cx="70" cy="70" r="44" />
          <circle cx="70" cy="70" r="9" />
          <path d="M70 22v20M70 98v20M22 70h20M98 70h20" />
          <path d="M86 34l-9 27 27-9-18-18Z" />
          <path d="M48 103l13-13M37 52l15 15" />
        </svg>
      );
    case "performance":
      return (
        <svg {...props}>
          <circle cx="72" cy="72" r="46" />
          <circle cx="72" cy="72" r="27" />
          <circle cx="72" cy="72" r="8" />
          <path d="M88 52l28-28M106 24h10v10" />
          <path d="M34 108h72" />
        </svg>
      );
    case "design":
      return (
        <svg {...props}>
          <path d="M28 26h84v84H28z" />
          <path d="M28 54h84M28 82h84M56 26v84M84 26v84" opacity=".75" />
          <path d="M42 100l31-31 17 17-31 31-23 6 6-23Z" />
          <path d="M78 64l18-18 17 17-18 18" />
        </svg>
      );
    case "analytics":
      return (
        <svg {...props}>
          <path d="M26 112h88" />
          <path d="M38 96V68M62 96V48M86 96V60M110 96V32" />
          <path d="M34 48l26-18 24 14 30-28" />
          <circle cx="60" cy="30" r="5" />
          <circle cx="84" cy="44" r="5" />
          <circle cx="114" cy="16" r="5" />
        </svg>
      );
    case "video":
      return (
        <svg {...props}>
          <rect x="26" y="38" width="88" height="64" rx="10" />
          <path d="M64 57l28 18-28 18V57Z" />
          <path d="M40 26l12 12M72 22l4 16M108 30L94 42" />
        </svg>
      );
    case "social":
      return (
        <svg {...props}>
          <circle cx="48" cy="54" r="15" />
          <circle cx="94" cy="44" r="11" />
          <circle cx="86" cy="98" r="18" />
          <path d="M61 50l22-5M56 64l20 24" />
          <path d="M34 108c9-16 22-25 38-25" />
          <path d="M106 78c-4-11-12-18-25-23" />
        </svg>
      );
    case "developer":
      return (
        <svg {...props}>
          <rect x="24" y="34" width="92" height="72" rx="10" />
          <path d="M48 62L34 76l14 14M92 62l14 14-14 14M78 54L62 98" />
          <path d="M24 52h92" />
          <circle cx="38" cy="43" r="2.5" />
          <circle cx="50" cy="43" r="2.5" />
        </svg>
      );
    case "finance":
      return (
        <svg {...props}>
          <rect x="34" y="24" width="72" height="92" rx="9" />
          <path d="M48 44h44M48 62h12M70 62h12M92 62h1M48 80h12M70 80h12M92 80h1M48 98h12M70 98h24" />
          <path d="M26 112h88" />
        </svg>
      );
    default:
      return null;
  }
}
