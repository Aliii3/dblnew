import { SiteProvider } from "@/components/layout/SiteProvider";
import { PhotoHero } from "@/components/ui/PhotoHero";
import { TickerCross } from "@/components/ui/TickerCross";
import { PageCTA } from "@/components/ui/PageCTA";
import { BlogCard } from "@/components/ui/BlogCard";
import { BLOG_POSTS, CASE_STUDY_CARD } from "@/lib/content/blogs";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Blogs",
  description: "Knowledge Drop — insights on e-commerce and FMCG for brands scaling in Egypt and the GCC.",
  path: "/blogs",
});

const ORDER = ["ecommerce", "ramadan-preparation", "egypt-dessert-market"];
const POSTS = [
  ...ORDER.map((slug) => BLOG_POSTS.find((p) => p.slug === slug)).filter(
    (p): p is (typeof BLOG_POSTS)[number] => Boolean(p),
  ),
  CASE_STUDY_CARD,
];

export default function BlogsPage() {
  return (
    <SiteProvider activeNav="blogs" innerPage>
      <PhotoHero
        id="blogs-hero"
        image="/media/case-studies/isis-teas.jpg"
        objectPosition="50% 40%"
        eyebrow="Knowledge"
        title={
          <>
            Knowledge <span className="hero2__swap">Drop</span>
          </>
        }
      />
      <TickerCross
        items={["Insights", "Case Studies", "Guides", "Amazon Tips", "E-Commerce", "FMCG Growth"]}
      />

      <section className="section">
        <div className="container">
          <p className="reveal content-prose" style={{ maxWidth: 640, color: "var(--muted)", marginBottom: "3rem" }}>
            Insights, case studies, and guides for FMCG brands scaling in Egypt and the GCC.
          </p>
          <div className="blogs-grid reveal" style={{ alignItems: "start" }}>
            {POSTS.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </section>
      <PageCTA
        title="Want a strategy session?"
        description="Talk to our team about scaling your brand on Amazon and beyond."
      />
    </SiteProvider>
  );
}
