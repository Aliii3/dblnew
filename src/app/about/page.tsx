import Link from "next/link";
import { SiteProvider } from "@/components/layout/SiteProvider";
import { AboutVideo } from "@/components/about/AboutVideo";
import { PhotoHero } from "@/components/ui/PhotoHero";
import { TickerCross } from "@/components/ui/TickerCross";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TeamGrid } from "@/components/ui/TeamGrid";
import { ABOUT_COPY, JOURNEY, MISSION_VISION, VALUES } from "@/lib/content/about";
import { HOME_TEAM } from "@/lib/content/home";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "About Us",
  description: "Meet Radwa Fathi and the DBLSHOT team — strategic performance marketing for FMCG brands.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <SiteProvider activeNav="about" innerPage>
      <div className="about-page">
        <PhotoHero
          id="about-hero"
          image="/media/team/radwa.png"
          objectPosition="50% 46%"
          zoom={1.7}
          eyebrow="About Dblshot"
          title={
            <>
              Watch Our <span className="hero2__swap">Story</span>
            </>
          }
        />
        <TickerCross
          items={["Strategy", "FMCG Growth", "E-Commerce", "Amazon Ads", "Branding", "Performance Marketing"]}
        />

        <section className="section about-page__intro">
          <div className="container">
            <p className="about-page__lead reveal">{ABOUT_COPY.heroSubtitle}</p>
            <div className="split split--text-first about-page__split reveal-stagger">
              <div className="content-shell content-prose about-page__copy">
                {ABOUT_COPY.paragraphs.map((p) => (
                  <p key={p.slice(0, 40)} className="reveal">{p}</p>
                ))}
                <Link className="btn btn--primary btn--magnetic reveal" href="/contact">
                  Let&apos;s Talk
                </Link>
              </div>
              <AboutVideo src={ABOUT_COPY.videoUrl} poster={ABOUT_COPY.videoPoster} />
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="section section--glow" id="mission">
          <div className="container content-shell">
            <span className="section-label reveal">Why We Exist</span>
            <SectionHeading>
              Mission &amp; <span className="text-gold">Vision</span>
            </SectionHeading>
            <div className="pillars reveal-stagger">
              {MISSION_VISION.map((m) => (
                <article className="pillar" key={m.kicker}>
                  <span className="pillar__kicker">{m.kicker}</span>
                  <h3 className="pillar__title">{m.title}</h3>
                  <p className="pillar__body">{m.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="section" id="values">
          <div className="container content-shell">
            <span className="section-label reveal">What We Stand For</span>
            <SectionHeading>
              <span className="text-blue">Dblshot</span> <span className="text-gold">Values</span>
            </SectionHeading>
            <div className="values-accordion reveal-stagger">
              {VALUES.map((v, i) => (
                <details className="values-accordion__item" key={v.title} open={i === 0}>
                  <summary className="values-accordion__summary">
                    <span className="values-accordion__num">{String(i + 1).padStart(2, "0")}</span>
                    <span className="values-accordion__title">{v.title}</span>
                    <span className="values-accordion__icon" aria-hidden="true">
                      +
                    </span>
                  </summary>
                  <div className="values-accordion__body">
                    <p>{v.body}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Meet the team */}
        <section className="section about-page__team" id="team">
          <div className="container">
            <span className="section-label reveal">Meet the Minds</span>
            <SectionHeading>
              Behind the <span className="text-gold">Impact</span>
            </SectionHeading>
            <div className="about-page__team-intro">
              {ABOUT_COPY.teamIntro.map((p) => (
                <p key={p} className="reveal content-prose">
                  {p}
                </p>
              ))}
            </div>
            <TeamGrid members={HOME_TEAM} />
          </div>
        </section>

        {/* Dblshot Journey Timeline */}
        <section className="section section--glow about-page__journey" id="journey">
          <div className="container">
            <span className="section-label reveal">Launch Sequence Initiated</span>
            <h2 className="about-page__journey-title reveal">
              {JOURNEY.title.split("Dblshot")[0]}
              <span className="text-gold">Dblshot</span>
              {JOURNEY.title.split("Dblshot")[1]}
            </h2>
            <p className="about-page__journey-intro reveal content-prose">
              {JOURNEY.intro}
            </p>
            <ol className="timeline">
              <span className="timeline__progress" aria-hidden="true" />
              <span className="timeline__rocket" aria-hidden="true">🚀</span>
              {JOURNEY.milestones.map((m) => (
                <li className="timeline__item reveal" key={m.year}>
                  <div className="timeline__marker" aria-hidden="true">
                    <span className="timeline__dot" />
                  </div>
                  <div className="timeline__body">
                    <span className="timeline__year">{m.year}</span>
                    <h3 className="timeline__headline">
                      {m.phase}: <span className="text-gold">{m.headline}</span>
                    </h3>
                    {m.body.map((p) => (
                      <p className="timeline__text" key={p.slice(0, 40)}>
                        {p}
                      </p>
                    ))}
                  </div>
                </li>
              ))}
            </ol>
            <div className="timeline__footer reveal">
              {JOURNEY.stats.map((s) => (
                <span key={s}>{s}</span>
              ))}
            </div>

            <div className="about-page__story content-prose">
              <h3 className="reveal" style={{ fontSize: "1.05rem", textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--gold-text)", margin: "0 0 1rem" }}>
                {JOURNEY.epilogueHeading}
              </h3>
              {JOURNEY.epilogue.map((p) => (
                <p className="reveal" key={p.slice(0, 40)}>
                  {p}
                </p>
              ))}
            </div>

            <p className="reveal" style={{ color: "var(--ice)", marginTop: "2.5rem", fontSize: "1.1rem" }}>
              {JOURNEY.closing}
            </p>
            <p className="reveal text-gold" style={{ fontWeight: 800, fontSize: "1.25rem", marginTop: "0.5rem" }}>
              {JOURNEY.signature}
            </p>
          </div>
        </section>
      </div>
    </SiteProvider>
  );
}
