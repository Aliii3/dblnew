#!/usr/bin/env python3
"""Fetch every page from dblshot.co and extract full content via Framer search index + HTML."""
from __future__ import annotations

import html
import json
import os
import re
import sys
import time
import urllib.error
import urllib.parse
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SCRAPED = ROOT / "scripts" / "scraped" / "full"
CONTENT_OUT = ROOT / "scripts" / "scraped" / "site-content.json"
MARKDOWN_OUT = ROOT / "scripts" / "scraped" / "site-content.md"
SITEMAP_URL = "https://dblshot.co/sitemap.xml"
BASE = "https://dblshot.co"

SKIP_RE = re.compile(
    r"(function\s*\(|window\.|@media\s*\(|gtag\(|dataLayer|typeof\s|GTM-|clarity\(|fbq\(|"
    r"modulepreload|\.mjs[\"']|\(\(\)=>)",
    re.I,
)

NAV_JUNK = {
    "Home", "Our Services", "Our Work", "About Us", "Blogs", "Careers", "Let's Talk",
    "Let's Talk", "LET'S TALK", "Our Clients", "Our Team", "Our Deep Impact",
    "How it Works", "About us", "Junior Marketer", "Reviews", "Privacy Policy",
    "Double Shot", "Read More", "BOOK A MEETING", "FILL THE FORM 1/2", "Select…",
    "Name", "Email", "Country", "Phone Number", "Job Title", "Industry",
    "Social Media", "Search Engine", "Word of Mouth", "Advertisement", "Linkedin",
    "Ecommerce", "Market Research", "Service Needed", "How did you hear about us?",
    "talk.", "kick off.", "Boost.", "— Let's Talk —", "— GEt THE Offer —",
    "Google Tag Manager (noscript) -->",
}

HEADING_KEYS = ("h1", "h2", "h3", "h4", "h5", "h6")


def fetch(url: str, retries: int = 3) -> str:
    req = urllib.request.Request(
        url,
        headers={"User-Agent": "Mozilla/5.0 (compatible; DBLSHOT-content-fetch/2.0)"},
    )
    last_err: Exception | None = None
    for attempt in range(retries):
        try:
            with urllib.request.urlopen(req, timeout=60) as resp:
                return resp.read().decode("utf-8", errors="replace")
        except (urllib.error.URLError, TimeoutError) as e:
            last_err = e
            time.sleep(1 + attempt)
    raise RuntimeError(f"Failed to fetch {url}: {last_err}")


def fetch_json(url: str) -> dict:
    return json.loads(fetch(url))


def normalize_path(path: str) -> str:
    path = urllib.parse.unquote(path.strip())
    if not path.startswith("/"):
        path = "/" + path
    return path.rstrip("/") or "/"


def path_from_url(url: str) -> str:
    return normalize_path(urllib.parse.urlparse(url).path or "/")


def parse_sitemap(xml: str) -> list[str]:
    urls = re.findall(r"<loc>(https://dblshot\.co[^<]*)</loc>", xml)
    return sorted(set(urls))


def discover_search_index_url(home_html: str) -> str | None:
    m = re.search(
        r'name="framer-search-index"\s+content="([^"]+)"',
        home_html,
    ) or re.search(
        r'content="([^"]+)"\s+name="framer-search-index"',
        home_html,
    )
    return m.group(1) if m else None


def load_search_index(home_html: str) -> dict[str, dict]:
    index_url = discover_search_index_url(home_html)
    if not index_url:
        print("Warning: no Framer search index found", file=sys.stderr)
        return {}
    print(f"Fetching Framer search index: {index_url}")
    raw = fetch_json(index_url)
    return {normalize_path(k): v for k, v in raw.items()}


def url_to_path(url: str) -> Path:
    parsed = urllib.parse.urlparse(url)
    path = parsed.path.strip("/")
    if not path:
        return SCRAPED / "index.html"
    safe = path.replace("/", os.sep)
    return SCRAPED / f"{safe}.html"


