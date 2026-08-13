import Image from "next/image";
import Link from "next/link";
import { SiteProvider } from "@/components/layout/SiteProvider";
import { AboutVideo } from "@/components/about/AboutVideo";
import { PhotoHero } from "@/components/ui/PhotoHero";
import { TickerCross } from "@/components/ui/TickerCross";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TeamMotif } from "@/components/ui/TeamMotif";
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

      <section className="section">
        <div className="container">
          <p
            className="reveal"
            style={{
              maxWidth: 640,
              marginBottom: "2.5rem",
              fontFamily: "var(--font-display)",
              fontWeight: 600,
              fontSize: "clamp(1.3rem, 2.6vw, 1.75rem)",
              lineHeight: 1.35,
              color: "var(--text-strong)",
            }}
          >
            {ABOUT_COPY.heroSubtitle}
          </p>
          <div className="split split--text-first reveal-stagger">
            <div className="content-shell content-prose">
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
      <section className="section" id="team">
        <div className="container">
          <span className="section-label reveal">Meet the Minds</span>
          <SectionHeading>
            Behind the <span className="text-gold">Impact</span>
          </SectionHeading>
          {ABOUT_COPY.teamIntro.map((p) => (
            <p key={p} className="reveal content-prose" style={{ maxWidth: 720, margin: "0 0 1rem" }}>
              {p}
            </p>
          ))}
          <div className="team-grid team-grid--enhanced reveal-stagger" style={{ marginTop: "2.5rem" }}>
            {HOME_TEAM.map((member) => {
              const inner = (
                <>
                  <div className="team-card__img">
                    {member.motif ? <TeamMotif name={member.motif} /> : null}
                    <Image src={member.image} alt={member.name} width={400} height={500} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                  <h4>{member.name}</h4>
                  {member.role ? <p>{member.role}</p> : null}
                </>
              );
              return <div className="team-card" key={member.name}>{inner}</div>;
            })}
          </div>
        </div>
      </section>

      {/* Dblshot Journey Timeline */}
      <section className="section section--glow" id="journey">
        <div className="container">
          <span className="section-label reveal">🚀 Launch Sequence Initiated</span>
          <h2 className="reveal" style={{ fontSize: "clamp(1.8rem,4vw,2.6rem)", margin: "0.5rem 0 1rem" }}>
            {JOURNEY.title.replace("Dblshot", "")} <span className="text-gold">Dblshot</span>
          </h2>
          <p className="reveal content-prose" style={{ maxWidth: 640, color: "var(--muted)", marginBottom: "3rem" }}>
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
    </SiteProvider>
  );
}
