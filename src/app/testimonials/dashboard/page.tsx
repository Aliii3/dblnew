import { TestimonialsDashboard } from "@/components/testimonials/TestimonialsDashboard";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Testimonials Dashboard",
  description: "Review and publish client testimonials.",
  path: "/testimonials/dashboard",
  noIndex: true,
});

export const dynamic = "force-dynamic";

export default function TestimonialsDashboardPage() {
  return (
    <main className="dash-page">
      <TestimonialsDashboard />
    </main>
  );
}
