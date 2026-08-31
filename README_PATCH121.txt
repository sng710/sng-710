SNG-710 PATCH 121 — Nitzan Libstein official Instagram embed

Base: apply over Patch 120.

Requested change only:
- Nitzan Libstein (nitzan_l): replace the previous Instagram /embed/ iframe path with the official Instagram blockquote embed flow for reel DBtNGGEKrmS.
- Uses the supplied permalink including utm_source=ig_embed&utm_campaign=loading and Instagram embed version 14.
- Loads https://www.instagram.com/embed.js only when an official Instagram blockquote is present.
- The official-embed code path is opt-in and is enabled only for Nitzan, so other Instagram/YouTube/Facebook media records are unchanged.
- Responsive guard added for the official blockquote so it cannot create page-level horizontal overflow on narrow mobile screens.

No memorial/story text was changed.
Record count remains 154; all IDs remain unique.
Cache version: 320.
