"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import ProjectCard from "../ui/project-card";
import ActionButton from "../ui/action-button";

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

  useEffect(() => {
    if (titleRef.current && projectsRef.current) {
      // Animate title
      gsap.fromTo(titleRef.current, 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
      );
      
      // Animate project cards with stagger
      gsap.fromTo(projectsRef.current.children, 
        { opacity: 0, y: 50 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8, 
          ease: "power3.out",
          stagger: 0.2,
          delay: 0.3
        }
      );
    }
    
    // Cleanup function
    return () => {
      if (titleRef.current && projectsRef.current) {
        gsap.killTweensOf([titleRef.current, projectsRef.current.children]);
      }
    };
  }, []);

  const projects = [
    {
      id: 1,
      title: "Deloitte Israel Website",
      description: "Design and development of a website for Deloitte Israel",
      image: "/images/projects/DCOM.png",
      category: "Web Development"
    },
    {
      id: 2,
      title: "Deloitte Digital",
      description: "UI kit to make beautiful, animated interfaces.",
      image: "/images/projects/DD.png",
      category: "UI/UX Design"
    },
    {
      id: 3,
      title: "Deloitte Israel Mobile App",
      description: "Design and development of a website for Deloitte Israel",
      image: "/images/projects/DCOM.png",
      category: "Web Development"
    },
    {
      id: 4,
      title: "Deloitte Digital Mobile App",
      description: "UI kit to make beautiful, animated interfaces.",
      image: "/images/projects/DD.png",
      category: "UI/UX Design"
    }
  ];

  return (
  <section id="projects">
    <div className="grid-layout-3col">
      {/* Empty Row 0 */}
      <div className="grid-cell"></div>
      <div className="grid-cell"></div>
      <div className="grid-cell"></div>
      
      {/* Row 1 */}
      <div className="grid-cell"></div>
      <div className="grid-cell grid-cell-center-color">
        <div className="flex flex justify-between items-center mb-10">
          <h2 
            ref={titleRef}
            className="text-base text-foreground text-left max-w-2xl"
          >
            Selected Projects
          </h2>
            <ActionButton
              href="/work"
              text="Browse More"
              hoverText="All Projects"
              icon={<ArrowRightIcon className="h-3 w-3" aria-hidden="true" />}
            />
        </div>

        
        {/* Projects Grid */}
        <div ref={projectsRef} className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-5">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
            />
          ))}
        </div>
      </div>
      <div className="grid-cell"></div>
      
      {/* Row 2 */}
      <div className="grid-cell"></div>
      <div className="grid-cell"></div>
      <div className="grid-cell"></div>

    </div>
  </section>
  );
}
