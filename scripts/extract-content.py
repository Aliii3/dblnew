#!/usr/bin/env python3
"""Extract readable text blocks from scraped Framer HTML."""
import html
import os
import re
import json

SCRAPED = os.path.join(os.path.dirname(__file__), "scraped")

def extract_text(filepath):
    with open(filepath) as f:
        s = f.read()
    texts = []
    for m in re.finditer(r'>([^<]{4,500})<', s):
        t = html.unescape(m.group(1).strip())
        t = re.sub(r'\s+', ' ', t)
        if not t or t.startswith('{') or 'framer' in t.lower():
            continue
        if re.search(r'[A-Za-z]{2}', t):
            texts.append(t)
    # dedupe preserving order
    seen = set()
    unique = []
    for t in texts:
        if t not in seen and len(t) > 3:
            seen.add(t)
            unique.append(t)
    return unique

def main():
    for fname in sorted(os.listdir(SCRAPED)):
        if not fname.endswith('.html'):
            continue
        path = os.path.join(SCRAPED, fname)
        texts = extract_text(path)
        print(f"\n{'='*60}\n{fname} ({len(texts)} blocks)\n{'='*60}")
        for t in texts[:80]:
            print(t[:200])
        if len(texts) > 80:
            print(f"... +{len(texts)-80} more")

if __name__ == "__main__":
    main()
