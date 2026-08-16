import { notFound } from "next/navigation";
import { SiteProvider } from "@/components/layout/SiteProvider";
import { PageHero } from "@/components/ui/PageHero";
import { PageCTA } from "@/components/ui/PageCTA";
import { FramerProse } from "@/components/ui/FramerProse";
import { getAllServiceSlugs, getService } from "@/lib/content/sync";
import { createPageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

const SKIP_HEADINGS = new Set([
  "Why Partner with Us?",
  "Why Partner with Us?✅ Market research grounded in industry insights and competitor analysis.",
]);

export async function generateStaticParams() {
  return getAllServiceSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return { title: "Services" };
  return createPageMetadata({
    title: service.hero,
    description: service.intro.slice(0, 160),
    path: `/services/${slug}`,
  });
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const extraSections = service.sections.filter(
    (s) => s.heading && !SKIP_HEADINGS.has(s.heading) && !s.heading.startsWith("At Dblshot"),
  );

  return (
    <SiteProvider activeNav="services" innerPage>
      <PageHero label="Services" title={service.hero} />
      <section className="prose-section">
        <div className="container content-shell content-prose">
          {service.intro ? <p className="reveal">{service.intro}</p> : null}
          {service.detail ? <p className="reveal">{service.detail}</p> : null}
          {service.benefits.length > 0 ? (
            <>
              <h2 className="reveal" style={{ fontSize: "1.35rem", textTransform: "uppercase", margin: "2rem 0 1rem", color: "#1f3465" }}>
                Why Partner with Us?
              </h2>
              <ul className="checklist reveal">
                {service.benefits.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </>
          ) : null}
          {service.closing ? <p className="reveal" style={{ color: "var(--ice)", marginTop: "2rem" }}>{service.closing}</p> : null}
          {extraSections.length > 0 ? <FramerProse sections={extraSections} /> : null}
        </div>
      </section>
      <PageCTA title="Start your project" description="Tell us about your brand and we'll craft a growth plan." />
    </SiteProvider>
  );
}
