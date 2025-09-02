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
    </main>
  );
}
