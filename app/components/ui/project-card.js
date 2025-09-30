"use client";

import { forwardRef } from "react";
import Link from "next/link";
import Image from "next/image";
import SpotlightBorder from "./spotlight-border";
import { withBasePath } from "@/lib/base-path";

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
      <Link
        href={`/work/${project?.slug ?? ""}`}
        ref={ref}
        className={`group block bg-background border border-border rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background ${className}`}
        role="link"
        aria-label={`View details for ${project?.title}`}
        tabIndex={0}
        {...props}
      >
        {/* Media */}
        <div className="relative overflow-hidden rounded-lg mb-1 bg-muted aspect-[16/9]">
          <Image
            src={withBasePath(project.image)}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, 600px"
            className="object-cover"
          />
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
      </Link>
    </SpotlightBorder>
  );
});

ProjectCard.displayName = "ProjectCard";

export default ProjectCard;
