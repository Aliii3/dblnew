import Image from "next/image";
import { SiteProvider } from "@/components/layout/SiteProvider";
import { PageHero } from "@/components/ui/PageHero";
import { PageCTA } from "@/components/ui/PageCTA";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Branding",
  description:
    "Full brand identity by DBLSHOT — strategy, naming, visual systems, corporate identity, and complete brand guidelines built to last.",
  path: "/services/branding",
});

const WHATS_INCLUDED = [
  "Brand strategy: positioning, purpose, values, and competitive differentiation",
  "Brand naming and tagline development",
  "Logo design — primary, secondary, and icon variations",
  "Brand color palette, typography system, and visual language",
  "Complete Corporate Identity System (CSI): business cards, letterheads, email signatures, official stationery, and branded templates",
  "Brand voice, tone of voice guidelines, and messaging framework",
  "Social media visual identity templates (posts, stories, highlights, covers)",
  "Packaging design and branded collateral where applicable",
  "Full brand guidelines document — a single source of truth for your brand",
];

const WHY_PARTNER = [
  "End-to-end branding from strategy to final asset delivery",
  "Deep understanding of FMCG, retail, and service brand environments",
  "Design rooted in market research, not aesthetic preference",
  "Bilingual capability — Arabic and English brand systems",
  "Consistent brand identity across digital, print, and physical touchpoints",
  "Delivered with full brand guidelines so your team can execute with confidence",
];

export default function BrandingPage() {
  return (
    <SiteProvider activeNav="services" innerPage>
      {/* Full-bleed band at the artwork's natural 3.2:1, same as the Amazon Ads page */}
      <section className="ads-banner-section">
        <div className="ads-banner">
          <Image
            className="ads-banner__img"
            src="/media/services/branding-banner.png"
            alt="Branding that transforms perception — a designer reworking the Zeina identity, shown as an old-branding versus new-branding comparison across logo and packaging."
            width={2780}
            height={878}
            priority
            sizes="100vw"
          />
        </div>
      </section>

      <PageHero
        label="Branding"
        title={
          <>
            Full <span className="text-gold">Branding</span>
          </>
        }
        subtitle="A complete, cohesive identity — distinctive, intentional, and built to last."
      />
      <section className="section">
        <div className="container content-shell content-prose">
          <p className="reveal">
            At Dblshot, we believe a brand is more than a logo. It is the first impression a business
            makes, the language it speaks, and the feeling it leaves behind. Our full branding
            service is built to give your brand a complete, cohesive identity — one that is
            distinctive, intentional, and built to last.
          </p>
          <p className="reveal">
            Whether you are launching a new brand from zero or transforming an existing one, we build
            everything from the ground up: from brand strategy and naming to visual identity, full
            corporate identity systems, and the guidelines that keep everything consistent across
            every touchpoint.
          </p>
          <p className="reveal">
            We do not deliver templates. We build brand identities that are rooted in your market,
            your audience, and your commercial ambitions — and designed to communicate the right
            things to the right people, every time they interact with your brand.
          </p>

          <h2 className="reveal" style={{ fontSize: "1.35rem", textTransform: "uppercase", margin: "2.5rem 0 1rem", color: "var(--text-strong)" }}>
            What&apos;s Included
          </h2>
          <ul className="checklist reveal">
            {WHATS_INCLUDED.map((item) => (
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
            Your brand is how the world sees you before you say a word. Let us make sure it says the
            right thing.
          </p>
        </div>
      </section>
      <PageCTA
        title="Let's Talk"
        description="Your brand is how the world sees you before you say a word — let us make sure it says the right thing."
      />
    </SiteProvider>
  );
}
