# Changelog

היסטוריית העבודה נשמרת תחת `docs/archive/`. הקובץ הזה הוא נקודת הכניסה המרכזית במקום עשרות קבצי PATCH/QA ברוט.

## PATCH 145 — הסרת ז״ל / הי״ד משמות בתצוגה

- השמות המקוריים נשמרו בנתונים.
- בתצוגת האינדקס, ה-popup וכותרות העמודים האישיים מוסתרים הסיומות `ז״ל` / `ז"ל` / `הי״ד` / `הי"ד`.
- לא שונו סיפורים, תמונות, סרטונים או נתוני הנצחה.

## PATCH 144B — Repository cleanup correction

- תוקנה התנגשות השמות ההיסטורית `README.txt` ו-`SHA256SUMS.txt`: עותקי Patch 18 נשמרו בשם ייחודי, ועותקי Patch 114 נשמרו בנפרד.
- כל קבצי ה-PATCH/QA/AUDIT/SHA256 שנותרו ברוט הועברו ל-`docs/archive/`.
- כלי הניקוי החד-פעמי של Patch 144 הועבר לארכיון; כלי הבדיקה הרב-פעמי נשאר ב-`tools/`.
- קבצי האתר הפעיל נשארו byte-for-byte ללא שינוי.

## PATCH 144 — Repository cleanup

- נוסף `README.md` אמיתי לפרויקט.
- נוסף `docs/` עם ארכיון מסודר של notes, QA, audits ו-validation.
- נוסף תהליך תיקון/הסרה לבקשות משפחה.

## Historical documentation

### Patch notes

