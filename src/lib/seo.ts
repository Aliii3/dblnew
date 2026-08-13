import type { Metadata } from "next";
import { LOGO_URL, SITE, SOCIAL_LINKS } from "@/lib/site";

/** From live dblshot.co (Google Analytics) */
export const GA_MEASUREMENT_ID = "G-DHKM5YDDTV";

/** From live dblshot.co (Meta Pixel) */
export const META_PIXEL_ID = "1435041940733765";

export const DEFAULT_OG_IMAGE = "/brand/og-image.png";

type PageMetaInput = {
  title: string;
  description: string;
  path: string;
  image?: string;
  noIndex?: boolean;
};

export function absoluteUrl(path: string) {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE.url}${normalized === "/" ? "" : normalized}`.replace(/\/$/, "") || SITE.url;
}

export function createPageMetadata({
  title,
  description,
  path,
  image = DEFAULT_OG_IMAGE,
  noIndex = false,
}: PageMetaInput): Metadata {
  const url = absoluteUrl(path);

  return {
    title,
    description,
    alternates: { canonical: url },
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      type: "website",
      locale: "en_US",
      siteName: SITE.name,
      title,
      description,
      url,
      images: [{ url: image, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: SITE.name,
    alternateName: SITE.title,
    url: SITE.url,
    logo: LOGO_URL,
    image: DEFAULT_OG_IMAGE,
    description: SITE.description,
    email: SITE.email,
    telephone: SITE.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.address,
      addressLocality: "New Cairo",
      addressCountry: "EG",
    },
    areaServed: ["EG", "GCC"],
    sameAs: SOCIAL_LINKS.map((s) => s.href),
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.name,
    url: SITE.url,
    description: SITE.description,
    publisher: {
      "@type": "Organization",
      name: SITE.name,
      logo: { "@type": "ImageObject", url: LOGO_URL },
    },
  };
}

export const ROOT_METADATA: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.title} — E-commerce Growth Agency`,
    template: `%s — ${SITE.title}`,
  },
  description: SITE.description,
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: SITE.name,
    title: SITE.title,
    description: SITE.description,
    url: SITE.url,
    images: [{ url: DEFAULT_OG_IMAGE, alt: SITE.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.title,
    description: SITE.description,
    images: [DEFAULT_OG_IMAGE],
  },
};
