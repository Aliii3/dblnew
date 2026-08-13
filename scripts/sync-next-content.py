#!/usr/bin/env python3
"""Sync scraped dblshot.co content into Next.js content modules."""
from __future__ import annotations

import json
import re
import textwrap
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SITE_JSON = ROOT / "scripts" / "scraped" / "site-content.json"
ARTICLES_DIR = ROOT / "src" / "lib" / "content" / "articles"
GENERATED_DIR = ROOT / "src" / "lib" / "content" / "generated"
CONTENT_DIR = ROOT / "src" / "lib" / "content"

NAV_JUNK = {
    "Home", "Our Services", "Our Work", "About Us", "Blogs", "Careers", "Let's Talk",
    "Let's Talk", "LET'S TALK", "Our Clients", "Our Team", "Our Deep Impact",
    "How it Works", "About us", "Junior Marketer", "Reviews", "Privacy Policy",
    "Double Shot", "Read More", "BOOK A MEETING", "talk.", "kick off.", "Boost.",
    "talk. kick off. Boost.", "talk. kick off.Boost.", "Proven Impact", "E-Commerce Ads",
    "Amazon Seasonality", "SummerCampaign", "AmazonPrime", "Back ToSchool", "BlackFriday",
}

BLOG_MAP = {
    "/blogs/ecommerce": "ecommerce",
    "/blogs/ramadan-preparation-blog": "ramadan-preparation",
    "/blogs/dessert-market-2": "egypt-dessert-market",
}

SERVICE_MAP = {
    "/our-services/amazon/about": "amazon",
    "/services/e-commerce-management": "e-commerce-management",
    "/services/social-media": "social-media",
    "/services/website-development": "website-development",
    "/services/market-resaerch": "market-research",
}

CASE_STUDY_MAP = {
    "/our-services/amazon/isiscasestudy": "isis-organic",
    "/our-services/amazon/spritz": "spritz",
    "/our-services/amazon/rehana": "rehana",
    "/our-services/amazon/ltf": "ltf",
}

CAREER_SLUGS = [
    "seniorgraphic-designer",
    "social-media-specialist",
    "reel-creator",
    "performance-marketing-specialist",
    "video-editor",
    "graphic-designer",
    "software-developer",
    "accountant-tax-experience",
    "product-photographer",
]


def load_site() -> dict:
    return json.loads(SITE_JSON.read_text(encoding="utf-8"))


def find_page_path(site: dict, suffix: str) -> str:
    for path in site["pages"]:
        if path.endswith(suffix) or suffix in path:
            return path
    raise KeyError(suffix)


def page_fc(site: dict, path: str) -> dict:
    if path not in site["pages"]:
        path = find_page_path(site, path.rsplit("/", 1)[-1])
    return site["pages"][path]["framer_content"]


def clean(text: str) -> str:
    return re.sub(r"\s+", " ", text.strip())


def is_junk(text: str) -> bool:
    t = clean(text)
    if not t or t in NAV_JUNK:
        return True
    if re.match(r"^\d+\s*:\s*\d+\s*:", t):  # countdown timer
        return True
    if t.startswith("(()=>{") or "Google Tag Manager" in t:
        return True
    return False


def meaningful_body(fc: dict) -> list[str]:
    return [clean(t) for t in fc.get("body", []) if not is_junk(clean(t))]


def is_heading(text: str, fc: dict) -> bool:
    t = clean(text)
    if t.startswith("✅") or t.startswith("•") or re.match(r"^\d+\.", t):
        return True
    if len(t) > 180:
        return False
    for h in fc.get("headings", []):
        if h["text"] == t:
            return True
    return False


def to_sections(fc: dict) -> list[dict]:
    sections: list[dict] = []
    current: dict = {"heading": None, "paragraphs": []}
    heading_set = {h["text"] for h in fc.get("headings", [])}

    for raw in fc.get("body", []):
        text = clean(raw)
        if is_junk(text):
            continue

        as_heading = text in heading_set and len(text) <= 180
        if as_heading and not text.startswith("✅"):
            if current["heading"] or current["paragraphs"]:
                sections.append(current)
            current = {"heading": text, "paragraphs": []}
        else:
            current["paragraphs"].append(text)

    if current["heading"] or current["paragraphs"]:
        sections.append(current)

    # drop empty
    return [s for s in sections if s["heading"] or s["paragraphs"]]


