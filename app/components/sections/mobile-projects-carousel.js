"use client";

import { useEffect, useState } from "react";
import Grid, { GridRow } from "@/components/ui/grid";
import Carousel from "@/components/ui/carousel";
import { listWork } from "@/lib/work";
import ActionButton from "@/components/ui/action-button";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import AnimatedDiv from "@/components/ui/animated-div";

/**
 * MobileProjectsCarousel
 *
 * One-column carousel section for mobile breakpoints.
 * Hidden at md+ where the regular grid is shown.
 */
export default function MobileProjectsCarousel({
  projects: initialProjects = [],
}) {
  const [projects, setProjects] = useState(initialProjects);

  // Fallback fetch only when SSR didn't provide projects
  useEffect(() => {
    let isMounted = true;
    if (initialProjects && initialProjects.length > 0) return;
    (async () => {
      const featured = await listWork({ featuredOnly: true });
      if (isMounted) setProjects(featured);
    })();
    return () => {
      isMounted = false;
    };
  }, [initialProjects]);

  // No animated background images beneath pagination per request

  return (
    <section id="projects-mobile" className="md:hidden">
      <Grid>
        <GridRow />
        <GridRow
          centerMuted={true}
          center={
            <>
              <div className="flex justify-between items-center mb-4">
                <AnimatedDiv animation="fadeIn" blur className="opacity-0">
                  <h2 className="text-base text-foreground text-left">
                    Latest Work
                  </h2>
                </AnimatedDiv>
                <AnimatedDiv
                  animation="fadeIn"
                  options={{ delay: 0.08 }}
                  blur
                  className="opacity-0"
                >
                  <ActionButton
                    href="/work"
                    text="Browse more"
                    hoverText="All Projects"
                    icon={
                      <ArrowRightIcon className="h-3 w-3" aria-hidden="true" />
                    }
                  />
                </AnimatedDiv>
              </div>
              <AnimatedDiv animation="fadeInUp" blur={3} className="opacity-0">
                <Carousel
                  className="min-h-[280px]"
                  projects={projects}
                  intervalMs={3200}
                  paginationFillColor="hsl(var(--muted-foreground))"
                />
              </AnimatedDiv>
            </>
          }
        />
        <GridRow />
      </Grid>
    </section>
  );
}
