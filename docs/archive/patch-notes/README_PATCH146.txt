PATCH 146 — clean displayed memorial names + internal-page site brand

Changes:
- Index cards and index preview titles display names without ז״ל / ז"ל / הי״ד / הי"ד.
- Personal-page H1 and browser title display the same cleaned name.
- Static personal-page <title> and noscript H1 are also cleaned (154 pages), so the honorific cannot flash before JavaScript loads.
- Adds “שער הנגב זוכרת” with the council logo at the top-left of every personal page, inside the existing top bar.
- Bumps cache versions so browsers fetch the changed scripts.

Not changed:
- assets/js/people.js data.
- biographies, facts, photos, galleries, videos, links, family-contact copy, or ordering.
- homepage design other than the app.js cache query.
