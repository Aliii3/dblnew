#!/usr/bin/env python3
"""Build article content from scraped Framer HTML."""
import html
import json
import os
import re

SCRAPED = os.path.join(os.path.dirname(__file__), "scraped")
OUT = os.path.join(os.path.dirname(__file__), "..", "src", "lib", "content", "articles")

NAV_JUNK = {
    "Home", "Our Services", "Our Work", "About Us", "Blogs", "Careers", "Let's Talk",
    "Let’s Talk", "LET'S TALK", "Our Clients", "Our Team", "Our Deep Impact",
    "How it Works", "About us", "Junior Marketer", "Reviews", "Privacy Policy",
    "Double Shot", "Read More", "BOOK A MEETING", "FILL THE FORM 1/2", "Select…",
    "Name", "Email", "Country", "Phone Number", "Job Title", "Industry",
    "Social Media", "Search Engine", "Word of Mouth", "Advertisement", "Linkedin",
    "Ecommerce", "Market Research", "Service Needed", "How did you hear about us?",
    "talk.", "kick off.", "Boost.", "— Let's Talk —", "— GEt THE Offer —",
}

SKIP_RE = re.compile(
    r"(function\(|window\.|@media|gtag|framer|dataLayer|typeof |GTM|clarity|fbq|html body|hidden-|display:none)",
    re.I,
)


def extract_blocks(path):
    with open(path) as f:
        s = f.read()
    blocks = []
    for m in re.finditer(r">([^<]{20,4000})<", s):
        t = html.unescape(m.group(1).strip())
        t = re.sub(r"\s+", " ", t)
        if SKIP_RE.search(t):
            continue
        if t in NAV_JUNK:
            continue
        if len(t) < 40:
            continue
        blocks.append(t)
    # dedupe consecutive
    out = []
    for b in blocks:
        if not out or out[-1] != b:
            out.append(b)
    return out


def group_into_sections(blocks, headings):
    """Split blocks when we hit a known heading."""
    sections = []
    current = {"heading": None, "paragraphs": []}
    heading_set = set(headings)

    for b in blocks:
        if b in heading_set:
            if current["paragraphs"] or current["heading"]:
                sections.append(current)
            current = {"heading": b, "paragraphs": []}
        else:
            current["paragraphs"].append(b)
    if current["paragraphs"] or current["heading"]:
        sections.append(current)
    return sections


ARTICLES = {
    "ecommerce": {
        "file": "blogs-ecommerce.html",
        "headings": [
            "Amazon Delivery: Same Platform, Different Playbooks",
            "In Egypt:",
            "In the Gulf:",
            "Talabat Mart: Where the Gulf Set the Standard in Dark Stores",
            "Why Egypt is Behind:",
            "Building Egypt's E-commerce Pyramids",
        ],
    },
    "ramadan-preparation": {
        "file": "blogs-ramadan.html",
        "headings": [
            "Introduction",
            "Strategic Planning",
            "Promotions",
            "Operational Excellence",
            "Ramadan Themes",
            "Platforms Visibility",
            "Measuring Success",
            "Conclusion",
        ],
    },
    "egypt-dessert-market": {
        "file": "blogs-dessert.html",
        "headings": [
            "The First Glance",
            "The Sweet Shift: Why Dessert Brands Can No Longer Ignore",
            "The Nokia Effect: What Happens When Brands Resist Change?",
            "Blaban: The Game Changer That Redefined the Market",
            "Who Struggled to Keep Up?",
            "The Recipe for Success: What It Takes to Win in 2025",
            "Final Thought",
        ],
    },
}


def main():
    os.makedirs(OUT, exist_ok=True)
    for slug, meta in ARTICLES.items():
        path = os.path.join(SCRAPED, meta["file"])
        blocks = extract_blocks(path)
        sections = group_into_sections(blocks, meta["headings"])
        # filter empty sections
        sections = [s for s in sections if s.get("paragraphs")]
        out_path = os.path.join(OUT, f"{slug}.json")
        with open(out_path, "w") as f:
            json.dump(sections, f, indent=2)
        print(f"Wrote {slug}: {len(sections)} sections, {sum(len(s['paragraphs']) for s in sections)} paragraphs")


if __name__ == "__main__":
    main()
