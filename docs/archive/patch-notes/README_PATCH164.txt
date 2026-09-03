SNG-710 PATCH 164 — remove ז"ל from top section only

BASE:
- Continue from PATCH161 + PATCH163.
- PATCH162 remains intentionally ignored / unused.

Display-only change on every internal memorial page:
- Removes ז"ל variants from the TOP information section only:
  - name/title (already cleaned by existing renderer)
  - rank/unit line
  - role
  - general-details/facts rows
- Example:
  "בתם של גלי וצחי עידן ז"ל"
  displays as:
  "בתם של גלי וצחי עידן"

Accepted display variants include:
- ז"ל
- ז״ל
- ז'ל
- ז׳ל
- equivalent spacing around the quote mark

IMPORTANT:
- people.js is NOT changed.
- Story/body text is NOT changed.
- Memorial/legacy sections are NOT changed.
- Videos, galleries, photos, names, links, CSS and homepage are NOT changed.
- הי"ד is not removed by this patch.
- זצ"ל is not removed by this patch.