- [`PATCH_V41_NOTES.txt`](docs/archive/patch-notes/PATCH_V41_NOTES.txt)
- [`PATCH_V51_NOTES.txt`](docs/archive/patch-notes/PATCH_V51_NOTES.txt)
- [`PATCH_V52_NOTES.txt`](docs/archive/patch-notes/PATCH_V52_NOTES.txt)
- [`PATCH_V53_NOTES.txt`](docs/archive/patch-notes/PATCH_V53_NOTES.txt)
- [`PATCH_V54_NOTES.txt`](docs/archive/patch-notes/PATCH_V54_NOTES.txt)
- [`PATCH_V56_EDITORIAL_UNIFORM_TEXTS_NOTES.txt`](docs/archive/patch-notes/PATCH_V56_EDITORIAL_UNIFORM_TEXTS_NOTES.txt)
- [`PATCH_V57_BETTER_POPUP_SUMMARIES_NOTES.txt`](docs/archive/patch-notes/PATCH_V57_BETTER_POPUP_SUMMARIES_NOTES.txt)
- [`PATCH_V58_FIRST_NAME_ABOUT_NOTES.txt`](docs/archive/patch-notes/PATCH_V58_FIRST_NAME_ABOUT_NOTES.txt)
- [`PATCH_V60_FIX_FULL_LIST_TOGGLE_NOTES.txt`](docs/archive/patch-notes/PATCH_V60_FIX_FULL_LIST_TOGGLE_NOTES.txt)
- [`PATCH_V61_RECHECK_FULL_STORY_ZOOM_ARIA_NOTES.txt`](docs/archive/patch-notes/PATCH_V61_RECHECK_FULL_STORY_ZOOM_ARIA_NOTES.txt)
- [`PATCH_V62_SAFE_RECHECK_NOTES.txt`](docs/archive/patch-notes/PATCH_V62_SAFE_RECHECK_NOTES.txt)
- [`PATCH_V63_TESTED_FIXES_NOTES.txt`](docs/archive/patch-notes/PATCH_V63_TESTED_FIXES_NOTES.txt)
- [`PATCH_V64_POPUP_SCROLL_FIX_NOTES.txt`](docs/archive/patch-notes/PATCH_V64_POPUP_SCROLL_FIX_NOTES.txt)
- [`PATCH_V65_AUTO_TRANSPARENT_IMAGE_BG_NOTES.txt`](docs/archive/patch-notes/PATCH_V65_AUTO_TRANSPARENT_IMAGE_BG_NOTES.txt)
- [`PATCH_V67_FAST_LIGHT_BLUE_BG_NOTES.txt`](docs/archive/patch-notes/PATCH_V67_FAST_LIGHT_BLUE_BG_NOTES.txt)
- [`PATCH_V68_SOFTER_PORTRAIT_BG_NOTES.txt`](docs/archive/patch-notes/PATCH_V68_SOFTER_PORTRAIT_BG_NOTES.txt)
- [`PATCH_V69_PORTRAIT_SLIGHT_ZOOM_NOTES.txt`](docs/archive/patch-notes/PATCH_V69_PORTRAIT_SLIGHT_ZOOM_NOTES.txt)
- [`PATCH_V70_PORTRAIT_MORE_ZOOM_NOTES.txt`](docs/archive/patch-notes/PATCH_V70_PORTRAIT_MORE_ZOOM_NOTES.txt)
- [`PATCH_V71_COLOR_MAIN_IMAGES_BG.txt`](docs/archive/patch-notes/PATCH_V71_COLOR_MAIN_IMAGES_BG.txt)
- [`PATCH_V72_PERSONAL_DETAILS_TOP_NOTES.txt`](docs/archive/patch-notes/PATCH_V72_PERSONAL_DETAILS_TOP_NOTES.txt)
- [`PATCH_V73_ROTATION_AND_FAMILY_ORDER_NOTES.txt`](docs/archive/patch-notes/PATCH_V73_ROTATION_AND_FAMILY_ORDER_NOTES.txt)
- [`PATCH_V74_12_ROTATING_FULL_LIST_BIGGER_NOTES.txt`](docs/archive/patch-notes/PATCH_V74_12_ROTATING_FULL_LIST_BIGGER_NOTES.txt)
- [`PATCH_V77_FULL_LIST_ONLY_NOTES.txt`](docs/archive/patch-notes/PATCH_V77_FULL_LIST_ONLY_NOTES.txt)
- [`PATCH_V78_SIDE_BY_SIDE_FULL_LIST_NOTES.txt`](docs/archive/patch-notes/PATCH_V78_SIDE_BY_SIDE_FULL_LIST_NOTES.txt)
- [`PATCH_V79_REMOVE_RIGHT_BG_AND_SPACING.txt`](docs/archive/patch-notes/PATCH_V79_REMOVE_RIGHT_BG_AND_SPACING.txt)
- [`PATCH_V80_SEARCH_POSITION_SCROLL_NOTES.txt`](docs/archive/patch-notes/PATCH_V80_SEARCH_POSITION_SCROLL_NOTES.txt)
- [`PATCH_V82_PREVIOUS_YEARS_SLUGS_AND_VERIFIED_SEARCH_NOTES.txt`](docs/archive/patch-notes/PATCH_V82_PREVIOUS_YEARS_SLUGS_AND_VERIFIED_SEARCH_NOTES.txt)
- [`README_PATCH100.txt`](docs/archive/patch-notes/README_PATCH100.txt)
- [`README_PATCH103.txt`](docs/archive/patch-notes/README_PATCH103.txt)
- [`README_PATCH104.txt`](docs/archive/patch-notes/README_PATCH104.txt)
- [`README_PATCH106.txt`](docs/archive/patch-notes/README_PATCH106.txt)
- [`README_PATCH107.txt`](docs/archive/patch-notes/README_PATCH107.txt)
- [`README_PATCH108.txt`](docs/archive/patch-notes/README_PATCH108.txt)
- [`README_PATCH109.txt`](docs/archive/patch-notes/README_PATCH109.txt)
- [`README_PATCH110.txt`](docs/archive/patch-notes/README_PATCH110.txt)
- [`README_PATCH111.txt`](docs/archive/patch-notes/README_PATCH111.txt)
- [`README_PATCH112.txt`](docs/archive/patch-notes/README_PATCH112.txt)
- [`README_PATCH113.txt`](docs/archive/patch-notes/README_PATCH113.txt)
- [`README_PATCH114.txt`](docs/archive/patch-notes/README_PATCH114.txt)
- [`README_PATCH115.txt`](docs/archive/patch-notes/README_PATCH115.txt)
- [`README_PATCH116.txt`](docs/archive/patch-notes/README_PATCH116.txt)
- [`README_PATCH117.txt`](docs/archive/patch-notes/README_PATCH117.txt)
- [`README_PATCH119.txt`](docs/archive/patch-notes/README_PATCH119.txt)
- [`README_PATCH120.txt`](docs/archive/patch-notes/README_PATCH120.txt)
- [`README_PATCH121.txt`](docs/archive/patch-notes/README_PATCH121.txt)
- [`README_PATCH122.txt`](docs/archive/patch-notes/README_PATCH122.txt)
- [`README_PATCH123.txt`](docs/archive/patch-notes/README_PATCH123.txt)
- [`README_PATCH124.txt`](docs/archive/patch-notes/README_PATCH124.txt)
- [`README_PATCH125.txt`](docs/archive/patch-notes/README_PATCH125.txt)
- [`README_PATCH126.txt`](docs/archive/patch-notes/README_PATCH126.txt)
- [`README_PATCH127.txt`](docs/archive/patch-notes/README_PATCH127.txt)
- [`README_PATCH128.txt`](docs/archive/patch-notes/README_PATCH128.txt)
- [`README_PATCH129.txt`](docs/archive/patch-notes/README_PATCH129.txt)
- [`README_PATCH130.txt`](docs/archive/patch-notes/README_PATCH130.txt)
- [`README_PATCH131.txt`](docs/archive/patch-notes/README_PATCH131.txt)
- [`README_PATCH132.txt`](docs/archive/patch-notes/README_PATCH132.txt)
- [`README_PATCH134.txt`](docs/archive/patch-notes/README_PATCH134.txt)
- [`README_PATCH135.txt`](docs/archive/patch-notes/README_PATCH135.txt)
- [`README_PATCH136.txt`](docs/archive/patch-notes/README_PATCH136.txt)
- [`README_PATCH141.txt`](docs/archive/patch-notes/README_PATCH141.txt)
- [`README_PATCH142.txt`](docs/archive/patch-notes/README_PATCH142.txt)
- [`README_PATCH18.txt`](docs/archive/patch-notes/README_PATCH18.txt)
- [`README_PATCH45.txt`](docs/archive/patch-notes/README_PATCH45.txt)
- [`README_PATCH46.txt`](docs/archive/patch-notes/README_PATCH46.txt)
- [`README_PATCH47.txt`](docs/archive/patch-notes/README_PATCH47.txt)
- [`README_PATCH48.txt`](docs/archive/patch-notes/README_PATCH48.txt)
- [`README_PATCH49.txt`](docs/archive/patch-notes/README_PATCH49.txt)
- [`README_PATCH50.txt`](docs/archive/patch-notes/README_PATCH50.txt)
- [`README_PATCH51.txt`](docs/archive/patch-notes/README_PATCH51.txt)
- [`README_PATCH57.txt`](docs/archive/patch-notes/README_PATCH57.txt)
- [`README_PATCH58.txt`](docs/archive/patch-notes/README_PATCH58.txt)
- [`README_PATCH59.txt`](docs/archive/patch-notes/README_PATCH59.txt)
- [`README_PATCH60.txt`](docs/archive/patch-notes/README_PATCH60.txt)
- [`README_PATCH61.txt`](docs/archive/patch-notes/README_PATCH61.txt)
- [`SOURCE_NOTES_PATCH22.txt`](docs/archive/patch-notes/SOURCE_NOTES_PATCH22.txt)
- [`SOURCE_NOTES_PATCH34.txt`](docs/archive/patch-notes/SOURCE_NOTES_PATCH34.txt)
- [`TEXT_FORMAT_POLICY_V56.txt`](docs/archive/patch-notes/TEXT_FORMAT_POLICY_V56.txt)

