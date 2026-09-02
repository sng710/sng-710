#!/usr/bin/env bash
set -euo pipefail

# PATCH144B — safe, idempotent repository cleanup for the current SNG-710 repo.
# Designed to work even if PATCH144's Python cleanup was already run partially.

if git rev-parse --show-toplevel >/dev/null 2>&1; then
  REPO="$(git rev-parse --show-toplevel)"
else
  REPO="$(pwd)"
fi
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PAYLOAD="$SCRIPT_DIR/patch144b_payload"
cd "$REPO"

sha() { sha256sum "$1" | awk '{print $1}'; }

safe_move() {
  local src="$1" dst="$2"
  [[ -e "$src" ]] || return 0
  mkdir -p "$(dirname "$dst")"
  if [[ -e "$dst" ]]; then
    if [[ -f "$src" && -f "$dst" && "$(sha "$src")" == "$(sha "$dst")" ]]; then
      rm -f "$src"
      echo "deduplicated: $src"
      return 0
    fi
    echo "ERROR: different content already exists at $dst" >&2
    echo "       leaving $src untouched" >&2
    return 1
  fi
  mv "$src" "$dst"
  echo "archived: $src -> $dst"
}

safe_install() {
  local src="$1" dst="$2"
  [[ -f "$src" ]] || { echo "ERROR: payload missing $src" >&2; exit 1; }
  mkdir -p "$(dirname "$dst")"
  if [[ -f "$dst" && "$(sha "$src")" != "$(sha "$dst")" ]]; then
    echo "ERROR: refusing to overwrite different file: $dst" >&2
    exit 1
  fi
  cp "$src" "$dst"
}

# Resolve the historical generic-name collision if those paths still exist.
safe_move "docs/archive/patch-notes/README.txt" "docs/archive/patch-notes/README_PATCH18.txt"
safe_move "docs/archive/validation/SHA256SUMS.txt" "docs/archive/validation/SHA256SUMS_PATCH18.txt"
safe_move "README.txt" "docs/archive/patch-notes/README_PATCH114.txt"
safe_move "SHA256SUMS.txt" "docs/archive/validation/SHA256SUMS_PATCH114.txt"

# Restore all four collision-safe historical files from the verified payload.
# This also repairs the exact 'cannot stat ... SHA256SUMS.txt' partial state.
safe_install "$PAYLOAD/docs/archive/patch-notes/README_PATCH18.txt" "docs/archive/patch-notes/README_PATCH18.txt"
safe_install "$PAYLOAD/docs/archive/patch-notes/README_PATCH114.txt" "docs/archive/patch-notes/README_PATCH114.txt"
safe_install "$PAYLOAD/docs/archive/validation/SHA256SUMS_PATCH18.txt" "docs/archive/validation/SHA256SUMS_PATCH18.txt"
safe_install "$PAYLOAD/docs/archive/validation/SHA256SUMS_PATCH114.txt" "docs/archive/validation/SHA256SUMS_PATCH114.txt"

# Archive any remaining loose historical documentation. Missing paths are fine.
for f in AUDIT* REVIEW.txt V63_QUALITY_TEST_REPORT.txt; do
  [[ -e "$f" ]] && safe_move "$f" "docs/archive/audits/$f"
done
for f in QA_PATCH*.txt; do
  [[ -e "$f" ]] && safe_move "$f" "docs/archive/qa/$f"
done
for f in SHA256SUMS* VALIDATION_*; do
  [[ -e "$f" ]] && safe_move "$f" "docs/archive/validation/$f"
done
for f in README_PATCH*.txt PATCH_V* SOURCE_NOTES* TEXT_FORMAT_POLICY*; do
  [[ -e "$f" ]] && safe_move "$f" "docs/archive/patch-notes/$f"
done
for f in DELETE.txt GALLERY_DEDUP.txt NEW_RECORDS.txt PATCH23_PORTRAIT_CHECK.jpg; do
  [[ -e "$f" ]] && safe_move "$f" "docs/archive/working-notes/$f"
done
for f in PATCH144-repository-cleanup.git.patch PATCH144_README.txt; do
  [[ -e "$f" ]] && safe_move "$f" "docs/archive/patch144/$f"
done

# Archive the old one-off Python helper if present.
if [[ -f tools/repo/apply_patch144_cleanup.py ]]; then
  safe_move "tools/repo/apply_patch144_cleanup.py" "docs/archive/patch144/apply_patch144_cleanup.py"
fi

# Install the corrected documentation/index files.
cp "$PAYLOAD/README.md" "README.md"
cp "$PAYLOAD/CHANGELOG.md" "CHANGELOG.md"
mkdir -p docs
cp "$PAYLOAD/docs/PATCH144_MOVE_MANIFEST.md" "docs/PATCH144_MOVE_MANIFEST.md"
cp "$PAYLOAD/docs/QA_PATCH144B.txt" "docs/QA_PATCH144B.txt"

# Archive this one-off shell helper and remove its payload directory.
mkdir -p docs/archive/patch144b
cp "${BASH_SOURCE[0]}" docs/archive/patch144b/apply_patch144b_cleanup.sh
rm -rf "$PAYLOAD"
# Do not remove the running script until all work above succeeded.
rm -f "${BASH_SOURCE[0]}"
rmdir tools/repo 2>/dev/null || true

echo
echo "PATCH144B cleanup complete."
echo "Active site files were not edited by this script."
echo "Review with: git status --short"
