import Link from "next/link";

type PageCTAProps = {
  title: string;
  description?: string;
  buttonLabel?: string;
  buttonHref?: string;
  /** Dims the button — for states that aren't a live call to action yet. */
  buttonMuted?: boolean;
};

export function PageCTA({
  title,
  description = "Ready to scale your brand with DBLSHOT?",
  buttonLabel = "Let's Talk",
  buttonHref = "/contact",
  buttonMuted = false,
}: PageCTAProps) {
  const btnClass = buttonMuted ? "btn btn--soft" : "btn btn--primary";
  return (
    <section className="page-cta">
      <div className="container">
        <div className="page-cta__inner reveal">
          <div>
            <h3>{title}</h3>
            {description ? <p>{description}</p> : null}
          </div>
          {/^(mailto:|tel:|https?:)/.test(buttonHref) ? (
            <a className={btnClass} href={buttonHref}>
              {buttonLabel}
            </a>
          ) : (
            <Link
              className={buttonMuted ? btnClass : `${btnClass} btn--magnetic`}
              href={buttonHref}
            >
              {buttonLabel}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
