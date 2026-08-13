import Image from "next/image";
import Link from "next/link";
import { ContactBadge } from "@/components/ui/ContactBadge";

/** Placeholder lifestyle photo — swap for real DBLSHOT/team photography when available. */
const HERO_MEDIA = "/media/stock/hero-lifestyle-placeholder.jpg";

const TICKER_ITEMS = [
  "Amazon Experts",
  "FMCG Growth",
  "Scaling Brands",
  "Data Driven",
  "Operational Excellence",
  "Performance Marketing",
];

function TickerTrack() {
  return (
    <>
      {[0, 1].map((rep) => (
        <span className="ticker-band__group" key={rep}>
          {TICKER_ITEMS.map((item) => (
            <span className="ticker-band__item" key={item}>
              {item}
              <span className="ticker-band__star" aria-hidden="true">✱</span>
            </span>
          ))}
        </span>
      ))}
    </>
  );
}

export function HomeHero() {
  return (
    <>
      <section className="hero2" id="top-home">
        <div className="hero2__media">
          <Image
            src={HERO_MEDIA}
            alt="DBLSHOT team"
            fill
            priority
            className="hero2__img"
          />
          <div className="hero2__scrim" aria-hidden="true" />
        </div>

        <div className="container hero2__content">
          <span className="hero2__eyebrow reveal">We Are</span>
          <h1 className="hero2__wordmark reveal">
            We Boost{" "}
            <span className="hero__swap hero2__swap" aria-label="Brands, Sales, Growth">
              <span className="hero__swap-word">Brands</span>
              <span className="hero__swap-word" aria-hidden="true">Sales</span>
              <span className="hero__swap-word" aria-hidden="true">Growth</span>
            </span>
          </h1>

          <div className="hero2__actions reveal">
            <Link className="btn btn--primary btn--lg btn--magnetic" href="#service">
              Explore Services <span aria-hidden="true">→</span>
            </Link>
            <Link className="btn btn--white btn--lg btn--magnetic" href="/case-studies">
              View Case Studies <span aria-hidden="true">→</span>
            </Link>
            <Link className="btn btn--primary btn--lg btn--magnetic" href="/contact">
              Let&apos;s Talk <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>

        <ContactBadge className="hero__badge-contact hero2__badge-contact" />
      </section>

      <div className="ticker-cross" aria-hidden="true">
        <div className="ticker-band ticker-band--dark">
          <div className="ticker-band__track">
            <TickerTrack />
          </div>
        </div>
        <div className="ticker-band ticker-band--light">
          <div className="ticker-band__track ticker-band__track--reverse">
            <TickerTrack />
          </div>
        </div>
      </div>
    </>
  );
}
