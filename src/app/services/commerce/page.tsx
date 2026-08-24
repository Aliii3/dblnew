import Image from "next/image";
import Link from "next/link";
import { SiteProvider } from "@/components/layout/SiteProvider";
import { PageHero } from "@/components/ui/PageHero";
import { PageCTA } from "@/components/ui/PageCTA";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "E-Commerce Agency in Egypt | Amazon, Noon & Marketplace Growth",
  description:
    "Dblshot is Egypt's leading e-commerce management agency for FMCG brands. We manage Amazon Egypt, Noon, Talabat Mart, HungerStation & more — catalogue optimization, ads, brand stores, and full-funnel growth. Let's own your shelf.",
  path: "/services/commerce",
  image: "/media/case-studies/ecommerce/p05.jpg",
});

const PHASES = [
  {
    kicker: "Account Management · SEO Catalogue Optimization · A+ Content",
    title: "Phase 1 — Build Your Marketplace Foundation",
    body: "Before scaling, your marketplace presence needs to be right. Our e-commerce management team audits every SKU across Amazon Egypt, Noon Core, Noon Minutes, and quick-commerce platforms — rebuilding listings with SEO-optimized titles, conversion-focused content, premium product photography, and A+ content that transforms product pages into revenue drivers. Most FMCG brands are losing sales at the listing level without knowing it. We fix that first, so every campaign you run lands on a foundation built to convert.",
  },
  {
    kicker: "Deals & Promotions · Quarterly Forecasting · Live Sales Dashboard",
    title: "Phase 2 — Track, Forecast & Activate the Right Promotions",
    body: "Growth without visibility is guesswork. Our performance tracking system gives you a real-time, weekly-updated dashboard that monitors sales in and sales out across every marketplace — Amazon, Noon, Talabat, HungerStation, Breadfast — all in one view. We pair that with quarterly sales forecasts aligned to your inventory and commercial targets, and a promotions strategy built around platform-specific deal mechanics, seasonal demand, and category trends. You'll always know where you stand — and what's coming next.",
  },
  {
    kicker: "Sponsored Ads · Display Ads · Amazon Brand Store · Traffic Growth",
    title: "Phase 3 — Scale With Marketplace Advertising & Brand Store Growth",
    body: "Once your foundation is optimized and your data is clean, we scale. Our marketplace advertising team runs Sponsored Products, Sponsored Brands, and Display campaigns across Amazon Egypt, Noon, and regional platforms — driving qualified traffic to listings that are built to convert. We also design and build full Amazon Brand Stores that turn your marketplace page into a brand destination, not just a product listing. Every dirham of ad spend is tracked, optimized, and held accountable to real commercial results.",
  },
];

const PLATFORMS = [
  { name: "Amazon Egypt & KSA", detail: "Listings, ads, brand stores, A+ content" },
  { name: "Noon", detail: "Sponsored products, brand store, catalog management" },
  { name: "Breadfast", detail: "Hero banners, category promotions, catalog optimization" },
  { name: "GoodsMart", detail: "Category ads, targeted promotions, sales acceleration" },
  { name: "Botit, Rabbit, Talabat", detail: "New platform launches and catalog buildout" },
];

const COVERS = [
  "Multi-platform catalogue management across Amazon Egypt, Noon Core, Noon Minutes, Breadfast, Talabat Mart, HungerStation, GoodsMart, and more",
  "Product listing optimization — SEO titles, keyword-rich bullet points, and content built to rank in marketplace search and win the Buy Box",
  "A+ content creation that builds brand trust and lifts conversion rates on Amazon Egypt and Noon",
  "Deals and promotions management — coupons, flash deals, bundle offers, and bank promotions timed to platform peaks",
  "Marketplace advertising — Sponsored Products, Sponsored Brands, Display Ads, and full-funnel ad strategy",
  "Amazon Brand Store design and management to drive brand discovery and increase basket size",
  "Stock readiness and fulfillment coordination to eliminate lost sales from out-of-stock SKUs",
  "Live performance dashboards and quarterly forecasting so your team has full commercial visibility at all times",
];

const WHY = [
  "Full-service e-commerce management across all major Egypt and KSA marketplaces",
  "FMCG-native expertise with proven category results",
  "Catalogue and content optimization built to win search visibility and improve conversion",
  "Promotion and deal strategies built around real demand signals — not guesswork",
  "Quarterly forecasting and live reporting that keeps every stakeholder aligned",
  "Advertising and scaling strategies designed to grow revenue without eroding margin",
];

const headingStyle = {
  fontSize: "1.5rem",
  textTransform: "uppercase" as const,
  margin: "0 0 1.5rem",
  color: "var(--text-strong)",
};

