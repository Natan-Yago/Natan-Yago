"use client";

import { useEffect, useRef, useState } from "react";
import AnimatedDiv from "@/app/components/ui/animated-div";
import AnimatedInView from "@/app/components/ui/animated-in-view";
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
export default function SelectedProjects({ projects: initialProjects = [] }) {
  const titleRef = useRef(null);
  const projectsRef = useRef(null);
  const [projects, setProjects] = useState(initialProjects);
  const [revealCards, setRevealCards] = useState(false);

  // Fallback client fetch only if no SSR data provided
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

  // Observe grid to trigger card animations only when grid enters viewport (desktop focus)
  useEffect(() => {
    if (!projectsRef.current) return;
    const el = projectsRef.current;
    let hasTriggered = false;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((ent) => {
          if (ent.isIntersecting && !hasTriggered) {
            hasTriggered = true;
            setRevealCards(true);
            observer.unobserve(el);
            observer.disconnect();
          }
        });
      },
      { threshold: 0, rootMargin: "0px 0px -10% 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [projectsRef]);

  return (
    <section id="projects">
      <Grid>
        <GridRow />
        <GridRow
          centerMuted={true}
          center={
            <>
              <div className="flex justify-between items-center mb-10">
                <AnimatedDiv animation="fadeIn" blur className="opacity-0">
                  <h2 className="text-base text-foreground text-left max-w-2xl">
                    Latest Work
                  </h2>
                </AnimatedDiv>
                <AnimatedDiv
                  animation="fadeIn"
                  options={{ delay: 0.1 }}
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
              <div
                ref={projectsRef}
                className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-5"
              >
                {projects.map((project) => (
                  <AnimatedInView
                    key={project.slug}
                    animation="fadeInUp"
                    blur={3}
                    className="md:opacity-0"
                    threshold={0.15}
                    rootMargin="0px 0px -10% 0px"
                  >
                    <ProjectCard project={project} />
                  </AnimatedInView>
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
