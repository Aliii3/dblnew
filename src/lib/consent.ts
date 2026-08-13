"use client";

/** Cookie/analytics consent — stored locally, broadcast so Analytics can react live. */
export const CONSENT_KEY = "dblshot-consent";
export const CONSENT_EVENT = "dblshot-consent-change";

export type ConsentValue = "granted" | "denied";

export function getConsent(): ConsentValue | null {
  try {
    const v = localStorage.getItem(CONSENT_KEY);
    return v === "granted" || v === "denied" ? v : null;
  } catch {
    return null;
  }
}

export function setConsent(value: ConsentValue) {
  try {
    localStorage.setItem(CONSENT_KEY, value);
  } catch {
    // Ignore — storage may be unavailable (private browsing, etc.).
  }
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: value }));
}
