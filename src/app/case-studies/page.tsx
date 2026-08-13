import { SiteProvider } from "@/components/layout/SiteProvider";
import { PhotoHero } from "@/components/ui/PhotoHero";
import { TickerCross } from "@/components/ui/TickerCross";
import { PageCTA } from "@/components/ui/PageCTA";
import { CaseStudyCard } from "@/components/ui/CaseStudyCard";
import { getAllCaseStudies } from "@/lib/content/case-studies";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Case Studies",
  description: "FMCG growth results — Amazon, e-commerce, and marketplace success stories from DBLSHOT clients.",
  path: "/case-studies",
});

export default function CaseStudiesPage() {
  const studies = getAllCaseStudies();

  return (
    <SiteProvider innerPage>
      <PhotoHero
        id="case-studies-hero"
        image="/media/case-studies/rehana-table.jpg"
        objectPosition="50% 35%"
        eyebrow="Our Work"
        title={
          <>
            Client <span className="hero2__swap">Results</span>
          </>
        }
        actions={[{ label: "Start Your Project", href: "/contact" }]}
      />
      <TickerCross
        items={["Real Growth", "Real Brands", "Amazon Wins", "E-Commerce Scale", "Proven Results", "FMCG Focus"]}
      />

      <section className="section">
        <div className="container">
          <p className="reveal content-prose" style={{ maxWidth: 640, color: "var(--muted)", marginBottom: "3rem" }}>
            Real growth stories from FMCG brands we&apos;ve scaled across Amazon and e-commerce in Egypt and the
            GCC.
          </p>
          <div className="blogs-grid reveal-stagger">
            {studies.map((study) => (
              <CaseStudyCard key={study.slug} study={study} />
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
