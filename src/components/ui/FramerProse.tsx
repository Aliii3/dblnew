import type { ContentSection } from "@/lib/content/sync";

type FramerProseProps = {
  sections: ContentSection[];
  lead?: string;
};

function renderParagraph(text: string, key: string, isLead: boolean) {
  if (text.startsWith("✅")) {
    return (
      <p key={key} className="reveal" style={{ color: "var(--muted)", lineHeight: 1.75, marginBottom: "0.75rem" }}>
        {text}
      </p>
    );
  }
  if (text.startsWith("•") || text.startsWith("∙")) {
    return (
      <p key={key} className="reveal" style={{ color: "var(--muted)", lineHeight: 1.75, marginBottom: "0.5rem", paddingLeft: "1rem" }}>
        {text}
      </p>
    );
  }
  return (
    <p key={key} className={isLead ? "reveal lead" : "reveal"} style={{ color: "var(--muted)", lineHeight: 1.75, marginBottom: "1rem" }}>
      {text}
    </p>
  );
}

export function FramerProse({ sections, lead }: FramerProseProps) {
  let leadUsed = !lead;

  return (
    <article className="prose reveal-stagger">
      {lead ? (
        <p className="reveal lead" style={{ color: "var(--ice)", lineHeight: 1.75, marginBottom: "2rem" }}>
          {lead}
        </p>
      ) : null}
      {sections.map((section, i) => (
        <div key={i}>
          {section.heading ? (
            <h2 className="reveal" style={{ fontSize: "1.35rem", textTransform: "uppercase", margin: "2rem 0 1rem" }}>
              {section.heading}
            </h2>
          ) : null}
          {section.paragraphs.map((p, j) => {
            const isLead = !leadUsed && i === 0 && j === 0 && !section.heading;
            if (isLead) leadUsed = true;
            return renderParagraph(p, `${i}-${j}`, isLead);
          })}
        </div>
      ))}
    </article>
  );
}
