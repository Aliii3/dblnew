import { SiteProvider } from "@/components/layout/SiteProvider";
import { HomePage } from "@/components/home/HomePage";
import { createPageMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";

export const metadata = {
  ...createPageMetadata({
    title: SITE.title,
    description: SITE.description,
    path: "/",
  }),
  title: { absolute: `${SITE.title} — E-commerce Growth Agency` },
};

export default function Page() {
  return (
    <SiteProvider home activeNav="home">
      <HomePage />
    </SiteProvider>
  );
}
