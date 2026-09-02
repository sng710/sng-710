PATCH 151 — three original portrait replacements + PATCH150 rollback

Replaces only these portrait assets using the user-provided original images:
- יהונתן חג׳בי־זהבי -> assets/img/yehonatan_h.webp
- יניב זוהר -> assets/img/yaniv_z.webp
- יסמין זוהר -> assets/img/yasmin_z-1.webp

No AI-generated image content is used.
Yaniv and Yasmin source screenshots were deterministically cropped to remove the surrounding memorial-card border/caption; no generative editing was used.
All three use object-fit: cover, scale: 1, with only object-position adjusted for natural framing.

This patch also restores app.js/person-page.js/people.js behavior from the pre-PATCH150 baseline, undoing PATCH150's global portrait normalization/padding. Other people return to their pre-PATCH150 portrait settings.
