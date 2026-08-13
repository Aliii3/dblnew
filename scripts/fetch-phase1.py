#!/usr/bin/env python3
"""Phase 1: fetch live stats, case studies, and careers from dblshot.co (Playwright)."""
from __future__ import annotations

import json
import re
import sys
import textwrap
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
GENERATED = ROOT / "src" / "lib" / "content" / "generated"
CONTENT = ROOT / "src" / "lib" / "content"

CASE_URLS = {
    "isis-organic": "https://dblshot.co/our-services/amazon/isiscasestudy",
    "spritz": "https://dblshot.co/our-services/amazon/spritz",
    "rehana": "https://dblshot.co/our-services/amazon/rehana",
    "ltf": "https://dblshot.co/our-services/amazon/ltf",
}

NAV_JUNK = re.compile(
    r"^(About Amazon Ads|\||.*Case Study.*Coming soon|ISIS Organic Case Study|RAW Case Study|"
    r"Rehana Case Study|Spritz Case Study|Sekem Case Study|ABOUT AMAZON ADS|Why Partner With Us\?|"
    r"Proven Impact|✅|Let us help you unlock)",
    re.I,
)

EXTRACT_PAGE_JS = """
() => {
  const clean = (s) => (s || '').replace(/\\s+/g, ' ').trim();
  const main = document.querySelector('#main') || document.body;

  const isNav = (t) => {
    if (!t || t.length < 3) return true;
    if (t === '|') return true;
    if (/Case Study/i.test(t) && t.length < 40) return true;
    if (/Coming soon/i.test(t)) return true;
    if (t === 'About Amazon Ads') return true;
    if (t.startsWith('ABOUT AMAZON ADS')) return true;
    if (t.startsWith('Why Partner With Us')) return true;
    if (t.startsWith('✅')) return true;
    if (t === 'Proven Impact') return true;
    if (/^Let us help you unlock/i.test(t)) return true;
    return false;
  };

  const blocks = [];
  for (const el of main.querySelectorAll('h2, h3, p')) {
    const t = clean(el.innerText);
    if (!t || t.length < 15) continue;
    if (isNav(t)) continue;
    if (/^Read More$|^Apply Now$|^Let's Talk$/i.test(t)) continue;
    blocks.push({ tag: el.tagName.toLowerCase(), text: t });
  }

  const sections = [];
  let current = { heading: null, paragraphs: [] };

  const flush = () => {
    if (!current.heading && !current.paragraphs.length) return;
    const paras = [];
    for (const p of current.paragraphs) {
      if (!paras.length || paras[paras.length - 1] !== p) paras.push(p);
    }
    if (current.heading || paras.length) {
      sections.push({ heading: current.heading, paragraphs: paras });
    }
    current = { heading: null, paragraphs: [] };
  };

  for (const b of blocks) {
    const isHeading =
      b.tag === 'h2' &&
      b.text.length < 120 &&
      !b.text.endsWith('.') &&
      !/^In (February|April|the lead)/i.test(b.text);

    if (isHeading) {
      flush();
      current.heading = b.text;
    } else {
      current.paragraphs.push(b.text);
    }
  }
  flush();

  return { sections, blockCount: blocks.length };
}
"""

STATS_JS = """
() => {
  const clean = (s) => (s || '').replace(/\\s+/g, ' ').trim();
  const main = document.querySelector('#main');
  const text = clean(main.innerText);
  const si = text.indexOf('Proven Impact');
  const snippet = si >= 0 ? text.slice(si, si + 700) : text;
  const provenBlock = snippet.split('Impact Services')[0] || snippet;
  const deepMatch = snippet.match(/DEEP IMPACT\\s*(.+?)Impact Process/i);
  const deepBlock = deepMatch ? deepMatch[1] : '';
  return { provenBlock, deepBlock, snippet: snippet.slice(0, 400) };
}
"""


def parse_stats(proven: str, deep: str) -> dict:
    proven_match = re.search(r"(\d+)\s*\+\s*.*?SATISFIED CLIENTS", proven, re.I)
    proven_val = int(proven_match.group(1)) if proven_match else 80

    def pick(pattern: str, default: int) -> int:
        m = re.search(pattern, deep, re.I)
        return int(m.group(1)) if m else default

    return {
        "proven": [{"value": proven_val, "suffix": "+", "label": "Satisfied Clients", "featured": True}],
        "deep": [
            {"value": pick(r"(\d+)\s*\+\s*CAMPAIGNS LAUNCHED", 208), "suffix": "+", "label": "Campaigns Launched"},
            {"value": pick(r"(\d+)\+\s*YEARS OF EXPERIENCE", 18), "suffix": "+", "label": "Years of Experience"},
            {"value": pick(r"(\d+)\s*\+\s*AVERAGE CIR", 10), "suffix": "+", "label": "Average CIR"},
            {"value": pick(r"(\d+)\+\s*MILLIONS IN SALES", 100), "suffix": "+", "label": "Millions In Sales"},
        ],
    }


