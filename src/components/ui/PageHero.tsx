import Image from "next/image";
import Link from "next/link";

type PageHeroProps = {
  label: string;
  title: React.ReactNode;
  subtitle?: string;
  logo?: string;
  logoAlt?: string;
  /** Optional call-to-action rendered under the subtitle. */
  ctaLabel?: string;
  ctaHref?: string;
};

export function PageHero({ label, title, subtitle, logo, logoAlt, ctaLabel, ctaHref }: PageHeroProps) {
  return (
    <section className="page-hero">
      <div className="container">
        {logo ? (
          <span className="page-hero__logo reveal">
            <Image src={logo} alt={logoAlt ?? ""} width={160} height={64} style={{ height: 48, width: "auto", maxWidth: 160, objectFit: "contain" }} />
          </span>
        ) : null}
        <span className="section-label reveal">{label}</span>
        <h1 className="page-hero__title">
          <span className="reveal-line">
            <span>{title}</span>
          </span>
        </h1>
        {subtitle ? <p className="page-hero__sub reveal">{subtitle}</p> : null}
        {ctaLabel && ctaHref ? (
          <Link className="btn btn--primary btn--magnetic page-hero__cta reveal" href={ctaHref}>
            {ctaLabel}
          </Link>
        ) : null}
      </div>
    </section>
  );
}
