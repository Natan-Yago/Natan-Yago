import { listWork } from "@/app/lib/work";
import ProjectCard from "@/app/components/ui/project-card";
import Grid, { GridRow } from "@/app/components/ui/grid";

export const metadata = { title: "Work" };

export default async function WorkPage() {
  const items = await listWork();
  return (
    <main>
      <section id="work">
        <Grid>
          <GridRow />
          <GridRow
            centerClassName="grid-cell-center-color"
            center={
              <>
                <div className="flex justify-between items-center mb-10">
                  <h1 className="text-base text-foreground text-left max-w-2xl">
                    All work
                  </h1>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-5">
                  {items.map((project) => (
                    <ProjectCard key={project.slug} project={project} />
                  ))}
                </div>
              </>
            }
          />
          <GridRow />
        </Grid>
      </section>
    </main>
  );
}
