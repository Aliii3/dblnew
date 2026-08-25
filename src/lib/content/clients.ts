/**
 * Brand names for each client logo, identified from the logo artwork.
 * Used to label the "Our Clients" marquee and to source brand logos for
 * case studies. A few logos could not be confidently identified and are
 * intentionally left out (they render without a label).
 */
export const CLIENT_NAMES: Record<string, string> = {
  "/media/clients/34OHxDLUUhtNY0b4CEDFjlrPsV8.png": "Turkawa",
  "/media/clients/4QcqKDdlM6BqUZRf7DP5QLqgQg.png": "Lucky Owl",
  "/media/clients/7mUmefvbqqEur2tDPqWUWkzm1Q.png": "Flink",
  "/media/clients/8loDBxztljjAqWReOihuqfAAI.png": "Gemma",
  "/media/clients/BqYZIQd0myRH2eBJlAzVEYH96o8.png": "Richie",
  "/media/clients/CLTwqjZEuRq3zFWIFmblGX8j3P8.png": "BEC Arabia",
  "/media/clients/E46KWmdgoYtOJu56riHrVue3xo.png": "Halwani Bros",
  "/media/clients/FVmqnvYOI3Y4uNVqNOSqB5Izak.png": "Dolphin",
  "/media/clients/GqkVRBjRVrYuLfBJEEJFfArxes.png": "Vebix",
  "/media/clients/IEzNPAmU7hScrRAWBnLGcUCw7g.png": "Sekem",
  "/media/clients/JnU9HgiqMBLi5Pun5ZVO9kVWU0.png": "Puvana",
  "/media/clients/NlwDRUvc3mUs9ObEYWrvFpSnElA.png": "Orga+",
  "/media/clients/OxNEFwVLqzVekRKf0ZzULVeVRM.png": "Coffee Break",
  "/media/clients/SXU00AU2gFIudJj2cKuKCRssUaM.png": "Elements",
  "/media/clients/WQakjqWJVTi6703foxvfgAj0Oc.png": "iSiS Organic",
  "/media/clients/Yxp3JNTlEq3Q0EJ9foE0QNlnY.png": "Beta Egypt",
  "/media/clients/YyXtvAwxSzVL7lH0Fo6FXVepg2k.png": "CPC",
  "/media/clients/co3FeUMtKNr44JgE4T6z41lYE.png": "Vogelpark",
  "/media/clients/ibhVBT9CyJYkeU3S1xgOmYojaw.png": "Spritz",
  "/media/clients/kCZVKUHBRm85EDU61Ax33mYdrTw.png": "Watania",
  "/media/clients/kIGfHam5ZeSj22rKG4i6u0kFSjI.png": "Overseas",
  "/media/clients/naIlI6kpQjDap5iP8uW4rrBbllo.png": "Aroma",
  "/media/clients/oh76Ahmwjefn0XKpodDl2yAn44E.png": "RAW",
  "/media/clients/zhJnUdLlvWHOokcQDo7f55XBM.png": "Asfour Crystal",
  "/media/clients/gfamily.png": "G Family",
  "/media/clients/bobs-bake.png": "Bob's Bake",
  "/media/clients/manasah.png": "Manasah",
  "/media/clients/wingo.png": "Wingo",
  "/media/clients/jozoor.png": "Jozoor",
  "/media/clients/rizkallah-art-foundation.png": "Rizkallah Art Foundation",
  "/media/clients/zeina.png": "Zeina",
  "/media/clients/nourish.png": "Nourish",
};

/** Brand logo file for a case study slug (only where confidently matched).
 *  Prefer /media/case-studies/logos/ — those are the full-colour brand marks.
 *  The /media/clients/ files are the desaturated set used by the marquee. */
export const CASE_STUDY_LOGOS: Record<string, string> = {
  "isis-organic": "/media/case-studies/logos/isis-organic.png",
  rehana: "/media/case-studies/logos/rehana.jpg",
  spritz: "/media/clients/ibhVBT9CyJYkeU3S1xgOmYojaw.png",
  raw: "/media/clients/oh76Ahmwjefn0XKpodDl2yAn44E.png",
};

/** Brand name for a logo path, or "" if not identified. */
export function clientName(src: string): string {
  return CLIENT_NAMES[src] ?? "";
}
