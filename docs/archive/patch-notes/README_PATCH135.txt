SNG-710 PATCH 135 — Kutz missing images + new main portraits

What this patch does
1) Fixes the broken Kutz gallery images by including the Kutz image files that were missing from Patch 134.
2) Replaces the five Kutz main portrait files with the newer person-specific photos supplied by the family:
   - aviv_k.webp   <- אביב קוץ.jpg
   - livnat_k.webp <- לבנת קוץ.tif (converted to webp)
   - rotem_k.webp  <- רותם קוץ.PNG
   - yonatan_k.webp <- יונתן קוץ.jpg
   - yiftach_k.webp <- יפתח קוץ.PNG
3) Keeps the Patch 134 gallery layout and the no-duplication distribution across the Kutz family pages.
4) Updates the portrait crop positions in people.js so the new main photos sit correctly in the circular portrait frame.

Notes
- The issue was not a forbidden image format inside people.js. The broken boxes came from missing image asset files on site.
- This patch therefore fixes the problem by supplying the referenced files and by replacing the five main portrait assets with supported webp files.
- No biography text, dates, memorial wording, links, or family-photo allocation logic were changed.
