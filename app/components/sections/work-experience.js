"use client";

import { useRef, useEffect } from "react";
import { BriefcaseIcon } from "@heroicons/react/24/solid";
import ActionButton from "../ui/action-button";
import SpotlightBorder from "../ui/spotlight-border";
import Grid, { GridRow } from "../ui/grid";
import AnimatedInView from "@/app/components/ui/animated-in-view";

export default function WorkExperience() {
  const titleRef = useRef(null);

  return (
    <section id="work-experience">
      <Grid>
        <GridRow
          centerMuted={true}
          center={
            <>
              <div className="flex justify-between items-center mb-10">
                <AnimatedInView animation="fadeIn" blur className="opacity-0">
                  <h2
                    ref={titleRef}
                    className="text-base text-foreground text-left max-w-2xl"
                  >
                    Experience
                  </h2>
                </AnimatedInView>
                <AnimatedInView
                  animation="fadeIn"
                  options={{ delay: 0.1 }}
                  blur
                  className="opacity-0"
                >
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
                </AnimatedInView>
              </div>
              <div className="grid grid-cols-1 gap-4 lg:gap-5">
                <AnimatedInView
                  animation="fadeInUp"
                  blur={3}
                  className="opacity-0"
                >
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
                </AnimatedInView>

                <AnimatedInView
                  animation="fadeInUp"
                  options={{ delay: 0.08 }}
                  blur={3}
                  className="opacity-0"
                >
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
                </AnimatedInView>
              </div>
            </>
          }
        />
        <GridRow />
      </Grid>
    </section>
  );
}
