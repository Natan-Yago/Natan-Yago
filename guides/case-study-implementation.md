## Case Study Page: Implementation Guide

This guide describes how to implement the new JSON‑driven CaseStudy system with four sections: Hero, Overview, Challenges, and Gallery.

### Goals

- JSON‑driven sections under `case.sections` per project
- Each section renders in its own `GridRow`
- Strict validation: a section renders only if all required fields are present
- Reuse existing UI primitives: `Grid`, `GridRow`, `SpotlightBorder`, `AnimatedInView`, `ActionButton`
- Gallery uses the same two‑column grid as Work

### Section Overview

- **Hero (from project root)**

  - **Fields**: `title`, `description`, `links.live` (optional), `image`, `tags` (or `tech`)
  - **Rendering**: Title, description, visit button, thumbnail image, tags
  - **Note**: Not part of `case.sections`; sourced from the project root object

### Hero Visual Spec (as‑is)

Keep the hero exactly as it looks now. This is the canonical spec to follow:

- **Layout**: Five `GridRow`s in this exact order

  - Row 1: Title, description, `ActionButton` (center cell)
  - Row 2: Decorative empty row
  - Row 3: Thumbnail image (center cell) inside `SpotlightBorder` with `centerMuted`
  - Row 4: Tags row (center cell) — tags only, no tech
  - Row 5: Decorative empty row

- **Typography & alignment**

  - Title uses: `text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-2`
  - Description uses: `text-muted-foreground mb-2`
  - All hero content is centered inside the center cell

- **Button**

  - Use `ActionButton` with `noAnimation`
  - Spacing: `className="mt-2"`
  - When `links.live` is missing, omit the button (do not render a placeholder)

- **Thumbnail image (Row 3)**

  - Wrap in `SpotlightBorder` with `radiusClass="rounded-lg"`
  - Container: `overflow-hidden rounded-lg bg-muted`
  - `Image` props: `width={1200}`, `height={675}`, `sizes="(max-width: 768px) 100vw, 600px"`, `priority`, `className="w-full h-auto object-cover"`
  - `alt` should default to the project title if not overridden

- **Tags (Row 4) — tags only**

  - Container: `flex flex-wrap gap-2`
  - Pill: `text-xs bg-muted text-muted-foreground border border-border rounded px-2 py-1`
  - If no tags are provided, omit Row 4 entirely

- **Decorative rows (Rows 2 & 5)**

  - Always present to create breathing space and background rhythm
  - No content in any cells

- **Responsive behavior**

  - Title scales via the responsive classes above
  - Image uses `sizes` and `object-cover` for proper scaling
  - Tags wrap to multiple lines as needed

- **Accessibility**

  - Single `<h1>` for the page title in Row 1
  - Provide an `alt` for the thumbnail image (default to title)
  - `ActionButton` renders an accessible link when `links.live` exists

- **Do not**
  - Do not show tech in the hero; only tags are allowed
  - Do not add additional text blocks, captions, or subheaders
  - Do not animate the hero button (keep `noAnimation`)

### Hero Layout (5 GridRows)

For consistency, the CaseStudy hero uses exactly five `GridRow`s in this order:

1. Title, description, and `ActionButton` (center cell)
2. Empty row for decoration (no content)
3. Thumbnail image (center cell, wrapped with `SpotlightBorder`, usually `centerMuted`)
4. Tags row (center cell). Use tags only; do not render `tech` here.
5. Empty row for decoration (no content)

Render rows 3 and 4 conditionally where appropriate (e.g., row 3 only if `image` exists; row 4 only if `tags` exist). Rows 1, 2, and 5 are always present.

Example structure:

