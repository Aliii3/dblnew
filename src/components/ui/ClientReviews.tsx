import { GOOGLE_REVIEWS, REVIEWS_SUMMARY } from "@/lib/content/reviews";

function GoogleMark() {
  return (
    <svg className="review-card__google" viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#4285f4" d="M47.5 24.5c0-1.6-.15-3.2-.44-4.7H24v9h13.2c-.57 3-2.3 5.55-4.9 7.25v6h7.9c4.6-4.25 7.3-10.5 7.3-17.55z" />
      <path fill="#34a853" d="M24 48c6.6 0 12.15-2.2 16.2-5.95l-7.9-6C30.1 37.5 27.35 38.5 24 38.5c-6.35 0-11.75-4.3-13.7-10.05h-8.2v6.2C6.15 42.6 14.4 48 24 48z" />
      <path fill="#fbbc05" d="M10.3 28.45c-.5-1.5-.8-3.1-.8-4.45s.3-2.95.8-4.45v-6.2h-8.2A23.9 23.9 0 0 0 0 24c0 3.85.95 7.5 2.1 10.65l8.2-6.2z" />
      <path fill="#eb4335" d="M24 9.5c3.6 0 6.8 1.25 9.35 3.65l6.95-6.95C36.15 2.4 30.6 0 24 0 14.4 0 6.15 5.4 2.1 13.35l8.2 6.2C12.25 13.8 17.65 9.5 24 9.5z" />
    </svg>
  );
}

function Stars({ rating }: { rating: number }) {
  return (
    <span className="review-card__stars" aria-label={`${rating} out of 5 stars`}>
      {"★".repeat(rating)}
    </span>
  );
}

export function ClientReviews() {
  if (!GOOGLE_REVIEWS.length) return null;

  return (
    <>
      <div className="reviews-summary reveal">
        <strong>{REVIEWS_SUMMARY.rating}</strong>
        <span className="reviews-summary__stars" aria-hidden="true">
          ★★★★★
        </span>
        <span className="reviews-summary__meta">
          Rated {REVIEWS_SUMMARY.rating} on {REVIEWS_SUMMARY.source}
        </span>
      </div>

      <ul className="reviews-grid reveal">
        {GOOGLE_REVIEWS.map((r) => (
          <li className="review-card" key={`${r.name}-${r.date}`}>
            <div className="review-card__top">
              <Stars rating={r.rating} />
              <GoogleMark />
            </div>
            <blockquote className="review-card__text">{r.text}</blockquote>
            <div className="review-card__author">
              <span className="review-card__avatar" aria-hidden="true">
                {r.name.charAt(0)}
              </span>
              <span>
                <strong>{r.name}</strong>
                <time>{r.date}</time>
              </span>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
