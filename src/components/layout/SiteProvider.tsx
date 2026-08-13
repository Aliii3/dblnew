"use client";

import { useSiteEffects } from "@/hooks/useSiteEffects";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { ScrollToTop } from "./ScrollToTop";
import { SiteChrome } from "./SiteChrome";
import { CookieConsent } from "./CookieConsent";
import { ChatWidget } from "@/components/chat/ChatWidget";
import type { NavKey } from "@/lib/site";

type SiteProviderProps = {
  children: React.ReactNode;
  activeNav?: NavKey;
  home?: boolean;
  innerPage?: boolean;
};

export function SiteProvider({ children, activeNav, home, innerPage }: SiteProviderProps) {
  useSiteEffects({ home });

  return (
    <>
      <SiteChrome />
      <ScrollToTop />
      <Header active={activeNav} />
      <main id="main-content" className={innerPage ? "page-main" : undefined}>
        {children}
      </main>
      <Footer />
      <ChatWidget />
      <CookieConsent />
    </>
  );
}
