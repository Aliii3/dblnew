"use client";

import { useCallback, useEffect, useMemo, useState, type FormEvent } from "react";
import Link from "next/link";
import type { Testimonial, TestimonialStatus } from "@/lib/testimonials";

type Filter = "all" | TestimonialStatus;

const FILTERS: { key: Filter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "pending", label: "Pending" },
  { key: "approved", label: "Approved" },
  { key: "hidden", label: "Hidden" },
];

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function toCsv(rows: Testimonial[]) {
  const escape = (value: string | number) => `"${String(value).replace(/"/g, '""')}"`;
  const header = ["Date", "Name", "Company", "Role", "Rating", "Status", "Testimonial"];
  const lines = rows.map((t) =>
    [
      formatDate(t.createdAt),
      t.name,
      t.company,
      t.role,
      t.rating,
      t.status,
      t.quote,
    ]
      .map(escape)
      .join(","),
  );
  return [header.map(escape).join(","), ...lines].join("\n");
}

export function TestimonialsDashboard() {
  const [authed, setAuthed] = useState(false);
  const [checking, setChecking] = useState(true);
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [signingIn, setSigningIn] = useState(false);

  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [filter, setFilter] = useState<Filter>("all");
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [busyId, setBusyId] = useState<string | null>(null);

  const load = useCallback(async () => {
    const res = await fetch("/api/testimonials/admin", { cache: "no-store" });

    if (res.status === 401) {
      setAuthed(false);
      return;
    }

    const data = (await res.json()) as { testimonials?: Testimonial[]; error?: string };

    if (!res.ok) {
      setError(data.error ?? "Couldn't load testimonials.");
      return;
    }

    setError("");
    setAuthed(true);
    setTestimonials(data.testimonials ?? []);
  }, []);

  // Probe on mount: an existing cookie skips the sign-in screen.
  useEffect(() => {
    load().finally(() => setChecking(false));
  }, [load]);

  async function handleSignIn(e: FormEvent) {
    e.preventDefault();
    setSigningIn(true);
    setAuthError("");

    try {
      const res = await fetch("/api/testimonials/admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = (await res.json()) as { error?: string };

      if (!res.ok) {
        setAuthError(data.error ?? "Sign in failed.");
        return;
      }

      setPassword("");
      await load();
    } catch {
      setAuthError("Network error. Please try again.");
    } finally {
      setSigningIn(false);
    }
  }

  async function handleSignOut() {
    await fetch("/api/testimonials/admin", { method: "DELETE" });
    setTestimonials([]);
    setAuthed(false);
  }

  async function updateStatus(id: string, status: TestimonialStatus) {
    setBusyId(id);
    setError("");

    try {
      const res = await fetch(`/api/testimonials/admin/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      if (!res.ok) {
        const data = (await res.json()) as { error?: string };
        setError(data.error ?? "Couldn't update this testimonial.");
        return;
      }

      setTestimonials((current) => current.map((t) => (t.id === id ? { ...t, status } : t)));
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setBusyId(null);
    }
  }

  async function remove(id: string) {
    if (!window.confirm("Delete this testimonial permanently?")) return;

    setBusyId(id);
    setError("");

    try {
      const res = await fetch(`/api/testimonials/admin/${id}`, { method: "DELETE" });

      if (!res.ok) {
        const data = (await res.json()) as { error?: string };
        setError(data.error ?? "Couldn't delete this testimonial.");
        return;
      }

      setTestimonials((current) => current.filter((t) => t.id !== id));
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setBusyId(null);
    }
  }

  function exportCsv() {
    const blob = new Blob([toCsv(visible)], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `dblshot-testimonials-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  }

  const stats = useMemo(() => {
    const approved = testimonials.filter((t) => t.status === "approved");
    const rated = testimonials.reduce((sum, t) => sum + t.rating, 0);
    return {
      total: testimonials.length,
      pending: testimonials.filter((t) => t.status === "pending").length,
      approved: approved.length,
      average: testimonials.length ? (rated / testimonials.length).toFixed(1) : "—",
    };
  }, [testimonials]);

  const visible = useMemo(() => {
    const term = search.trim().toLowerCase();
    return testimonials.filter((t) => {
      if (filter !== "all" && t.status !== filter) return false;
      if (!term) return true;
      return `${t.name} ${t.company} ${t.role} ${t.quote}`.toLowerCase().includes(term);
    });
  }, [testimonials, filter, search]);

  if (checking) {
    return <p className="dash__loading">Loading…</p>;
  }

  if (!authed) {
    return (
      <form className="dash-login" onSubmit={handleSignIn}>
        <h1 className="dash-login__title">
          Testimonials <span className="text-gold">Dashboard</span>
        </h1>
        <p className="dash-login__hint">Enter the team password to review client submissions.</p>

        <div className="form-field">
          <label htmlFor="dash-password">Password</label>
          <input
            id="dash-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
            disabled={signingIn}
          />
        </div>

        {authError ? (
          <p className="form-alert form-alert--error" role="alert">
            {authError}
          </p>
        ) : null}

        <button type="submit" className="btn btn--primary" disabled={signingIn}>
          {signingIn ? "Signing in…" : "Sign In"}
        </button>
      </form>
    );
  }

  return (
    <div className="dash">
      <header className="dash__bar">
        <div>
          <h1 className="dash__title">
            Testimonials <span className="text-gold">Dashboard</span>
          </h1>
          <p className="dash__subtitle">
            Approve a submission to publish it on{" "}
            <Link href="/testimonials" className="text-gold text-gold--link">
              the testimonials page
            </Link>
            .
          </p>
        </div>
        <div className="dash__bar-actions">
          <button type="button" className="btn btn--ghost btn--sm" onClick={exportCsv} disabled={!visible.length}>
            Export CSV
          </button>
          <button type="button" className="btn btn--ghost btn--sm" onClick={handleSignOut}>
            Sign Out
          </button>
        </div>
      </header>

      <div className="dash__stats">
        {[
          { label: "Total", value: stats.total },
          { label: "Pending", value: stats.pending },
          { label: "Approved", value: stats.approved },
          { label: "Avg. rating", value: stats.average },
        ].map((stat) => (
          <div className="dash-stat" key={stat.label}>
            <span className="dash-stat__value">{stat.value}</span>
            <span className="dash-stat__label">{stat.label}</span>
          </div>
        ))}
      </div>

      <div className="dash__controls">
        <div className="dash__filters" role="group" aria-label="Filter by status">
          {FILTERS.map((option) => (
            <button
              key={option.key}
              type="button"
              className={`dash__filter${filter === option.key ? " is-active" : ""}`}
              onClick={() => setFilter(option.key)}
            >
              {option.label}
            </button>
          ))}
        </div>
        <input
          className="dash__search"
          type="search"
          placeholder="Search name, company, or text…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Search testimonials"
        />
      </div>

      {error ? (
        <p className="form-alert form-alert--error" role="alert">
          {error}
        </p>
      ) : null}

      {visible.length === 0 ? (
        <p className="dash__empty">
          {testimonials.length === 0
            ? "No testimonials yet. Share the form link with a client to get the first one."
            : "Nothing matches this filter."}
        </p>
      ) : (
        <ul className="dash__list">
          {visible.map((testimonial) => (
            <li className="dash-card" key={testimonial.id}>
              <div className="dash-card__head">
                <div>
                  <span className="dash-card__name">{testimonial.name}</span>
                  <span className="dash-card__meta">
                    {testimonial.role}, {testimonial.company}
                  </span>
                </div>
                <span className={`dash-badge dash-badge--${testimonial.status}`}>{testimonial.status}</span>
              </div>

              <div className="dash-card__sub">
                <span className="stars" aria-label={`${testimonial.rating} out of 5`}>
                  {[1, 2, 3, 4, 5].map((value) => (
                    <span key={value} className={value <= testimonial.rating ? "is-on" : undefined} aria-hidden="true">
                      ★
                    </span>
                  ))}
                </span>
                <span>{formatDate(testimonial.createdAt)}</span>
              </div>

              <p className="dash-card__quote">{testimonial.quote}</p>

              <div className="dash-card__actions">
                {testimonial.status !== "approved" ? (
                  <button
                    type="button"
                    className="btn btn--primary btn--sm"
                    onClick={() => updateStatus(testimonial.id, "approved")}
                    disabled={busyId === testimonial.id}
                  >
                    Approve
                  </button>
                ) : (
                  <button
                    type="button"
                    className="btn btn--ghost btn--sm"
                    onClick={() => updateStatus(testimonial.id, "hidden")}
                    disabled={busyId === testimonial.id}
                  >
                    Unpublish
                  </button>
                )}
                {testimonial.status !== "pending" ? (
                  <button
                    type="button"
                    className="btn btn--ghost btn--sm"
                    onClick={() => updateStatus(testimonial.id, "pending")}
                    disabled={busyId === testimonial.id}
                  >
                    Mark Pending
                  </button>
                ) : null}
                <button
                  type="button"
                  className="btn btn--ghost btn--sm dash-card__delete"
                  onClick={() => remove(testimonial.id)}
                  disabled={busyId === testimonial.id}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
