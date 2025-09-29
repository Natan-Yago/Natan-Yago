import { getWorkBySlug, listWork } from "@/lib/work";
import { notFound } from "next/navigation";
import CaseStudy from "@/components/sections/case-study";

export async function generateMetadata({ params }) {
  const item = await getWorkBySlug(params.slug);
  if (!item) return { title: "Work not found" };
  const title = item.title || "Project";
  const description = item.description || "";
  const images = item.image
    ? [{ url: item.image, width: 1200, height: 675, alt: title }]
    : [];
  return {
    title,
    description,
    alternates: { canonical: `/work/${params.slug}` },
    openGraph: {
      title,
      description,
      type: "article",
      images,
    },
    twitter: {
      card: images.length ? "summary_large_image" : "summary",
      title,
      description,
      images: images.map((i) => i.url),
    },
  };
}

export default async function WorkDetailPage({ params }) {
  const item = await getWorkBySlug(params.slug);
  if (!item) return notFound();

  // Render CaseStudy layout for all non-redirect projects
  return <CaseStudy project={item} />;
}

export async function generateStaticParams() {
  const items = await listWork();
  return items.map((i) => ({ slug: i.slug }));
}

export const dynamicParams = true;
