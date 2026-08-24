import { SiteProvider } from "@/components/layout/SiteProvider";
import { PageHero } from "@/components/ui/PageHero";
import { PageCTA } from "@/components/ui/PageCTA";
import { CaseStudyCard } from "@/components/ui/CaseStudyCard";
import { BlogCard } from "@/components/ui/BlogCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getAllCaseStudies } from "@/lib/content/case-studies";
import { BLOG_POSTS } from "@/lib/content/blogs";
import { DEEP_IMPACT_STATS } from "@/lib/content";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Deep Impact",
  description:
    "The measurable impact DBLSHOT delivers for FMCG brands — headline numbers, client case studies, and insights on scaling across Amazon, e-commerce, and marketplace growth.",
  path: "/deep-impact",
});

/** Same order the standalone Blogs page used. */
const BLOG_ORDER = ["ecommerce", "ramadan-preparation", "egypt-dessert-market"];

/** Hidden on this page only — /case-studies still lists the full set. */
const HIDDEN_SLUGS = new Set(["ltf", "zeina", "raw", "cimento-forca", "wingo"]);

export default function DeepImpactPage() {
  const studies = getAllCaseStudies().filter((s) => !HIDDEN_SLUGS.has(s.slug));
  const posts = BLOG_ORDER.map((slug) => BLOG_POSTS.find((p) => p.slug === slug)).filter(
    (p): p is (typeof BLOG_POSTS)[number] => Boolean(p),
  );

  return (
    <SiteProvider innerPage>
      <PageHero
        label="Deep Impact"
        title={
          <>
            Deep <span className="text-gold">Impact</span>
          </>
        }
        subtitle="The numbers we've moved, the brands behind them, and what we've learned along the way — case studies and insights in one place."
      />

      {/* Headline numbers */}
      <section className="section section--glow">
        <div className="container">
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

      {/* Every case study */}
      <section className="section">
        <div className="container">
          <SectionHeading center>
            Case <span className="text-gold">Studies</span>
          </SectionHeading>
          <div className="blogs-grid reveal-stagger">
            {studies.map((study) => (
              <CaseStudyCard key={study.slug} study={study} />
            ))}
          </div>
        </div>
      </section>

      {/* Knowledge Drop — the former /blogs content */}
      <section className="section section--glow" id="knowledge">
        <div className="container">
          <SectionHeading center>
            Knowledge <span className="text-gold">Drop</span>
          </SectionHeading>
          <p
            className="reveal content-prose"
            style={{ maxWidth: 640, margin: "0 auto 2.5rem", textAlign: "center" }}
          >
            Insights and guides for FMCG brands scaling in Egypt and the GCC.
          </p>
          <div className="blogs-grid reveal" style={{ alignItems: "start" }}>
            {posts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </section>

      <PageCTA
        title="Your brand could be next"
        description="Let's replicate this impact for your FMCG brand."
      />
    </SiteProvider>
  );
}