def extract_meta(page_html: str) -> dict:
    meta: dict[str, str] = {}
    title_m = re.search(r"<title[^>]*>([^<]+)</title>", page_html, re.I)
    if title_m:
        meta["title"] = html.unescape(title_m.group(1).strip())
    for m in re.finditer(
        r'<meta\s+(?:[^>]*?\s)?(?:name|property)=["\']([^"\']+)["\']\s+content=["\']([^"\']*)["\']',
        page_html,
        re.I,
    ):
        meta[m.group(1)] = html.unescape(m.group(2))
    for m in re.finditer(
        r'<meta\s+(?:[^>]*?\s)?content=["\']([^"\']*)["\']\s+(?:name|property)=["\']([^"\']+)["\']',
        page_html,
        re.I,
    ):
        meta[m.group(2)] = html.unescape(m.group(1))
    canon = re.search(r'rel="canonical"\s+href="([^"]+)"', page_html)
    if canon:
        meta["canonical"] = canon.group(1)
    return meta


def is_meaningful_text(text: str) -> bool:
    t = text.strip()
    if len(t) < 2 or t in NAV_JUNK:
        return False
    if SKIP_RE.search(t):
        return False
    return bool(re.search(r"[A-Za-z\u0600-\u06FF0-9]", t))


def dedupe_preserve(items: list[str]) -> list[str]:
    seen: set[str] = set()
    out: list[str] = []
    for item in items:
        if item not in seen:
            seen.add(item)
            out.append(item)
    return out


def extract_text_blocks(page_html: str) -> list[str]:
    blocks: list[str] = []
    for m in re.finditer(r">([^<]{2,8000})<", page_html):
        t = html.unescape(m.group(1).strip())
        t = re.sub(r"\s+", " ", t)
        if is_meaningful_text(t):
            blocks.append(t)
    return dedupe_preserve(blocks)


def extract_from_search_index(entry: dict) -> dict:
    headings: list[dict] = []
    paragraphs: list[str] = []

    for level in HEADING_KEYS:
        for text in entry.get(level, []):
            t = text.strip()
            if is_meaningful_text(t) and len(t) > 10:
                headings.append({"level": level, "text": t})

    for text in entry.get("p", []):
        t = text.strip()
        if is_meaningful_text(t) and len(t) > 15:
            paragraphs.append(t)

    headings = dedupe_preserve([h["text"] for h in headings])
    headings_struct = []
    seen_h: set[str] = set()
    for level in HEADING_KEYS:
        for text in entry.get(level, []):
            t = text.strip()
            if t in seen_h or not is_meaningful_text(t) or len(t) <= 10:
                continue
            seen_h.add(t)
            headings_struct.append({"level": level, "text": t})

    paragraphs = dedupe_preserve(paragraphs)

    body_parts = [h["text"] for h in headings_struct] + paragraphs
    body_parts = dedupe_preserve(body_parts)

    return {
        "title": entry.get("title", ""),
        "description": entry.get("description", ""),
        "keywords": entry.get("keywords", ""),
        "headings": headings_struct,
        "paragraphs": paragraphs,
        "body": body_parts,
        "body_text": "\n\n".join(body_parts),
    }


def extract_images(page_html: str) -> list[str]:
    imgs: set[str] = set()
    for m in re.finditer(r'(?:src|srcset|content)=["\']([^"\']+)["\']', page_html):
        u = m.group(1).split()[0] if " " in m.group(1) else m.group(1)
        if u.startswith("http") and (
            "framerusercontent" in u or "framer.com" in u or "dblshot" in u
        ):
            imgs.add(u.split("?")[0])
    return sorted(imgs)


def extract_links(page_html: str) -> list[str]:
    links: set[str] = set()
    for m in re.finditer(r'href=["\']([^"\']+)["\']', page_html):
        href = m.group(1)
        if href.startswith("/") and not href.startswith("//"):
            links.add(BASE + href.split("#")[0].split("?")[0])
        elif href.startswith("https://dblshot.co"):
            links.add(href.split("#")[0].split("?")[0])
    return sorted(links)


def discover_extra_urls(all_html: list[str], known_urls: set[str]) -> list[str]:
    found: set[str] = set()
    for page_html in all_html:
        for link in extract_links(page_html):
            found.add(link)
    return sorted(u for u in found if u not in known_urls)


