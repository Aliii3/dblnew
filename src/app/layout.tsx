import { JsonLd } from "@/components/seo/JsonLd";
import type { Metadata } from "next";
import { Epilogue, Inter_Tight } from "next/font/google";
import "@/styles/globals.css";
import { Analytics } from "@/components/analytics/Analytics";
import { organizationJsonLd, ROOT_METADATA, websiteJsonLd } from "@/lib/seo";

const epilogue = Epilogue({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
  variable: "--font-bodoni",
  display: "swap",
});

export const metadata: Metadata = ROOT_METADATA;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${epilogue.variable} ${interTight.variable}`}>
      <body>
        <JsonLd data={[organizationJsonLd(), websiteJsonLd()]} />
        <Analytics />
        {children}
      </body>
    </html>
  );
}
