type ServiceIconName = "amazon" | "cart" | "chart" | "web" | "research" | "brand";

type ServiceIconProps = {
  name: ServiceIconName;
  className?: string;
};

export function ServiceIcon({ name, className }: ServiceIconProps) {
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
    case "amazon":
      return (
        <svg {...props}>
          <path d="M4 7h16M6 7V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2" />
          <path d="M4 7l1.5 11h13L20 7" />
          <path d="M10 11v4M14 11v4" />
        </svg>
      );
    case "cart":
      return (
        <svg {...props}>
          <circle cx="9" cy="20" r="1.5" />
          <circle cx="18" cy="20" r="1.5" />
          <path d="M2 3h2l2.4 12.4a1 1 0 0 0 1 .8h9.8a1 1 0 0 0 1-.8L21 7H6" />
        </svg>
      );
    case "chart":
      return (
        <svg {...props}>
          <path d="M4 19V5" />
          <path d="M4 19h16" />
          <path d="M8 15v-3M12 15V8M16 15v-5" />
        </svg>
      );
    case "web":
      return (
        <svg {...props}>
          <rect x="3" y="4" width="18" height="16" rx="2" />
          <path d="M3 9h18M8 4v16" />
        </svg>
      );
    case "research":
      return (
        <svg {...props}>
          <circle cx="11" cy="11" r="6" />
          <path d="M16 16l4 4" />
          <path d="M8 11h6M11 8v6" />
        </svg>
      );
    case "brand":
      return (
        <svg {...props}>
          <path d="M12 2l2.4 5.4 5.9.5-4.5 3.9 1.4 5.8L12 20l-5.6 3.1 1.4-5.8-4.5-3.9 5.9-.5z" transform="scale(0.85) translate(2 1)" />
          <circle cx="12" cy="11" r="2.2" />
        </svg>
      );
    default:
      return null;
  }
}
