SNG-710 PATCH 46 - small council logo on all pages + cumulative favicon fix

Apply this patch over Patch 44 / 250826-main.
It is also safe to apply over Patch 45.

WHAT THIS PATCH DOES
- Adds a small Sha'ar HaNegev council logo badge on all pages.
- The logo is shown small in a side corner and keeps its natural proportions.
- The logo is never stretched or cropped: it is rendered with contain sizing.
- The homepage keeps its main large council lockup; this patch only adds the small corner badge in addition.
- Keeps Patch 45's Nadav layout refinements.
- Includes assets/favicon-sng.svg and assets/favicon-sng.png again, so the /assets favicon paths remain fixed even if Patch 45 was not applied first.

IMPLEMENTATION NOTES
- Shared CSS adds a fixed corner badge for .home-page and .person-page.
- Because the shared stylesheet changed, all HTML pages now point to site.css?v=246 so browsers fetch the updated CSS immediately.
- No biography text, ordering, portraits, galleries, or data records were changed.

FILES IN PATCH
- index.html
- assets/css/site.css
- assets/favicon-sng.svg
- assets/favicon-sng.png
- people/*/index.html (stylesheet cache-key bump only)
- README_PATCH46.txt
- QA_PATCH46.txt
- SHA256SUMS_PATCH46.txt

NO DELETIONS.
