"use client";

import { forwardRef } from "react";
import SpotlightBorder from "./spotlight-border";

/**
 * Reusable Project Card Component
 *
 * Features:
 * - Flexible project display with image, video or both
 * - Hover effects and smooth transitions
 * - Dark mode support
 * - Responsive design
 * - Forward ref support for animations
 */
const ProjectCard = forwardRef(({ project, className = "", ...props }, ref) => {
  return (
    <SpotlightBorder
      className="rounded-lg"
      radiusClass="rounded-lg"
      borderColor="hsl(var(--primary))"
      spotlightSize="30% 40px"
    >
      <div
        ref={ref}
        className={`group cursor-pointer bg-background border border-border rounded-lg ${className}`}
        {...props}
      >
        {/* Media */}
        <div className="relative overflow-hidden rounded-lg mb-1 bg-muted aspect-[16/9]">
          
          <div className="absolute inset-0 flex items-center justify-center">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Content */}
        <div className="p-3">
          <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors duration-200">
            {project.title}
          </h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            {project.description}
          </p>
        </div>
      </div>
    </SpotlightBorder>
  );
});

ProjectCard.displayName = "ProjectCard";

export default ProjectCard;
