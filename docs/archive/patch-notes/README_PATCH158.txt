SNG-710 PATCH 158 — portrait corrections from original images only

Apply on top of PATCH157 / current patch stack.

Changes ONLY:
- Updates portrait image assets and portrait display metadata for the listed records.
- Re-applies the user-supplied replacement images for דוד שוורצמן, לילי איתמרי, רם איתמרי and אלון שמריז.
- Brings איתן זיו and נדב עמיקם closer using their existing current photos.
- Corrects several clearly poor/tight/over-padded portrait crops visible in the latest PDF.

No AI-generated or AI-edited image is included.
All image work is deterministic crop + resize of user-supplied/original site pixels only.

Changed people:
itay_b, tamar_p, ram_i, david_s, lili_i, noam_e, ilan_f, nadav_a,
niral_z, eitan_z, alon_s, yotam_h, aviad_a, dana_g, daniel_t,
zeev_s, jimmy_k, oded_s, eliyahu_m.

No biography text, names, places, videos, galleries, links, CSS, app.js,
person-page.js, or other people records are changed.

index.html is the PATCH157 version, with only the people.js cache query
bumped to v=344 so browsers actually fetch the corrected portrait data.
