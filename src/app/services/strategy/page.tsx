import { Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import { SiteProvider } from "@/components/layout/SiteProvider";
import { PageHero } from "@/components/ui/PageHero";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import { createPageMetadata } from "@/lib/seo";

type ServiceIconName = "amazon" | "cart" | "chart" | "web" | "research";

export const metadata = createPageMetadata({
  title: "Strategy & Consultancy",
  description:
    "13+ years of market research and brand consultancy — from FMCG launches to rebrands across Egypt, the GCC, and Africa.",
  path: "/services/strategy",
});

const SERVICES: { title: string; desc: string; icon: ServiceIconName }[] = [
  { title: "Amazon Product Listings & Ads", desc: "We ensure your products stand out, increase visibility, and drive sales.", icon: "amazon" },
  { title: "Marketing Strategies", desc: "We develop comprehensive strategies tailored to your brand's unique needs.", icon: "chart" },
  { title: "Content Creation", desc: "We create high-quality content that resonates with your target audience.", icon: "research" },
  { title: "Website Development & Optimization", desc: "We design, develop, and optimize websites for seamless experiences and higher conversions.", icon: "web" },
  { title: "Social Media Management", desc: "We manage your social media presence to engage and grow your audience.", icon: "cart" },
];

const STEPS = [
  "KickOff",
  "Pre-Requisite Research",
  "Data Gathering",
  "Planning & Strategy",
  "Launch & Monitoring",
  "Optimization & Insights",
  "Doubling the Growth",
];

/** Brand logos for the consultancy list. Add a file to /public/media/clients/
 *  and map it here — brands without a logo fall back to a lettered badge. */
const PROJECT_LOGOS: Record<string, string> = {
  "AlCazar Furniture": "/media/clients/alcazar-furniture.png",
  "INDE": "/media/clients/inde.png",
  "Beta Egypt Real Estate": "/media/clients/Yxp3JNTlEq3Q0EJ9foE0QNlnY.png",
  "SEKEM Premium": "/media/clients/IEzNPAmU7hScrRAWBnLGcUCw7g.png",
  "Mohamed Ramadan": "/media/clients/mohamed-ramadan.png",
  "Halwa & Tahini": "/media/clients/E46KWmdgoYtOJu56riHrVue3xo.png",
  "Lucid Training Center": "/media/clients/lucid-training.png",
  "iSiS × SEKEM": "/media/clients/WQakjqWJVTi6703foxvfgAj0Oc.png",
  "Grip Socks": "/media/clients/grip-socks.png",
  "Turkish Coffee Brand": "/media/clients/OxNEFwVLqzVekRKf0ZzULVeVRM.png",
};

const PROJECTS: { sector: string; client: string; year: string; desc: string }[] = [
  {
    sector: "Furniture",
    client: "AlCazar Furniture",
    year: "2012",
    desc: "Built AlCazar's brand identity and awareness with a retail-focused strategy to introduce their high-quality, contemporary furniture — now thriving in 2025.",
  },
  {
    sector: "Industrial Engineering",
    client: "INDE",
    year: "2013",
    desc: "Crafted a comprehensive three-year marketing strategy to introduce INDE's innovative tricycle product line to the Egyptian market.",
  },
  {
    sector: "Real Estate",
    client: "Beta Egypt Real Estate",
    year: "2014",
    desc: "Led the rebranding and refresh of Beta Egypt's corporate image, aligning visuals and messaging with its core values to stand out in a competitive market.",
  },
  {
    sector: "FMCG",
    client: "SEKEM Premium",
    year: "2018",
    desc: "Consulted on the relaunch of SEKEM Premium with a strategy to expand into European and GCC markets, elevating its Demeter-certified premium positioning.",
  },
  {
    sector: "Personal Branding",
    client: "Mohamed Ramadan",
    year: "2021",
    desc: "Led personal branding for one of Egypt's top celebrities — enhancing his public image, launching his official website, and developing a game reflecting his persona.",
  },
  {
    sector: "FMCG",
    client: "Halwa & Tahini",
    year: "2023",
    desc: "Launched Halwa & Tahini in the Egyptian market, reaching 30% awareness and a 3% Halwa market share through a targeted communication plan.",
  },
  {
    sector: "Cement",
    client: "Mozambique Launch",
    year: "2024",
    desc: "Developed the marketing and brand strategy to launch a cement product in Mozambique — positioned as a reliable, durable, cost-effective choice for construction.",
  },
  {
    sector: "Education",
    client: "Lucid Training Center",
    year: "2024",
    desc: "Rebranded Lucid Training Center to align with its audience, emphasizing credibility, expertise, and the tangible value of its certification programs.",
  },
  {
    sector: "FMCG",
    client: "iSiS × SEKEM",
    year: "2024",
    desc: "Consulted on the iSiS marketing plan around SEKEM's rich farm experience — building a distinctive identity through organic farming, sustainability, and storytelling.",
  },
  {
    sector: "Fashion",
    client: "Grip Socks",
    year: "2025",
    desc: "Consulted on the Egypt launch of Grip Socks, an innovative performance product for athletes and fitness enthusiasts.",
  },
  {
    sector: "Beverage",
    client: "Turkish Coffee Brand",
    year: "2025",
    desc: "Consulted on the launch of a new Turkish coffee brand in Egypt, crafted for those who appreciate a memorable, high-quality taste.",
  },
];

/** Two flagship consultancy engagements, shown as media pillars above the full project grid. */
const FEATURED_BRANDS: {
  image: string;
  imageAlt: string;
  kicker: string;
  title: string;
  body: string;
}[] = [
  {
    image: "/media/services/strategy-pillar-zeina.png",
    imageAlt:
      "Zeina brand campaign assets fanned from a branded folder — a spice-jar lifestyle shoot, a mobile ordering screen across grocery delivery apps, and an in-store retail display.",
    kicker: "FMCG · Spices & Seasoning · Brand Refresh · Retail & E-Commerce",
    title: "Zeina — A Heritage Spice Brand, Rebuilt for Every Shelf",
    body: "We led Zeina's brand refresh and go-to-market rollout, pairing a lifestyle-led content campaign with distribution across grocery delivery apps and a redesigned in-store retail presence — carrying the brand's heritage into a modern, multi-channel shopping experience.",
  },
  {
    image: "/media/services/strategy-pillar-wingo.png",
    imageAlt:
      "Wingo brand campaign assets fanned from a branded folder — a summer beach-day starter pack, a protein-led mascot campaign, and breakfast-moment social content.",
    kicker: "QSR & Food · Seasonal Campaigns · Social Content",
    title: "Wingo — Seasonal Strategy That Keeps a Food Brand Top of Mind",
    body: "We built Wingo's always-on content calendar around the moments that matter to its audience — summer beach days, protein-forward positioning, and everyday breakfast routines — turning seasonal shifts into a steady stream of scroll-stopping campaigns.",
  },
];

export default function StrategyPage() {
  return (
    <SiteProvider activeNav="services" innerPage>
      {/* Full-bleed band at the artwork's natural 3.2:1, same as the Amazon Ads page */}
      <section className="ads-banner-section">
        <div className="ads-banner">
          <Image
            className="ads-banner__img"
            src="/media/services/strategy-banner.png"
            alt="Strategy before execution — a consultant reviewing market research dashboards covering target audience, competitive landscape, and brand positioning for Scommacce, Turkava, and other client engagements."
            width={2780}
            height={878}
            priority
            sizes="100vw"
          />
        </div>
      </section>

      <PageHero
        label="Strategy & Consultancy"
        title={
          <>
            Strategy <span className="text-gold">& Consultancy</span>
          </>
        }
        subtitle="Over a decade of brand strategy and market research — launches, rebrands, and go-to-market consultancy across Egypt, the GCC, and Africa."
      />

      {/* Who we are */}
      <section className="section">
        <div className="container content-shell content-prose">
          <span className="section-label reveal">Who We Are</span>
          <p className="reveal" style={{ fontSize: "1.15rem" }}>
            At Dblshot, we believe that exceptional marketing requires commitment, innovation,
            and a heavy dose of creativity. We are a Performance Marketing and Consulting Agency
            that understands the importance of results-driven strategies and the value of a strong
            brand identity.
          </p>
        </div>
      </section>

      {/* How it works */}
      <section className="section">
        <div className="container">
          <span className="section-label reveal">How It Works</span>
          <h2 className="reveal" style={{ fontSize: "clamp(1.6rem,4vw,2.4rem)", margin: "0.5rem 0 2.5rem", color: "#1f3465" }}>
            Our <span className="text-gold">Process</span>
          </h2>
          <div className="cs-steps reveal-stagger">
            {STEPS.map((step, i) => (
              <Fragment key={step}>
                <div className="cs-step">
                  <span className="cs-step__num">{String(i + 1).padStart(2, "0")}</span>
                  <span className="cs-step__title">{step}</span>
                </div>
                {i < STEPS.length - 1 ? (
                  <span className="cs-step__arrow" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none">
                      <path d="M4 12h15M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                ) : null}
              </Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* Consultancy portfolio */}
      <section className="section section--glow">
        <div className="container">
          <span className="section-label reveal">Selected Engagements</span>
          <h2 className="reveal" style={{ fontSize: "clamp(1.6rem,4vw,2.4rem)", margin: "0.5rem 0 1rem", color: "#1f3465" }}>
            Brands we&apos;ve <span className="text-gold">researched & launched</span>
          </h2>
          <p className="reveal content-prose" style={{ maxWidth: 640, margin: "0 0 2.5rem" }}>
            From FMCG launches to rebrands and go-to-market strategy — a decade-plus of consultancy
            across {PROJECTS.length} brands and {new Set(PROJECTS.map((p) => p.sector)).size} sectors.
          </p>

          <div className="pillars reveal-stagger" style={{ marginBottom: "3rem" }}>
            {FEATURED_BRANDS.map((b) => (
              <article className="pillar pillar--media" key={b.title}>
                <div className="pillar__content">
                  <span className="pillar__kicker">{b.kicker}</span>
                  <h3 className="pillar__title">{b.title}</h3>
                  <p className="pillar__body">{b.body}</p>
                </div>
                <div className="pillar__media pillar__media--photo" style={{ "--pillar-media-ratio": "1256 / 888" } as React.CSSProperties}>
                  <Image src={b.image} alt={b.imageAlt} fill sizes="(max-width: 900px) 100vw, 560px" />
                </div>
              </article>
            ))}
          </div>

          <div className="mr-grid reveal-stagger">
            {PROJECTS.map((p) => (
              <article className="mr-card" key={p.client}>
                <div className="mr-card__top">
                  <span className="mr-card__sector">{p.sector}</span>
                  <span className="mr-card__year">{p.year}</span>
                </div>
                <div className="mr-card__brand">
                  {PROJECT_LOGOS[p.client] ? (
                    <Image
                      className="mr-card__logo"
                      src={PROJECT_LOGOS[p.client]}
                      alt={`${p.client} logo`}
                      width={80}
                      height={40}
                    />
                  ) : (
                    <span className="mr-card__logo mr-card__logo--fallback" aria-hidden="true">
                      {p.client.replace(/[^A-Za-z]/g, "").slice(0, 2).toUpperCase()}
                    </span>
                  )}
                  <h3 className="mr-card__client">{p.client}</h3>
                </div>
                <p className="mr-card__desc">{p.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Our Services */}
      <section className="section section--glow">
        <div className="container">
          <span className="section-label reveal">Our Services</span>
          <h2 className="reveal" style={{ fontSize: "clamp(1.6rem,4vw,2.4rem)", margin: "0.5rem 0 2.5rem", color: "#1f3465" }}>
            A comprehensive range of <span className="text-gold">marketing services</span>
          </h2>
          <div className="services-grid services-grid--enhanced reveal-stagger">
            {SERVICES.map((s) => (
              <article className="service-card" key={s.title}>
                <div className="service-card__icon">
                  <ServiceIcon name={s.icon} />
                </div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section cta-section">
        <div className="container">
          <div className="cta-box reveal">
            <h2 style={{ fontSize: "clamp(2rem,6vw,3.5rem)", fontWeight: 800, margin: 0, color: "var(--navy-950)" }}>
              Boost Your Performance
            </h2>
            <Link className="btn btn--dark btn--magnetic" href="/contact" style={{ fontSize: "1.1rem" }}>
              Start Now!
            </Link>
          </div>
        </div>
      </section>
    </SiteProvider>
  );
}
