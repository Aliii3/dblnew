import Link from "next/link";

/** Rotating circular "Let's Talk" badge with a center arrow — links to contact. */
export function ContactBadge({ className = "" }: { className?: string }) {
  return (
    <Link href="/contact" className={`contact-badge ${className}`.trim()} aria-label="Let's talk">
      <svg className="contact-badge__ring" viewBox="0 0 120 120" aria-hidden="true">
        <defs>
          <path
            id="contact-badge-path"
            d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0"
          />
        </defs>
        <text>
          <textPath href="#contact-badge-path" startOffset="0">
            LET&apos;S TALK • BOOK A MEETING •&nbsp;
          </textPath>
        </text>
      </svg>
      <svg className="contact-badge__arrow" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M7 17 17 7M9 7h8v8"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Link>
  );
}
