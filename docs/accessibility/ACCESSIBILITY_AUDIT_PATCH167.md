# Accessibility audit — PATCH167

## Scope checked
- Homepage templates and dynamic card/lightbox renderer.
- Shared internal memorial page renderer used by all 154 person-page wrappers.
- All 154 static person wrappers for `lang="he"`, `dir="rtl"`, viewport metadata and `data-person-id`.
- Current memorial data: 154 records.

## Headings and landmarks
- Homepage has one H1 (`שער הנגב זוכרת`).
- Previous-years divider changed to semantic H2.
- Internal pages render one H1 for the person name, H2 for main content sections, and H3 for event/legacy subsections.
- Skip links exist on homepage and internal pages.
- Internal closing memorial line changed to semantic FOOTER.

## Images and alternative text
- Portrait images with source files: 110; renderer supplies person-name alt text when no explicit `portraitAlt` exists.
- Story-media items checked: 53; current data missing explicit alt: 0. Renderer has a person-specific fallback for story photos.
- Top-media images checked: 1; items without explicit alt/label: 0. PATCH167 adds a person-specific fallback alt in the renderer.
- Council logo inside the labelled home link remains intentionally decorative (`alt=""`) because the link already has an accessible name.

## Keyboard and focus
- Cards, filters, modal controls, media carousel controls, image viewer and story disclosure use native buttons/links or keyboard-operable `role="button"` elements.
- Escape closes custom overlays/dropdowns where applicable.
- Focus is returned after modal/image-viewer closure.
- PATCH167 adds a high-visibility 3px focus indicator and strengthens search focus visibility.

## Contrast sample checks
- Homepage primary text: `#f7f3eb` on `#123c5c` = **10.39:1**
- Homepage settlement text: `#b8c9d0` on `#123c5c` = **6.74:1**
- Homepage dedication: `#e1e8e7` on `#1b3d61` = **8.96:1**
- Person page primary text: `#f3f5f4` on `#243b63` = **10.2:1**
- Person page muted text: `#dce7ea` on `#243b63` = **8.86:1**
- Lightbox dark text: `#17324a` on `#ffffff` = **13.19:1**

All sampled normal-text pairs above exceed 4.5:1. The toolbar also includes an optional high-contrast mode.

## Text enlargement / reflow
- PATCH167 removes clipping constraints from text-bearing homepage/person-page containers.
- Memorial card name/place rows use auto height.
- When the toolbar enlarges text, long mobile stories are automatically shown without the visual max-height mask so enlarged content is not hidden.
- Toolbar text scale supports 100%–200%.

## Reduced motion
- Existing `prefers-reduced-motion` support was found in the site.
- The toolbar adds a persistent user-controlled "עצירת אנימציות" option as well.

## Manual items that still require human/content verification
1. **Video captions/transcripts:** external YouTube/Vimeo/Facebook content must be checked individually for accurate captions or equivalent text alternatives. Code can provide titles but cannot verify the captions supplied by external platforms.
2. **Descriptive quality of gallery alt text:** code guarantees non-empty/person-specific fallbacks; a human should decide whether individual documentary photos need more specific descriptions.
3. **Formal Israeli accessibility statement:** the site should publish an accessibility statement containing the council's accurate accessibility/contact/arrangements details. Those facts were not available in the code, so PATCH167 does not invent them.
4. This is a code-level accessibility audit and remediation, not a legal certification or a substitute for testing with assistive-technology users.
