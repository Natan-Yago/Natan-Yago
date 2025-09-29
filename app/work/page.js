import { listWork } from "@/lib/work";
import ProjectCard from "@/components/ui/project-card";
import Grid, { GridRow } from "@/components/ui/grid";
import AnimatedInView from "@/components/ui/animated-in-view";

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
              <AnimatedInView
                animation="fadeIn"
                blur={2}
                className="opacity-0"
                threshold={0.1}
                rootMargin="0px 0px -5% 0px"
              >
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground text-center transition-none">
                  All work
                </h1>
              </AnimatedInView>
            }
          />
          <GridRow />
          <GridRow
            centerMuted={true}
            center={
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-5">
                {items.map((project, index) => (
                  <AnimatedInView
                    key={project.slug}
                    animation="fadeInUp"
                    blur={2}
                    className="opacity-0"
                    options={{ delay: index * 0.05 }}
                    threshold={0.05}
                    rootMargin="0px 0px -2% 0px"
                  >
                    <ProjectCard project={project} />
                  </AnimatedInView>
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
