import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteProvider } from "@/components/layout/SiteProvider";
import { PageHero } from "@/components/ui/PageHero";
import { PageCTA } from "@/components/ui/PageCTA";
import { FramerProse } from "@/components/ui/FramerProse";
import { getAllCareerSlugs, getCareer } from "@/lib/content/sync";
import { createPageMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getAllCareerSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const career = getCareer(slug);
  if (!career) return { title: "Careers" };
  return createPageMetadata({
    title: career.title,
    description: `Join DBLSHOT as ${career.title}. Apply now — ${SITE.address}.`,
    path: `/careers/${slug}`,
  });
}

export default async function CareerDetailPage({ params }: Props) {
  const { slug } = await params;
  const career = getCareer(slug);
  if (!career) notFound();

  const sections = career.sections.length > 0
    ? career.sections
    : [{ heading: null, paragraphs: career.paragraphs }];

  const subject = `Application — ${career.title}`;
  const body = `Hi DBLSHOT team,

I'd like to apply for the ${career.title} role.

Name:
Phone:
Portfolio / LinkedIn:

(Please attach your CV and portfolio.)

Thanks!`;
  const mailtoHref = `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  return (
    <SiteProvider activeNav="careers" innerPage>
      <PageHero label="Careers" title={career.title} />
      <section className="prose-section">
        <div className="container prose-layout">
          <FramerProse sections={sections} />
          <aside className="prose-aside reveal">
            <h4>Apply now</h4>
            <p style={{ color: "var(--muted)", fontSize: "0.9rem", marginBottom: "1rem" }}>
              Send your CV and portfolio to our team.
            </p>
            <a className="btn btn--primary" href={mailtoHref} style={{ width: "100%" }}>
              Apply via Email
            </a>
            <Link className="btn btn--ghost" href="/careers" style={{ width: "100%", marginTop: "0.75rem" }}>
              All openings
            </Link>
          </aside>
        </div>
      </section>
      <PageCTA
        title={`Apply for ${career.title}`}
        description="Send your CV and we'll get back to you within a few business days."
        buttonLabel="Apply via Email"
        buttonHref={mailtoHref}
      />
    </SiteProvider>
  );
}
