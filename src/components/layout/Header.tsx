"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { NAV_ITEMS, type NavKey } from "@/lib/site";

type HeaderProps = {
  active?: NavKey;
};

export function Header({ active }: HeaderProps) {
  const [openKey, setOpenKey] = useState<NavKey | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenKey(null);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <header className="nav" id="nav">
        <div className="container nav__inner">
          {/* Two variants: the wordmark is navy, so the dark header needs the
              white-text copy. CSS shows exactly one per theme. */}
          <Link className="nav__logo nav__logo--lockup" href="/">
            <Image
              className="nav__logo-img"
              src="/brand/logo-lockup-navy.png"
              alt="DBLSHOT — Performance Marketing and Consulting Agency"
              width={614}
              height={174}
              priority
            />
          </Link>
          <ul className="nav__links">
            {NAV_ITEMS.map((item) =>
              item.children ? (
                <li
                  key={item.key}
                  className={`nav__item nav__item--dropdown${openKey === item.key ? " is-open" : ""}`}
                  onMouseEnter={() => setOpenKey(item.key)}
                  onMouseLeave={() => setOpenKey(null)}
                >
                  <button
                    type="button"
                    className={`nav__trigger${active === item.key ? " is-active" : ""}`}
                    aria-haspopup="true"
                    aria-expanded={openKey === item.key}
                    onClick={() =>
                      setOpenKey((k) => (k === item.key ? null : item.key))
                    }
                  >
                    {item.label}
                    <svg
                      className="nav__caret"
                      viewBox="0 0 12 12"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M2.5 4.5 6 8l3.5-3.5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                  <ul className="nav__dropdown">
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <Link href={child.href} onClick={() => setOpenKey(null)}>
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ) : (
                <li key={item.key}>
                  <Link
                    href={item.href}
                    className={active === item.key ? "is-active" : undefined}
                  >
                    {item.label}
                  </Link>
                </li>
              ),
            )}
          </ul>
          <div className="nav__actions">
            <Link className="btn btn--primary hidden-mobile" href="/contact">
              Let&apos;s Talk
            </Link>
            <button className="nav__toggle" id="nav-toggle" type="button" aria-label="Open menu">
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>
      <nav className="mobile-menu" id="mobile-menu" aria-hidden="true">
        {NAV_ITEMS.map((item) =>
          item.children ? (
            <div key={item.key} className="mobile-menu__group">
              <Link href={item.href}>{item.label}</Link>
              <div className="mobile-menu__sub">
                {item.children.map((child) => (
                  <Link key={child.href} href={child.href}>
                    {child.label}
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <Link key={item.key} href={item.href}>
              {item.label}
            </Link>
          ),
        )}
        <Link className="text-gold" href="/contact">
          Let&apos;s Talk
        </Link>
      </nav>
    </>
  );
}
