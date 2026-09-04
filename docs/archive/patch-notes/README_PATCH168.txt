SNG-710 PATCH 168 — eight previous-years portraits + life stories + Roy Rotberg video

BASE:
- Apply on top of PATCH167.

ADDED / COMPLETED:
1. עתניאל (עתי) שמיר — portrait, דורות, חיל אוויר, full life story
2. שבתאי נהון — portrait, דורות, חטיבת גולני, full life story
3. יפתח גבע — portrait, דורות, חטיבת הצנחנים, full life story
4. אליהו סייבהי — portrait, יכיני, לוגיסטיקה, full life story
5. דויד חזן — portrait, כפר עזה, חיל רגלים, full life story
6. מריוס אהרון — portrait, כפר עזה, חיל הקשר והתקשוב, full life story
7. יעקב (טומי) טוכמן בן-ארי — portrait, נחל עוז, נח"ל, full life story
8. רועי רוטברג — portrait, נחל עוז, נח"ל, full life story + YouTube embed

VIDEO ADDED FOR ROY ROTBERG:
https://www.youtube.com/embed/tZBjFqkT_aQ?si=jbU8P3BFDcrnhN_d

FILES:
- assets/js/people.js
- assets/img/patch168/*.png
- index.html (people.js cache query bumped to v=353)
- assets/site-version.json
- patch documentation / QA / hashes

NOT CHANGED:
- no other person's content
- no CSS
- no app.js
- no person-page.js
- no other videos or galleries
- no homepage/internal-page layout

NORMALIZATION:
- Removed pasted website-control markup.
- Normalized two obvious internal Hebrew-date mismatches to match the supplied Gregorian dates and existing record headers: Lior Yekutiel remains ט"ו בתמוז תשל"ז; Yaakov Tuchman remains כ"ט במרחשון תשי"ד.
- Existing official sourceUrl/sourceImageUrl metadata retained.
