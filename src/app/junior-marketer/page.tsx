import Image from "next/image";
import { SiteProvider } from "@/components/layout/SiteProvider";
import { PageHero } from "@/components/ui/PageHero";
import { PageCTA } from "@/components/ui/PageCTA";
import { JUNIOR_MARKETER } from "@/lib/content/junior-marketer";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Junior Marketer — Round 3",
  description:
    "Round 3 of DBLSHOT's Junior Marketer program — a 5-week launchpad where ambitious juniors (10–15) learn marketing, build a brand, and launch it.",
  path: "/junior-marketer",
});

const WEEKS = [
  { num: "01", title: "Marketing Foundations" },
  { num: "02", title: "Make Your Own Brand" },
  { num: "03", title: "Develop Your Marketing Plan" },
  { num: "04", title: "Launch Your Project" },
  { num: "05", title: "Penetrate The Market" },
];

const FOR_YOU = [
  "You're between 10 and 15 years old",
  "You're curious about marketing, branding, or content",
  "You want to build confidence and express yourself",
  "You're a creative thinker — or want to become one",
  "You're excited to work on real ideas with a real team",
];

const DETAILS = [
  { label: "Duration", value: "5 Weeks" },
  { label: "Schedule", value: "Mon & Wed · 6–8 PM" },
  { label: "Starting", value: "Coming Soon" },
  { label: "Group Size", value: "15–20 juniors" },
];

const EARLY_BIRD = [
  "Priority seat reservation",
  "Special welcome kit",
  "First access to exclusive updates",
];

const MENTOR_BIO =
  "She's not just the CEO of DOUBLESHOT Performance Marketing — she is the pulse of Egypt's marketing evolution. With 20+ years of strategy and a heart that beats for local brilliance, Radwa blends analytical precision with soul-stirring creativity. She doesn't just build campaigns; she builds movements — sparking unity among local brands and mentoring young minds to chase purpose over popularity.";

