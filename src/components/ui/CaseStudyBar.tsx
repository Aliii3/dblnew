import { Fragment } from "react";
import Link from "next/link";

export type CaseTabKey = "about" | "isis-organic" | "spritz" | "rehana" | "sekem";

type CaseTab = {
  key: CaseTabKey;
  title: string;
  sub: string;
  href?: string;
  note?: string;
};

const CASE_TABS: CaseTab[] = [
  { key: "about", title: "About", sub: "Amazon Ads", href: "/services/amazon-management-advertising-egypt" },
  { key: "isis-organic", title: "ISIS Organic", sub: "Case Study", href: "/case-studies/isis-organic" },
  { key: "spritz", title: "Spritz", sub: "Case Study", href: "/case-studies/spritz" },
  { key: "rehana", title: "Rehana", sub: "Case Study", href: "/case-studies/rehana" },
  { key: "sekem", title: "Sekem", sub: "Case Study", note: "Coming soon" },
];

/** Keys that have a real page — used by pages to decide whether to render the bar. */
export const CASE_BAR_KEYS: CaseTabKey[] = ["isis-organic", "spritz", "rehana"];

export function CaseStudyBar({ active }: { active: CaseTabKey }) {
  return (
    <nav className="case-bar" aria-label="Amazon Ads case studies">
      <div className="container case-bar__track">
        {CASE_TABS.map((tab, i) => {
          const isActive = tab.key === active;
          const inner = (
            <>
              <span className="case-bar__title">{tab.title}</span>
              <span className="case-bar__sub">{tab.sub}</span>
              {tab.note ? <span className="case-bar__note">{tab.note}</span> : null}
            </>
          );
          return (
            <Fragment key={tab.key}>
              {i > 0 ? <span className="case-bar__divider" aria-hidden="true" /> : null}
              {tab.href ? (
                <Link
                  href={tab.href}
                  className={`case-bar__item${isActive ? " is-active" : ""}`}
                  aria-current={isActive ? "page" : undefined}
                >
                  {inner}
                </Link>
              ) : (
                <span
                  className={`case-bar__item case-bar__item--soon${isActive ? " is-active" : ""}`}
                >
                  {inner}
                </span>
              )}
            </Fragment>
          );
        })}
      </div>
    </nav>
  );
}