CASE_META = {
    "isis-organic": {
        "title": "ISIS Organic",
        "subtitle": "The E-commerce Transformation Story of iSiS Organic",
    },
    "spritz": {
        "title": "Spritz",
        "subtitle": "Scaling FMCG on E-commerce",
    },
    "rehana": {
        "title": "Rehana",
        "subtitle": "Ramadan Launch Under Pressure",
    },
    "ltf": {
        "title": "LTF",
        "subtitle": "Amazon Growth Partnership",
    },
}


def dedupe_paragraphs(paragraphs: list[str]) -> list[str]:
    out: list[str] = []
    for p in paragraphs:
        p = clean_text(p)
        if not p or len(p) < 20:
            continue
        if out and out[-1] == p:
            continue
        out.append(p)
    return out


def clean_text(text: str) -> str:
    return re.sub(r"\s+", " ", text.strip())


def merge_short_sections(sections: list[dict], min_paras: int = 1) -> list[dict]:
    out: list[dict] = []
    for s in sections:
        paras = dedupe_paragraphs(s.get("paragraphs") or [])
        heading = s.get("heading")
        if heading and NAV_JUNK.match(heading):
            continue
        if not paras and not heading:
            continue
        if out and heading and len(paras) == 0:
            continue
        out.append({"heading": heading, "paragraphs": paras})
    return [s for s in out if s["heading"] or len(s["paragraphs"]) >= min_paras]


def write_stats_ts(stats: dict) -> None:
    path = CONTENT / "stats.ts"
    body = f"""export type Stat = {{
  value: number;
  suffix: string;
  label: string;
  featured?: boolean;
  prefix?: string;
}};

/** Proven Impact — fetched from dblshot.co homepage */
export const PROVEN_STATS: Stat[] = {json.dumps(stats["proven"], indent=2)};

/** Deep Impact — fetched from dblshot.co homepage */
export const DEEP_IMPACT_STATS: Stat[] = {json.dumps(stats["deep"], indent=2)};

/** @deprecated use PROVEN_STATS / DEEP_IMPACT_STATS */
export const STATS = [...PROVEN_STATS, ...DEEP_IMPACT_STATS];
"""
    path.write_text(body, encoding="utf-8")


JOB_COPY: dict[str, dict] = {
    "seniorgraphic-designer": {
        "title": "Senior Graphic Designer",
        "description": "We are looking for a highly creative and strategic Senior Graphic Designer with not less than 5 years of experience to join our team. You will play a pivotal role in shaping brand identities and developing high-impact visual assets that drive performance across all digital channels.",
        "tags": ["New Cairo", "5+ years"],
    },
    "social-media-specialist": {
        "title": "Social Media Moderator",
        "description": "We're hiring a strategic and creative Social Media Moderator with 1+ years of experience in community management, content moderation, and multi-platform engagement.",
        "tags": ["New Cairo"],
    },
    "reel-creator": {
        "title": "Reel Creator",
        "description": "We are looking for a creative Reel Creator with 2–3 years of experience in short-form video production to join our team. You will produce high-performing Reels aligned with brand identity and social trends across Instagram and TikTok.",
        "tags": ["New Cairo", "Experience: 2-3 years"],
    },
    "performance-marketing-specialist": {
        "title": "Performance Marketing Specialist",
        "description": "We're looking for a Performance Marketing Specialist with hands-on experience in paid media. The ideal candidate is data-driven, creative, and well-versed in campaign optimization across Meta, Google, and e-commerce platforms.",
        "tags": ["On-site - New Cairo", "Experience: 1–2 years"],
    },
    "video-editor": {
        "title": "Video Editor",
        "description": "Edit and produce high-quality video content for social media, ads, campaigns, and brand storytelling.",
        "tags": ["New Cairo"],
    },
    "graphic-designer": {
        "title": "Graphic Designer",
        "description": "Design and produce creative assets for social media, campaigns, and websites. Develop brand identities and collaborate with marketing teams to bring concepts to life visually.",
        "tags": ["New Cairo", "3–5 years"],
    },
    "software-developer": {
        "title": "Software Developer",
        "description": "Build and maintain e-commerce websites on WordPress and Shopify. Work with our e-commerce team to deliver high-performance, conversion-focused digital experiences.",
        "tags": ["New Cairo", "1–2 years"],
    },
    "accountant-tax-experience": {
        "title": "Accountant (Tax Experience)",
        "description": "Part-time accountant role focused on tax filings, VAT compliance, and financial reporting for our New Cairo agency. Experience with Egyptian tax law and accounting software required.",
        "tags": ["New Cairo / Hybrid", "Part-Time"],
    },
    "product-photographer": {
        "title": "Product Photographer",
        "description": "Capture high-quality product photography for FMCG brands across e-commerce platforms, campaigns, and brand assets.",
        "tags": ["New Cairo"],
    },
}