```jsx
<Grid>
  {/* Row 1: Title + Description + ActionButton */}
  <GridRow
    center={
      <div className="text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-2">
          {title}
        </h1>
        {description && (
          <p className="text-muted-foreground mb-2">{description}</p>
        )}
        {links?.live && (
          <ActionButton
            href={links.live}
            text="Visit Website"
            noAnimation
            className="mt-2"
          />
        )}
      </div>
    }
  />

  {/* Row 2: Decorative empty row */}
  <GridRow />

  {/* Row 3: Thumbnail image (only if image) */}
  {image && (
    <GridRow
      centerMuted
      center={
        <SpotlightBorder className="rounded-lg" radiusClass="rounded-lg">
          <div className="overflow-hidden rounded-lg bg-muted">
            <Image
              src={image}
              alt={title}
              width={1200}
              height={675}
              sizes="(max-width: 768px) 100vw, 600px"
              priority
              className="w-full h-auto object-cover"
            />
          </div>
        </SpotlightBorder>
      }
    />
  )}

  {/* Row 4: Tags (only if present). Tags only; omit tech. */}
  {tags?.length ? (
    <GridRow
      center={
        <div className="flex flex-wrap gap-2">
          {tags.map((t) => (
            <span
              key={`tag-${t}`}
              className="text-xs bg-muted text-muted-foreground border border-border rounded px-2 py-1"
            >
              {t}
            </span>
          ))}
        </div>
      }
    />
  ) : null}

  {/* Row 5: Decorative empty row */}
  <GridRow />
</Grid>
```

Notes:

- If a row’s required data is missing, skip that row entirely (rows 3–4).
- Rows 2 and 5 are for visual rhythm; keep them even when other rows are skipped.

- **Overview (type: `overview`)**

  - **Required**: `title` (string), `body` (string), and either `image.src` OR `video.src`
  - **Optional**: `image.alt`, `video.poster`
  - **Rendering**: Heading, paragraph, then media (image OR video) wrapped with `SpotlightBorder`

- **Challenges (type: `challenges`)**

  - **Required**: `title` (string), `items` (non‑empty array)
  - **Item Required Fields**: `challenge` (string), `solution` (string)
  - **Optional per item**: `impact` (string)
  - **Rendering**: Card list with challenge, solution, and optional impact

- **Gallery (type: `gallery`)**
  - **Required**: `images` (non‑empty array of `{ src, alt? }`)
  - **Optional**: `title`
  - **Rendering**: 2‑column responsive grid (mobile 1‑col → md 2‑col) of images inside `SpotlightBorder`

### JSON Schema Example

Add under a project’s `case.sections`:

```json
{
  "case": {
    "sections": [
      {
        "type": "overview",
        "title": "Overview",
        "body": "We modernized the storefront and rolled out across 6 markets.",
        "image": { "src": "/images/projects/DCOM.png", "alt": "DCOM Dashboard" }
      },
      {
        "type": "challenges",
        "title": "Challenges & Solutions",
        "items": [
          {
            "challenge": "Heavy third‑party scripts slowed TTI",
            "solution": "Deferred/dynamic imports and route‑level code‑splitting",
            "impact": "TTI improved by 28%"
          },
          {
            "challenge": "Locale content fragmentation",
            "solution": "CMS schemas + i18n routing and middleware"
          }
        ]
      },
      {
        "type": "gallery",
        "title": "Screens",
        "images": [
          { "src": "/images/projects/DCOM.png", "alt": "Dashboard" },
          { "src": "/images/projects/DCOM.png", "alt": "Checkout" }
        ]
      }
    ]
  }
}
```

### Implementation Steps

1. Update `app/components/sections/case-study.js`

- Keep Hero rendering from project root (title, description, button, image, tags)
- Add validators:
  - `overview`: `title`, `body`, and one of `image.src` or `video.src`
  - `challenges`: `title`, non‑empty `items`, each with `challenge` + `solution`
  - `gallery`: non‑empty `images`, each with `src`
- Add renderers for `overview`, `challenges`, `gallery`
- Route by `section.type` and wrap each returned node in its own `GridRow`

2. Layout & Style

- Use Tailwind utility classes
- Gallery grid classes: `grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-5`
- Wrap media with `SpotlightBorder`; animate entrance with `AnimatedInView`

3. Validation Behavior

- If any required field is missing → skip the section entirely
- Defensive checks for strings/arrays to avoid runtime errors

4. Data Entry

- Update `app/data/work.json` per project to include `case.sections`
- Ensure section fields meet validation so they render

### Testing Checklist

- Project without `case.sections` renders only Hero
- Overview renders with exactly one media (image or video)
- Challenges renders only when all items have `challenge` and `solution`
- Gallery renders as two columns at md+ and 1 column on mobile
- Dark mode and animations respect existing app patterns

### Future Extensions

