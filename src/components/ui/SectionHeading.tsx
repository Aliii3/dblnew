type SectionHeadingProps = {
  children: React.ReactNode;
  center?: boolean;
  narrow?: boolean;
  className?: string;
};

export function SectionHeading({ children, center, narrow, className = "" }: SectionHeadingProps) {
  const classes = [
    "section-heading",
    "reveal-mask",
    center ? "section-heading--center" : "",
    narrow ? "section-heading--narrow" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <h2 className={classes}>
      <span className="reveal-mask__inner">{children}</span>
    </h2>
  );
}
