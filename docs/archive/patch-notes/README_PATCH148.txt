PATCH 148 — fix person-page runtime + portrait assets

Apply after PATCH147.

Changes:
- Fixes person-page.js ReferenceError involving cleanMemorialName.
- Restores PATCH146 inner-page header branding: שער הנגב זוכרת + council logo.
- Adds/replaces the exact user-supplied portrait assets for Daniel Tregerman, Zeev Sagi Shinberg, Jimmy Kedoshim, Oded Shahar Schwartz, Eliyahu Madmoni and Dana Galkovich.
- Uses deterministic crop/padding only; no AI-generated faces are used in this patch.
- Adds the supplied memorial candle as the common fallback for records without a portrait.
- Sets the six new portraits to neutral 1.0 display scale and centered framing.
- Bumps cache version to 336.
