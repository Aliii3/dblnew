import { SiteProvider } from "@/components/layout/SiteProvider";
import { PhotoHero } from "@/components/ui/PhotoHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TickerCross } from "@/components/ui/TickerCross";
import { TestimonialForm } from "@/components/testimonials/TestimonialForm";
import { listApprovedTestimonials } from "@/lib/testimonials";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Client Testimonials",
  description: "Read what brands say about working with DBLSHOT — and share your own experience.",
  path: "/testimonials",
});

// The wall changes whenever the team moderates, so it's never cached.
export const dynamic = "force-dynamic";

function Stars({ rating }: { rating: number }) {
  return (
    <span className="stars" aria-label={`${rating} out of 5`}>
      {[1, 2, 3, 4, 5].map((value) => (
        <span key={value} className={value <= rating ? "is-on" : undefined} aria-hidden="true">
          ★
        </span>
      ))}
    </span>
  );
}

export default async function TestimonialsPage() {
  const testimonials = await listApprovedTestimonials();

  return (
    <SiteProvider innerPage>
      <PhotoHero
        id="testimonials-hero"
        image="/media/stock/offer-lifestyle-placeholder.jpg"
        objectPosition="50% 40%"
        eyebrow="Testimonials"
        title={
          <>
            In Their <span className="hero2__swap">Words.</span>
          </>
        }
      />
      <TickerCross
        items={["Client Stories", "Real Results", "In Their Words", "Trusted Partners", "Share Yours"]}
      />

      <section className="section">
        <div className="container contact-grid">
          <div className="contact-intro reveal">
            <div className="cta-words">
              <span className="cta-word">say it.</span>
              <span className="cta-word">share it.</span>
            </div>
            <h2>Worked with us? Tell the story</h2>
            <p style={{ color: "var(--muted)", lineHeight: 1.7 }}>
              A few honest lines about what we built together go further than any pitch deck.
            </p>
          </div>
          <TestimonialForm />
        </div>
      </section>

      {testimonials.length > 0 ? (
        <section className="section section--glow" id="wall">
          <div className="container">
            <span className="section-label reveal">Client Voices</span>
            <SectionHeading>
              What Clients <span className="text-gold">Say</span>
            </SectionHeading>
            <div className="testimonial-wall reveal-stagger">
              {testimonials.map((testimonial) => (
                <figure className="testimonial-card reveal" key={testimonial.id}>
                  <Stars rating={testimonial.rating} />
                  <blockquote className="testimonial-card__quote">{testimonial.quote}</blockquote>
                  <figcaption className="testimonial-card__author">
                    <span className="testimonial-card__name">{testimonial.name}</span>
                    <span className="testimonial-card__meta">
                      {testimonial.role}, {testimonial.company}
                    </span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </SiteProvider>
  );
}
