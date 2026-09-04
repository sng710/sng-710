SNG-710 PATCH168 R2 — cumulative path repair

This package repairs the recent GitHub upload-path problem and is cumulative for PATCH165 through PATCH168.

Correct locations:
- index.html -> repository root
- people.js -> assets/js/people.js
- site-version.json -> assets/site-version.json
- portraits -> assets/img/patch165 through assets/img/patch168
- patch documentation -> docs/archive/...

GitHub web upload:
Extract this ZIP. From the extracted folder, drag the folders assets and docs themselves plus index.html into the repository root. Do not select individual files from inside those folders and upload them at the root.

After the correct upload, remove the accidental root-level copies listed in the separate cleanup file supplied with this repair.
