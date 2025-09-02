"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { BriefcaseIcon } from "@heroicons/react/24/solid";
import ActionButton from "../ui/action-button";
import SpotlightBorder from "../ui/spotlight-border";
import Grid, { GridRow } from "../ui/grid";

/**
 * Experience Section Component
 *
 * Features:
 * - GSAP animations on scroll
 * - Dark mode support
 * - Responsive design for mobile and desktop
 */

export default function WorkExperience() {
  const titleRef = useRef(null);

  useEffect(() => {
    if (titleRef.current) {
      // Animate title
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
      );
    }

    // Cleanup function
    return () => {
      if (titleRef.current) {
        gsap.killTweensOf(titleRef.current);
      }
    };
  }, []);

  return (
    <section id="work-experience">
      <Grid>
        <GridRow
          center={
            <>
              <div className="flex justify-between items-center mb-10">
                <h2
                  ref={titleRef}
                  className="text-base text-foreground text-left max-w-2xl"
                >
                  Experience
                </h2>
                <ActionButton
                  href="/Natan-Yagodaev-cv.pdf"
                  text="View Resume"
                  hoverText="Check it out"
                  icon={
                    <BriefcaseIcon className="h-3 w-3" aria-hidden="true" />
                  }
                  target="_blank"
                  rel="noopener"
                />
              </div>
              <div className="grid grid-cols-1 gap-4 lg:gap-5">
                <SpotlightBorder
                  borderColor="hsl(var(--primary))"
                  spotlightSize="30% 40px"
                >
                  <div className="border border-border p-4 rounded-lg bg-background">
                    <div className="flex justify-between items-start">
                      <div className="flex items-start gap-4">
                        <div className="h-12 w-12 flex items-center justify-center">
                          <img
                            src="../images/logos/deloitte-favicon.webp"
                            alt="Deloitte logo"
                            className="h-full w-full object-contain"
                          />
                        </div>
                        <div>
                          <h3 className="text-foreground">Deloitte</h3>
                          <p className="text-muted-foreground sm:text-base text-xs">
                            Website Developer
                          </p>
                        </div>
                      </div>
                      <p className="text-muted-foreground sm:text-base text-xs">
                        2023 - Present
                      </p>
                    </div>
                  </div>
                </SpotlightBorder>

                <SpotlightBorder
                  borderColor="hsl(var(--primary))"
                  spotlightSize="30% 40px"
                >
                  <div className="border border-border p-4 rounded-lg bg-background">
                    <div className="flex justify-between items-start">
                      <div className="flex items-start gap-4">
                        <div className="h-12 w-12 flex items-center justify-center">
                          <img
                            src="../images/logos/terminal-x-favicon.webp"
                            alt="Terminal X logo"
                            className="h-full w-full object-contain"
                          />
                        </div>
                        <div>
                          <h3 className="text-foreground">Terminal X</h3>
                          <p className="text-muted-foreground sm:text-base text-xs">
                            Webmaster
                          </p>
                        </div>
                      </div>
                      <p className="text-muted-foreground sm:text-base text-xs">
                        2022 - 2023
                      </p>
                    </div>
                  </div>
                </SpotlightBorder>
              </div>
            </>
          }
        />
        <GridRow />
      </Grid>
    </section>
  );
}