def dedupe_sections(sections: list[dict]) -> list[dict]:
    out: list[dict] = []
    for s in sections:
        paras: list[str] = []
        for p in s["paragraphs"]:
            if not paras or paras[-1] != p:
                paras.append(p)
        key = (s["heading"], tuple(paras))
        if out and (out[-1]["heading"], tuple(out[-1]["paragraphs"])) == key:
            continue
        out.append({"heading": s["heading"], "paragraphs": paras})
    return out


def ts_string(s: str) -> str:
    return json.dumps(s, ensure_ascii=False)


def write_ts(path: Path, name: str, obj: dict | list) -> None:
    body = json.dumps(obj, indent=2, ensure_ascii=False)
    # Format as TS const
    indented = textwrap.indent(body, "  ")
    path.write_text(
        f"export const {name} = {indented.rstrip()} as const;\n",
        encoding="utf-8",
    )


def sync_blogs(site: dict) -> None:
    for framer_path, slug in BLOG_MAP.items():
        fc = page_fc(site, framer_path)
        sections = dedupe_sections(to_sections(fc))
        # first paragraph often duplicates title — keep as lead under null heading
        if sections and sections[0]["heading"] and sections[0]["heading"] in {
            s["heading"] for s in sections[1:] if s["heading"]
        }:
            pass
        out = [{"heading": s["heading"], "paragraphs": s["paragraphs"]} for s in sections]
        (ARTICLES_DIR / f"{slug}.json").write_text(
            json.dumps(out, indent=2, ensure_ascii=False) + "\n",
            encoding="utf-8",
        )
        print(f"  article: {slug} ({len(out)} sections)")


def parse_service(fc: dict, slug: str) -> dict:
    body = meaningful_body(fc)
    hero = next((t for t in body if t.isupper() and len(t) < 80 and "DBLSHOT" in t or "AMAZON" in t or "SOCIAL" in t or "E COMMERCE" in t or "WEBSITE" in t or "MARKET" in t), body[0] if body else slug)
    hero = next((t for t in body if len(t) < 60 and t.isupper()), hero)

    intros = [t for t in body if t.startswith("At Dblshot") or t.startswith("At DBLSHOT")]
    intro = intros[0] if intros else ""
    detail = intros[1] if len(intros) > 1 else next(
        (t for t in body if len(t) > 100 and not t.startswith("✅") and "Why Partner" not in t and t != intro),
        "",
    )
    benefits = [t.replace("✅", "").strip() for t in body if t.startswith("✅")]
    closing = next(
        (t for t in body if "unlock" in t.lower() or "scale like never" in t.lower() or "partner with us" in t.lower() and len(t) > 40),
        next((t for t in reversed(body) if len(t) > 30 and not t.startswith("✅")), ""),
    )
    sections = dedupe_sections(to_sections(fc))
    return {
        "slug": slug,
        "hero": hero,
        "intro": intro,
        "detail": detail,
        "benefits": benefits,
        "closing": closing,
        "sections": sections,
    }


def sync_services(site: dict) -> None:
    services = [parse_service(page_fc(site, path), slug) for path, slug in SERVICE_MAP.items()]
    GENERATED_DIR.mkdir(parents=True, exist_ok=True)
    (GENERATED_DIR / "services.json").write_text(
        json.dumps(services, indent=2, ensure_ascii=False) + "\n",
        encoding="utf-8",
    )
    amazon = next(s for s in services if s["slug"] == "amazon")
    write_ts(CONTENT_DIR / "amazon.ts", "AMAZON_SERVICE", {
        "intro": amazon["intro"],
        "detail": amazon["detail"],
        "benefits": amazon["benefits"],
        "closing": amazon["closing"],
        "stats": [{"value": "Proven", "label": "Impact"}, {"value": "Million", "label": "in total sales"}],
        "seasonality": ["Summer Campaign", "Amazon Prime", "Back To School", "Black Friday"],
        "otherBrands": ["ISIS Organic", "Sekem", "Rehana", "Spritz"],
    })
    print(f"  services: {len(services)} pages")


