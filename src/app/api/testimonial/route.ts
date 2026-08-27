import { NextResponse } from "next/server";
import { createTestimonial, validateTestimonial } from "@/lib/testimonials";

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  // Honeypot: real people never fill a hidden field.
  if (typeof (body as { website?: unknown }).website === "string" && (body as { website: string }).website.trim()) {
    return NextResponse.json({ ok: true });
  }

  const result = validateTestimonial(body);
  if ("error" in result) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  try {
    await createTestimonial(result.data);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Testimonial submission error:", err);
    return NextResponse.json(
      { error: "We couldn't save your testimonial. Please try again." },
      { status: 500 },
    );
  }
}
