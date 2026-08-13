import { NextResponse } from "next/server";
import { SITE } from "@/lib/site";

export type ContactPayload = {
  name: string;
  email: string;
  country?: string;
  phone?: string;
  title?: string;
  industry?: string;
  source?: string[];
  service?: string[];
  message?: string;
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function formatBody(data: ContactPayload) {
  const lines = [
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    data.country ? `Country: ${data.country}` : null,
    data.phone ? `Phone: ${data.phone}` : null,
    data.title ? `Job Title: ${data.title}` : null,
    data.industry ? `Industry: ${data.industry}` : null,
    data.source?.length ? `Heard about us: ${data.source.join(", ")}` : null,
    data.service?.length ? `Services: ${data.service.join(", ")}` : null,
    data.message ? `\nMessage:\n${data.message}` : null,
  ].filter(Boolean);

  return lines.join("\n");
}

async function sendViaResend(data: ContactPayload) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL ?? SITE.email;
  const from = process.env.CONTACT_FROM_EMAIL ?? `DBLSHOT Contact <onboarding@resend.dev>`;

  if (!apiKey) return null;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: data.email,
      subject: `New lead: ${data.name}`,
      text: formatBody(data),
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(err || "Resend request failed");
  }

  return true;
}

async function sendViaFormspree(data: ContactPayload) {
  const formId = process.env.FORMSPREE_FORM_ID;
  if (!formId) return null;

  const res = await fetch(`https://formspree.io/f/${formId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      name: data.name,
      email: data.email,
      country: data.country,
      phone: data.phone,
      job_title: data.title,
      industry: data.industry,
      source: data.source?.join(", "),
      services: data.service?.join(", "),
      message: data.message,
      _subject: `DBLSHOT lead: ${data.name}`,
    }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error((err as { error?: string }).error || "Formspree request failed");
  }

  return true;
}

export async function POST(request: Request) {
  let data: ContactPayload;

  try {
    data = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (!data.name?.trim() || !data.email?.trim()) {
    return NextResponse.json({ error: "Name and email are required." }, { status: 400 });
  }

  if (!isValidEmail(data.email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  try {
    const sent = (await sendViaResend(data)) ?? (await sendViaFormspree(data));

    if (!sent) {
      return NextResponse.json(
        {
          error: "Contact form is not configured yet. Email us directly.",
          fallbackEmail: SITE.email,
        },
        { status: 503 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again or email us directly.", fallbackEmail: SITE.email },
      { status: 500 },
    );
  }
}
