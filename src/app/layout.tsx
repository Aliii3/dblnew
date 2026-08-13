import { JsonLd } from "@/components/seo/JsonLd";
import type { Metadata } from "next";
import { Inter, Bodoni_Moda } from "next/font/google";
import "@/styles/globals.css";
import { Analytics } from "@/components/analytics/Analytics";
import { organizationJsonLd, ROOT_METADATA, websiteJsonLd } from "@/lib/seo";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
  display: "swap",
});

const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--font-bodoni",
  display: "swap",
});

export const metadata: Metadata = ROOT_METADATA;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${bodoni.variable}`}>
      <body>
        <JsonLd data={[organizationJsonLd(), websiteJsonLd()]} />
        <Analytics />
        {children}
      </body>
    </html>
  );
}