### QA reports

- [`QA_PATCH115.txt`](docs/archive/qa/QA_PATCH115.txt)
- [`QA_PATCH116.txt`](docs/archive/qa/QA_PATCH116.txt)
- [`QA_PATCH117.txt`](docs/archive/qa/QA_PATCH117.txt)
- [`QA_PATCH119.txt`](docs/archive/qa/QA_PATCH119.txt)
- [`QA_PATCH120.txt`](docs/archive/qa/QA_PATCH120.txt)
- [`QA_PATCH121.txt`](docs/archive/qa/QA_PATCH121.txt)
- [`QA_PATCH122.txt`](docs/archive/qa/QA_PATCH122.txt)
- [`QA_PATCH123.txt`](docs/archive/qa/QA_PATCH123.txt)
- [`QA_PATCH124.txt`](docs/archive/qa/QA_PATCH124.txt)
- [`QA_PATCH125.txt`](docs/archive/qa/QA_PATCH125.txt)
- [`QA_PATCH126.txt`](docs/archive/qa/QA_PATCH126.txt)
- [`QA_PATCH127.txt`](docs/archive/qa/QA_PATCH127.txt)
- [`QA_PATCH128.txt`](docs/archive/qa/QA_PATCH128.txt)
- [`QA_PATCH129.txt`](docs/archive/qa/QA_PATCH129.txt)
- [`QA_PATCH130.txt`](docs/archive/qa/QA_PATCH130.txt)
- [`QA_PATCH131.txt`](docs/archive/qa/QA_PATCH131.txt)
- [`QA_PATCH132.txt`](docs/archive/qa/QA_PATCH132.txt)
- [`QA_PATCH134.txt`](docs/archive/qa/QA_PATCH134.txt)
- [`QA_PATCH135.txt`](docs/archive/qa/QA_PATCH135.txt)
- [`QA_PATCH136.txt`](docs/archive/qa/QA_PATCH136.txt)
- [`QA_PATCH141.txt`](docs/archive/qa/QA_PATCH141.txt)
- [`QA_PATCH142.txt`](docs/archive/qa/QA_PATCH142.txt)
- [`QA_PATCH144.txt`](docs/archive/qa/QA_PATCH144.txt)
- [`QA_PATCH29.txt`](docs/archive/qa/QA_PATCH29.txt)
- [`QA_PATCH33.txt`](docs/archive/qa/QA_PATCH33.txt)
- [`QA_PATCH45.txt`](docs/archive/qa/QA_PATCH45.txt)
- [`QA_PATCH46.txt`](docs/archive/qa/QA_PATCH46.txt)
- [`QA_PATCH47.txt`](docs/archive/qa/QA_PATCH47.txt)
- [`QA_PATCH48.txt`](docs/archive/qa/QA_PATCH48.txt)
- [`QA_PATCH49.txt`](docs/archive/qa/QA_PATCH49.txt)
- [`QA_PATCH51.txt`](docs/archive/qa/QA_PATCH51.txt)
- [`QA_PATCH57.txt`](docs/archive/qa/QA_PATCH57.txt)
- [`QA_PATCH58.txt`](docs/archive/qa/QA_PATCH58.txt)
- [`QA_PATCH59.txt`](docs/archive/qa/QA_PATCH59.txt)
- [`QA_PATCH60.txt`](docs/archive/qa/QA_PATCH60.txt)
- [`QA_PATCH61.txt`](docs/archive/qa/QA_PATCH61.txt)

