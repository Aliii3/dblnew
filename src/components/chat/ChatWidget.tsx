"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { matchIntent, searchIntents } from "@/lib/chatIntents";

type ChatLink = { label: string; href: string };
type Msg = { role: "user" | "assistant"; content: string; links?: ChatLink[] };

const GREETING =
  "Hi! What are you looking for? Ask about our services, results, careers, or how to get in touch — I'll point you straight to it.";

const SUGGESTIONS = [
  "Amazon services",
  "See your results",
  "Contact us",
  "Careers",
];

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([{ role: "assistant", content: GREETING }]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  function send(text: string) {
    const question = text.trim();
    if (!question) return;
    const { answer, links, related } = matchIntent(question);
    setMessages((m) => [
      ...m,
      { role: "user", content: question },
      { role: "assistant", content: answer, links: [...links, ...related] },
    ]);
    setInput("");
  }

  // Live search-as-you-type results (real "search engine" feel).
  const liveResults = input.trim().length >= 2 ? searchIntents(input, 5) : [];

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    send(input);
  }

  return (
    <>
      <button
        type="button"
        className={`chat-fab${open ? " is-open" : ""}`}
        aria-label={open ? "Close search" : "Search DBLSHOT"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        {open ? (
          <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="11" cy="11" r="7" />
            <path d="m21 21-4.3-4.3" />
          </svg>
        )}
      </button>

      <div className={`chat-panel${open ? " is-open" : ""}`} role="dialog" aria-label="DBLSHOT search" aria-hidden={!open}>
        <div className="chat-panel__head">
          <div>
            <strong>How can we help?</strong>
            <span className="chat-panel__status">Ask a question — we&apos;ll point you to it</span>
          </div>
          <button type="button" className="chat-panel__close" aria-label="Close" onClick={() => setOpen(false)}>
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        <div className="chat-panel__body" ref={scrollRef}>
          {messages.map((m, i) => (
            <div key={i} className={`chat-msg chat-msg--${m.role}`}>
              {m.content}
              {m.links && m.links.length > 0 ? (
                <div className="chat-msg__links">
                  {m.links.map((l) =>
                    l.href.startsWith("/") ? (
                      <Link key={l.href} href={l.href} className="chat-link" onClick={() => setOpen(false)}>
                        {l.label} <span aria-hidden="true">→</span>
                      </Link>
                    ) : (
                      <a key={l.href} href={l.href} className="chat-link">
                        {l.label} <span aria-hidden="true">→</span>
                      </a>
                    ),
                  )}
                </div>
              ) : null}
            </div>
          ))}
        </div>

        {liveResults.length > 0 ? (
          <div className="chat-live" role="listbox" aria-label="Search results">
            <span className="chat-live__label">Jump to</span>
            {liveResults.map((r) => (
              <Link
                key={r.id}
                href={r.href}
                className="chat-live__item"
                role="option"
                aria-selected="false"
                onClick={() => setOpen(false)}
              >
                {r.title} <span aria-hidden="true">→</span>
              </Link>
            ))}
          </div>
        ) : messages.length <= 1 ? (
          <div className="chat-suggestions">
            {SUGGESTIONS.map((s) => (
              <button key={s} type="button" onClick={() => send(s)}>
                {s}
              </button>
            ))}
          </div>
        ) : null}

        <form className="chat-panel__form" onSubmit={onSubmit}>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Search or ask a question…"
            aria-label="Search"
          />
          <button type="submit" aria-label="Search" disabled={!input.trim()}>
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="11" cy="11" r="7" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </button>
        </form>
      </div>
    </>
  );
}
