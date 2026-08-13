import Image from "next/image";
import Link from "next/link";
import type { HomeBlogCard } from "@/lib/content/home";

export function HomeBlogCard({ post, index = 0 }: { post: HomeBlogCard; index?: number }) {
  const href = post.isCaseStudy
    ? `/case-studies/${post.caseStudySlug ?? post.slug}`
    : `/blogs/${post.slug}`;

  return (
    <Link className={`blog-card${index === 0 ? " blog-card--featured" : ""}`} href={href}>
      <div className="blog-card__img">
        <Image
          src={post.image}
          alt=""
          width={600}
          height={400}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        <span className="blog-card__issue" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
      </div>
      <div className="blog-card__body">
        <div className="blog-card__tag">{post.tag}</div>
        <h3>{post.title}</h3>
        {post.excerpt ? <p className="blog-card__excerpt">{post.excerpt}</p> : null}
        <span className="blog-card__cta">Read More <span aria-hidden="true">→</span></span>
      </div>
    </Link>
  );
}
