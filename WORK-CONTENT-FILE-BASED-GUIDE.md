## File-based "Work" Content Management (Array/JSON in repo)

Short description (for humans): A precise, step-by-step recipe to manage portfolio work items using a simple JSON/JS array in the repo. Add/edit/delete items by editing a file and committing. Pages read from this file via a tiny data layer, making future migration to a CMS trivial.

---

### 0) Overview

- We will store all work items in a single file (`app/data/work.json` or `app/lib/work-data.js`).
- A thin data layer (`app/lib/work.js`) reads from that file and exposes functions.
- UI uses the data layer only (not the raw file), so you can swap sources later.
- Routes: `/work` (list) and `/work/[slug]` (detail). "Selected work" section shows featured items and links to `/work` on “Browse more”.

---

### 1) Create data file (choose one)

Pick one format and stick with it. JSON is simpler; JS allows comments and trailing commas.

Option A — JSON (recommended for simplicity)

- Create file: `app/data/work.json`
- Put an array of objects. Use this schema:

```json
[
  {
    "slug": "dcom",
    "title": "DCOM Platform",
    "description": "B2B e‑commerce modernization.",
    "year": 2024,
    "image": "/images/projects/DCOM.png",
    "tags": ["e‑commerce", "B2B"],
    "tech": ["Next.js", "Tailwind", "GSAP"],
    "links": { "live": "https://example.com", "repo": null },
    "role": "Frontend",
    "client": "Deloitte",
    "featured": true,
    "priority": 1,
    "caseStudy": true,
    "ogImage": "/images/og/dcom.png"
  }
]
```

Option B — JS module (if you want comments)

- Create file: `app/lib/work-data.js`
- Content example:

```js
export const workItems = [
  {
    slug: "dcom",
    title: "DCOM Platform",
    description: "B2B e‑commerce modernization.",
    year: 2024,
    image: "/images/projects/DCOM.png",
    tags: ["e‑commerce", "B2B"],
    tech: ["Next.js", "Tailwind", "GSAP"],
    links: { live: "https://example.com", repo: null },
    role: "Frontend",
    client: "Deloitte",
    featured: true,
    priority: 1,
    caseStudy: true,
    ogImage: "/images/og/dcom.png",
  },
];
```

---

### 2) Create data access layer

Create `app/lib/work.js` with a stable API so UI never imports the raw data file.

If using JSON (Option A):

```js
// app/lib/work.js
import work from "../data/work.json";

export async function listWork({ featuredOnly = false } = {}) {
  const items = Array.isArray(work) ? work : [];
  const filtered = featuredOnly ? items.filter((i) => i.featured) : items;
  const sorted = filtered
    .slice()
    .sort((a, b) => (a.priority ?? 999) - (b.priority ?? 999));
  return sorted;
}

export async function getWorkBySlug(slug) {
  const items = Array.isArray(work) ? work : [];
  return items.find((i) => i.slug === slug) || null;
}

export async function listTags() {
  const items = Array.isArray(work) ? work : [];
  const set = new Set();
  items.forEach((i) => (i.tags || []).forEach((t) => set.add(t)));
  return Array.from(set).sort();
}
```

If using JS module (Option B), import from `app/lib/work-data.js` instead of JSON.

---

### 3) Create the `/work` route (all work)

Create file: `app/work/page.js`

```js
import { listWork } from "@/app/lib/work";
import ProjectCard from "@/app/components/ui/project-card";

export const metadata = { title: "Work" };

export default async function WorkPage() {
  const items = await listWork();
  return (
    <main className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-semibold mb-8">All work</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </main>
  );
}
```

Notes:

- Uses existing `ProjectCard` which expects `{ title, description, image }` at minimum.
- Add filters/search later if desired.

---

### 4) Create the `/work/[slug]` route (detail)

Create directory and files:

- `app/work/[slug]/page.js`
- Optional: `app/work/[slug]/opengraph-image.js` for social images.

Minimal page example:

