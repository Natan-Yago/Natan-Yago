"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import ProjectCard from "../ui/project-card";
import ActionButton from "../ui/action-button";
import Grid, { GridRow } from "../ui/grid";
import { listWork } from "@/app/lib/work";

/**
 * Selected Projects Section Component
 *
 * Features:
 * - 2-column responsive layout
 * - Uses reusable ProjectCard components
 * - GSAP animations on scroll
 * - Dark mode support
 * - Responsive design for mobile and desktop
 */
export default function SelectedProjects() {
  const titleRef = useRef(null);
  const projectsRef = useRef(null);
  const [projects, setProjects] = useState([]);

  // Load featured items from data layer
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

  // Animate when content is ready
  useEffect(() => {
    if (!titleRef.current || !projectsRef.current) return;
    if (!projects || projects.length === 0) return;

    const titleEl = titleRef.current;
    const gridEl = projectsRef.current;

    gsap.fromTo(
      titleEl,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
    );

    if (gridEl && gridEl.children && gridEl.children.length > 0) {
      gsap.fromTo(
        gridEl.children,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.2,
          delay: 0.3,
        }
      );
    }

    return () => {
      if (titleEl) gsap.killTweensOf(titleEl);
      if (gridEl && gridEl.children) gsap.killTweensOf(gridEl.children);
    };
  }, [projects]);

  return (
    <section id="projects">
      <Grid>
        <GridRow />
        <GridRow
          centerClassName="grid-cell-center-color"
          center={
            <>
              <div className="flex justify-between items-center mb-10">
                <h2
                  ref={titleRef}
                  className="text-base text-foreground text-left max-w-2xl"
                >
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
              <div
                ref={projectsRef}
                className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-5"
              >
                {projects.map((project) => (
                  <ProjectCard key={project.slug} project={project} />
                ))}
              </div>
            </>
          }
        />
        <GridRow />
      </Grid>
    </section>
  );
}
