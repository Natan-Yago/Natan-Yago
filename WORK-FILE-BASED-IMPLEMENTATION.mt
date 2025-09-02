Title: File-based Work Content — Implementation Steps (.mt)
Description (human): A very granular, AI-friendly checklist to implement file-based "work" content: create data source, data layer, routes (/work, /work/[slug]), and rename copy from Projects → Work.

PHASE A — Data source setup (JSON)

- [ ] A1. Ensure directory exists: `app/data/`
  - If missing, create it.
  - Done when: `app/data/` is present in repo.

- [ ] A2. Create `app/data/work.json` with an empty array scaffold
  - Content to write exactly:
    ```json
    []
    ```
  - Done when: file exists and contains an empty array.

- [ ] A3. Seed with one example item (update image/path if needed)
  - Replace `app/data/work.json` content with:
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
  - Done when: JSON parses and object fields match above keys.


PHASE B — Data access layer

- [ ] B1. Create `app/lib/work.js`
  - Content to write exactly:
    ```js
    import work from '../data/work.json';

    export async function listWork({ featuredOnly = false } = {}) {
      const items = Array.isArray(work) ? work : [];
      const filtered = featuredOnly ? items.filter(i => i.featured) : items;
      const sorted = filtered.slice().sort((a, b) => (a.priority ?? 999) - (b.priority ?? 999));
      return sorted;
    }

    export async function getWorkBySlug(slug) {
      const items = Array.isArray(work) ? work : [];
      return items.find(i => i.slug === slug) || null;
    }

    export async function listTags() {
      const items = Array.isArray(work) ? work : [];
      const set = new Set();
      items.forEach(i => (i.tags || []).forEach(t => set.add(t)));
      return Array.from(set).sort();
    }
    ```
  - Done when: file exists with three exported async functions.

- [ ] B2. Optional dev-only validation helper (skip if not needed)
  - Append to `app/lib/work.js` (optional):
    ```js
    function validateItem(item) {
      const required = ['slug', 'title', 'description', 'image', 'year'];
      for (const key of required) {
        if (!item[key]) return false;
      }
      return true;
    }
    ```
  - Done when: helper present (not used by default).


PHASE C — Routes: /work list

- [ ] C1. Create `app/work/page.js`
  - Content to write exactly:
    ```js
    import { listWork } from '@/app/lib/work';
    import ProjectCard from '@/app/components/ui/project-card';

    export const metadata = { title: 'Work' };

    export default async function WorkPage() {
      const items = await listWork();
      return (
        <main className="container mx-auto px-4 py-12">
          <h1 className="text-3xl font-semibold mb-8">All work</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map(project => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </main>
      );
    }
    ```
  - Done when: file exists and builds without import errors.


PHASE D — Routes: /work/[slug] detail

- [ ] D1. Create directory: `app/work/[slug]/`
  - Done when: directory exists in repo.

- [ ] D2. Create `app/work/[slug]/page.js`
  - Content to write exactly:
    ```js
    import { getWorkBySlug } from '@/app/lib/work';
    import Image from 'next/image';

    export async function generateMetadata({ params }) {
      const item = await getWorkBySlug(params.slug);
      if (!item) return { title: 'Work not found' };
      return { title: item.title, description: item.description };
    }

    export default async function WorkDetailPage({ params }) {
      const item = await getWorkBySlug(params.slug);
      if (!item) return <div className="container mx-auto px-4 py-12">Not found</div>;
      return (
        <main className="container mx-auto px-4 py-12">
          <h1 className="text-3xl font-semibold mb-4">{item.title}</h1>
          <p className="text-muted-foreground mb-6">{item.description}</p>
          {item.image && (
            <div className="mb-8">
              <Image src={item.image} alt={item.title} width={1200} height={675} className="rounded-lg" />
            </div>
          )}
        </main>
      );
    }
    ```
  - Done when: file exists and renders for an existing slug.


PHASE E — Rename copy: Projects → Work

- [ ] E1. Update section text and link target in `app/components/sections/selected-projects.js`
  - Change visible heading to: "Selected work".
  - Change button text to: "Browse more".
  - Change button/link href to: `/work`.
  - Keep component/file name for now to avoid breaking imports (optional rename later).
  - Done when: home section shows updated copy and button navigates to `/work`.

- [ ] E2. Update header nav in `app/components/layout/header.js`
  - Change nav item label from "Projects" to "Work".
  - Ensure href points to `/work`.
  - Done when: header shows "Work" linking to `/work`.


PHASE F — Assets and images

- [ ] F1. Verify images exist for seeded items
  - Check `public/images/projects/DCOM.png` exists (or adjust path in JSON).
  - Done when: detail and list pages display images without 404.


PHASE G — QA

- [ ] G1. Build and run locally
  - Commands (informational): `npm run dev` (or `pnpm dev`/`yarn dev`).
  - Verify pages: Home → Selected work cards; button to `/work`; `/work`; `/work/dcom`.

- [ ] G2. Basic accessibility checks
  - Ensure images have descriptive alt.
  - Ensure interactive elements are keyboard focusable.


PHASE H — Optional enhancements (skip if not needed now)

- [ ] H1. Add tag filter UI on `/work` using `listTags()`
- [ ] H2. Add `draft` support and filter out drafts unless in `draftMode()`
- [ ] H3. Add `opengraph-image.js` for `/work/[slug]`


ACCEPTANCE CRITERIA

- [ ] Home shows "Selected work" with curated items from JSON (`featured: true`, sorted by `priority`).
- [ ] "Browse more" goes to `/work` and lists all items.
- [ ] `/work/[slug]` renders details for each item.
- [ ] Header nav uses "Work" linking to `/work`.
- [ ] Adding/editing/removing an item in `app/data/work.json` changes the site accordingly after rebuild.


