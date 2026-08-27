import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ADMIN_COOKIE, adminPassword, adminToken, isAdminAuthed, listTestimonials } from "@/lib/testimonials";

/** List every testimonial — pending ones included. */
export async function GET() {
  if (!adminPassword()) {
    return NextResponse.json(
      { error: "Dashboard is not configured. Set TESTIMONIALS_ADMIN_PASSWORD." },
      { status: 503 },
    );
  }

  if (!(await isAdminAuthed())) {
    return NextResponse.json({ error: "Not signed in." }, { status: 401 });
  }

  try {
    return NextResponse.json({ testimonials: await listTestimonials() });
  } catch (err) {
    console.error("Testimonial list error:", err);
    return NextResponse.json({ error: "Couldn't load testimonials." }, { status: 500 });
  }
}

/** Sign in with the shared dashboard password. */
export async function POST(request: Request) {
  const password = adminPassword();
  if (!password) {
    return NextResponse.json(
      { error: "Dashboard is not configured. Set TESTIMONIALS_ADMIN_PASSWORD." },
      { status: 503 },
    );
  }

  let body: { password?: string };
  try {
    body = (await request.json()) as { password?: string };
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (body.password !== password) {
    return NextResponse.json({ error: "Incorrect password." }, { status: 401 });
  }

  (await cookies()).set(ADMIN_COOKIE, adminToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 12,
  });

  return NextResponse.json({ ok: true });
}

/** Sign out. */
export async function DELETE() {
  (await cookies()).delete(ADMIN_COOKIE);
  return NextResponse.json({ ok: true });
}
