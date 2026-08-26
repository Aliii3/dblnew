import Link from "next/link";
import { SiteProvider } from "@/components/layout/SiteProvider";
import { PageHero } from "@/components/ui/PageHero";
import { PageCTA } from "@/components/ui/PageCTA";
import { JobIcon } from "@/components/ui/JobIcon";
import { JOBS } from "@/lib/content/jobs";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Careers",
  description: "Join the DBLSHOT team in New Cairo — strategists, creators, and operators.",
  path: "/careers",
});

function formatMeta(tag: string): string {
  if (tag.includes(":")) return tag;
  if (/year|month|part[- ]?time|full[- ]?time|intern/i.test(tag)) return `Experience: ${tag}`;
  return `Location: ${tag}`;
}

export default function CareersPage() {
  return (
    <SiteProvider activeNav="careers" innerPage>
      <PageHero
        label="Careers"
        title={
          <>
            Join the <span className="text-gold">Impact</span>
          </>
        }
        ctaLabel="See Open Roles"
        ctaHref="#roles"
      />

      <section className="section" id="roles">
        <div className="container">
          <p className="reveal content-prose" style={{ maxWidth: 640, color: "var(--muted)", marginBottom: "3rem" }}>
            We&apos;re building a team of strategists, creators, and operators in New Cairo.
          </p>
          <div className="offer-cards__list career-cards" style={{ maxWidth: 900 }}>
            {JOBS.map((job) => (
              <Link className="offer-card career-card" href={`/careers/${job.slug}`} key={job.slug}>
                <span className="offer-card__icon" aria-hidden="true">
                  <JobIcon name={job.icon} />
                </span>
                <span className="offer-card__body">
                  <span className="offer-card__title">{job.title}</span>
                  <span className="offer-card__desc">{job.description}</span>
                  {job.tags.length > 0 ? (
                    <span className="career-card__meta">
                      {job.tags.map((tag) => (
                        <span key={tag}>{formatMeta(tag)}</span>
                      ))}
                    </span>
                  ) : null}
                </span>
                <span className="career-card__apply">
                  Apply <span aria-hidden="true">→</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <PageCTA
        title="Don't see your role?"
        description="Send your CV to our team — we're always looking for exceptional talent."
        buttonLabel="Get in Touch"
      />
    </SiteProvider>
  );
}
