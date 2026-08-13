import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteProvider } from "@/components/layout/SiteProvider";
import { PageHero } from "@/components/ui/PageHero";
import { PageCTA } from "@/components/ui/PageCTA";
import { FramerProse } from "@/components/ui/FramerProse";
import { CaseStudyBar, CASE_BAR_KEYS, type CaseTabKey } from "@/components/ui/CaseStudyBar";
import { getAllCaseStudySlugs, getCaseStudy } from "@/lib/content/sync";
import { getAllCaseStudies } from "@/lib/content/case-studies";
import { createPageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getAllCaseStudySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return { title: "Case Study" };
  const card = getAllCaseStudies().find((s) => s.slug === slug);
  return createPageMetadata({
    title: study.title,
    description: study.subtitle || study.intro.slice(0, 160),
    path: `/case-studies/${slug}`,
    image: card?.image,
  });
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  const showCaseBar = CASE_BAR_KEYS.includes(slug as CaseTabKey);

  return (
    <SiteProvider innerPage>
      <PageHero label="Case Study" title={study.title} subtitle={study.subtitle || undefined} />
      {showCaseBar ? <CaseStudyBar active={slug as CaseTabKey} /> : null}
      <section className="prose-section">
        <div className="container prose-layout">
          <FramerProse sections={study.sections} lead={study.intro || undefined} />
          <aside className="prose-aside reveal">
            <h4>Work with us</h4>
            <p style={{ color: "var(--muted)", fontSize: "0.9rem", marginBottom: "1rem" }}>
              Ready to scale your brand?
            </p>
            <Link className="btn btn--primary btn--magnetic" href="/contact" style={{ width: "100%" }}>
              Let&apos;s Talk
            </Link>
          </aside>
        </div>
      </section>
      <PageCTA title="Your brand could be next" description="Let's replicate this impact for your FMCG brand." />
    </SiteProvider>
  );
}
