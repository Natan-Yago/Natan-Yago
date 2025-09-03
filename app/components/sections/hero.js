"use client";

import AnimatedDiv from "@/app/components/ui/animated-div";
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
  return (
    <section>
      <Grid>
        <GridRow />
        <GridRow
          center={
            <AnimatedDiv
              animation="fadeInUp"
              options={{ duration: "normal", delay: 0 }}
              blur
              className="opacity-0"
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground text-center transition-none">
                Hello, I'm Natan A Frontend Developer
              </h1>
            </AnimatedDiv>
          }
        />
        <GridRow />
        <GridRow
          center={
            <AnimatedDiv
              animation="fadeInUp"
              options={{ duration: "normal", delay: 0.15 }}
              blur
              className="opacity-0"
            >
              <p className="text-base text-muted-foreground dark:text-muted-foreground text-center max-w-2xl">
                Experience in advanced web frameworks and server-side
                Programming. Managing, designing, and building A kick-butt
                website for clients using code, no-code, and AI.
              </p>
            </AnimatedDiv>
          }
        />
      </Grid>
    </section>
  );
}
