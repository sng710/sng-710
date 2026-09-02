SNG-710 PATCH 109 — safe Instagram embed fix

This patch replaces the aggressive sizing from PATCH107/108 with a safer Instagram embed implementation based on the previously stable embedded version.

Changes:
- Uses Instagram /embed/captioned/ rendering again.
- Makes the outer Instagram frame larger without forcing internal iframe scaling/min-width.
- Works for 1, 2 and 3 item media groups, including Aviv Baram's Instagram + Facebook pair.
- Mobile frame is larger but remains inside the viewport.
- No memorial text or people data changes.

Note:
Browser console "Permissions policy violation: unload is not allowed" messages can be emitted by third-party Instagram/Facebook/YouTube embeds. They are browser warnings and are not caused by memorial-site content.
