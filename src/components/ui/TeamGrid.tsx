"use client";

import Image from "next/image";
import { useEffect, useId, useState } from "react";
import type { HomeTeamMember } from "@/lib/content/home";
import { TeamMotif } from "@/components/ui/TeamMotif";

type TeamGridProps = {
  members: HomeTeamMember[];
};

export function TeamGrid({ members }: TeamGridProps) {
  const [selected, setSelected] = useState<HomeTeamMember | null>(null);
  const titleId = useId();

  useEffect(() => {
    if (!selected) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelected(null);
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [selected]);

  return (
    <>
      <div className="team-grid team-grid--enhanced reveal-stagger" style={{ marginTop: "3rem" }}>
        {members.map((member) => (
          <button
            className="team-card"
            type="button"
            key={member.name}
            onClick={() => setSelected(member)}
            aria-haspopup="dialog"
          >
            {member.motif ? <TeamMotif name={member.motif} /> : null}
            <div className="team-card__img">
              {member.video ? (
                <video
                  src={member.video}
                  poster={member.image}
                  autoPlay
                  muted
                  loop
                  playsInline
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              ) : (
                <Image
                  src={member.image}
                  alt={member.name}
                  width={400}
                  height={500}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              )}
              {member.featured ? (
                <div className="team-card__overlay">
                  <span className="btn btn--primary" style={{ padding: "0.5rem 1rem", fontSize: "0.65rem" }}>
                    View Bio
                  </span>
                </div>
              ) : null}
            </div>
            <h4>{member.name}</h4>
            {member.role ? <p>{member.role}</p> : null}
          </button>
        ))}
      </div>

      {selected ? (
        <div className="team-modal" role="dialog" aria-modal="true" aria-labelledby={titleId}>
          <button className="team-modal__backdrop" type="button" aria-label="Close profile" onClick={() => setSelected(null)} />
          <article className="team-modal__panel">
            <button className="team-modal__close" type="button" aria-label="Close profile" onClick={() => setSelected(null)}>
              ×
            </button>
            <div className="team-modal__photo">
              {selected.video ? (
                <video
                  src={selected.video}
                  poster={selected.image}
                  autoPlay
                  muted
                  loop
                  playsInline
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              ) : (
                <Image
                  src={selected.image}
                  alt={selected.name}
                  width={560}
                  height={700}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              )}
              {selected.motif ? <TeamMotif name={selected.motif} /> : null}
            </div>
            <div className="team-modal__copy">
              <span className="section-label">Meet the Mind</span>
              <h3 id={titleId}>{selected.name}</h3>
              {selected.role ? <p className="team-modal__role">{selected.role}</p> : null}
              {selected.bio ? <p className="team-modal__bio">{selected.bio}</p> : null}
            </div>
          </article>
        </div>
      ) : null}
    </>
  );
}
