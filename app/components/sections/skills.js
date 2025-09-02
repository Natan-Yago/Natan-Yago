"use client";

import Grid, { GridRow } from "../ui/grid";
import SocialGrid from "../ui/social-grid";
import SpotlightBorder from "../ui/spotlight-border";

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
          center={<SocialGrid items={SKILLS} />}
        />
        <GridRow />
      </Grid>
    </section>
  );
}