def sync_case_studies(site: dict) -> None:
    studies = []
    for path, slug in CASE_STUDY_MAP.items():
        fc = page_fc(site, path)
        body = meaningful_body(fc)
        title = next((t for t in body if "iSiS" in t or "Spritz" in t or "Rehana" in t or "LTF" in t.upper()), slug)
        if slug == "isis-organic":
            title = "ISIS Organic"
        elif slug == "spritz":
            title = "Spritz"
        elif slug == "rehana":
            title = "Rehana"
        elif slug == "ltf":
            title = "LTF"
        subtitle = next((t for t in body if "Transformation" in t or "Growth Story" in t or "Story" in t), "")
        intro = next((t for t in body if len(t) > 80 and "FMCG" in t or "brand" in t.lower()), body[0] if body else "")
        sections = dedupe_sections(to_sections(fc))
        studies.append({
            "slug": slug,
            "title": title,
            "subtitle": subtitle,
            "intro": intro,
            "sections": sections,
        })
    (GENERATED_DIR / "case-studies.json").write_text(
        json.dumps(studies, indent=2, ensure_ascii=False) + "\n",
        encoding="utf-8",
    )

    isis = next(s for s in studies if s["slug"] == "isis-organic")
    amazon_secs = [s for s in isis["sections"] if s["heading"] and "Amazon" in s["heading"]]
    expansion_secs = [s for s in isis["sections"] if s["heading"] and "Digital" in s["heading"]]
    write_ts(CONTENT_DIR / "isis-case-study.ts", "ISIS_CASE_STUDY", {
        "title": "ISIS Organic",
        "subtitle": isis["subtitle"] or "E-commerce Transformation Story of iSiS Organic",
        "intro": isis["intro"],
        "amazon": {
            "title": amazon_secs[0]["heading"] if amazon_secs else "The Foundation on Amazon",
            "paragraphs": amazon_secs[0]["paragraphs"] if amazon_secs else [],
        },
        "expansion": {
            "title": expansion_secs[0]["heading"] if expansion_secs else "Digital Presence",
            "paragraphs": expansion_secs[0]["paragraphs"] if expansion_secs else [],
        },
        "metrics": [
            {"value": 245, "suffix": "%", "label": "E-commerce growth"},
            {"value": 2470, "suffix": "%", "label": "YOY Amazon sales"},
        ],
        "blogLine": "245% growth in e commerce, 2,470% YOY growth in Amazon Sales",
        "sections": isis["sections"],
    })
    print(f"  case studies: {len(studies)} pages")


def sync_about(site: dict) -> None:
    fc = page_fc(site, "/aboutuss")
    body = meaningful_body(fc)
    hero = next((t for t in fc.get("headings", []) if "Story" in t["text"]), {"text": "Watch Our Story"})["text"]
    subtitle = next((t for t in body if "Radwa" in t), "")
    paragraphs = [t for t in body if len(t) > 120 and t.startswith("Dblshot")]
    if len(paragraphs) < 3:
        paragraphs = [t for t in body if len(t) > 120]
    write_ts(CONTENT_DIR / "about.ts", "ABOUT_COPY", {
        "heroTitle": hero,
        "heroHighlight": "Story",
        "heroSubtitle": subtitle,
        "paragraphs": paragraphs[:3],
        "teamIntro": [
            "Our team is a passionate collective of strategists, creators, analysts, and innovators each bringing unique expertise to deliver measurable results.",
            "Together, we collaborate, challenge, and push boundaries to craft bold ideas and turn them into success stories for our clients.",
        ],
    })
    print("  about.ts")


