import Image from "next/image";
import Link from "next/link";
import type { CaseStudyCard as CaseStudyCardData } from "@/lib/content/case-studies";

export function CaseStudyCard({ study }: { study: CaseStudyCardData }) {
  const body = (
    <>
      <div className="blog-card__img">
        <Image
          src={study.image}
          alt=""
          width={600}
          height={400}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        <span className="case-study-card__badge">
          {study.comingSoon ? "Coming Soon" : "Case Study"}
        </span>
      </div>
      <div className="blog-card__body">
        <div className="case-study-card__head">
          {study.logo ? (
            <span className="case-study-card__logo">
              <Image src={study.logo} alt={`${study.title} logo`} width={96} height={40} style={{ height: 28, width: "auto", maxWidth: 96, objectFit: "contain" }} />
            </span>
          ) : null}
          <div className="blog-card__tag">{study.subtitle}</div>
        </div>
        <h3>{study.title}</h3>
        <p className="case-study-card__excerpt">{study.excerpt}</p>
        {!study.comingSoon && study.metrics?.length ? (
          <div className="case-study-card__metrics">
            {study.metrics.map((m) => (
              <span key={m.label}>
                <strong>{m.value}</strong> {m.label}
              </span>
            ))}
          </div>
        ) : null}
        <span className="blog-card__cta">
          {study.comingSoon ? "Coming soon" : "View Results →"}
        </span>
      </div>
    </>
  );

  if (study.comingSoon) {
    return (
      <div className="blog-card case-study-card case-study-card--soon" aria-disabled="true">
        {body}
      </div>
    );
  }

  return (
    <Link className="blog-card case-study-card" href={`/case-studies/${study.slug}`}>
      {body}
    </Link>
  );
}
