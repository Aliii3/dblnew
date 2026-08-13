#!/bin/bash
set -e
WORKSPACE="$(cd "$(dirname "$0")" && pwd)"
CURL=/usr/bin/curl

pages=(
  ""
  "aboutuss"
  "blogs"
  "blogs/ecommerce"
  "blogs/ramadan-preparation-blog"
  "careers"
  "let-s-talk"
  "jrm3"
  "privacy-policy"
  "our-services/amazon/about"
  "our-services/amazon/isiscasestudy"
)

for path in "${pages[@]}"; do
  if [ -z "$path" ]; then
    url="https://dblshot.co/"
    out="$WORKSPACE/index.html"
  else
    url="https://dblshot.co/$path"
    dir=$(dirname "$path")
    mkdir -p "$WORKSPACE/$dir"
    out="$WORKSPACE/$path.html"
  fi
  echo "Fetching $url -> $out"
  "$CURL" -sL "$url" -o "$out"
  wc -c < "$out"
done

# Special-character blog URL
echo "Fetching dessert market blog"
mkdir -p "$WORKSPACE/blogs"
"$CURL" -sL "https://dblshot.co/blogs/egypt%E2%80%99s-dessert-market-2" \
  -o "$WORKSPACE/blogs/egypts-dessert-market-2.html"
wc -c < "$WORKSPACE/blogs/egypts-dessert-market-2.html"

echo "Done."
