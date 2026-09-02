PATCH 111 — Restore original Instagram presentation

This patch restores the Instagram embed behavior used in the first version when Aviv Baram's Instagram Reel was added (Patch 75 era), while keeping the current person-page architecture and later non-Instagram improvements.

Changes:
- Instagram uses the original /embed/captioned/ endpoint again.
- Restores the original compact framed Instagram proportions.
- Removes the later Instagram-only forced stacking and oversized 500–650px frames.
- In a 2-item group such as Aviv Baram (Instagram + Facebook), the two items are side-by-side on desktop again.
- Keeps the current mobile carousel and the direct Instagram fallback link.
- No memorial text/data changes.
