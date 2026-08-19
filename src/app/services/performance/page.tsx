import Image from "next/image";
import { SiteProvider } from "@/components/layout/SiteProvider";
import { PageHero } from "@/components/ui/PageHero";
import { PageCTA } from "@/components/ui/PageCTA";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Performance Marketing",
  description:
    "Dblshot runs full-funnel paid performance marketing across Meta, Google, TikTok, and Snapchat — media buying, testing, and daily optimization built for measurable FMCG growth.",
  path: "/services/performance",
});

const CHANNELS = [
  { name: "Meta Ads", detail: "Facebook & Instagram — awareness, conversion, and retargeting" },
  { name: "Google Ads", detail: "Search, Shopping, Performance Max, and YouTube" },
  { name: "TikTok Ads", detail: "Spark Ads and in-feed campaigns for reach and engagement" },
  { name: "Snapchat Ads", detail: "Regional reach across Egypt and the GCC" },
];

const WHAT_WE_DO = [
  "Full-funnel campaign structure — awareness, consideration, and conversion working as one system",
  "Media buying and budget allocation built around real ROAS, not vanity impressions",
  "Creative and audience testing cycles that find what works before scaling spend",
  "Daily bid and budget optimization, tracked against clear commercial targets",
  "Cross-platform reporting so performance is measured the same way everywhere",
  "Tight coordination with creative and e-commerce teams so every click lands on a page built to convert",
];

const WHY_PARTNER = [
  "A dedicated performance team — not a single generalist juggling every platform",
  "FMCG-native media buying, built around real category economics and margin",
  "Testing-first approach that protects budget while scaling what proves out",
  "Transparent, weekly reporting with no black-box metrics",
  "Media strategy connected to e-commerce and Amazon, not run in isolation",
];

export default function PerformancePage() {
  return (
    <SiteProvider activeNav="services" innerPage>
      {/* Full-bleed band at the artwork's natural 3.2:1, same as the Amazon Ads page */}
      <section className="ads-banner-section">
        <div className="ads-banner">
          <Image
            className="ads-banner__img"
            src="/media/services/performance-banner.png"
            alt="Turn followers into loyal customers — a Meta Ads Manager dashboard with ROAS, SEO, CRO, and analytics panels alongside a live Spritz storefront."
            width={2780}
            height={878}
            priority
            sizes="100vw"
          />
        </div>
      </section>

      <PageHero
        label="Performance"
        title={
          <>
            Performance Marketing <span className="text-gold">That Pays for Itself</span>
          </>
        }
        subtitle="Paid media across Meta, Google, TikTok, and Snapchat — structured, tested, and optimized daily around one goal: measurable growth."
      />

      <section className="section">
        <div className="container content-shell content-prose">
          <span className="section-label reveal">Who We Are</span>
          <p className="reveal" style={{ fontSize: "1.15rem" }}>
            Performance marketing is where strategy meets spend. Our team runs paid media as a
            connected growth engine — not a set of disconnected campaigns — pairing media buying
            with the testing discipline and daily attention that keep budget efficient and results
            accountable.
          </p>
        </div>
      </section>

      <section className="section section--glow">
        <div className="container content-shell content-prose">
          <h2
            className="reveal"
            style={{ fontSize: "1.35rem", textTransform: "uppercase", margin: "0 0 1.5rem", color: "var(--text-strong)" }}
          >
            Platforms We Run
          </h2>
          <div className="platforms reveal-stagger">
            {CHANNELS.map((c) => (
              <div className="platform" key={c.name}>
                <strong>{c.name}</strong>
                <span>{c.detail}</span>
              </div>
            ))}
          </div>

          <h2
            className="reveal"
            style={{ fontSize: "1.35rem", textTransform: "uppercase", margin: "2.5rem 0 1rem", color: "var(--text-strong)" }}
          >
            What We Do
          </h2>
          <ul className="checklist reveal">
            {WHAT_WE_DO.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <h2
            className="reveal"
            style={{ fontSize: "1.35rem", textTransform: "uppercase", margin: "2.5rem 0 1rem", color: "var(--text-strong)" }}
          >
            Why Partner with Us?
          </h2>
          <ul className="checklist reveal">
            {WHY_PARTNER.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <p className="reveal" style={{ color: "var(--ice)", marginTop: "2rem" }}>
            Deep Impact starts with media that&apos;s built to perform. Let&apos;s put your budget
            where the results are.
          </p>
        </div>
      </section>

      <PageCTA
        title="Let's Talk"
        description="Tell us your channels, budget, and targets — we'll build a performance plan around them."
      />
    </SiteProvider>
  );
}
