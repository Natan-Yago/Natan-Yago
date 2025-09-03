"use client";

import Grid, { GridRow } from "../ui/grid";
import SocialGrid from "../ui/social-grid";
import SpotlightBorder from "../ui/spotlight-border";
import AnimatedInView from "@/app/components/ui/animated-in-view";

const SKILLS = [
  "JavaScript",
  "CSS",
  "React",
  "Next.js",
  "Vue.js",
  "MongoDB",
  "Tailwind",
  "GSAP",
  "WordPress",
  "Webflow",
  "Framer",
  "AEM",
];

export default function Skills() {
  return (
    <section id="skills">
      <Grid>
        <GridRow
          centerClassName="grid-cell-center-color"
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
