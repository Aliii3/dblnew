import { SiteProvider } from "@/components/layout/SiteProvider";
import { PhotoHero } from "@/components/ui/PhotoHero";
import { TickerCross } from "@/components/ui/TickerCross";
import { ContactForm } from "@/components/contact/ContactForm";
import { createPageMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";

export const metadata = createPageMetadata({
  title: "Let's Talk",
  description: "Book a meeting with DBLSHOT — start your FMCG growth journey.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <SiteProvider innerPage>
      <PhotoHero
        id="contact-hero"
        image="/media/stock/hero-lifestyle-placeholder.jpg"
        objectPosition="55% 42%"
        eyebrow="Contact"
        title={
          <>
            Talk. Kick Off. <span className="hero2__swap">Boost.</span>
          </>
        }
      />
      <TickerCross
        items={["Let's Talk", "Book A Meeting", "Start Your Growth", "Kick Off Fast", "Boost Sales", "Get In Touch"]}
      />

      <section className="section">
        <div className="container contact-grid">
          <div className="contact-intro reveal">
            <div className="cta-words">
              <span className="cta-word">Talk.</span>
              <span className="cta-word">kick off.</span>
              <span className="cta-word">boost.</span>
            </div>
            <h2>Start your growth journey</h2>
            <p style={{ color: "var(--muted)", lineHeight: 1.7 }}>
              Tell us about your brand. We&apos;ll respond within one business day.
            </p>
            <p style={{ marginTop: "2rem" }}>
              <a href={`mailto:${SITE.email}`} className="text-gold text-gold--link">{SITE.email}</a>
              <br />
              <span style={{ color: "var(--muted)" }}>{SITE.phone}</span>
            </p>
          </div>
          <ContactForm />
        </div>
      </section>
    </SiteProvider>
  );
}
