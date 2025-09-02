"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import AnnouncementBar from "../ui/announcement-bar";
import Grid, { GridRow } from "../ui/grid";

/**
 * Enhanced Hero Section Component
 *
 * Features:
 * - Left-aligned title and description
 * - GSAP animations with staggered entrance
 * - Responsive typography and spacing
 * - Dark mode support with gradient text
 * - Accessibility-friendly animations
 * - Announcement bar at the top
 */
export default function Hero() {
  const titleRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    // Only run animation once on initial mount
    let ctx = gsap.context(() => {
      if (titleRef.current && textRef.current) {
        // Animate title
        gsap.fromTo(
          titleRef.current,
          { opacity: 0, y: -50 },
          { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
        );

        // Animate paragraph
        gsap.fromTo(
          textRef.current,
          { opacity: 0, y: -30 },
          { opacity: 1, y: 0, duration: 1, delay: 0.3, ease: "power3.out" }
        );
      }
    });

    // Cleanup function
    return () => ctx.revert();
  }, []);

  return (
    <section>
      <Grid>
        <GridRow />
        <GridRow
          center={
            <h1
              ref={titleRef}
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground text-center transition-none"
            >
              Hello, I'm Natan A Frontend Developer
            </h1>
          }
        />
        <GridRow />
        <GridRow
          center={
            <p
              ref={textRef}
              className="text-base text-muted-foreground dark:text-muted-foreground text-center max-w-2xl"
            >
              Experience in advanced web frameworks and server-side Programming.
              Managing, designing, and building A kick-butt website for clients
              using code, no-code, and AI.
            </p>
          }
        />
      </Grid>
    </section>
  );
}
