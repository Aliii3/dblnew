#!/usr/bin/env python3
"""Fetch fully rendered dblshot.co homepage (Playwright) — team, clients, blogs, reviews."""
from __future__ import annotations

import json
import sys
import time
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OUT_HTML = ROOT / "scripts" / "scraped" / "full" / "index-rendered.html"
OUT_JSON = ROOT / "src" / "lib" / "content" / "generated" / "home.json"
URL = "https://dblshot.co/"

BLOG_ROUTES = {
    "Ecommerce": {"slug": "ecommerce", "caseStudySlug": None},
    "Ramadan Preparation": {"slug": "ramadan-preparation", "caseStudySlug": None},
    "Egypt": {"slug": "egypt-dessert-market", "caseStudySlug": None},
    "iSiS-Organic": {"slug": "isis-organic", "caseStudySlug": "isis-organic", "isCaseStudy": True},
}

TYPO_FIXES = (
    ("Ramdan", "Ramadan"),
    ("Platfroms", "Platforms"),
    ("Platfrom", "Platform"),
)


def fix_copy(text: str) -> str:
    for old, new in TYPO_FIXES:
        text = text.replace(old, new)
    return text


def main() -> int:
    try:
        from playwright.sync_api import sync_playwright
    except ImportError:
        print("Install playwright: pip3 install playwright && python3 -m playwright install chromium", file=sys.stderr)
        return 1

    print(f"Rendering {URL} …")
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(viewport={"width": 1440, "height": 900})
        page.goto(URL, wait_until="networkidle", timeout=90000)
        page.wait_for_timeout(2000)
        for y in range(0, 12000, 600):
            page.evaluate(f"window.scrollTo(0, {y})")
            page.wait_for_timeout(350)
        page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
        page.wait_for_timeout(1500)

        payload = page.evaluate("""() => {
          const main = document.querySelector('#main');
          const clean = (s) => s.replace(/\\s+/g, ' ').trim();

          const TEAM_NAMES = new Set([
            'Radwa', 'Nour', 'Abdo', 'Rodaina', 'Lolo', 'Lenda', 'Laila', 'Mariam', 'Bassant', 'Shrouk',
          ]);
          const uniqueTeam = [...main.querySelectorAll('[data-framer-name]')]
            .filter(el => TEAM_NAMES.has(el.getAttribute('data-framer-name') || ''))
            .map(el => {
              const img = el.querySelector('img[src*="framerusercontent"]');
              if (!img) return null;
              return {
                name: el.getAttribute('data-framer-name'),
                image: img.src.split('?')[0],
              };
            })
            .filter(Boolean);
          const teamSeen = new Set();
          const teamDeduped = uniqueTeam.filter(t => {
            if (teamSeen.has(t.name)) return false;
            teamSeen.add(t.name);
            return true;
          });

          let clients = [];
          const blogCards = [...main.querySelectorAll('a')].map(a => {
            const img = a.querySelector('img[src*="framerusercontent"]');
            if (!img) return null;
            const lines = a.innerText.split('\\n').map(clean).filter(Boolean);
            if (lines.length < 2) return null;
            const tag = lines[0];
            const title = lines[1];
            if (!/Read More/i.test(a.innerText) && !title) return null;
            return { tag, title, image: img.src.split('?')[0] };
          }).filter(Boolean);

          const uniqueBlogs = [];
          const blogSeen = new Set();
          for (const b of blogCards) {
            if (blogSeen.has(b.tag)) continue;
            blogSeen.add(b.tag);
            uniqueBlogs.push(b);
          }

          const logosEl = main.querySelector('[data-framer-name="Logos"]');
          if (logosEl) {
            clients = [...logosEl.querySelectorAll('img[src*="framerusercontent"]')]
              .map(i => i.src.split('?')[0]);
          }
          const teamImages = new Set(teamDeduped.map(t => t.image));
          const blogImages = new Set(uniqueBlogs.map(b => b.image));
          clients = [...new Set(clients)].filter(u => !teamImages.has(u) && !blogImages.has(u));

          const iframes = [...document.querySelectorAll('iframe[src*="getwally"]')].map(f => f.src);

          return {
            fetched_at: new Date().toISOString(),
            team: teamDeduped,
            clients,
            blogCards: uniqueBlogs,
            reviewsWidgetUrl: iframes[0] || '',
            teamIntro: [
              'Our team is a passionate collective of strategists, creators, analysts, and innovators each bringing unique expertise to deliver measurable results.',
              'Together, we collaborate, challenge, and push boundaries to craft bold ideas and turn them into success stories for our clients.',
            ],
          };
        }""")

        html = page.content()
        browser.close()

    # Map blog cards to Next.js routes
    blog_posts = []
    for card in payload.get("blogCards", []):
        tag = card["tag"].replace("\xa0", " ")
        route = None
        for key, meta in BLOG_ROUTES.items():
            if key.lower() in tag.lower() or tag.lower().startswith(key.lower()[:4]):
                route = meta
                break
        if not route:
            if "iSiS" in tag or "isis" in tag.lower():
                route = BLOG_ROUTES["iSiS-Organic"]
            elif "Ramdan" in tag or "Ramadan" in tag:
                route = BLOG_ROUTES["Ramadan Preparation"]
            elif "Dessert" in tag or "Konafa" in card["title"]:
                route = BLOG_ROUTES["Egypt"]
            elif "Gulf" in card["title"] or "E-commerce Play" in card["title"]:
                route = BLOG_ROUTES["Ecommerce"]
        if route:
            tag = fix_copy(tag.replace("\xa0", " "))
            title = fix_copy(card["title"].replace("\xa0", " "))
            blog_posts.append({
                "tag": tag,
                "title": title,
                "excerpt": title,
                "image": card["image"],
                "slug": route["slug"],
                "isCaseStudy": route.get("isCaseStudy", False),
                "caseStudySlug": route.get("caseStudySlug"),
            })

    payload["blogPosts"] = blog_posts
    OUT_JSON.parent.mkdir(parents=True, exist_ok=True)
    OUT_JSON.write_text(json.dumps(payload, indent=2, ensure_ascii=False), encoding="utf-8")
    OUT_HTML.write_text(html, encoding="utf-8")

    print(f"Team: {len(payload['team'])} members")
    print(f"Clients: {len(payload['clients'])} logos")
    print(f"Blog cards: {len(blog_posts)}")
    print(f"Reviews widget: {payload.get('reviewsWidgetUrl', 'none')}")
    print(f"Saved {OUT_JSON}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
