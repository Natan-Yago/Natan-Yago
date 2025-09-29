# CaseStudy Implementation Tracker

Use this checklist to plan and verify the CaseStudy feature work.

## Tasks

- [ ] Update `app/components/sections/case-study.js` to new section router
  - [ ] Add validators for `overview`, `challenges`, `gallery`
  - [ ] Add renderers for `overview`, `challenges`, `gallery`
  - [ ] Wrap each section in its own `GridRow`
  - [ ] Ensure strict validation (skip incomplete sections)
- [ ] Update `work.json` example project with new `case.sections`
  - [ ] Add `overview` with image or video
  - [ ] Add `challenges` with at least 2 items
  - [ ] Add `gallery` with 2+ images
- [ ] Verify layout/styling
  - [ ] Gallery is 1‑col mobile, 2‑col md+ (`grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-5`)
  - [ ] Media wrapped in `SpotlightBorder`
  - [ ] Animations via `AnimatedInView`
- [ ] Validate behavior
  - [ ] Missing fields cause section to not render
  - [ ] Overview renders only one media type (image OR video)
  - [ ] Challenges shows optional `impact` when present
- [ ] Accessibility & theming
  - [ ] Images have `alt` text where applicable
  - [ ] Works in light/dark themes
- [ ] Docs
  - [ ] Confirm `guides/case-study-implementation.md` is accurate and up-to-date

## Hero Layout

- [ ] Adopt 5-row hero structure in `case-study.js`
  - [ ] Row 1: Title, description, `ActionButton`
  - [ ] Row 2: Decorative empty row
  - [ ] Row 3: Thumbnail image (with `SpotlightBorder`, `centerMuted`, conditional on `image`)
  - [ ] Row 4: Tags pills (tags-only; no tech, conditional on `tags`)
  - [ ] Row 5: Decorative empty row
  - [ ] Ensure conditional rendering and spacing match the guide

## Hero Acceptance Criteria (as‑is)

- [ ] Hero uses five GridRows in the specified order (1: title/desc/button, 2: empty, 3: image, 4: tags, 5: empty)
- [ ] Title uses `text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-2`
- [ ] Description uses `text-muted-foreground mb-2`
- [ ] `ActionButton` rendered only if `links.live` exists; `noAnimation`, `mt-2`
- [ ] Image wrapped with `SpotlightBorder`; has correct sizing/props and rounded corners
- [ ] Tags rendered as pills; no tech pills in hero
- [ ] Rows 2 and 5 present and empty for decoration
- [ ] Omit Row 3 if no image, Omit Row 4 if no tags
- [ ] Accessibility: one h1, image `alt` present, button is an accessible link
