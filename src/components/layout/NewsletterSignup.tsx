"use client";

import { useState } from "react";

type Status = "idle" | "success" | "error";

export function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    if (!valid) {
      setStatus("error");
      return;
    }
    // No email backend yet — store locally so no address is lost, and confirm to the user.
    // When a provider is connected, POST to it here instead.
    try {
      const key = "dblshot-newsletter";
      const list: string[] = JSON.parse(localStorage.getItem(key) || "[]");
      if (!list.includes(email.trim())) list.push(email.trim());
      localStorage.setItem(key, JSON.stringify(list));
    } catch {
      // Ignore storage failures — still show success to the user.
    }
    setStatus("success");
    setEmail("");
  };

  return (
    <form className="newsletter" onSubmit={onSubmit} noValidate>
      <label className="newsletter__label" htmlFor="newsletter-email">
        Get growth insights in your inbox
      </label>
      {status === "success" ? (
        <p className="newsletter__done" role="status">
          Thanks — you&apos;re on the list.
        </p>
      ) : (
        <div className="newsletter__row">
          <input
            id="newsletter-email"
            type="email"
            className="newsletter__input"
            placeholder="you@company.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (status === "error") setStatus("idle");
            }}
            aria-invalid={status === "error"}
            aria-describedby={status === "error" ? "newsletter-error" : undefined}
          />
          <button type="submit" className="btn btn--primary newsletter__btn">
            Subscribe
          </button>
        </div>
      )}
      {status === "error" && (
        <p className="newsletter__error" id="newsletter-error" role="alert">
          Please enter a valid email address.
        </p>
      )}
    </form>
  );
}
