import Image from "next/image";
import Link from "next/link";
import { SiteProvider } from "@/components/layout/SiteProvider";
import { PageHero } from "@/components/ui/PageHero";
import { PageCTA } from "@/components/ui/PageCTA";
import { CaseStudyBar } from "@/components/ui/CaseStudyBar";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Amazon Growth Agency — Egypt, KSA & UAE",
  description:
    "Double Shot manages Amazon accounts and runs Sponsored Products, Sponsored Brands & Display ads for FMCG brands across Amazon Egypt, KSA, and UAE. Catalogue optimization, A+ content, Brand Store design, and performance advertising — all in one agency.",
  path: "/services/amazon-growth",
  image: "/media/case-studies/ecommerce/p05.jpg",
});

/** `image` fills the media slot; pillars without one fall back to the numeral.
 *  `imageW`/`imageH` set the slot's aspect ratio so the photo is never cropped. */
const PILLARS: {
  kicker: string;
  title: string;
  body: string;
  image?: string;
  imageAlt?: string;
  imageW?: number;
  imageH?: number;
}[] = [
  {
    image: "/media/services/pillar-01-listing.png",
    imageAlt:
      "Amazon search results for Bobs Bake protein mixes shown on a laptop, with Sponsored placement, impressions, conversion and sales-velocity callouts.",
    imageW: 1256,
    imageH: 888,
    kicker: "Account Management · SEO Listing Optimization · A+ Content · Brand Registry",
    title: "Pillar 1 — A Listing That Wins Before the Ad Runs",
    body: "The most common mistake brands make on Amazon is running ads on broken listings. Before we spend a single pound on advertising, we make sure your Amazon account and product catalogue are built to perform. We handle Brand Registry enrollment, rebuild listings with keyword-rich SEO titles, conversion-focused bullet points, and benefit-led descriptions — then layer in premium product images and A+ content modules that build buyer confidence and lift conversion rates. On Amazon Egypt, KSA, and UAE, the listing is the sale. We make sure yours wins.",
  },
  {
    image: "/media/services/pillar-02-advertising.png",
    imageAlt:
      "Performance dashboard showing sales and units by brand over time, brand and category contribution charts, and real-time insight panels.",
    imageW: 1256,
    imageH: 888,
    kicker: "Sponsored Products · Sponsored Brands · Sponsored Display · Deal Activation",
    title: "Pillar 2 — Amazon Advertising Built Around ROAS, Not Impressions",
    body: "We run Amazon advertising across the full sponsored ads suite — Sponsored Products to capture high-intent shoppers at the point of search, Sponsored Brands to build brand visibility at the top of category results, and Sponsored Display to retarget browsers and reach relevant audiences beyond Amazon search. Every campaign is structured with precise keyword targeting, bid optimization, and weekly performance reviews. We pair ad strategy with deal mechanics — coupons, Lightning Deals, and promotional pricing — timed to Amazon's peak traffic moments to maximize both volume and margin. Every dirham is tracked. Every decision is data-backed.",
  },
  {
    image: "/media/services/pillar-03-brand-store.png",
    imageAlt:
      "A Bob's Bake Amazon Brand Store page with A+ content, product tiles and Shop now buttons, ringed by brand store, product story and conversion callouts.",
    imageW: 1256,
    imageH: 888,
    kicker: "Brand Store Design · Review Growth Strategy · Scaling & Reporting",
    title: "Pillar 3 — Brand Store, Reviews & Long-Term Amazon Authority",
    body: "Brands that lead on Amazon don't just run ads — they build equity. We design and manage full Amazon Brand Stores that give your product range a curated home, tell your brand story, and increase average basket size through cross-sell and upsell architecture. We drive qualified traffic to your store through Sponsored Brands campaigns and develop a structured review growth strategy to build the social proof that compounds your organic ranking over time. Monthly performance reports and quarterly forecasts give you complete visibility into growth trajectory across all three markets.",
  },
];

const INCLUDES = [
  "Amazon account setup, health management, and Brand Registry enrollment across Egypt, KSA, and UAE",
  "Full product catalogue audit and listing optimization — SEO titles, keywords, bullet points, and descriptions",
  "A+ content creation and Enhanced Brand Content to improve conversion and reduce return rates",
  "Amazon Sponsored Products campaign setup, management, and weekly bid optimization",
  "Amazon Sponsored Brands campaigns — headline ads, video ads, and store spotlight formats",
  "Amazon Sponsored Display campaigns for retargeting and audience-based reach",
  "Deal strategy — Lightning Deals, Coupons, Prime Day activation, and promotional pricing",
  "Amazon Brand Store design, build, and ongoing management",
  "Review generation strategy and reputation management across all markets",
  "Buy Box monitoring and competitive pricing strategy",
  "Weekly live performance dashboards and monthly reporting",
];

const WHY = [
  "Amazon-specialist team with active management across Egypt, KSA, and UAE markets",
  "FMCG-native expertise across haircare, personal care, food, and household categories",
  "Full-funnel Amazon advertising — from awareness to conversion",
  "Listings, A+ content, and brand stores built to international quality standards",
  "Data-driven ad management with weekly optimization and transparent reporting",
  "Strategies that protect margin while scaling top-line revenue",
];

