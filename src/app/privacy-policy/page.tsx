import { SiteProvider } from "@/components/layout/SiteProvider";
import { PageHero } from "@/components/ui/PageHero";
import { PRIVACY_SECTIONS } from "@/lib/content/privacy";
import { createPageMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";

export const metadata = createPageMetadata({
  title: "Privacy Policy",
  description: "How DBLSHOT handles your data.",
  path: "/privacy-policy",
});

export default function PrivacyPage() {
  return (
    <SiteProvider innerPage>
      <PageHero label="Legal" title={<> <span className="text-gold">Privacy</span> Policy</>} />
      <section className="prose-section">
        <div className="container prose-layout">
          <article className="prose reveal-stagger">
            {PRIVACY_SECTIONS.map((s) => (
              <div key={s.title}>
                <h2 className="reveal">{s.title}</h2>
                <p className="reveal">{s.content}</p>
              </div>
            ))}
          </article>
          <aside className="prose-aside reveal">
            <h4>Contact</h4>
            <p style={{ color: "var(--muted)", fontSize: "0.9rem", lineHeight: 1.6 }}>
              {SITE.email}
              <br />
              {SITE.phone}
              <br />
              {SITE.address}
            </p>
          </aside>
        </div>
      </section>
    </SiteProvider>
  );
}