```js
import { getWorkBySlug } from "@/app/lib/work";
import Image from "next/image";

export async function generateMetadata({ params }) {
  const item = await getWorkBySlug(params.slug);
  if (!item) return { title: "Work not found" };
  return { title: item.title, description: item.description };
}

export default async function WorkDetailPage({ params }) {
  const item = await getWorkBySlug(params.slug);
  if (!item)
    return <div className="container mx-auto px-4 py-12">Not found</div>;
  return (
    <main className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-semibold mb-4">{item.title}</h1>
      <p className="text-muted-foreground mb-6">{item.description}</p>
      {item.image && (
        <div className="mb-8">
          <Image
            src={item.image}
            alt={item.title}
            width={1200}
            height={675}
            className="rounded-lg"
          />
        </div>
      )}
      {/* Extend with tech, role, links, case study content */}
    </main>
  );
}
```

---

### 5) Rename copy: Projects → Work

Make textual changes (no logic change):

- `app/components/sections/selected-projects.js` → Update visible text to “Selected work” and button text to “Browse more”. Link target `/work`.
- If you prefer, rename the file to `selected-work.js` and update imports where it’s used (e.g., `app/page.js`).
- Update any nav items in `app/components/layout/header.js` from "Projects" to "Work" linking to `/work`.

Checklist:

- [ ] Button “Browse more” href is `/work`
- [ ] Section heading reads “Selected work”
- [ ] Header nav shows “Work”

---

### 6) Images and assets

- Store images under `public/images/projects/*` (already present) or `public/images/work/*` if you prefer the new naming. Keep paths consistent with data file.
- Use `next/image` where practical; ensure width/height and sensible `alt`.

---

### 7) How to add a new work item

1. Add image(s) to `public/images/projects/` (or `public/images/work/`).
2. Open `app/data/work.json` (or `app/lib/work-data.js`).
3. Add a new object with a unique `slug` and required fields.
4. If you want it on the home “Selected work”, set `featured: true` and assign a `priority` number (lower shows earlier).
5. Commit and push. Vercel (or your host) will deploy automatically.

---

### 8) How to edit/delete an item

- Edit: Modify the object in the data file; keep the `slug` stable if the URL shouldn’t change.
- Delete: Remove the object; also remove related images if unused.
- Commit and push to deploy.

---

### 9) Verification steps (manual QA)

- Home page: “Selected work” renders expected cards and the “Browse more” button links to `/work`.
- `/work`: All items are listed; images load; titles/descriptions correct.
- `/work/[slug]`: Direct navigation loads detail page correctly.
- Lighthouse basic pass: images sized; no console errors.

---

### 10) Optional enhancements

- Filters on `/work` by `tags` or `tech` using `listTags()`.
- Drafts: Add `draft: true` and filter out in `listWork()` unless `draftMode()`.
- OG images: `opengraph-image.js` per item using `item.ogImage` or dynamic generation.
- Search params: `/work?tag=ai` to pre-filter.

---

### 11) Future migration path

- Keep pages/components using only `app/lib/work.js` APIs.
- When moving to a CMS, replace the internals of `listWork/getWorkBySlug/listTags` to fetch from the CMS and keep function signatures unchanged.

---

### 12) Git workflow (quick reference)

```bash
git checkout -b feat/work-file-data
# edit data files and pages
git add app/data/work.json app/lib/work.js app/work app/components/sections/selected-projects.js app/components/layout/header.js
git commit -m "feat(work): add file-based data, /work routes, copy updates"
git push -u origin feat/work-file-data
```

---

### 13) Minimal data validation (optional)

If desired, add a tiny runtime check in `listWork()` to warn about missing fields during development.

```js
function validateItem(item) {
  const required = ["slug", "title", "description", "image", "year"];
  for (const key of required) {
    if (!item[key]) {
      console.warn(`work item missing required field: ${key}`, item);
      return false;
    }
  }
  return true;
}
```

Integrate by filtering invalid items in dev only.

---

### 14) Component expectations

- `ProjectCard` should accept a `project` object with at least `title`, `description`, `image`. If any prop differs, adapt the mapping in pages.
- Keep naming consistent: we use the term “work” in copy, but internal variable names can remain `project` for compatibility with existing UI primitives.
