SNG-710 PATCH 132

This patch is intended to be applied over Patch 131.

Requested fixes only:
1. Restore the family update / WhatsApp contact block on every personal memorial page. Existing explicit family-contact text is preserved; pages without one receive the same standard fallback wording.
2. Display memorial photos on personal pages as one vertical photo rail to the LEFT of the story text on desktop. On mobile, the story remains first and the photos follow it. Photos are no longer inserted between story paragraphs.
3. Remove fixed media-card heights that created empty blue space. YouTube/Vimeo use 16:9, Facebook uses its supplied embed ratio, and Instagram uses a vertical Reel frame. The iframe fills its frame.
4. Keep 3 embedded media items in one row on desktop as already requested.
5. Add the newly supplied Kutz family photos as lossless WebP files, without resize/crop/rotation.
6. Correct Kutz photo mapping:
   - former kutz-rotem-dance-01 is Livnat; it is now referenced as kutz-livnat-dance-01.
   - IMG_2787.PNG is Rotem; it is now referenced as kutz-rotem-portrait-03.
7. Preserve prior mobile carousel behavior; Vimeo is now also paused when leaving its carousel item.

No memorial text was edited.
No names, stories, roles, dates, top media URLs, primary portraits, homepage ordering, or non-Kutz people data were changed.
