import Image from "next/image";
import Link from "next/link";
import { SiteProvider } from "@/components/layout/SiteProvider";
import { PageHero } from "@/components/ui/PageHero";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Social Media Management",
  description:
    "Double Shot manages social media as a connected growth function — strategy, content, paid performance, and community across Instagram, Facebook, TikTok, LinkedIn, and X for FMCG and lifestyle brands.",
  path: "/services/social-media",
  image: "/media/case-studies/social-media/p05.jpg",
});

const WHY = [
  "Market research grounded in industry insights and competitor analysis",
  "Quarterly content strategies tailored to Instagram, Facebook, TikTok, LinkedIn, and X",
  "Campaign-based content built around engagement, awareness, and conversion goals",
  "Paid social strategies to amplify performance and reach the right audience",
  "Community management that strengthens brand presence and audience connection",
  "A performance-balanced approach between brand building and measurable business results",
];

const WORK = [
  { n: 5, brand: "iSiS Organic", note: "Organic FMCG — feed & campaigns" },
  { n: 6, brand: "Força", note: "Construction brand — bold seasonal content" },
  { n: 7, brand: "Events & Lifestyle", note: "Campaigns, carnivals & community" },
  { n: 8, brand: "Hospitality", note: "Café & dining — elegant brand storytelling" },
];

const imgSrc = (n: number) =>
  `/media/case-studies/social-media/p${String(n).padStart(2, "0")}.jpg`;

const h2Style = { fontSize: "clamp(1.6rem,4vw,2.4rem)", margin: "0.5rem 0 2.5rem", color: "var(--text-strong)" };

export default function SocialMediaPage() {
  return (
    <SiteProvider activeNav="services" innerPage>
      <PageHero
        label="Social Media Management"
        title={
          <>
            Social Media <span className="text-gold">That Works</span>
          </>
        }
        subtitle="We manage social media as a connected growth function — strategy, content, paid performance, and community that build brand equity while delivering measurable business results."
      />

      {/* Hero banner — replace public/media/services/social-media-hero.jpg (1920×600) */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="cs-slide reveal" style={{ overflow: "hidden" }}>
            <Image
              src="/media/services/social-media-hero.jpg"
              alt="DBLSHOT social media work"
              width={1920}
              height={600}
              priority
              style={{ width: "100%", height: "auto", display: "block" }}
            />
          </div>
        </div>
      </section>

      {/* Who we are */}
      <section className="section">
        <div className="container content-shell content-prose">
          <span className="section-label reveal">Who We Are</span>
          <p className="reveal" style={{ fontSize: "1.15rem" }}>
            We help brands create a stronger, more consistent presence across Instagram, Facebook,
            TikTok, LinkedIn, and X — through social media systems designed to do more than look
            active. Our approach starts with market research: uncovering industry dynamics,
            competitor behavior, and audience insights that shape smarter decisions.
          </p>
          <p className="reveal">
            From there, we develop quarter-based content strategies tailored to each platform, then
            create campaign-based content built around specific objectives — engagement, awareness,
            lead generation, or conversion. We amplify the right content with paid social, and
            through active community management we keep your brand responsive, relevant, and
            connected every day. The result is social media that becomes a strategic driver of
            growth — not just a content calendar.
          </p>
        </div>
      </section>

      {/* Why partner with us */}
      <section className="section section--glow">
        <div className="container content-shell">
          <span className="section-label reveal">Why Partner With Us</span>
          <h2 className="reveal" style={h2Style}>
            Social media built for <span className="text-gold">Deep Impact</span>
          </h2>
          <ul className="checklist reveal">
            {WHY.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* Selected work */}
      <section className="section">
        <div className="container">
          <span className="section-label reveal">Selected Work</span>
          <h2 className="reveal" style={h2Style}>
            Brands we&apos;ve <span className="text-gold">grown</span>
          </h2>
          <div className="cs-gallery reveal-stagger">
            {WORK.map((w) => (
              <figure className="cs-work" key={w.n}>
                <Image className="cs-slide" src={imgSrc(w.n)} alt={`${w.brand} social media feed`} width={1536} height={1152} />
                <figcaption className="cs-work__cap">
                  <strong>{w.brand}</strong>
                  <span>{w.note}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section cta-section">
        <div className="container">
          <div className="cta-box reveal">
            <h2 style={{ fontSize: "clamp(2rem,6vw,3.5rem)", fontWeight: 800, margin: 0, color: "var(--ink)" }}>
              Let&apos;s Talk
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
