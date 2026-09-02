PATCH 108 — Aviv Baram Instagram size fix

- Fixes Aviv Baram specifically: his Instagram + Facebook group has 2 media items, so the Instagram Reel now gets a large width even in that 2-item group.
- On mobile, Aviv's active Instagram Reel grows up to 92vw / 470px.
- On desktop, Aviv's Instagram Reel can grow up to 470px.
- Includes fallback selectors for the older media wrapper too.
- No memorial text or people data changed.

Replace:
assets/js/person-page.js
assets/site-version.json