const headingStyle = {
  fontSize: "1.5rem",
  textTransform: "uppercase" as const,
  margin: "0 0 1.5rem",
  color: "var(--text-strong)",
};

export default function AmazonGrowthPage() {
  return (
    <SiteProvider activeNav="services" innerPage>
      {/* Amazon Ads banner — full-bleed band at the artwork's natural 3.2:1 */}
      <section className="ads-banner-section">
        <div className="ads-banner">
          <Image
            className="ads-banner__img"
            src="/media/services/amazon-ads-banner-no-button.png"
            alt="Amazon Ads that turn visibility into growth — an iSiS e-commerce performance dashboard alongside A+ content modules."
            width={2780}
            height={878}
            priority
            sizes="100vw"
          />
        </div>
      </section>

      <PageHero
        label="Amazon Growth"
        title={
          <>
            Amazon Growth That Turns Visibility into{" "}
            <span className="text-gold">Sales</span>
          </>
        }
        subtitle="Most brands are on Amazon. The ones that grow are the ones that are managed. At Double Shot, we handle every layer of your Amazon presence across Egypt, Saudi Arabia, and the UAE — from listing health and catalogue optimization to full-funnel advertising and Brand Store development. We don't run accounts. We build Amazon growth engines."
        ctaLabel="Start a Strategy Call"
        ctaHref="/contact"
      />

      <CaseStudyBar active="about" />

      {/* Three Pillars */}
      <section className="section">
        <div className="container content-shell content-shell--xwide">
          <h2 className="reveal" style={headingStyle}>
            Three Pillars of Amazon Growth — How We Manage Your Brand
          </h2>
          <div className="pillars reveal-stagger">
            {PILLARS.map((p, i) => (
              <article className="pillar pillar--media" key={p.title}>
                <div className="pillar__content">
                  <span className="pillar__kicker">{p.kicker}</span>
                  <h3 className="pillar__title">{p.title}</h3>
                  <p className="pillar__body">{p.body}</p>
                </div>
                {/* Media slot — real artwork where we have it, numeral otherwise */}
                {p.image ? (
                  <div
                    className="pillar__media pillar__media--photo"
                    style={
                      p.imageW && p.imageH
                        ? ({ "--pillar-media-ratio": `${p.imageW} / ${p.imageH}` } as React.CSSProperties)
                        : undefined
                    }
                  >
                    <Image
                      src={p.image}
                      alt={p.imageAlt ?? ""}
                      fill
                      sizes="(max-width: 900px) 100vw, 560px"
                    />
                  </div>
                ) : (
                  <div className="pillar__media" aria-hidden="true">
                    <span className="pillar__media-num">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* What's included */}
      <section className="section section--glow">
        <div className="container content-shell">
          <h2 className="reveal" style={headingStyle}>
            What Our Amazon Growth Service Includes
          </h2>
          <ul className="checklist reveal">
            {INCLUDES.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <PageCTA
        title="Let's Own Your Shelf"
        description="Unlock your brand's full marketplace potential across Amazon Egypt, KSA & UAE with Double Shot."
      />

      {/* Why us */}
      <section className="section">
        <div className="container content-shell content-prose">
          <h2 className="reveal" style={headingStyle}>
            Why FMCG Brands Trust Double Shot for Amazon Management in Egypt, KSA &amp; UAE
          </h2>
          <p className="reveal">
            Amazon in Egypt, Saudi Arabia, and the UAE operates differently from global markets —
            consumer behavior, category dynamics, platform mechanics, and seasonal peaks all
            require local expertise. Double Shot is built entirely around this reality. Our team
            manages FMCG brands daily across all three Amazon markets, bringing category
            intelligence, platform knowledge, and optimization experience a generalist agency
            simply cannot match.
          </p>
          <ul className="checklist reveal">
            {WHY.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* Results — ISIS */}
      <section className="section">
        <div className="container">
          <div className="spotlight reveal-stagger">
            <div className="spotlight__visual">
              <Image
                src="/media/case-studies/ecommerce/p05.jpg"
                alt="Amazon growth"
                width={800}
                height={600}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              <span className="spotlight__badge">Case Study</span>
            </div>
            <div className="spotlight__content">
              <h3 style={{ fontSize: "1.75rem", textTransform: "uppercase", marginBottom: "1rem" }}>
                iSiS Organic — 2,740% Amazon Growth Year-on-Year
              </h3>
              <p style={{ color: "var(--muted)", lineHeight: 1.7, marginBottom: "1.5rem" }}>
                When Double Shot took over full Amazon management for ISIS Organic, we rebuilt their
                catalogue, enrolled the brand in Brand Registry, created A+ content across all SKUs,
                and launched a structured Sponsored Products and Sponsored Brands strategy — making
                Amazon their highest-performing sales channel within 12 months.
              </p>
              <div className="spotlight__metrics">
                <div className="spotlight__metric">
                  <strong>2740%</strong>
                  <span>YOY Amazon growth</span>
                </div>
                <div className="spotlight__metric">
                  <strong>12mo</strong>
                  <span>To #1 sales channel</span>
                </div>
              </div>
              <Link className="btn btn--primary btn--magnetic" href="/case-studies/isis-organic">
                View Results →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </SiteProvider>
  );
}
