#!/bin/bash
set -e
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
OUT="$ROOT/scripts/scraped"
mkdir -p "$OUT"

fetch() {
  local path="$1"
  local name="$2"
  if [ -z "$path" ]; then
    url="https://dblshot.co/"
  else
    url="https://dblshot.co/$path"
  fi
  echo "Fetching $url"
  /usr/bin/curl -sL "$url" -o "$OUT/$name.html"
}

fetch "" "home"
fetch "aboutuss" "aboutuss"
fetch "blogs" "blogs"
fetch "blogs/ecommerce" "blogs-ecommerce"
fetch "blogs/ramadan-preparation-blog" "blogs-ramadan"
fetch "careers" "careers"
fetch "let-s-talk" "let-s-talk"
fetch "jrm3" "jrm3"
fetch "privacy-policy" "privacy"
fetch "our-services/amazon/about" "amazon-about"
fetch "our-services/amazon/isiscasestudy" "isis-case"
/usr/bin/curl -sL "https://dblshot.co/blogs/egypt%E2%80%99s-dessert-market-2" -o "$OUT/blogs-dessert.html"
echo "Done."
