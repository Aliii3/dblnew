# DBLSHOT — Next.js Website

Professional marketing site for [dblshot.co](https://dblshot.co), built with **Next.js 15**, **TypeScript**, **App Router**, GSAP, and Lenis smooth scroll.

## Stack

- **Next.js 15** (App Router, Server Components, static generation)
- **TypeScript** — typed content layer in `src/lib/content/`
- **GSAP + ScrollTrigger** — scroll animations & homepage process timeline
- **Lenis** — smooth scrolling
- Custom CSS design system (`src/styles/`)
- **Inter** via `next/font/google`

## Features

- **Dark / light theme** — toggle in the header; choice persists in `localStorage`, applied pre-paint (no flash) via a small inline script in `layout.tsx`. Colors are driven by CSS variables in `src/styles/styles.css` (`:root` for dark, `[data-theme="light"]` for light).
- **Search / help widget** — floating widget (`src/components/chat/`) that matches a visitor's question to intents (`src/lib/chatIntents.ts`) and returns a short answer plus direct links to the right page. Pure client-side, no AI key or API needed.
- **Cookie consent** — dismissible banner (`CookieConsent`); analytics only load in production **and** after consent is granted.
- **Newsletter signup** — email capture in the footer (`NewsletterSignup`); stores locally until an email provider is wired up.
- **SEO** — per-page metadata, JSON-LD, sitemap, robots.

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Build & deploy

```bash
npm run build
npm start
```

Deploy to **Vercel** (recommended): connect the GitHub repo — zero config.

Legacy URL redirects are in `next.config.ts` (`/aboutuss` → `/about`, `/let-s-talk` → `/contact`, etc.).

## Environment variables

Copy `.env.example` and fill in what you need (see the file for details):

| Variable | Purpose |
|----------|---------|
| `RESEND_API_KEY` / `CONTACT_TO_EMAIL` / `CONTACT_FROM_EMAIL` | Contact form delivery via Resend. |
| `FORMSPREE_FORM_ID` | Alternative contact form delivery via Formspree. |

Set **one** contact-delivery option (Resend or Formspree). Until then, the contact form shows a graceful "email us directly" fallback. The search/help widget needs no configuration.

Analytics IDs (GA + Meta Pixel) live in `src/lib/seo.ts` and only load in production after cookie consent.

## Project structure

```
src/
  app/              # Routes (pages)
  components/       # React UI (layout, home, contact)
  hooks/            # Client effects (animations, preloader)
  lib/              # Site config + content data
  styles/           # Global CSS (brand system)
archive/static-site/  # Previous static HTML export
legacy/               # Original Framer exports
```

## Content from dblshot.co

Page copy is synced from [dblshot.co](https://dblshot.co). To refresh blog articles from the live site:

```bash
npm run scrape
```

Scraped HTML is saved under `scripts/scraped/` and converted to `src/lib/content/articles/*.json`.

## Routes

### Core pages

| Route | Notes |
|-------|-------|
| `/` | Home |
| `/about` | About (legacy `/aboutuss` redirects here) |
| `/contact` | Contact (legacy `/let-s-talk` redirects here) |
| `/junior-marketer` | Junior Marketer program (legacy `/jrm3`) |
| `/privacy-policy` | Privacy policy |
| `/careers` · `/careers/[slug]` | Careers list + job detail |
| `/blogs` · `/blogs/[slug]` | Blog list + article |

### Services

| Route | Service |
|-------|---------|
| `/services` | Services hub |
| `/services/amazon` | Amazon Ads (legacy `/our-services/amazon/about`) |
| `/services/e-commerce-management` | E-Commerce Management |
| `/services/social-media` | Social Media Management |
| `/services/website-development` | Website Development |
| `/services/market-research` | Market Research |
| `/services/branding` | Branding |
| `/services/[slug]` | Dynamic fallback for any other service |

### Case studies

| Route | Case study |
|-------|------------|
| `/case-studies` | Case studies hub |
| `/case-studies/isis-organic` | ISIS Organic (legacy `/our-services/amazon/isiscasestudy`) |
| `/case-studies/spritz` | Spritz |
| `/case-studies/raw` | RAW |
| `/case-studies/cimento-forca` | Cimento Força |
| `/case-studies/rehana` | Rehana *(content pending)* |
| `/case-studies/[slug]` | Dynamic fallback (e.g. `ltf`) |

Blog and case-study slugs also have legacy redirects in `next.config.ts`.
