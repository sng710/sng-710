SNG-710 PATCH 170 — 13 previous-years portraits + stories

BASE:
- Apply on top of PATCH169.

UPDATED / COMPLETED:
1. עתניאל (עתי) שמיר — portrait re-packed at the correct nested path
2. יפתח גבע — portrait re-packed at the correct nested path
3. שבתאי נהון — portrait re-packed at the correct nested path
4. מריוס אהרון — portrait re-packed at the correct nested path
5. דויד חזן — portrait re-packed at the correct nested path
6. יעקב גרובלר — portrait, נחל עוז, נח"ל, full life story
7. משה (מוישלה) בן-הרי — portrait, נחל עוז, נח"ל, full life story
8. רם ענבר — portrait, נחל עוז, חיל הנדסה, full life story
9. יעקב מיגובסקי מגד — portrait, מפלסים, נח"ל, full life story
10. טל ניר — portrait, מפלסים, חיל מודיעין, full life story
11. שושנה (רוזה'לה) זלוטניק — portrait, ניר עם, חיל רגלים, full life story
12. שלמה צוקרמן — portrait, ניר עם, חיל רגלים, full life story
13. אייזיק שוארצמן — portrait, ניר עם, חיל רגלים, full life story

PATH FIX:
- All 13 portraits are stored under assets/img/patch170/ and people.js points to those exact nested paths.
- No portrait files belong in the repository root.

FILES:
- assets/js/people.js
- assets/img/patch170/*.png
- index.html (people.js cache query bumped to v=355)
- assets/site-version.json
- docs/archive/... patch notes, QA and hashes

NOT CHANGED:
- no CSS
- no app.js
- no person-page.js
- no unrelated portraits/content
- no videos or galleries

SOURCE-TEXT NOTE:
- UI/control text from the pasted Izkor pages was omitted.
- Existing date wording from the supplied source was preserved rather than silently reconciled where the heading and biography disagree.
