"use client";

import Grid, { GridRow } from "@/components/ui/grid";
import SocialGrid from "@/components/ui/social-grid";
import SpotlightBorder from "@/components/ui/spotlight-border";
import AnimatedInView from "@/components/ui/animated-in-view";

const SKILLS = [
  "JavaScript",
  "CSS",
  "React",
  "Next.js",
  "MongoDB",
  "Tailwind",
  "GSAP",
  "WordPress",
  "Webflow",
  "Framer",
  "AEM",
  "Marketo",
];

export default function Skills() {
  return (
    <section id="skills">
      <Grid>
        <GridRow
          centerMuted={true}
          centerPadding="p-0"
          center={
            <AnimatedInView animation="fadeIn" blur className="opacity-0">
              <SocialGrid items={SKILLS} />
            </AnimatedInView>
          }
        />
        <GridRow />
      </Grid>
    </section>
  );
}