### Audits and reviews

- [`AUDIT.txt`](docs/archive/audits/AUDIT.txt)
- [`AUDIT_CHANGES_PATCH101.txt`](docs/archive/audits/AUDIT_CHANGES_PATCH101.txt)
- [`AUDIT_CHANGES_PATCH103.txt`](docs/archive/audits/AUDIT_CHANGES_PATCH103.txt)
- [`AUDIT_PATCH50.txt`](docs/archive/audits/AUDIT_PATCH50.txt)
- [`AUDIT_UPDATE_PATCH102.txt`](docs/archive/audits/AUDIT_UPDATE_PATCH102.txt)
- [`REVIEW.txt`](docs/archive/audits/REVIEW.txt)
- [`V63_QUALITY_TEST_REPORT.txt`](docs/archive/audits/V63_QUALITY_TEST_REPORT.txt)

### Validation and checksums

- [`SHA256SUMS_PATCH114.txt`](docs/archive/validation/SHA256SUMS_PATCH114.txt)
- [`SHA256SUMS_PATCH115.txt`](docs/archive/validation/SHA256SUMS_PATCH115.txt)
- [`SHA256SUMS_PATCH116.txt`](docs/archive/validation/SHA256SUMS_PATCH116.txt)
- [`SHA256SUMS_PATCH117.txt`](docs/archive/validation/SHA256SUMS_PATCH117.txt)
- [`SHA256SUMS_PATCH119.txt`](docs/archive/validation/SHA256SUMS_PATCH119.txt)
- [`SHA256SUMS_PATCH120.txt`](docs/archive/validation/SHA256SUMS_PATCH120.txt)
- [`SHA256SUMS_PATCH121.txt`](docs/archive/validation/SHA256SUMS_PATCH121.txt)
- [`SHA256SUMS_PATCH122.txt`](docs/archive/validation/SHA256SUMS_PATCH122.txt)
- [`SHA256SUMS_PATCH123.txt`](docs/archive/validation/SHA256SUMS_PATCH123.txt)
- [`SHA256SUMS_PATCH124.txt`](docs/archive/validation/SHA256SUMS_PATCH124.txt)
- [`SHA256SUMS_PATCH125.txt`](docs/archive/validation/SHA256SUMS_PATCH125.txt)
- [`SHA256SUMS_PATCH126.txt`](docs/archive/validation/SHA256SUMS_PATCH126.txt)
- [`SHA256SUMS_PATCH127.txt`](docs/archive/validation/SHA256SUMS_PATCH127.txt)
- [`SHA256SUMS_PATCH128.txt`](docs/archive/validation/SHA256SUMS_PATCH128.txt)
- [`SHA256SUMS_PATCH129.txt`](docs/archive/validation/SHA256SUMS_PATCH129.txt)
- [`SHA256SUMS_PATCH130.txt`](docs/archive/validation/SHA256SUMS_PATCH130.txt)
- [`SHA256SUMS_PATCH131.txt`](docs/archive/validation/SHA256SUMS_PATCH131.txt)
- [`SHA256SUMS_PATCH132.txt`](docs/archive/validation/SHA256SUMS_PATCH132.txt)
- [`SHA256SUMS_PATCH134.txt`](docs/archive/validation/SHA256SUMS_PATCH134.txt)
- [`SHA256SUMS_PATCH135.txt`](docs/archive/validation/SHA256SUMS_PATCH135.txt)
- [`SHA256SUMS_PATCH136.txt`](docs/archive/validation/SHA256SUMS_PATCH136.txt)
- [`SHA256SUMS_PATCH140.txt`](docs/archive/validation/SHA256SUMS_PATCH140.txt)
- [`SHA256SUMS_PATCH18.txt`](docs/archive/validation/SHA256SUMS_PATCH18.txt)
- [`SHA256SUMS_PATCH45.txt`](docs/archive/validation/SHA256SUMS_PATCH45.txt)
- [`SHA256SUMS_PATCH46.txt`](docs/archive/validation/SHA256SUMS_PATCH46.txt)
- [`SHA256SUMS_PATCH47.txt`](docs/archive/validation/SHA256SUMS_PATCH47.txt)
- [`SHA256SUMS_PATCH48.txt`](docs/archive/validation/SHA256SUMS_PATCH48.txt)
- [`SHA256SUMS_PATCH49.txt`](docs/archive/validation/SHA256SUMS_PATCH49.txt)
- [`SHA256SUMS_PATCH50.txt`](docs/archive/validation/SHA256SUMS_PATCH50.txt)
- [`SHA256SUMS_PATCH51.txt`](docs/archive/validation/SHA256SUMS_PATCH51.txt)
- [`SHA256SUMS_PATCH57.txt`](docs/archive/validation/SHA256SUMS_PATCH57.txt)
- [`SHA256SUMS_PATCH58.txt`](docs/archive/validation/SHA256SUMS_PATCH58.txt)
- [`SHA256SUMS_PATCH59.txt`](docs/archive/validation/SHA256SUMS_PATCH59.txt)
- [`SHA256SUMS_PATCH60.txt`](docs/archive/validation/SHA256SUMS_PATCH60.txt)
- [`SHA256SUMS_PATCH61.txt`](docs/archive/validation/SHA256SUMS_PATCH61.txt)
- [`VALIDATION_PATCH102.json`](docs/archive/validation/VALIDATION_PATCH102.json)
- [`VALIDATION_PATCH103.txt`](docs/archive/validation/VALIDATION_PATCH103.txt)

### Working notes

- [`DELETE.txt`](docs/archive/working-notes/DELETE.txt)
- [`GALLERY_DEDUP.txt`](docs/archive/working-notes/GALLERY_DEDUP.txt)
- [`NEW_RECORDS.txt`](docs/archive/working-notes/NEW_RECORDS.txt)
- [`PATCH23_PORTRAIT_CHECK.jpg`](docs/archive/working-notes/PATCH23_PORTRAIT_CHECK.jpg)

### Patch 144 implementation archive

- [`apply_patch144_cleanup.py`](docs/archive/patch144/apply_patch144_cleanup.py)
- [`PATCH144-repository-cleanup.git.patch`](docs/archive/patch144/PATCH144-repository-cleanup.git.patch)
- [`PATCH144_README.txt`](docs/archive/patch144/PATCH144_README.txt)