export default function CommercePage() {
  return (
    <SiteProvider activeNav="services" innerPage>
      {/* Full-bleed band at the artwork's natural 3.2:1, same as the Amazon Ads page */}
      <section className="ads-banner-section">
        <div className="ads-banner">
          <Image
            className="ads-banner__img"
            src="/media/services/commerce-banner.png"
            alt="Your brand belongs at the top of the shelf — Amazon, HungerStation, and noon storefronts connected around marketplace integration, store optimization, and sales growth."
            width={2780}
            height={878}
            priority
            sizes="100vw"
          />
        </div>
      </section>

      <PageHero
        label="E-Commerce"
        title={
          <>
            E-Commerce, Built for FMCG Brands That Want to{" "}
            <span className="text-gold">Lead</span>
          </>
        }
        subtitle="At Dblshot, we help FMCG brands build, optimize, and scale their presence across Egypt's and Saudi Arabia's biggest marketplaces — Amazon, Noon, Talabat Mart, HungerStation, Breadfast, and beyond. From catalogue optimization and A+ content to marketplace advertising and brand store development, we manage the full e-commerce ecosystem with one goal: turning your digital shelf into your strongest sales channel."
      />

      {/* About the service */}
      <section className="section">
        <div className="container content-shell content-prose">
          <h2 className="reveal" style={headingStyle}>
            Full E-Commerce Management
          </h2>
          <p className="reveal">
            At Dblshot, we turn e-commerce into a structured, scalable growth engine. As a
            performance marketing agency with deep FMCG expertise, we help brands build a stronger
            digital presence, optimize operations, and grow across every major marketplace — through
            a strategy that connects visibility, conversion, and commercial performance.
          </p>
          <p className="reveal">
            We manage the full e-commerce ecosystem: multi-platform catalog management, listing
            optimization, promotion planning, advertising execution, stock coordination, and
            data-driven performance reporting. Whether your brand needs stronger marketplace
            foundations or end-to-end growth management, we make sure every part of your operation is
            built to sell, scale, and sustain results.
          </p>
          <h3 className="reveal" style={{ fontSize: "1.05rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--gold)", margin: "2rem 0 1rem" }}>
            Platforms We Operate On
          </h3>
          <div className="platforms reveal-stagger">
            {PLATFORMS.map((p) => (
              <div className="platform" key={p.name}>
                <strong>{p.name}</strong>
                <span>{p.detail}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Three phases */}
      <section className="section section--glow">
        <div className="container content-shell">
          <h2 className="reveal" style={headingStyle}>
            A Three-Phase E-Commerce Growth System Designed to Scale
          </h2>
          <div className="pillars reveal-stagger">
            {PHASES.map((p) => (
              <article className="pillar" key={p.title}>
                <span className="pillar__kicker">{p.kicker}</span>
                <h3 className="pillar__title">{p.title}</h3>
                <p className="pillar__body">{p.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* What it covers */}
      <section className="section section--glow">
        <div className="container content-shell">
          <h2 className="reveal" style={headingStyle}>
            What Our E-Commerce Service Covers
          </h2>
          <ul className="checklist reveal">
            {COVERS.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* Why us */}
      <section className="section">
        <div className="container content-shell content-prose">
          <h2 className="reveal" style={headingStyle}>
            Why FMCG Brands Choose Dblshot for E-Commerce Management in Egypt
          </h2>
          <p className="reveal">
            We are not a generalist digital agency. Dblshot is a performance marketing agency
            specializing in FMCG e-commerce management across Egyptian and Saudi Arabian
            marketplaces. Our team has direct expertise in Amazon Egypt, Noon, Talabat Mart,
            HungerStation, and Breadfast — so we understand the platform mechanics, category
            dynamics, and consumer behavior that actually drive sales in this market.
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
                alt="ISIS Organic e-commerce growth"
                width={800}
                height={600}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              <span className="spotlight__badge">Case Study</span>
            </div>
            <div className="spotlight__content">
              <h3 style={{ fontSize: "1.75rem", textTransform: "uppercase", marginBottom: "1rem" }}>
                iSiS Organic — 2,740% Amazon. 245% Total E-Commerce.
              </h3>
              <p style={{ color: "var(--muted)", lineHeight: 1.7, marginBottom: "1.5rem" }}>
                We expanded ISIS Organic&apos;s full digital commerce operation across Amazon Egypt,
                Noon, Breadfast, GoodsMart, Botit, Rabbit, and Talabat — rebuilding the catalogue,
                restructuring advertising, and activating each platform with a phased, data-driven
                approach.
              </p>
              <div className="spotlight__metrics">
                <div className="spotlight__metric">
                  <strong>2740%</strong>
                  <span>YOY Amazon growth</span>
                </div>
                <div className="spotlight__metric">
                  <strong>245%</strong>
                  <span>Total e-commerce growth</span>
                </div>
              </div>
              <Link className="btn btn--primary btn--magnetic" href="/case-studies/isis-organic">
                View Results →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <PageCTA
        title="Let's Own Your Shelf"
        description="Whether you need stronger marketplace foundations, a better-converting catalogue, or a full end-to-end e-commerce partner — Dblshot is built for this."
      />
    </SiteProvider>
  );
}
