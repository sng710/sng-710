PATCH144 — repository cleanup only

This patch reorganizes repository documentation only.
It does NOT contain or modify any live-site code, memorial content, images, videos, CSS, people pages, CNAME, or site-version files.

What it adds:
- README.md
- CHANGELOG.md
- docs/ archive with exact copies of the 93 historical root documentation files
- tools/repo/apply_patch144_cleanup.py

How to apply safely:
1. Extract this ZIP into the repository root (merge folders).
2. Review README.md, CHANGELOG.md and docs/PATCH144_MOVE_MANIFEST.md.
3. Run: python tools/repo/apply_patch144_cleanup.py
   The helper deletes an old root documentation file ONLY when its archived copy exists and has the exact same SHA-256 hash.
4. Commit the resulting move/add changes in Git.

The helper is idempotent and will not touch runtime/site files.
