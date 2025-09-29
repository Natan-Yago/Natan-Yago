import work from "@/data/work.json";

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
