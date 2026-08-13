import Image from "next/image";
import Link from "next/link";

type PhotoHeroAction = {
  label: string;
  href: string;
  variant?: "primary" | "white";
};

type PhotoHeroProps = {
  image: string;
  imageAlt?: string;
  objectPosition?: string;
  /** CSS transform scale — use to crop tighter and hide busy edges of a source photo. */
  zoom?: number;
  eyebrow: string;
  title: React.ReactNode;
  actions?: PhotoHeroAction[];
  id?: string;
};

/** Full-bleed photo hero with overlaid serif headline — the inner-page counterpart to HomeHero. */
export function PhotoHero({ image, imageAlt = "", objectPosition, zoom, eyebrow, title, actions, id }: PhotoHeroProps) {
  return (
    <section className="hero2 hero2--compact" id={id}>
      <div className="hero2__media">
        <Image
          src={image}
          alt={imageAlt}
          fill
          priority
          className="hero2__img"
          style={{
            ...(objectPosition ? { objectPosition } : {}),
            ...(zoom ? { transform: `scale(${zoom})` } : {}),
          }}
        />
        <div className="hero2__scrim" aria-hidden="true" />
      </div>

      <div className="container hero2__content">
        <span className="hero2__eyebrow reveal">{eyebrow}</span>
        <h1 className="hero2__wordmark hero2__wordmark--sm reveal">{title}</h1>

        {actions && actions.length > 0 ? (
          <div className="hero2__actions reveal">
            {actions.map((a) => (
              <Link
                key={a.href}
                className={`btn btn--${a.variant === "white" ? "white" : "primary"} btn--lg btn--magnetic`}
                href={a.href}
              >
                {a.label} <span aria-hidden="true">→</span>
              </Link>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