def build_jobs_from_careers(careers: list[dict]) -> list[dict]:
    jobs = []
    for c in careers:
        slug = c["slug"]
        copy = JOB_COPY.get(slug, {})
        title = copy.get("title") or c["title"]
        if title == slug:
            title = (c.get("sections") or [{}])[0].get("heading") or title
        jobs.append({
            "title": title,
            "description": copy.get("description") or f"Join DBLSHOT as {title}.",
            "tags": copy.get("tags") or ["New Cairo"],
            "mailSubject": title,
            "slug": slug,
        })
    return jobs


def write_ts_const(path: Path, name: str, obj: list | dict) -> None:
    body = json.dumps(obj, indent=2, ensure_ascii=False)
    path.write_text(f"export const {name} = {textwrap.indent(body, '  ').rstrip()} as const;\n", encoding="utf-8")


def scroll_page(page) -> None:
    for y in range(0, 14000, 400):
        page.evaluate(f"window.scrollTo(0, {y})")
        page.wait_for_timeout(180)
    page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
    page.wait_for_timeout(1200)


def main() -> int:
    try:
        from playwright.sync_api import sync_playwright
    except ImportError:
        print("Install playwright: pip3 install playwright && python3 -m playwright install chromium", file=sys.stderr)
        return 1

    GENERATED.mkdir(parents=True, exist_ok=True)

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(viewport={"width": 1440, "height": 900})

        # ── Stats from homepage ──
        print("Fetching homepage stats…")
        page.goto("https://dblshot.co/", wait_until="load", timeout=120000)
        page.wait_for_timeout(2500)
        scroll_page(page)
        page.wait_for_timeout(2000)
        blocks = page.evaluate(STATS_JS)
        stats = parse_stats(blocks.get("provenBlock", ""), blocks.get("deepBlock", ""))
        (GENERATED / "stats.json").write_text(json.dumps(stats, indent=2), encoding="utf-8")
        write_stats_ts(stats)
        print(f"  Proven: {stats['proven'][0]['value']}+ Satisfied Clients")
        for s in stats["deep"]:
            print(f"  Deep: {s['value']}{s['suffix']} {s['label']}")

        # ── Case studies ──
        studies = []
        for slug, url in CASE_URLS.items():
            print(f"Fetching case study: {slug} …")
            page.goto(url, wait_until="load", timeout=120000)
            page.wait_for_timeout(2000)
            scroll_page(page)
            page.wait_for_timeout(1500)
            raw = page.evaluate(EXTRACT_PAGE_JS)
            sections = merge_short_sections(raw.get("sections") or [])

            # Drop orphan title-only fragments before main intro
            if sections and sections[0].get("heading") is None:
                paras = sections[0].get("paragraphs") or []
                if paras and all(len(p) < 60 for p in paras):
                    sections = sections[1:]

            meta = CASE_META[slug]
            intro = ""
            for s in sections:
                for p in s["paragraphs"]:
                    if len(p) > 80:
                        intro = p
                        break
                if intro:
                    break

            if slug == "ltf" and len(sections) < 2:
                # Live LTF URL currently serves Amazon Ads placeholder
                sections = [{
                    "heading": "Case study coming soon",
                    "paragraphs": [
                        "LTF partnered with DBLSHOT for Amazon advertising and e-commerce growth. "
                        "Full case study content is being updated on dblshot.co — check back soon for detailed results.",
                    ],
                }]
                intro = sections[0]["paragraphs"][0]

            studies.append({
                "slug": slug,
                "title": meta["title"],
                "subtitle": meta["subtitle"],
                "intro": intro,
                "sections": sections,
            })
            print(f"  {slug}: {len(sections)} sections, {sum(len(s['paragraphs']) for s in sections)} paragraphs")

        (GENERATED / "case-studies.json").write_text(
            json.dumps(studies, indent=2, ensure_ascii=False) + "\n",
            encoding="utf-8",
        )

        browser.close()

    # ── Careers from existing careers.json (all 9 roles) ──
    careers_path = GENERATED / "careers.json"
    if careers_path.exists():
        careers = json.loads(careers_path.read_text(encoding="utf-8"))
        jobs = build_jobs_from_careers(careers)
        write_ts_const(CONTENT / "jobs.ts", "JOBS", jobs)
        print(f"Careers listing: {len(jobs)} jobs synced to jobs.ts")
    else:
        print("Warning: careers.json missing — run npm run sync-content first", file=sys.stderr)

    print("Phase 1 fetch complete.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
