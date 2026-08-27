import { NextResponse } from "next/server";
import {
  deleteTestimonial,
  isAdminAuthed,
  setTestimonialStatus,
  type TestimonialStatus,
} from "@/lib/testimonials";

const STATUSES: TestimonialStatus[] = ["pending", "approved", "hidden"];

type Context = { params: Promise<{ id: string }> };

/** Approve, hide, or send a testimonial back to pending. */
export async function PATCH(request: Request, { params }: Context) {
  if (!(await isAdminAuthed())) {
    return NextResponse.json({ error: "Not signed in." }, { status: 401 });
  }

  let body: { status?: string };
  try {
    body = (await request.json()) as { status?: string };
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const status = body.status as TestimonialStatus;
  if (!STATUSES.includes(status)) {
    return NextResponse.json({ error: "Unknown status." }, { status: 400 });
  }

  try {
    const updated = await setTestimonialStatus((await params).id, status);
    if (!updated) return NextResponse.json({ error: "Testimonial not found." }, { status: 404 });
    return NextResponse.json({ testimonial: updated });
  } catch (err) {
    console.error("Testimonial update error:", err);
    return NextResponse.json({ error: "Couldn't update this testimonial." }, { status: 500 });
  }
}

export async function DELETE(_request: Request, { params }: Context) {
  if (!(await isAdminAuthed())) {
    return NextResponse.json({ error: "Not signed in." }, { status: 401 });
  }

  try {
    const removed = await deleteTestimonial((await params).id);
    if (!removed) return NextResponse.json({ error: "Testimonial not found." }, { status: 404 });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Testimonial delete error:", err);
    return NextResponse.json({ error: "Couldn't delete this testimonial." }, { status: 500 });
  }
}