export default function JuniorMarketerPage() {
  const j = JUNIOR_MARKETER;
  return (
    <SiteProvider innerPage>
      <section className="page-hero">
        <div className="container">
          <span className="jrm-badge reveal">★ Round 3 · Coming Soon</span>
          <h1 className="page-hero__title" style={{ marginTop: "1.25rem" }}>
            <span className="reveal-line">
              <span>
                Let Your Marketing <span className="text-gold">Journey Begin</span>
              </span>
            </span>
          </h1>
          <p className="page-hero__sub reveal">
            It&apos;s not just a course. It&apos;s your launchpad — built for ambitious juniors ready
            to think bigger and grow faster.
          </p>
          <div className="jrm-meta reveal">
            <span>👤 Ages <b>10–15</b></span>
            <span>🗓️ <b>5 weeks</b></span>
            <span>📍 <b>FAMBAM</b>, New Cairo + Online</span>
          </div>
        </div>
      </section>

      {/* What is it */}
      <section className="section">
        <div className="container content-shell content-prose">
          <span className="section-label reveal">The Program</span>
          <h2 className="jrm-h2 reveal">
            What&apos;s <span className="text-gold">Junior Marketer?</span>
          </h2>
          <p className="jrm-lead reveal">{j.programBody}</p>
          <p className="reveal" style={{ color: "var(--gold)", fontWeight: 700, margin: "1.75rem 0 1rem" }}>
            But we don&apos;t stop at theory — our juniors get hands-on experience:
          </p>
          <ul className="jrm-check reveal">
            {j.handsOnItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* 5-week journey */}
      <section className="section section--glow">
        <div className="container">
          <span className="section-label reveal">The Journey</span>
          <h2 className="jrm-h2 reveal">
            5 weeks, <span className="text-gold">zero to launch</span>
          </h2>
          {/* Animated as one block: a per-card stagger offsets them by 50px,
              which reads as misalignment and collides with the copy below. */}
          <div className="jrm-timeline reveal" style={{ marginTop: "2rem" }}>
            {WEEKS.map((w) => (
              <div className="jrm-week" key={w.num}>
                <span className="jrm-week__n">Week {w.num}</span>
                <div className="jrm-week__t">{w.title}</div>
              </div>
            ))}
          </div>
          <p className="jrm-lead reveal content-prose" style={{ maxWidth: 760, marginTop: "2.25rem" }}>{j.tools}</p>
          <p className="reveal content-prose" style={{ maxWidth: 760, marginTop: "1rem", color: "var(--muted)", lineHeight: 1.8 }}>
            <strong style={{ color: "#fff" }}>Our mission?</strong> {j.mission}
          </p>
        </div>
      </section>

      {/* Mentor */}
      <section className="section">
        <div className="container">
          <div className="cs-feature reveal-stagger">
            <div className="cs-feature__media">
              <Image
                src="/media/team/radwa.png"
                alt="Radwa Fathi"
                width={900}
                height={600}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
            <div>
              <span className="section-label reveal">About the Mentor</span>
              <h2 className="jrm-h2 reveal" style={{ marginBottom: "0.25rem" }}>Radwa Fathi</h2>
              <p className="reveal text-gold text-gold--link" style={{ fontWeight: 600, marginBottom: "1.25rem" }}>
                The Bold Architect of Egyptian Brands
              </p>
              <p className="reveal" style={{ color: "var(--muted)", lineHeight: 1.8 }}>{MENTOR_BIO}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Made for you */}
      <section className="section section--glow">
        <div className="container content-shell">
          <span className="section-label reveal">Is It For You?</span>
          <h2 className="jrm-h2 reveal">
            Jr. Marketer is made for you <span className="text-gold">if…</span>
          </h2>
          <ul className="jrm-check reveal" style={{ marginTop: "1.5rem" }}>
            {FOR_YOU.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* Program details + pricing */}
      <section className="section">
        <div className="container">
          <span className="section-label reveal">Program Details</span>
          <h2 className="jrm-h2 reveal">
            The <span className="text-gold">essentials</span>
          </h2>
          <div className="jrm-info reveal-stagger" style={{ margin: "1.5rem 0 2.75rem" }}>
            {DETAILS.map((d) => (
              <div className="jrm-info__item" key={d.label}>
                <div className="jrm-info__label">{d.label}</div>
                <div className="jrm-info__value">{d.value}</div>
              </div>
            ))}
          </div>
          <div className="jrm-pricing reveal-stagger">
            <div className="jrm-price jrm-price--featured">
              <span className="jrm-price__badge">Best value</span>
              <span className="jrm-price__tier">Early Bird</span>
              <div className="jrm-price__amount">
                4,900 <span>EGP</span>
              </div>
              <p className="jrm-price__note">The earlier you join, the more you gain.</p>
              <ul>
                {EARLY_BIRD.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </div>
            <div className="jrm-price">
              <span className="jrm-price__tier">Regular</span>
              <div className="jrm-price__amount">
                5,500 <span>EGP</span>
              </div>
              <p className="jrm-price__note">Standard registration.</p>
              <ul>
                <li>Full 5-week program</li>
                <li>Hands-on projects & mentorship</li>
                <li>Hybrid attendance</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Attendance options */}
      <section className="section section--glow">
        <div className="container">
          <span className="section-label reveal">Secure Your Spot</span>
          <h2 className="jrm-h2 reveal">
            HYBRID model — <span className="text-gold">attend your way</span>
          </h2>
          <div className="jrm-options reveal-stagger" style={{ marginTop: "2rem" }}>
            <div className="jrm-option">
              <div className="jrm-option__icon">🏫</div>
              <h3>In person — FAMBAM</h3>
              <p>Join us live at FAMBAM, New Cairo for the full hands-on community experience.</p>
            </div>
            <div className="jrm-option">
              <div className="jrm-option__icon">🔀</div>
              <h3>Hybrid — best of both</h3>
              <p>Mix in-person sessions with online attendance, plus lifetime access to all course material.</p>
            </div>
            <div className="jrm-option jrm-option--highlight">
              <div className="jrm-option__icon">🏆</div>
              <h3>Top performer internship</h3>
              <p>A 1-month paid internship for the top candidate — exclusive to FAMBAM in-person attendees.</p>
            </div>
          </div>
          <p className="reveal content-prose" style={{ color: "var(--muted)", marginTop: "1.5rem" }}>
            To get the most from the community, we recommend attending at least 50% of the course in person.
          </p>
        </div>
      </section>

      <PageCTA
        title="Round 3 — Coming Soon"
        description="Places are limited to 15–20 juniors. Get in touch and we'll let you know the moment enrolment opens."
        buttonLabel="Coming Soon"
        buttonHref="/contact"
        buttonMuted
      />
    </SiteProvider>
  );
}
