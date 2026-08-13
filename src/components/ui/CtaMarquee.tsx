import Link from "next/link";

/** Full-width scrolling "Let's Talk" CTA band — big, clickable, links to contact. */
export function CtaMarquee() {
  const items = Array.from({ length: 8 });
  return (
    <Link href="/contact" className="cta-marquee" aria-label="Let's talk">
      <div className="cta-marquee__track" aria-hidden="true">
        {items.map((_, i) => (
          <span className="cta-marquee__group" key={i}>
            <span className="cta-marquee__word">Let&apos;s Talk</span>
            <span className="cta-marquee__star">✦</span>
          </span>
        ))}
      </div>
    </Link>
  );
}
