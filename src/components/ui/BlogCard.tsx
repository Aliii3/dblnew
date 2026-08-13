import Image from "next/image";
import Link from "next/link";

type BlogCardPost = {
  slug: string;
  tag: string;
  excerpt: string;
  image: string;
  isCaseStudy?: boolean;
  caseStudySlug?: string;
};

export function BlogCard({ post }: { post: BlogCardPost }) {
  const href = post.isCaseStudy
    ? `/case-studies/${post.caseStudySlug ?? post.slug}`
    : `/blogs/${post.slug}`;

  return (
    <Link className="blog-card" href={href}>
      <div className="blog-card__img">
        <Image
          src={post.image}
          alt={post.tag}
          width={760}
          height={520}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>
      <div className="blog-card__body">
        <h3>{post.tag}</h3>
        <p className="blog-card__excerpt">{post.excerpt}</p>
        <span className="blog-card__cta">Read More</span>
      </div>
    </Link>
  );
}