def write_markdown(site: dict) -> None:
    lines = [
        "# DBLSHOT — Full Site Content Export",
        "",
        f"Fetched: {site['fetched_at']}",
        f"Pages: {site['page_count']}",
        "",
    ]
    for path in sorted(site["pages"].keys()):
        page = site["pages"][path]
        if "error" in page:
            continue
        lines.append(f"## {path}")
        lines.append("")
        lines.append(f"URL: {page['url']}")
        framer = page.get("framer_content", {})
        if framer.get("description"):
            lines.append(f"\n> {framer['description']}\n")
        for h in framer.get("headings", []):
            prefix = "#" * int(h["level"][1])
            lines.append(f"{prefix} {h['text']}")
            lines.append("")
        for p in framer.get("paragraphs", []):
            lines.append(p)
            lines.append("")
        if not framer.get("body"):
            for block in page.get("text_blocks", []):
                if len(block) > 40:
                    lines.append(block)
                    lines.append("")
        lines.append("---")
        lines.append("")
    MARKDOWN_OUT.write_text("\n".join(lines), encoding="utf-8")


def main() -> int:
    print("Fetching sitemap…")
    sitemap_xml = fetch(SITEMAP_URL)
    urls = parse_sitemap(sitemap_xml)
    print(f"Found {len(urls)} URLs in sitemap")

    print("Fetching homepage for Framer search index…")
    home_html = fetch(BASE + "/")
    search_index = load_search_index(home_html)
    print(f"Search index: {len(search_index)} pages with full text content")

    SCRAPED.mkdir(parents=True, exist_ok=True)
    site: dict = {
        "fetched_at": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
        "source": SITEMAP_URL,
        "search_index_url": discover_search_index_url(home_html),
        "page_count": 0,
        "pages": {},
    }

    fetched_html: dict[str, str] = {"": home_html}
    url_set = set(urls)

    def process_page(url: str, page_html: str, label: str) -> None:
        out_path = url_to_path(url)
        out_path.parent.mkdir(parents=True, exist_ok=True)
        out_path.write_text(page_html, encoding="utf-8")
        path_key = path_from_url(url)
        rel = str(out_path.relative_to(SCRAPED))
        framer_entry = search_index.get(path_key, {})
        framer_content = extract_from_search_index(framer_entry) if framer_entry else {}
        html_blocks = extract_text_blocks(page_html)

        site["pages"][path_key] = {
            "url": url,
            "file": rel,
            "bytes": len(page_html.encode("utf-8")),
            "meta": extract_meta(page_html),
            "framer_content": framer_content,
            "text_blocks": html_blocks,
            "images": extract_images(page_html),
            "internal_links": extract_links(page_html),
            "content_source": "framer_search_index" if framer_content.get("body") else "html",
        }
        print(f"  {label}: {len(framer_content.get('body', []))} content blocks "
              f"(framer), {len(html_blocks)} html blocks")

    print(f"[1] {BASE}/")
    process_page(BASE + "/", home_html, "home")

    remaining = [u for u in urls if u.rstrip("/") != BASE.rstrip("/")]
    for i, url in enumerate(remaining, 2):
        print(f"[{i}] {url}")
        try:
            page_html = fetch(url)
            fetched_html[url] = page_html
            process_page(url, page_html, path_from_url(url))
        except Exception as e:
            print(f"  ERROR: {e}", file=sys.stderr)
            site["pages"][path_from_url(url)] = {"url": url, "error": str(e)}
        time.sleep(0.25)

    extra = discover_extra_urls(list(fetched_html.values()), url_set)
    if extra:
        print(f"\nDiscovered {len(extra)} extra internal URLs not in sitemap:")
        for url in extra:
            print(f"  + {url}")
            try:
                page_html = fetch(url)
                process_page(url, page_html, path_from_url(url) + " (extra)")
                urls.append(url)
            except Exception as e:
                print(f"  ERROR: {e}", file=sys.stderr)
            time.sleep(0.25)

    site["page_count"] = len(site["pages"])
    CONTENT_OUT.write_text(json.dumps(site, indent=2, ensure_ascii=False), encoding="utf-8")
    write_markdown(site)

    ok = sum(1 for p in site["pages"].values() if "error" not in p)
    with_framer = sum(
        1 for p in site["pages"].values()
        if p.get("framer_content", {}).get("body")
    )
    total_blocks = sum(
        len(p.get("framer_content", {}).get("body", []))
        for p in site["pages"].values()
    )

    print(f"\nDone: {ok}/{site['page_count']} pages saved to {SCRAPED}")
    print(f"Framer full content: {with_framer}/{ok} pages, {total_blocks} total blocks")
    print(f"JSON: {CONTENT_OUT}")
    print(f"Markdown: {MARKDOWN_OUT}")
    return 0 if ok == site["page_count"] else 1


if __name__ == "__main__":
    raise SystemExit(main())
