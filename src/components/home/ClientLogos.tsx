import Image from "next/image";
import { CLIENT_LOGOS } from "@/lib/content/home";
import { clientName } from "@/lib/content/clients";

/**
 * The scrolling logo track on its own, so it can sit inline (beside the Proven
 * Impact stat) as well as inside the standalone "Our Clients" section.
 */
export function ClientLogoMarquee({ compact = false }: { compact?: boolean }) {
  if (!CLIENT_LOGOS.length) return null;

  // Doubled so the loop is seamless once the first copy scrolls out.
  const logos = [...CLIENT_LOGOS, ...CLIENT_LOGOS];
  const size = compact ? 58 : 48;

  return (
    <div
      className={`marquee-wrap marquee-wrap--logos${compact ? " marquee-wrap--inline" : ""} reveal`}
      aria-hidden="true"
    >
      <div className="marquee marquee--logos">
        {logos.map((src, i) => {
          const name = clientName(src);
          return (
            <span className="marquee__logo" key={`${src}-${i}`} title={name || undefined}>
              <Image
                src={src}
                alt={name}
                width={120}
                height={48}
                style={{ height: size, width: "auto", maxWidth: 120, objectFit: "contain" }}
              />
              {compact || !name ? null : <span className="marquee__logo-name">{name}</span>}
            </span>
          );
        })}
      </div>
    </div>
  );
}

export function ClientLogos() {
  if (!CLIENT_LOGOS.length) return null;

  return (
    <section className="section" id="our-clients" style={{ paddingTop: 0 }}>
      <div className="container">
        <h2 className="section-heading section-heading--center reveal" style={{ fontSize: "clamp(1.5rem,4vw,2.5rem)", marginBottom: "2rem" }}>
          Our <span className="text-gold">Clients</span>
        </h2>
      </div>
      <ClientLogoMarquee />
    </section>
  );
}
