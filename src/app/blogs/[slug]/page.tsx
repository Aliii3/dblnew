import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteProvider } from "@/components/layout/SiteProvider";
import { PageHero } from "@/components/ui/PageHero";
import { PageCTA } from "@/components/ui/PageCTA";
import { ArticleBody } from "@/components/ui/ArticleBody";
import { ALL_BLOG_SLUGS, getBlogPost } from "@/lib/content/blogs";
import { createPageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return ALL_BLOG_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return { title: "Blog" };
  return createPageMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blogs/${slug}`,
    image: post.image,
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post || post.isCaseStudy) notFound();

  return (
    <SiteProvider activeNav="blogs" innerPage>
      <PageHero label={post.tag} title={post.title} subtitle={post.excerpt} />
      <section className="prose-section">
        <div className="container prose-layout">
          <ArticleBody slug={slug} />
          <aside className="prose-aside reveal">
            <h4>Work with us</h4>
            <p style={{ color: "var(--muted)", fontSize: "0.9rem", marginBottom: "1rem" }}>Ready to scale your brand?</p>
            <Link className="btn btn--primary btn--magnetic" href="/contact" style={{ width: "100%" }}>
              Let&apos;s Talk
            </Link>
          </aside>
        </div>
      </section>
      <PageCTA title="Ready to grow?" description="Let's put these insights to work for your brand." />
    </SiteProvider>
  );
}
