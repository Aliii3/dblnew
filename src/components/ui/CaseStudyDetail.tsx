import Image from "next/image";
import Link from "next/link";
import { SiteProvider } from "@/components/layout/SiteProvider";
import { PageCTA } from "@/components/ui/PageCTA";
import { CaseStudyBar, type CaseTabKey } from "@/components/ui/CaseStudyBar";
import { CASE_STUDY_LOGOS } from "@/lib/content/clients";

export type CSStat = { value: string; label: string };
export type CSSection = {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
  stats?: CSStat[];
};
export type CSSwatch = { name: string; hex: string };
export type CSRelated = { label: string; href: string };

export type CaseStudySpec = {
  slug: string;
  category: string;
  brand: React.ReactNode;
  tagline: string;
  meta: { label: string; value: string }[];
  heroImage?: string;
  /** Shown in place of heroImage when set. heroImage doubles as its poster. */
  heroVideo?: string;
  heroStats: CSStat[];
  sections: CSSection[];
  palette?: CSSwatch[];
  results?: CSStat[];
  related: CSRelated[];
  caseBarActive?: CaseTabKey;
};

function StatRow({ stats }: { stats: CSStat[] }) {
  return (
    <div className="cs-stats reveal-stagger">
      {stats.map((s) => (
        <div className="cs-stat" key={s.label}>
          <strong>{s.value}</strong>
          <span>{s.label}</span>
        </div>
      ))}
    </div>
  );
}

export function CaseStudyDetail({ spec }: { spec: CaseStudySpec }) {
  return (
    <SiteProvider activeNav="services" innerPage>
      {/* Hero */}
      <section className="cs-detail-hero">
        <div className="container">
          <span className="section-label reveal">{spec.category}</span>
          {CASE_STUDY_LOGOS[spec.slug] ? (
            <span className="cs-detail-hero__logo reveal">
              <Image
                src={CASE_STUDY_LOGOS[spec.slug]}
                alt=""
                width={200}
                height={80}
                style={{ height: 56, width: "auto", maxWidth: 180, objectFit: "contain" }}
              />
            </span>
          ) : null}
          <h1 className="cs-detail-hero__title reveal">{spec.brand}</h1>
          <p className="cs-detail-hero__tagline reveal">{spec.tagline}</p>
          <dl className="cs-meta reveal-stagger">
            {spec.meta.map((m) => (
              <div className="cs-meta__item" key={m.label}>
                <dt>{m.label}</dt>
                <dd>{m.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {spec.caseBarActive ? <CaseStudyBar active={spec.caseBarActive} /> : null}

      {spec.heroVideo || spec.heroImage ? (
        <section className="section" style={{ paddingTop: 0 }}>
          <div className="container">
            <div className="cs-slide reveal" style={{ overflow: "hidden" }}>
              {spec.heroVideo ? (
                /* No poster: heroImage is a portrait card crop and would force
                   the element to its aspect. preload="metadata" renders the
                   first frame without pulling the whole file. */
                <video
                  className="cs-hero-video"
                  src={spec.heroVideo}
                  controls
                  playsInline
                  preload="metadata"
                />
              ) : (
                <Image
                  src={spec.heroImage!}
                  alt=""
                  width={1536}
                  height={864}
                  style={{ width: "100%", height: "auto", display: "block" }}
                  priority
                />
              )}
            </div>
          </div>
        </section>
      ) : null}

      {/* Hero stats */}
      <section
        className="section"
        style={{ paddingTop: spec.heroVideo || spec.heroImage ? undefined : "1rem" }}
      >
        <div className="container">
          <StatRow stats={spec.heroStats} />
        </div>
      </section>

      {/* Body sections */}
      <section className="prose-section">
        <div className="container content-shell">
          {spec.sections.map((sec, i) => (
            <div className="cs-block" key={i}>
              <h2 className="reveal cs-block__heading">{sec.heading}</h2>
              {sec.paragraphs?.map((p, j) => (
                <p className="reveal cs-block__p" key={j}>
                  {p}
                </p>
              ))}
              {sec.bullets ? (
                <ul className="checklist reveal">
                  {sec.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              ) : null}
              {sec.stats ? <StatRow stats={sec.stats} /> : null}
            </div>
          ))}

          {/* Palette */}
          {spec.palette ? (
            <div className="cs-block">
              <h2 className="reveal cs-block__heading">Color Palette</h2>
              <div className="cs-palette reveal-stagger">
                {spec.palette.map((c) => (
                  <div className="cs-swatch" key={c.name}>
                    <span className="cs-swatch__chip" style={{ background: c.hex }} />
                    <span className="cs-swatch__name">{c.name}</span>
                    <span className="cs-swatch__hex">{c.hex}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </section>

      {/* Results */}
      {spec.results ? (
        <section className="section section--glow">
          <div className="container">
            <h2 className="reveal" style={{ fontSize: "1.5rem", textTransform: "uppercase", margin: "0 0 1.5rem", color: "var(--text-strong)" }}>
              Results
            </h2>
            <StatRow stats={spec.results} />
          </div>
        </section>
      ) : null}

      {/* Related services */}
      <section className="section" style={{ paddingBottom: 0 }}>
        <div className="container">
          <div className="cs-related reveal">
            <span className="cs-related__label">Related Services</span>
            <div className="cs-related__links">
              {spec.related.map((r) => (
                <Link key={r.href} href={r.href} className="cs-related__link">
                  {r.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <PageCTA
        title="Let's Talk"
        description="Powered by Dblshot — Performance Marketing, E-Commerce & Branding."
      />
    </SiteProvider>
  );
}
