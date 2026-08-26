import type { CSSProperties } from "react";
import { ProcessIcon } from "@/components/ui/ProcessIcon";
import { PROCESS_STEPS } from "@/lib/content/process";

/** viewBox units per stop, and the two lane centres the road weaves between.
 *  The lanes sit inboard of centre so the road only ever occupies the middle
 *  band — every label then fans outward into clear space instead of being cut
 *  by the carriageway sweeping past. */
const ROW = 100;
const LANES = [38, 62];

/**
 * One stop per row, alternating lanes, joined by cubics with vertical tangents
 * so the bends read as a road rather than a zigzag. Straight lead-in and
 * lead-out stubs keep the first and last stops on the carriageway.
 */
function buildRoad(count: number) {
  const stops = Array.from({ length: count }, (_, i) => ({
    x: LANES[i % 2],
    y: 50 + i * ROW,
  }));

  let d = `M ${stops[0].x} 0 L ${stops[0].x} ${stops[0].y}`;
  for (let i = 1; i < count; i += 1) {
    const from = stops[i - 1];
    const to = stops[i];
    d += ` C ${from.x} ${from.y + ROW / 2}, ${to.x} ${to.y - ROW / 2}, ${to.x} ${to.y}`;
  }
  return `${d} L ${stops[count - 1].x} ${count * ROW}`;
}

/**
 * The Impact Process as a winding road: a navy carriageway with a dashed centre
 * line, numbered icon stops alternating either side, and a gold "travelled"
 * overlay that draws in as the section scrolls (see the .roadmap block in
 * useSiteEffects). Text is static — only the road and the stop rings move.
 *
 * Both road layers share one path and stretch with preserveAspectRatio="none",
 * so the stops can be placed on the same percentages the path is drawn from.
 * non-scaling-stroke keeps the carriageway an even width and the dashes an even
 * length despite that non-uniform scale.
 */
export function ImpactRoadmap() {
  const count = PROCESS_STEPS.length;
  const height = count * ROW;
  const road = buildRoad(count);

  const carriageway = (
    <>
      <path className="roadmap__asphalt" d={road} vectorEffect="non-scaling-stroke" />
      <path className="roadmap__lane" d={road} vectorEffect="non-scaling-stroke" />
    </>
  );

  const viewBox = `0 0 100 ${height}`;

  return (
    <div className="roadmap" style={{ "--rows": count } as CSSProperties}>
      <svg
        className="roadmap__road roadmap__road--bed"
        viewBox={viewBox}
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        {carriageway}
      </svg>
      <span className="roadmap__trail" aria-hidden="true">
        <svg
          className="roadmap__road roadmap__road--travelled"
          viewBox={viewBox}
          preserveAspectRatio="none"
        >
          {carriageway}
        </svg>
      </span>

      <ol className="roadmap__stops">
        {PROCESS_STEPS.map((step, i) => {
          const at = (50 + i * ROW) / height;
          return (
            <li
              className={`roadmap__stop roadmap__stop--${i % 2 === 0 ? "left" : "right"}`}
              key={step.num}
              data-at={at.toFixed(4)}
              style={{ "--x": `${LANES[i % 2]}%`, "--y": `${at * 100}%` } as CSSProperties}
            >
              <span className="roadmap__marker">
                <ProcessIcon name={step.icon} />
                <span className="roadmap__num">{step.num}</span>
              </span>
              <div className="roadmap__content">
                <h3 className="process-step__title">{step.title}</h3>
                <p className="process-step__desc">{step.description}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
