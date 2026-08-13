import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "framerusercontent.com",
        pathname: "/images/**",
      },
    ],
  },
  async redirects() {
    return [
      { source: "/aboutuss", destination: "/about", permanent: true },
      { source: "/aboutuss.html", destination: "/about", permanent: true },
      { source: "/let-s-talk", destination: "/contact", permanent: true },
      { source: "/let-s-talk.html", destination: "/contact", permanent: true },
      { source: "/jrm3", destination: "/junior-marketer", permanent: true },
      { source: "/jrm3.html", destination: "/junior-marketer", permanent: true },
      { source: "/blogs.html", destination: "/blogs", permanent: true },
      { source: "/careers.html", destination: "/careers", permanent: true },
      { source: "/index.html", destination: "/", permanent: true },
      { source: "/Home.html", destination: "/", permanent: true },
      { source: "/blogs/ecommerce.html", destination: "/blogs/ecommerce", permanent: true },
      {
        source: "/blogs/ramadan-preparation-blog.html",
        destination: "/blogs/ramadan-preparation",
        permanent: true,
      },
      {
        source: "/blogs/ramadan-preparation-blog",
        destination: "/blogs/ramadan-preparation",
        permanent: true,
      },
      {
        source: "/blogs/egypts-dessert-market-2.html",
        destination: "/blogs/egypt-dessert-market",
        permanent: true,
      },
      {
        source: "/blogs/egypt's-dessert-market-2",
        destination: "/blogs/egypt-dessert-market",
        permanent: true,
      },
      {
        source: "/services/amazon",
        destination: "/services/amazon-management-advertising-egypt",
        permanent: true,
      },
      {
        source: "/services/e-commerce-management",
        destination: "/services/ecommerce-management-egypt",
        permanent: true,
      },
      {
        source: "/our-services/amazon/about",
        destination: "/services/amazon-management-advertising-egypt",
        permanent: true,
      },
      {
        source: "/our-services/amazon/about.html",
        destination: "/services/amazon-management-advertising-egypt",
        permanent: true,
      },
      {
        source: "/our-services/amazon/isiscasestudy",
        destination: "/case-studies/isis-organic",
        permanent: true,
      },
      {
        source: "/our-services/amazon/isiscasestudy.html",
        destination: "/case-studies/isis-organic",
        permanent: true,
      },
      {
        source: "/our-services/amazon/spritz",
        destination: "/case-studies/spritz",
        permanent: true,
      },
      {
        source: "/our-services/amazon/rehana",
        destination: "/case-studies/rehana",
        permanent: true,
      },
      {
        source: "/our-services/amazon/ltf",
        destination: "/case-studies/ltf",
        permanent: true,
      },
      {
        source: "/services/market-resaerch",
        destination: "/services/market-research",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
