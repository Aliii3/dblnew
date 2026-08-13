import { getArticleSections, type ArticleSection } from "@/lib/content/articles";

type ArticleBodyProps = {
  slug: string;
};

function renderSection(section: ArticleSection, index: number) {
  return (
    <div key={index}>
      {section.heading ? <h2 className="reveal">{section.heading}</h2> : null}
      {section.paragraphs.map((p, j) => (
        <p key={j} className={index === 0 && j === 0 && !section.heading ? "lead reveal" : "reveal"}>
          {p}
        </p>
      ))}
    </div>
  );
}

export function ArticleBody({ slug }: ArticleBodyProps) {
  const sections = getArticleSections(slug);
  if (!sections?.length) return null;

  return <article className="prose reveal-stagger">{sections.map(renderSection)}</article>;
}