def sync_junior_marketer(site: dict) -> None:
    fc = page_fc(site, "/jrm3")
    body = meaningful_body(fc)
    h2s = [h["text"] for h in fc.get("headings", []) if h["level"] == "h2"]
    write_ts(CONTENT_DIR / "junior-marketer.ts", "JUNIOR_MARKETER", {
        "heroTitle": h2s[0] if h2s else "Round 3 Is Soon",
        "heroSubtitle": "Let Your Marketing Journey Begin",
        "tagline": h2s[1] if len(h2s) > 1 else "It's not just a course. It's your launchpad.",
        "intro": h2s[2] if len(h2s) > 2 else body[0] if body else "",
        "programTitle": next((t for t in h2s if "Junior Marketer" in t), "What's Junior Marketer ?"),
        "programBody": next((t for t in body if "Jr. Marketer program" in t or "young minds" in t), ""),
        "handsOnIntro": next((t for t in h2s if "don't stop" in t.lower()), "But we don't stop at theory."),
        "handsOnItems": [t for t in body if t.startswith("Learning ") or t.startswith("launch ") or t.startswith("Creating ") or t.startswith("Exploring ")],
        "pillars": [
            {"label": "marketing", "sub": "foundations"},
            {"label": "Make your", "sub": "own brand"},
            {"label": "Develop your", "sub": "marketing plan"},
            {"label": "penetrate", "sub": "the market"},
            {"label": "Launch your", "sub": "brand"},
        ],
        "tools": next((t for t in body if "Office apps" in t or "Canva" in t), ""),
        "mission": next((t for t in body if "next generation" in t.lower()), ""),
        "mentor": {"name": "Radwa Fathi", "title": "The Bold Architect of Egyptian Brands."},
        "forYouTitle": next((t for t in h2s if "Made For You" in t), "Jr. Marketer Is Made For You IF :"),
        "forYouItems": [t for t in body if t.startswith("You're ") or t.startswith("You want ") or t.startswith("You're excited")],
        "sections": dedupe_sections(to_sections(fc)),
    })
    print("  junior-marketer.ts")


def sync_privacy(site: dict) -> None:
    fc = page_fc(site, "/privacy-policy")
    sections = dedupe_sections(to_sections(fc))
    privacy = []
    for s in sections:
        title = s["heading"] or "Introduction"
        if title.lower() == "privacy policy":
            continue
        content = " ".join(s["paragraphs"])
        if not content and s["heading"] and len(s["heading"]) > 40:
            content = s["heading"]
            title = re.split(r"(?=\d+\.)", content)[0].strip() or title
        if content or (s["heading"] and len(s["heading"]) > 30):
            privacy.append({"title": title, "content": content or s["heading"]})
    write_ts(CONTENT_DIR / "privacy.ts", "PRIVACY_SECTIONS", privacy)
    print(f"  privacy.ts ({len(privacy)} sections)")


