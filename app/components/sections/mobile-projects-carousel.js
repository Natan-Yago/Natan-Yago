"use client";

import { useEffect, useState } from "react";
import Grid, { GridRow } from "../ui/grid";
import Carousel from "../ui/carousel";
import { listWork } from "@/app/lib/work";
import ActionButton from "../ui/action-button";
import { ArrowRightIcon } from "@heroicons/react/24/solid";

/**
 * MobileProjectsCarousel
 *
 * One-column carousel section for mobile breakpoints.
 * Hidden at md+ where the regular grid is shown.
 */
export default function MobileProjectsCarousel() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      const featured = await listWork({ featuredOnly: true });
      if (isMounted) setProjects(featured);
    })();
    return () => {
      isMounted = false;
    };
  }, []);

  // No animated background images beneath pagination per request

  return (
    <section id="projects-mobile" className="md:hidden">
      <Grid>
        <GridRow />
        <GridRow
          centerClassName="grid-cell-center-color"
          center={
            <>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-base text-foreground text-left">
                  Selected Work
                </h2>
                <ActionButton
                  href="/work"
                  text="Browse more"
                  hoverText="All Projects"
                  icon={
                    <ArrowRightIcon className="h-3 w-3" aria-hidden="true" />
                  }
                />
              </div>
              <Carousel
                projects={projects}
                intervalMs={3200}
                paginationFillColor="hsl(var(--muted-foreground))"
              />
            </>
          }
        />
        <GridRow />
      </Grid>
    </section>
  );
}
