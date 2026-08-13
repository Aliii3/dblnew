import Link from "next/link";
import { SiteProvider } from "@/components/layout/SiteProvider";

export default function NotFound() {
  return (
    <SiteProvider innerPage>
      <section className="page-hero">
        <div className="container">
          <span className="section-label reveal">404</span>
          <h1 className="page-hero__title">
            <span className="reveal-line">
              <span>
                Page <span className="text-gold">Not Found</span>
              </span>
            </span>
          </h1>
          <p className="page-hero__sub reveal">
            This page doesn&apos;t exist or may have moved. Head back home or get in touch with our team.
          </p>
          <div className="reveal" style={{ display: "flex", flexWrap: "wrap", gap: "1rem", marginTop: "2rem" }}>
            <Link className="btn btn--primary btn--magnetic" href="/">
              Back to Home
            </Link>
            <Link className="btn btn--ghost btn--magnetic" href="/contact">
              Let&apos;s Talk
            </Link>
          </div>
        </div>
      </section>
    </SiteProvider>
  );
}
