"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getConsent, setConsent } from "@/lib/consent";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Only prompt if the visitor hasn't already made a choice.
    if (getConsent() === null) setVisible(true);
  }, []);

  const choose = (value: "granted" | "denied") => {
    setConsent(value);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="cookie-consent" role="dialog" aria-label="Cookie consent">
      <p className="cookie-consent__text">
        We use cookies to understand how visitors use our site and improve your
        experience. See our{" "}
        <Link href="/privacy-policy">Privacy Policy</Link>.
      </p>
      <div className="cookie-consent__actions">
        <button
          type="button"
          className="btn btn--ghost cookie-consent__btn"
          onClick={() => choose("denied")}
        >
          Decline
        </button>
        <button
          type="button"
          className="btn btn--primary cookie-consent__btn"
          onClick={() => choose("granted")}
        >
          Accept
        </button>
      </div>
    </div>
  );
}
