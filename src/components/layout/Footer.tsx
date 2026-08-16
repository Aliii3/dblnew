import Link from "next/link";
import Image from "next/image";
import { BRAND_QUOTE, LOGO_URL, SOCIAL_LINKS } from "@/lib/site";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { NewsletterSignup } from "./NewsletterSignup";

const FOOTER_COLS: { label: string; href: string }[][] = [
  [
    { label: "Home", href: "/" },
    { label: "Our Services", href: "/services" },
    { label: "Our Team", href: "/#our-team-new" },
  ],
  [
    { label: "Our Deep Impact", href: "/#deep-impact-stats" },
    { label: "How it Works", href: "/#deep-impact" },
    { label: "Blogs", href: "/blogs" },
    { label: "About us", href: "/about" },
  ],
  [
    { label: "Junior Marketer", href: "/junior-marketer" },
    { label: "Reviews", href: "/#reviews-google" },
    { label: "Careers", href: "/careers" },
    { label: "Privacy Policy", href: "/privacy-policy" },
  ],
];

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__brand">
          <Link className="nav__logo" href="/">
            <Image src={LOGO_URL} alt="" width={48} height={48} />
            <span>DBLSHOT</span>
          </Link>
          <Link className="btn btn--primary btn--sm" href="/contact">
            Let&apos;s Talk
          </Link>
          <NewsletterSignup />
        </div>

        <nav className="footer__cols" aria-label="Footer">
          {FOOTER_COLS.map((col, i) => (
            <ul key={i}>
              {col.map((l) => (
                <li key={l.label}>
                  <Link href={l.href}>{l.label}</Link>
                </li>
              ))}
            </ul>
          ))}
        </nav>

        <div className="footer__social">
          {SOCIAL_LINKS.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}>
              <SocialIcon name={s.label} />
            </a>
          ))}
        </div>
      </div>

      <div className="container footer__quote">
        <p>{BRAND_QUOTE}</p>
      </div>

      <div className="container footer__bottom">
        <p>© {new Date().getFullYear()} DBLSHOT. All rights reserved.</p>
        <p>Performance Marketing · E-commerce · Amazon</p>
      </div>
    </footer>
  );
}
