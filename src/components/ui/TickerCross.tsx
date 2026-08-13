const DEFAULT_ITEMS = [
  "Amazon Experts",
  "FMCG Growth",
  "Scaling Brands",
  "Data Driven",
  "Operational Excellence",
  "Performance Marketing",
];

function TickerTrack({ items }: { items: string[] }) {
  return (
    <>
      {[0, 1].map((rep) => (
        <span className="ticker-band__group" key={rep}>
          {items.map((item) => (
            <span className="ticker-band__item" key={item}>
              {item}
              <span className="ticker-band__star" aria-hidden="true">✱</span>
            </span>
          ))}
        </span>
      ))}
    </>
  );
}

/** Diagonal crossing ticker bands — bleeds over a photo hero's bottom edge. */
export function TickerCross({ items = DEFAULT_ITEMS }: { items?: string[] }) {
  return (
    <div className="ticker-cross" aria-hidden="true">
      <div className="ticker-band ticker-band--dark">
        <div className="ticker-band__track">
          <TickerTrack items={items} />
        </div>
      </div>
      <div className="ticker-band ticker-band--light">
        <div className="ticker-band__track ticker-band__track--reverse">
          <TickerTrack items={items} />
        </div>
      </div>
    </div>
  );
}
