SNG-710 PATCH 167 — self-hosted accessibility toolbar + cross-site code audit

BASE
- Continue from the current PATCH166 site state.
- PATCH162 remains excluded, consistent with the chosen patch chain.

ADDED
- Free, self-hosted accessibility toolbar (no vendor, subscription, tracking or external JS):
  * text enlargement / reduction, up to 200%
  * high contrast
  * link highlighting
  * stop animations
  * reset
  * preferences saved locally in the browser
  * full keyboard operation and Escape-to-close

CROSS-SITE CODE FIXES
- Strong visible keyboard focus indicator across interactive controls.
- Search field gets a clear focus-within indicator.
- 44px minimum touch target safeguards for key mobile controls.
- Homepage memorial cards receive explicit accessible names.
- "נופלות ונופלים משנים קודמות" is now a semantic H2 instead of a generic DIV.
- Text containers are allowed to grow without clipping under text enlargement/zoom.
- Desktop hero no longer relies on a clipping max-height/overflow combination.
- Person-page story disclosure now exposes aria-controls.
- Top-media images have a meaningful fallback alt when explicit alt is absent.
- Page closing memorial line is rendered as a semantic FOOTER.
- Accessibility toolbar is loaded automatically on every internal memorial page through person-bootstrap.js.

NOT CHANGED
- Memorial biographies/content
- Names/settlements
- Portrait assignments/images
- Videos/gallery data/links
- Existing design except accessibility states/focus safeguards
