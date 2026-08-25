import Image from "next/image";
import Link from "next/link";
import { ClientReviews } from "@/components/ui/ClientReviews";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CaseStudyCard } from "@/components/ui/CaseStudyCard";
import { HomeBlogCard } from "@/components/home/HomeBlogCard";
import { HomeHero } from "@/components/home/HomeHero";
import { CtaMarquee } from "@/components/ui/CtaMarquee";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import { ProcessIcon } from "@/components/ui/ProcessIcon";
import { TeamGrid } from "@/components/ui/TeamGrid";
import {
  PROVEN_STATS,
  DEEP_IMPACT_STATS,
  SERVICES,
  PROCESS_STEPS,
} from "@/lib/content";
import { HOME_BLOG_POSTS, HOME_TEAM, HOME, CLIENT_LOGOS } from "@/lib/content/home";
import { clientName } from "@/lib/content/clients";
import { getAllCaseStudies } from "@/lib/content/case-studies";

/** Same shortlist as the Deep Impact page's "The Work" section. */
const HOME_WORK_HIDDEN_SLUGS = new Set(["ltf", "zeina", "raw", "cimento-forca", "wingo"]);

/**
 * Most client logos are plain white cutouts that need to be forced to a dark
 * silhouette (via CSS `brightness(0)`) to read on the cream page background.
 * A handful are already self-contained colour badges (dark badge + light
 * text) — inverting those crushes their internal contrast into a solid
 * blob, so they're rendered in their natural colours instead.
 */
const NATURAL_COLOR_LOGOS = [
  "E46KWmdgoYtOJu56riHrVue3xo", // Halwani Bros
  "kCZVKUHBRm85EDU61Ax33mYdrTw", // circular seal
  "OxNEFwVLqzVekRKf0ZzULVeVRM", // Coffee Break
  "WQakjqWJVTi6703foxvfgAj0Oc", // iSiS
  "IEzNPAmU7hScrRAWBnLGcUCw7g", // demeter / SEKEM
  "YyXtvAwxSzVL7lH0Fo6FXVepg2k", // CPC
  "co3FeUMtKNr44JgE4T6z41lYE", // Vogelpark
  "JnU9HgiqMBLi5Pun5ZVO9kVWU0", // Puvana
];

const CLIENT_LOGO_ROWS = Array.from({ length: 5 }, (_, row) =>
  CLIENT_LOGOS.slice(row * 5, row * 5 + 5)
);

