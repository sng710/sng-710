SNG-710 PATCH144B — repository cleanup correction

Purpose
-------
Finishes PATCH144 safely against the current full repository snapshot, including a partially-applied cleanup state.

Important fix
-------------
The historical generic files were NOT duplicates:
- docs/archive/patch-notes/README.txt = Patch 18
- root README.txt = Patch 114
- docs/archive/validation/SHA256SUMS.txt = Patch 18
- root SHA256SUMS.txt = Patch 114

PATCH144B preserves all four using unique names:
- README_PATCH18.txt
- README_PATCH114.txt
- SHA256SUMS_PATCH18.txt
- SHA256SUMS_PATCH114.txt

Codespaces usage
----------------
Upload/extract this patch into the repository root, then run:

bash tools/repo/apply_patch144b_cleanup.sh

git status --short

If the status looks correct:

git add -A
git commit -m "chore: finish repository cleanup"
git push

The script is idempotent for missing/already-moved files and does not modify active site/runtime files.