- Add optional sections (`quote`, `stats`, `timeline`) with validators and renderers
- Add `id` anchors per section for deep links
- Optional per‑section `centerMuted` toggles

### Copy‑Paste Prompt

Use this prompt to implement or update the CaseStudy feature:

"Implement a JSON‑driven CaseStudy page with four sections: Hero, Overview, Challenges, and Gallery. Hero pulls `title`, `description`, `links.live`, `image`, and `tags` from the project root. `case.sections` supports:

- `overview`: require `title`, `body`, and either `image.src` or `video.src`; render heading, paragraph, then media wrapped with `SpotlightBorder`.
- `challenges`: require `title` and non‑empty `items`; each item must include `challenge` and `solution`, optional `impact`; render a list of cards.
- `gallery`: require non‑empty `images` with `src`; optional `title`; render a two‑column grid (same as Work page) with each image inside `SpotlightBorder`.
  Each section must render inside its own `GridRow`. Validate strictly; if a section is missing any required field, skip rendering that section. Reuse `Grid`, `GridRow`, `SpotlightBorder`, `AnimatedInView`, `ActionButton`. Use Tailwind classes only."

### Section Headings Style (match Home)

All CaseStudy section titles (Overview, Challenges, Gallery) must use the same typography as home section headings:

- Class: `text-base text-foreground text-left max-w-2xl`
- Component: ensure `SectionHeading` renders with the class above
- Alignment: left-aligned inside the center cell
- Spacing to surrounding content handled locally (e.g., add margins where needed)

### Overview Visual Spec

- **Purpose**: Explain what the project is and why it matters, with a supporting media (image or video)
- **Validation**: Must have `title`, `body`, and either `image.src` OR `video.src`
- **Layout**: Single `GridRow` (center cell)
- **Content order**: Heading → paragraph → media
- **Styles**:
  - Heading: reuse `SectionHeading` or `text-xl md:text-2xl font-semibold text-foreground mb-3`
  - Body: `text-sm md:text-base text-muted-foreground leading-relaxed`
  - Media: inside `SpotlightBorder`, rounded, responsive
- **Media rules**:
  - If both `image.src` and `video.src` are present, prefer `video` and ignore `image`
  - Video: `controls`, optional `poster`, width auto, responsive

### Challenges Visual Spec

- **Purpose**: Show real problems and how we solved them, optionally with impact
- **Validation**: Must have `title` and non-empty `items`; each item requires `challenge` and `solution` (optional `impact`)
- **Layout**: Single `GridRow` (center cell)
- **Content order**: Heading → list of cards
- **Card styles**:
  - Container: `bg-background border border-border rounded-md p-4`
  - Challenge: `text-foreground font-semibold mb-1`
  - Solution/Impact: `text-sm text-muted-foreground`, label `font-medium text-foreground`
- **Behavior**:
  - If any item is missing `challenge` or `solution`, skip the entire section (strict validation)

### Gallery Visual Spec

- **Purpose**: Visual showcase using a simple, readable stack of images
- **Validation**: Must have non-empty `images`; each `images[i].src` required
- **Layout**: Single `GridRow` (center cell)
- **Grid**: `grid grid-cols-1 gap-5` (vertical stack)
- **Item**:
  - Each image wrapped in `SpotlightBorder` with rounded corners
  - `Image` uses responsive sizes; alt optional but recommended

### Validation Matrix

| Section    | Required fields                                       | Skip rule                       |
| ---------- | ----------------------------------------------------- | ------------------------------- |
| Hero       | title; optional: description, links.live, image, tags | N/A (rows 3–4 conditional)      |
| Overview   | title, body, (image.src OR video.src)                 | Missing any → skip section      |
| Challenges | title, items[], each with (challenge, solution)       | Any item missing → skip section |
| Gallery    | images[], each with src                               | Missing any → skip section      |

### Authoring Rules (work.json)

- Keep hero content at the project root; do not duplicate it inside `case.sections`
- Use minimal, concise copy; 1–2 paragraphs for Overview, up to 4 challenge cards
- Prefer web‑safe image dimensions (e.g., 1200×675 hero, ≤1200px width gallery)
- Use absolute paths for images under `/public/images/...`
- Validate JSON before committing; ensure required fields are present to render
