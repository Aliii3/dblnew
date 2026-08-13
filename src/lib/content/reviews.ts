/**
 * Real Google reviews, mirrored from the Wally widget feed.
 * Verbatim client content — add new reviews here as they come in.
 */
export type Review = {
  name: string;
  date: string;
  rating: number;
  text: string;
};

export const GOOGLE_REVIEWS: Review[] = [
  {
    name: "Hisham Adel",
    date: "Apr 21, 2025",
    rating: 5,
    text: "Great team. They are highly professional, extremely helpful, and deeply committed to delivering results. Their focus on performance and growth truly sets them apart. If you're looking for a team that drives success and brings value, this is the one.",
  },
  {
    name: "Asma Atif",
    date: "Apr 11, 2025",
    rating: 5,
    text: "Most supportive and amazing team — they go through every single aspect of the project with so much care and dedication. It's been an honor ♥️",
  },
  {
    name: "Noha Ahmed",
    date: "Apr 11, 2025",
    rating: 5,
    text: "I always invite Radwa as a Guest Speaker for her practical, hands-on experience. She always brings industry-related cases and adds lots of value to the lectures.",
  },
];

/** Headline rating shown above the cards. */
export const REVIEWS_SUMMARY = {
  rating: "5.0",
  count: GOOGLE_REVIEWS.length,
  source: "Google",
};
