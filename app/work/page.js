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
            center={
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground text-center transition-none">
                All work
              </h1>
            }
          />
          <GridRow />
          <GridRow
            centerMuted={true}
            center={
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-5">
                {items.map((project) => (
                  <ProjectCard key={project.slug} project={project} />
                ))}
              </div>
            }
          />
          <GridRow />
        </Grid>
      </section>
    </main>
  );
}