def sync_careers(site: dict) -> None:
    jobs = []
    career_pages = []
    for slug in CAREER_SLUGS:
        path = f"/careers/{slug}"
        if path not in site["pages"]:
            continue
        fc = page_fc(site, path)
        h1 = next((h["text"] for h in fc.get("headings", []) if h["level"] == "h1"), slug)
        paras = [t for t in meaningful_body(fc) if len(t) > 10]
        career_pages.append({
            "slug": slug,
            "title": h1,
            "sections": dedupe_sections(to_sections(fc)),
            "paragraphs": paras,
        })

    # Main careers listing — all roles with detail pages
    career_pages_by_slug = {c["slug"]: c for c in career_pages}
    listing_specs = [
        ("seniorgraphic-designer", "Senior Graphic Designer",
         "We are looking for a highly creative and strategic Senior Graphic Designer with not less than 5 years of experience to join our team. You will play a pivotal role in shaping brand identities and developing high impact visual assets that drive performance across all digital channels.",
         ["New Cairo", "5+ years"]),
        ("social-media-specialist", "Social Media Moderator",
         "We're hiring a strategic and creative Social Media Manager with 2–3 years of experience in managing multi-platform accounts, content planning, and community engagement.",
         ["New Cairo"]),
        ("reel-creator", "Reel Creator",
         "We are looking for a creative Reel Creator with 2–3 years of experience in short-form video production to join our team. You will be responsible for producing high-performing Reels that align with brand identity, social trends, and performance objectives across Instagram and TikTok.",
         ["New Cairo", "Experience: 2-3 years"]),
        ("performance-marketing-specialist", "Performance Marketing Specialist",
         "We're looking for a Performance Marketing Specialist with hands-on experience in paid media. The ideal candidate is data-driven, creative, and well-versed in campaign optimization across Meta, Google, and e-commerce platforms.",
         ["On-site - New Cairo", "Experience: 1–2 years"]),
        ("video-editor", "Video Editor",
         "We're hiring a talented Video Editor with 2–4 years of experience in editing social media content, ads, and brand videos. Proficiency in Premiere Pro, After Effects, and motion graphics is required.",
         ["New Cairo"]),
        ("graphic-designer", "Graphic Designer",
         "Design and produce creative assets for social media, campaigns, and websites. Develop brand identities and collaborate with marketing teams to bring concepts to life visually.",
         ["New Cairo", "3–5 years"]),
        ("software-developer", "Software Developer",
         "Build and maintain e-commerce websites on WordPress and Shopify. Work with our e-commerce team to deliver high-performance, conversion-focused digital experiences.",
         ["New Cairo", "1–2 years"]),
        ("accountant-tax-experience", "Accountant (Tax Experience)",
         "Part-time accountant role focused on tax filings, VAT compliance, and financial reporting for our New Cairo agency.",
         ["New Cairo / Hybrid", "Part-Time"]),
        ("product-photographer", "Product Photographer",
         "Capture high-quality product photography for FMCG brands across e-commerce platforms, campaigns, and brand assets.",
         ["New Cairo"]),
    ]
    listing = []
    for slug, title, description, tags in listing_specs:
        if slug not in career_pages_by_slug:
            continue
        listing.append({
            "title": title,
            "description": description,
            "tags": tags,
            "mailSubject": title,
            "slug": slug,
        })

    write_ts(CONTENT_DIR / "jobs.ts", "JOBS", listing)
    (GENERATED_DIR / "careers.json").write_text(
        json.dumps(career_pages, indent=2, ensure_ascii=False) + "\n",
        encoding="utf-8",
    )
    print(f"  careers: {len(listing)} listings, {len(career_pages)} detail pages")


def sync_services_nav() -> None:
    services_nav = [
        {
            "title": "Amazon Growth",
            "description": "End-to-end Amazon management — listing optimization, PPC mastery, and marketplace dominance.",
            "href": "/services/amazon",
            "icon": "amazon",
        },
        {
            "title": "E-commerce Ops",
            "description": "Full e-commerce management across Amazon, Noon, Breadfast, and GoodsMart.",
            "href": "/services/e-commerce-management",
            "icon": "cart",
        },
        {
            "title": "Social Media",
            "description": "Strategy, content, paid social, and community management across all major platforms.",
            "href": "/services/social-media",
            "icon": "chart",
        },
        {
            "title": "Website Development",
            "description": "High-converting websites built for performance, CRO, and brand growth.",
            "href": "/services/website-development",
            "icon": "web",
        },
        {
            "title": "Market Research",
            "description": "Data-driven insights and competitor analysis to inform your FMCG growth strategy.",
            "href": "/services/market-research",
            "icon": "research",
        },
    ]
    (CONTENT_DIR / "services.ts").write_text(
        "export const SERVICES = "
        + json.dumps(services_nav, indent=2, ensure_ascii=False)
        + " as const;\n\nexport const AMAZON_BENEFITS = [\n"
        + '  "Proven strategies to boost visibility & sales",\n'
        + '  "Amazon experts across Sponsored Products, Brands & Display",\n'
        + '  "Clear dashboards, real ROI, and consistent scaling",\n'
        + '  "Customized campaigns built for your brand\'s growth",\n'
        + "] as const;\n",
        encoding="utf-8",
    )
    print("  services.ts")


def main() -> None:
    if not SITE_JSON.exists():
        raise SystemExit(f"Missing {SITE_JSON}. Run: npm run fetch-all")
    site = load_site()
    print("Syncing content into Next.js…")
    GENERATED_DIR.mkdir(parents=True, exist_ok=True)
    sync_blogs(site)
    sync_services(site)
    sync_case_studies(site)
    sync_about(site)
    sync_junior_marketer(site)
    sync_privacy(site)
    sync_careers(site)
    sync_services_nav()
    print("Done.")


if __name__ == "__main__":
    main()
