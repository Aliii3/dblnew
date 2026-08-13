#!/usr/bin/env python3
"""Phase 5: self-host critical images and fix copy typos in generated content."""
from __future__ import annotations

import json
import re
import shutil
import sys
import urllib.error
import urllib.request
from pathlib import Path
from urllib.parse import urlparse

ROOT = Path(__file__).resolve().parent.parent
HOME_JSON = ROOT / "src/lib/content/generated/home.json"
MEDIA = ROOT / "public/media"
BRAND = ROOT / "public/brand"
APP_ICON = ROOT / "src/app/icon.png"

CASE_IMAGES: dict[str, str] = {
    "isis-organic": "https://framerusercontent.com/images/8wprddWF4WCBYnjWHwQnihdYXPo.png",
    "spritz": "https://framerusercontent.com/images/KORKIIaVyNYhNqF8u5HI7TOtgI.png",
    "rehana": "https://framerusercontent.com/images/L7GjRwDuWRVchLLbK5Ywjet6gHo.png",
    "ltf": "https://framerusercontent.com/images/E46KWmdgoYtOJu56riHrVue3xo.png",
}

BLOG_IMAGES: dict[str, str] = {
    "ramadan-preparation": "https://framerusercontent.com/images/XK3hrAtNCjpbFtFTU6Mij3vek.png",
    "egypt-dessert-market": "https://framerusercontent.com/images/kioQp8QFL3BYxMrUdt7QFq6Qo4.png",
    "ecommerce": "https://framerusercontent.com/images/qd466ILWW9APAoDnEZu5AA8vqY.png",
    "isis-organic": "https://framerusercontent.com/images/fJpztyiPjHed2XnRzpRzKTS0vEc.png",
}

TYPO_FIXES = (
    ("Ramdan", "Ramadan"),
    ("Platfroms", "Platforms"),
    ("Platfrom", "Platform"),
    (" e commerce", " e-commerce"),
    ("E commerce", "E-commerce"),
)


def fix_copy(text: str) -> str:
    if not isinstance(text, str):
        return text
    for old, new in TYPO_FIXES:
        text = text.replace(old, new)
    return text


def framer_filename(url: str) -> str:
    name = urlparse(url).path.rsplit("/", 1)[-1]
    return re.sub(r"[^\w.\-]", "", name) or "asset.png"


def download(url: str, dest: Path) -> bool:
    if dest.exists() and dest.stat().st_size > 0:
        return True
    dest.parent.mkdir(parents=True, exist_ok=True)
    req = urllib.request.Request(url, headers={"User-Agent": "DblshotPhase5/1.0"})
    try:
        with urllib.request.urlopen(req, timeout=60) as resp:
            dest.write_bytes(resp.read())
        return True
    except (urllib.error.URLError, TimeoutError) as exc:
        print(f"  skip {dest.name}: {exc}", file=sys.stderr)
        return False


def local_path(category: str, filename: str) -> str:
    return f"/media/{category}/{filename}"


def process_home() -> dict:
    data = json.loads(HOME_JSON.read_text(encoding="utf-8"))

    for member in data.get("team", []):
        url = member.get("image", "")
        if not url.startswith("http"):
            continue
        fname = f"{re.sub(r'[^a-z0-9]+', '-', member['name'].lower()).strip('-')}.png"
        dest = MEDIA / "team" / fname
        if download(url, dest):
            member["image"] = local_path("team", fname)

    for i, url in enumerate(data.get("clients", [])):
        if not isinstance(url, str) or not url.startswith("http"):
            continue
        fname = framer_filename(url)
        dest = MEDIA / "clients" / fname
        if download(url, dest):
            data["clients"][i] = local_path("clients", fname)

    for post in data.get("blogPosts", []):
        for key in ("tag", "title", "excerpt"):
            if key in post:
                post[key] = fix_copy(post[key])
        url = post.get("image", "")
        if url.startswith("http"):
            slug = post.get("slug") or framer_filename(url)
            fname = f"{slug}.png"
            dest = MEDIA / "blogs" / fname
            if download(url, dest):
                post["image"] = local_path("blogs", fname)

    for card in data.get("blogCards", []):
        for key in ("tag", "title"):
            if key in card:
                card[key] = fix_copy(card[key])
        url = card.get("image", "")
        if url.startswith("http"):
            fname = framer_filename(url)
            dest = MEDIA / "blogs" / fname
            if download(url, dest):
                card["image"] = local_path("blogs", fname)

    HOME_JSON.write_text(json.dumps(data, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    return data


def process_case_studies_ts() -> None:
    path = ROOT / "src/lib/content/case-studies.ts"
    text = path.read_text(encoding="utf-8")
    for slug, url in CASE_IMAGES.items():
        dest = MEDIA / "case-studies" / f"{slug}.png"
        if download(url, dest):
            text = text.replace(url, local_path("case-studies", f"{slug}.png"))
    path.write_text(text, encoding="utf-8")


def process_blogs_ts() -> None:
    path = ROOT / "src/lib/content/blogs.ts"
    text = path.read_text(encoding="utf-8")
    for slug, url in BLOG_IMAGES.items():
        dest = MEDIA / "blogs" / f"{slug}.png"
        download(url, dest)
        text = text.replace(url, local_path("blogs", f"{slug}.png"))
    for old, new in TYPO_FIXES:
        text = text.replace(old, new)
    path.write_text(text, encoding="utf-8")


def process_amazon_page() -> None:
    path = ROOT / "src/app/services/amazon/page.tsx"
    text = path.read_text(encoding="utf-8")
    url = CASE_IMAGES["isis-organic"]
    local = local_path("case-studies", "isis-organic.png")
    download(url, MEDIA / "case-studies" / "isis-organic.png")
    text = text.replace(url, local)
    path.write_text(text, encoding="utf-8")


def setup_brand_assets() -> None:
    logo = BRAND / "logo.png"
    if logo.exists():
        shutil.copy2(logo, APP_ICON)
        shutil.copy2(logo, BRAND / "og-image.png")
        print(f"Brand: icon + og-image from logo")


def main() -> int:
    print("Phase 5 — self-hosting images …")
    MEDIA.mkdir(parents=True, exist_ok=True)

    home = process_home()
    print(f"  home.json: {len(home.get('team', []))} team, {len(home.get('clients', []))} clients")

    process_case_studies_ts()
    print("  case-studies.ts updated")

    process_blogs_ts()
    print("  blogs.ts updated")

    process_amazon_page()
    print("  amazon page updated")

    setup_brand_assets()
    print("Done.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
