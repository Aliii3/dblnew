export type JobIconName =
  | "design"
  | "social"
  | "video"
  | "marketing"
  | "code"
  | "finance"
  | "camera";

type JobIconProps = {
  name: JobIconName;
  className?: string;
};

/** Line icons for the careers list, matching ServiceIcon's 24px/1.75 stroke set. */
export function JobIcon({ name, className }: JobIconProps) {
  const props = {
    className,
    width: 28,
    height: 28,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.75,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  switch (name) {
    case "design":
      return (
        <svg {...props}>
          <path d="M12 19l7-7 3 3-7 7-3-3z" />
          <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
          <path d="M2 2l7.586 7.586" />
          <circle cx="11" cy="11" r="2" />
        </svg>
      );
    case "social":
      return (
        <svg {...props}>
          <circle cx="6" cy="12" r="2.5" />
          <circle cx="18" cy="6" r="2.5" />
          <circle cx="18" cy="18" r="2.5" />
          <path d="M8.2 10.8l7.6-3.6M8.2 13.2l7.6 3.6" />
        </svg>
      );
    case "video":
      return (
        <svg {...props}>
          <rect x="2.5" y="6" width="13" height="12" rx="2" />
          <path d="M15.5 10l6-3.5v11L15.5 14" />
        </svg>
      );
    case "marketing":
      return (
        <svg {...props}>
          <path d="M4 19V5" />
          <path d="M4 19h16" />
          <path d="M8 15v-3M12 15V8M16 15v-5" />
          <path d="M15 5h4v4" />
          <path d="M19 5l-6.5 6.5-3-3L4 14" />
        </svg>
      );
    case "code":
      return (
        <svg {...props}>
          <path d="M9 8l-5 4 5 4" />
          <path d="M15 8l5 4-5 4" />
        </svg>
      );
    case "finance":
      return (
        <svg {...props}>
          <rect x="3" y="4" width="18" height="16" rx="2" />
          <path d="M3 9h18" />
          <path d="M7 14h4M7 17h7" />
          <circle cx="17" cy="14.5" r="1.5" />
        </svg>
      );
    case "camera":
      return (
        <svg {...props}>
          <path d="M4 8h3l1.5-2h7L17 8h3a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z" />
          <circle cx="12" cy="13" r="3.5" />
        </svg>
      );
    default:
      return null;
  }
}
