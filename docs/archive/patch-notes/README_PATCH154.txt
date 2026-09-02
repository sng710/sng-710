SNG-710 PATCH 154 — portrait display adjustments only

Apply on top of the current site / PATCH153 state.

Replace ONLY:
- assets/js/people.js
- assets/site-version.json

Changes:
- adjusts portrait display metadata only (scale / position)
- keeps the same assigned image files
- does not replace, edit, or regenerate any image content
- fine-tunes homepage / popup / person-page portrait framing for the following records:
  yehonatan_h, yaniv_z, yasmin_z, arad_p, tova_g, aran_g,
  tamar_p, david_s, orly_s, noam_e, eitan_z, alon_s,
  ofir_s, aviad_a, daniel_t, zeev_s, jimmy_k, oded_s,
  eliyahu_m, dana_g
- bumps the asset version so browsers fetch the updated display settings immediately

Notes:
- No AI manipulation was used.
- No image files were changed.
- No biography text, names, videos, links, layout, or record assignments were changed.
