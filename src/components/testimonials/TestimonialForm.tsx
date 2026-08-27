"use client";

import { useState, type FormEvent } from "react";
import { SITE } from "@/lib/site";

type FormStatus = "idle" | "loading" | "success" | "error";

const QUOTE_MAX = 1200;

export function TestimonialForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [error, setError] = useState("");
  const [rating, setRating] = useState(5);
  const [quote, setQuote] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError("");

    const form = e.currentTarget;
    const fd = new FormData(form);

    const payload = {
      name: String(fd.get("name") ?? "").trim(),
      company: String(fd.get("company") ?? "").trim(),
      role: String(fd.get("role") ?? "").trim(),
      website: String(fd.get("website") ?? ""),
      rating,
      quote: String(fd.get("quote") ?? "").trim(),
    };

    try {
      const res = await fetch("/api/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = (await res.json()) as { error?: string };

      if (!res.ok) {
        setError(data.error ?? "Submission failed.");
        setStatus("error");
        return;
      }

      setStatus("success");
      form.reset();
      setQuote("");
      setRating(5);
    } catch {
      setError(`Network error. Email us at ${SITE.email}`);
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="form-card reveal form-card--success">
        <h3 style={{ fontSize: "1.5rem", textTransform: "uppercase", marginBottom: "0.75rem" }}>
          Thank <span className="text-gold">You</span>
        </h3>
        <p style={{ color: "var(--muted)", lineHeight: 1.7, marginBottom: "1.5rem" }}>
          Your testimonial is with our team. Once we&apos;ve reviewed it, it may appear on this page
          and across the site.
        </p>
        <button type="button" className="btn btn--ghost btn--magnetic" onClick={() => setStatus("idle")}>
          Write another
        </button>
      </div>
    );
  }

  const disabled = status === "loading";

  return (
    <div className="form-card reveal">
      <div className="form-card__step">Share your experience</div>
      <form className="form-grid" onSubmit={handleSubmit}>
        <div className="form-grid form-grid--2">
          <div className="form-field">
            <label htmlFor="t-name">Full Name</label>
            <input id="t-name" name="name" type="text" required maxLength={120} disabled={disabled} />
          </div>
          <div className="form-field">
            <label htmlFor="t-company">Company</label>
            <input id="t-company" name="company" type="text" required maxLength={160} disabled={disabled} />
          </div>
        </div>

        <div className="form-field">
          <label htmlFor="t-role">Job Title</label>
          <input id="t-role" name="role" type="text" required maxLength={120} disabled={disabled} />
        </div>

        <div className="form-field form-field--options">
          <span className="form-field__legend">How would you rate working with us?</span>
          <div className="rating-input" role="radiogroup" aria-label="Rating out of five">
            {[1, 2, 3, 4, 5].map((value) => (
              <button
                key={value}
                type="button"
                role="radio"
                aria-checked={rating === value}
                aria-label={`${value} out of 5`}
                className={`rating-input__star${value <= rating ? " is-on" : ""}`}
                onClick={() => setRating(value)}
                disabled={disabled}
              >
                ★
              </button>
            ))}
            <span className="rating-input__value">{rating}/5</span>
          </div>
        </div>

        <div className="form-field">
          <label htmlFor="t-quote">Your Testimonial</label>
          <textarea
            id="t-quote"
            name="quote"
            required
            rows={6}
            maxLength={QUOTE_MAX}
            placeholder="What did we work on together, and what changed for your brand?"
            value={quote}
            onChange={(e) => setQuote(e.target.value)}
            disabled={disabled}
          />
          <span className="form-field__counter">
            {quote.length}/{QUOTE_MAX}
          </span>
        </div>

        {/* Honeypot — hidden from people, catnip for bots. */}
        <div className="form-honeypot" aria-hidden="true">
          <label htmlFor="t-website">Website</label>
          <input id="t-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
        </div>

        {status === "error" && error ? (
          <p className="form-alert form-alert--error" role="alert">
            {error}
          </p>
        ) : null}

        <button
          type="submit"
          className="btn btn--primary btn--magnetic"
          style={{ width: "100%" }}
          disabled={disabled}
        >
          {disabled ? "Sending…" : "Submit Testimonial"}
        </button>
      </form>
    </div>
  );
}
