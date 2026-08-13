"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { SITE } from "@/lib/site";

type FormStatus = "idle" | "loading" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError("");

    const form = e.currentTarget;
    const fd = new FormData(form);

    const payload = {
      name: String(fd.get("name") ?? "").trim(),
      email: String(fd.get("email") ?? "").trim(),
      country: String(fd.get("country") ?? "").trim(),
      phone: String(fd.get("phone") ?? "").trim(),
      title: String(fd.get("title") ?? "").trim(),
      industry: String(fd.get("industry") ?? "").trim(),
      source: fd.getAll("source").map(String),
      service: fd.getAll("service").map(String),
      message: String(fd.get("message") ?? "").trim(),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = (await res.json()) as { error?: string; fallbackEmail?: string };

      if (!res.ok) {
        setError(data.error ?? "Submission failed.");
        setStatus("error");
        return;
      }

      setStatus("success");
      form.reset();
    } catch {
      setError(`Network error. Email us at ${SITE.email}`);
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="form-card reveal form-card--success">
        <h3 style={{ fontSize: "1.5rem", textTransform: "uppercase", marginBottom: "0.75rem" }}>
          Message <span className="text-gold">Sent</span>
        </h3>
        <p style={{ color: "var(--muted)", lineHeight: 1.7, marginBottom: "1.5rem" }}>
          Thanks for reaching out. Our team will respond within one business day.
        </p>
        <button
          type="button"
          className="btn btn--ghost btn--magnetic"
          onClick={() => setStatus("idle")}
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <div className="form-card reveal">
      <div className="form-card__step">Tell us about your project</div>
      <form className="form-grid" onSubmit={handleSubmit}>
        <div className="form-grid form-grid--2">
          <div className="form-field">
            <label htmlFor="name">Full Name</label>
            <input id="name" name="name" type="text" required disabled={status === "loading"} />
          </div>
          <div className="form-field">
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" required disabled={status === "loading"} />
          </div>
        </div>
        <div className="form-grid form-grid--2">
          <div className="form-field">
            <label htmlFor="country">Country</label>
            <input id="country" name="country" type="text" disabled={status === "loading"} />
          </div>
          <div className="form-field">
            <label htmlFor="phone">Phone Number</label>
            <input id="phone" name="phone" type="tel" disabled={status === "loading"} />
          </div>
        </div>
        <div className="form-grid form-grid--2">
          <div className="form-field">
            <label htmlFor="title">Job Title</label>
            <input id="title" name="title" type="text" disabled={status === "loading"} />
          </div>
          <div className="form-field">
            <label htmlFor="industry">Industry</label>
            <input id="industry" name="industry" type="text" disabled={status === "loading"} />
          </div>
        </div>
        <div className="form-field form-field--options">
          <span className="form-field__legend">How did you hear about us?</span>
          <div className="form-checkgroup" role="group" aria-label="How did you hear about us?">
            {["Social Media", "Search Engine", "Word of Mouth", "Advertisement", "Foodix", "Linkedin"].map((label) => (
              <label key={label}>
                <input type="checkbox" name="source" value={label} disabled={status === "loading"} />
                <span>{label}</span>
              </label>
            ))}
          </div>
        </div>
        <div className="form-field form-field--options">
          <span className="form-field__legend">Service Needed</span>
          <div className="form-checkgroup" role="group" aria-label="Service needed">
            {["Ecommerce", "Amazon Ads", "Market Research", "CRO"].map((label) => (
              <label key={label}>
                <input type="checkbox" name="service" value={label} disabled={status === "loading"} />
                <span>{label}</span>
              </label>
            ))}
          </div>
        </div>
        <div className="form-field">
          <label htmlFor="message">Message</label>
          <textarea id="message" name="message" placeholder="Tell us about your goals…" disabled={status === "loading"} />
        </div>
        {status === "error" && error ? (
          <p className="form-alert form-alert--error" role="alert">
            {error}{" "}
            <Link href={`mailto:${SITE.email}`} className="text-gold text-gold--link">
              Email us directly
            </Link>
          </p>
        ) : null}
        <button
          type="submit"
          className="btn btn--primary btn--magnetic"
          style={{ width: "100%" }}
          disabled={status === "loading"}
        >
          {status === "loading" ? "Sending…" : "Book a Meeting"}
        </button>
      </form>
    </div>
  );
}
