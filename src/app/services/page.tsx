import { SiteProvider } from "@/components/layout/SiteProvider";
import { PhotoHero } from "@/components/ui/PhotoHero";
import { TickerCross } from "@/components/ui/TickerCross";
import { PageCTA } from "@/components/ui/PageCTA";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import { SERVICES } from "@/lib/content";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Our Services",
  description:
    "Performance marketing and e-commerce services for FMCG brands — Amazon growth, e-commerce ops, social media, website development, and market research.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <SiteProvider activeNav="services" innerPage>
      <PhotoHero
        id="services-hero"
        image="/media/stock/offer-lifestyle-placeholder.jpg"
        objectPosition="50% 15%"
        eyebrow="What We Do"
        title={
          <>
            Impact <span className="hero2__swap">Services</span>
          </>
        }
        actions={[{ label: "Start Your Project", href: "/contact" }]}
      />
      <TickerCross
        items={["Strategy", "Creative", "Performance", "Commerce", "Amazon Growth", "Technology"]}
      />

      <section className="section">
        <div className="container">
          <p className="reveal content-prose" style={{ maxWidth: 640, color: "var(--muted)", marginBottom: "3rem" }}>
            Comprehensive solutions tailored to accelerate your growth across Amazon, e-commerce, social, and web —
            built for FMCG brands in Egypt and the GCC.
          </p>
          <div className="offer-cards__list reveal-stagger" style={{ maxWidth: 860 }}>
            {SERVICES.map((s) => (
              <a className="offer-card" href={s.href} key={s.title}>
                <span className="offer-card__icon" aria-hidden="true">
                  <ServiceIcon name={s.icon} />
                </span>
                <span className="offer-card__body">
                  <span className="offer-card__title">{s.title}</span>
                  <span className="offer-card__desc">{s.description}</span>
                </span>
                <span className="offer-card__arrow" aria-hidden="true">→</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <PageCTA
        title="Start your project"
        description="Tell us about your brand and we'll craft a growth plan tailored to your goals."
      />
    </SiteProvider>
  );
}
