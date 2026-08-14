import Link from "next/link";
import { SiteProvider } from "@/components/layout/SiteProvider";
import { AboutVideo } from "@/components/about/AboutVideo";
import { PhotoHero } from "@/components/ui/PhotoHero";
import { TickerCross } from "@/components/ui/TickerCross";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TeamGrid } from "@/components/ui/TeamGrid";
import { ABOUT_COPY, JOURNEY } from "@/lib/content/about";
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
              {JOURNEY.title.replace("Dblshot", "")} <span className="text-gold">Dblshot</span>
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
                    <p className="timeline__text">{m.body}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="timeline__footer reveal">
              {JOURNEY.stats.map((s) => (
                <span key={s}>{s}</span>
              ))}
            </div>
          </div>
        </section>
      </div>
    </SiteProvider>
  );
}
