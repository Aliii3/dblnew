import Image from "next/image";
import { SiteProvider } from "@/components/layout/SiteProvider";
import { PageHero } from "@/components/ui/PageHero";
import { PageCTA } from "@/components/ui/PageCTA";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Website Development",
  description:
    "Conversion-focused websites by DBLSHOT — e-commerce and lead-generation builds on WordPress, Framer, and native platforms with CRO baked in.",
  path: "/services/technology",
});

const WHAT_WE_BUILD = [
  "E-commerce websites built for scalable sales and seamless shopping journeys",
  "Service-based websites designed to convert visitors into qualified leads",
  "Landing pages and campaign-specific builds optimized for conversion",
  "CRO audits and optimizations on existing websites",
  "Development across WordPress, Framer, and native platforms",
];

const WHY_PARTNER = [
  "E-commerce websites built to support sales and scale",
  "Service-based websites designed for lead generation",
  "Expertise across WordPress, Framer, and native development",
  "CRO-driven tactics across both business models",
  "UI and UX design built around the full buyer journey",
  "Websites that balance brand experience with commercial performance",
];

export default function TechnologyPage() {
  return (
    <SiteProvider activeNav="services" innerPage>
      {/* Full-bleed band at the artwork's natural 3.2:1, same as the Amazon Ads page */}
      <section className="ads-banner-section">
        <div className="ads-banner">
          <Image
            className="ads-banner__img"
            src="/media/services/technology-banner.png"
            alt="Where brands come to life — Shopify, WordPress and native app builds shown as live storefronts for Sekem, Spritz, Nourish and more."
            width={2780}
            height={878}
            priority
            sizes="100vw"
          />
        </div>
      </section>

      <PageHero
        label="Website Development"
        title={
          <>
            Website <span className="text-gold">Development</span>
          </>
        }
        subtitle="Digital experiences that support growth, strengthen brand presence, and guide users toward action."
      />
      <section className="section">
        <div className="container content-shell content-prose">
          <p className="reveal">
            At Dblshot, we build websites designed to do more than exist online. We create digital
            experiences that support business growth, strengthen brand presence, and guide users
            toward action — through a smart balance of strategy, design, and performance.
          </p>
          <p className="reveal">
            From e-commerce websites engineered for frictionless shopping journeys to service-based
            websites built for lead generation on WordPress, Framer, or native platforms — we
            develop every website around a clear commercial goal.
          </p>
          <p className="reveal">
            By combining conversion-focused architecture, enhanced UI and UX design, and CRO tactics
            tailored to each business model, we make sure every stage of the buyer journey is
            supported with purpose. Whether your goal is to drive more purchases, generate more
            qualified leads, or improve how users experience your brand, we build websites that are
            made to perform — not just to exist.
          </p>

          <h2 className="reveal" style={{ fontSize: "1.35rem", textTransform: "uppercase", margin: "2.5rem 0 1rem", color: "var(--text-strong)" }}>
            What We Build
          </h2>
          <ul className="checklist reveal">
            {WHAT_WE_BUILD.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <h2 className="reveal" style={{ fontSize: "1.35rem", textTransform: "uppercase", margin: "2.5rem 0 1rem", color: "var(--text-strong)" }}>
            Why Partner with Us?
          </h2>
          <ul className="checklist reveal">
            {WHY_PARTNER.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <p className="reveal" style={{ color: "var(--ice)", marginTop: "2rem" }}>
            Deep Impact starts with the right digital presence. Let us help you build a website that
            looks stronger, works smarter, and converts better.
          </p>
        </div>
      </section>
      <PageCTA
        title="Let's Talk"
        description="Deep Impact starts with the right digital presence — let's build a website that looks stronger, works smarter, and converts better."
      />
    </SiteProvider>
  );
}