export function HomePage() {
  const workStudies = getAllCaseStudies().filter((s) => !HOME_WORK_HIDDEN_SLUGS.has(s.slug));

  return (
    <>
      <HomeHero />

      {/* Agency intro — heading + copy alongside a bento photo gallery */}
      <section className="section" id="values">
        <div className="container agency-intro">
          <div className="agency-intro__text">
            <span className="section-label reveal">Talk. Kick Off. Boost.</span>
            <h2 className="agency-intro__heading reveal">
              A Full-Funnel Agency Built for <em className="gold">Explosive Growth</em> &amp;
              Performance
            </h2>
            <div className="agency-intro__copy reveal">
              <p>
                We engineer scalable systems that transform <strong>FMCG</strong> brands into market
                leaders across Egypt &amp; the GCC — through data-driven precision and operational
                excellence.
              </p>
              <p>
                We start with a real conversation about your brand and your numbers, kick off fast with
                a plan built on data, not guesswork, then boost — compounding growth across Amazon,
                e-commerce, social, and web. As a team of FMCG marketing experts and e-commerce
                operators, every collaboration is built to leave a lasting impact. We are DBLSHOT.
              </p>
            </div>
          </div>

          <div className="agency-intro__gallery reveal">
            <div className="bento">
              <div className="bento__tile bento__tile--main">
                <Image src="/media/case-studies/rehana-table.jpg" alt="Rehana — a DBLSHOT client" width={922} height={1157} />
              </div>
              <div className="bento__tile bento__tile--top">
                <Image src="/media/case-studies/spritz-avocado.png" alt="Spritz Avocado Cooking Spray — a DBLSHOT client" width={2048} height={1024} />
              </div>
              <div className="bento__tile bento__tile--bottom">
                <Image src="/media/case-studies/isis-teas.jpg" alt="ISIS Organic — a DBLSHOT client" width={2400} height={1260} />
              </div>
            </div>
            <Link className="btn btn--primary bento__cta" href="/about">
              Learn More <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Proven Impact — big stat card + bento of client logo chips */}
      <section className="section section--glow" id="proven-impact">
        <div className="container">
          <SectionHeading>
            Proven <span className="text-gold">Impact</span>
          </SectionHeading>
          <div className="proven-bento">
            {PROVEN_STATS.map((stat) => (
              <article key={stat.label} className="proven-stat reveal">
                <span className="proven-stat__num">
                  <span data-count={stat.value} data-suffix={stat.suffix}>0</span>
                </span>
                <span className="proven-stat__stars" aria-hidden="true">★★★★★</span>
                <span className="proven-stat__label">{stat.label}</span>
              </article>
            ))}
            <div className="logo-row reveal" aria-label="Selected DBLSHOT clients">
              {CLIENT_LOGO_ROWS.map((row, rowIndex) => (
                <div className="logo-row__line" key={`client-row-${rowIndex}`}>
                  {row.map((src) => {
                    const natural = NATURAL_COLOR_LOGOS.some((id) => src.includes(id));
                    return (
                      <span className={`logo-row__item${natural ? " logo-row__item--natural" : ""}`} key={src}>
                        <Image
                          src={src}
                          alt={clientName(src) || ""}
                          width={220}
                          height={92}
                          style={{ width: "100%", height: "100%", objectFit: "contain" }}
                        />
                      </span>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Impact Services — photo panel + stacked offer cards */}
      <section className="section" id="service">
        <div className="container offer-split">
          <div className="offer-panel reveal">
            {/* Placeholder lifestyle photo — swap for real DBLSHOT/team photography when available. */}
            <Image
              src="/media/stock/offer-lifestyle-placeholder.jpg"
              alt=""
              aria-hidden="true"
              fill
              className="offer-panel__img"
            />
            <div className="offer-panel__scrim" aria-hidden="true" />
            <h2 className="offer-panel__heading">
              <span>What</span>
              <span>We</span>
              <span className="gold">Offer</span>
            </h2>
            <Link className="svc-showcase__more offer-panel__more" href="/services">
              See All Services <span aria-hidden="true">»</span>
            </Link>
          </div>

          <div className="offer-cards">
            <span className="section-label reveal">What We Do</span>
            <SectionHeading className="offer-cards__heading">
              Impact <span className="text-gold">Services</span>
            </SectionHeading>
            <div className="offer-cards__list reveal-stagger">
              {SERVICES.map((s) => (
                <Link className="offer-card" href={s.href} key={s.title}>
                  <span className="offer-card__icon" aria-hidden="true">
                    <ServiceIcon name={s.icon} />
                  </span>
                  <span className="offer-card__body">
                    <span className="offer-card__title">{s.title}</span>
                    <span className="offer-card__desc">{s.description}</span>
                  </span>
                  <span className="offer-card__arrow" aria-hidden="true">→</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Deep Impact stats */}
      <section className="section section--glow" id="deep-impact-stats">
        <div className="container">
          <SectionHeading center>
            Deep <span className="text-gold">Impact</span>
          </SectionHeading>
          <div className="impact-stats">
            {DEEP_IMPACT_STATS.map((stat) => (
              <article key={stat.label} className="impact-stat">
                <div className="impact-stat__num">
                  <span data-count={stat.value} data-suffix={stat.suffix} data-prefix={stat.prefix ?? ""}>
                    {stat.prefix ?? ""}0{stat.suffix}
                  </span>
                </div>
                <div className="impact-stat__label">{stat.label}</div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Process */}
      <section className="section" id="deep-impact">
        <div className="container">
          <SectionHeading center>
            Impact <span className="text-gold">Process</span>
          </SectionHeading>
          <ol className="process-timeline reveal-stagger">
            {PROCESS_STEPS.map((step) => (
              <li className="process-step" key={step.num}>
                <span className="process-step__marker">
                  <ProcessIcon name={step.icon} />
                  <span className="process-step__num">{step.num}</span>
                </span>
                <div className="process-step__content">
                  <h3 className="process-step__title">{step.title}</h3>
                  <p className="process-step__desc">{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* CTA */}
      <section className="section cta-section">
        <div className="container">
          <div className="cta-box reveal">
            <div className="cta-words">
              <span className="cta-word">Talk.</span>
              <span className="cta-word">kick off.</span>
              <span className="cta-word">boost.</span>
            </div>
            <Link className="btn btn--dark btn--magnetic" href="/contact" style={{ fontSize: "1.1rem" }}>
              Let&apos;s Talk <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Meet the Minds */}
      <section className="section" id="our-team-new">
        <div className="container">
          <SectionHeading center narrow>
            Meet the Minds <span className="text-gold">Behind the Impact</span>
          </SectionHeading>
          {HOME.teamIntro.map((p) => (
            <p key={p} className="reveal content-prose" style={{ maxWidth: 720, margin: "0 auto 1rem", textAlign: "center" }}>
              {p}
            </p>
          ))}
          <TeamGrid members={HOME_TEAM} />
        </div>
      </section>

      {/* Knowledge Drop */}
      <section className="section section--glow" id="blogs">
        <div className="container">
          <SectionHeading center>
            Knowledge <span className="text-gold">Drop</span>
          </SectionHeading>
          <div className="blogs-grid reveal-stagger">
            {HOME_BLOG_POSTS.map((post, index) => (
              <HomeBlogCard key={post.slug + post.tag} post={post} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* The Work */}
      <section className="section" id="work">
        <div className="container">
          <SectionHeading center>
            Case <span className="text-gold">Studies</span>
          </SectionHeading>
          <div className="blogs-grid reveal-stagger">
            {workStudies.map((study) => (
              <CaseStudyCard key={study.slug} study={study} />
            ))}
          </div>
        </div>
      </section>

      {/* Clients Reviews */}
      <section className="section" id="reviews-google">
        <div className="container">
          <SectionHeading center>
            Clients <span className="text-gold">Reviews</span>
          </SectionHeading>
          <ClientReviews />
        </div>
      </section>

      <CtaMarquee />
    </>
  );
}
