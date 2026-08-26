import Link from "next/link";
import Image from "next/image";
import { BRAND_QUOTE, SOCIAL_LINKS } from "@/lib/site";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { NewsletterSignup } from "./NewsletterSignup";

const FOOTER_COLS: { heading: string; links: { label: string; href: string }[] }[] = [
  {
    heading: "Company",
    links: [
      { label: "Home", href: "/" },
      { label: "Our Services", href: "/services" },
      { label: "Our Team", href: "/#our-team-new" },
    ],
  },
  {
    heading: "Explore",
    links: [
      { label: "Our Deep Impact", href: "/#deep-impact-stats" },
      { label: "How it Works", href: "/#deep-impact" },
      { label: "Blogs", href: "/blogs" },
      { label: "About us", href: "/about" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Junior Marketer", href: "/junior-marketer" },
      { label: "Reviews", href: "/#reviews-google" },
      { label: "Careers", href: "/careers" },
      { label: "Privacy Policy", href: "/privacy-policy" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__top">
        <div className="footer__brand">
          <Link className="footer__logo" href="/">
            <Image
              src="/brand/logo-stacked-navy.png"
              alt="DBLSHOT — Performance Marketing and Consulting Agency"
              width={862}
              height={760}
            />
          </Link>
          <p className="footer__quote">{BRAND_QUOTE}</p>
          <div className="footer__brand-actions">
            <Link className="btn btn--primary btn--sm" href="/contact">
              Let&apos;s Talk
            </Link>
            <div className="footer__social">
              {SOCIAL_LINKS.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}>
                  <SocialIcon name={s.label} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <nav className="footer__cols" aria-label="Footer">
          {FOOTER_COLS.map((col) => (
            <div className="footer__col" key={col.heading}>
              <h5>{col.heading}</h5>
              <ul>
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href}>{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        <div className="footer__newsletter">
          <NewsletterSignup />
        </div>
      </div>

      <div className="container footer__bottom">
        <p>© {new Date().getFullYear()} DBLSHOT. All rights reserved.</p>
        <p>Performance Marketing · E-commerce · Amazon</p>
      </div>
    </footer>
  );
}
