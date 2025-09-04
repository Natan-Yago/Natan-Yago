"use client";

import { useRef } from "react";
import { EnvelopeIcon } from "@heroicons/react/24/solid";
import ActionButton from "../ui/action-button";
import SpotlightBorder from "../ui/spotlight-border";
import Grid, { GridRow } from "../ui/grid";
import AnimatedInView from "@/app/components/ui/animated-in-view";

/**
 * Connect Section Component
 *
 * Features:
 * - Contact information and social links
 * - GSAP animations on scroll
 * - Spotlight border effect on hover
 * - Responsive design for mobile and desktop
 */
export default function Connect() {
  const titleRef = useRef(null);

  return (
    <section id="connect">
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
                    Connect
                  </h2>
                </AnimatedInView>
                <AnimatedInView
                  animation="fadeIn"
                  options={{ delay: 0.08 }}
                  blur
                  className="opacity-0"
                >
                  <ActionButton
                    href="mailto:natanyagodaev@gmail.com"
                    text="Email Me"
                    hoverText="Let's Chat"
                    icon={
                      <EnvelopeIcon className="h-3 w-3" aria-hidden="true" />
                    }
                  />
                </AnimatedInView>
              </div>
              <AnimatedInView
                animation="fadeIn"
                options={{ delay: 0.12 }}
                blur
                className="opacity-0 grid grid-cols-1  gap-8 lg:gap-5"
              >
                <SpotlightBorder
                  borderColor="hsl(var(--primary))"
                  spotlightSize="30% 40px"
                >
                  <div className="border border-border p-6 rounded-lg bg-background">
                    <p className="text-muted-foreground mb-6 text-sm md:max-w-[60%]">
                      I'm always open to discussing new projects, creative ideas
                      or opportunities. If it lives on the web, we can make it
                      happen.
                    </p>

                    <div className="space-y-4">
                      <div className="flex items-center">
                        <a
                          href="mailto:natanyagodaev@gmail.com"
                          className="text-sm font-regular text-foreground hover:text-primary transition-colors"
                        >
                          natanyagodaev@gmail.com
                        </a>
                      </div>
                      <div className="flex gap-3">
                        <a
                          href="https://linkedin.com/in/natanyagodaev"
                          className="text-foreground hover:text-primary transition-colors"
                          aria-label="LinkedIn Profile"
                          target="_blank"
                          rel="noopener"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                          </svg>
                        </a>
                        <a
                          href="https://github.com/natanyagodaev"
                          className="text-foreground hover:text-primary transition-colors"
                          aria-label="GitHub Profile"
                          target="_blank"
                          rel="noopener"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                          </svg>
                        </a>
                        <a
                          href="https://wa.me/972544775476"
                          className="text-foreground hover:text-primary transition-colors"
                          aria-label="WhatsApp"
                          target="_blank"
                          rel="noopener"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                </SpotlightBorder>
              </AnimatedInView>
            </>
          }
        />
        <GridRow />
      </Grid>
    </section>
  );
}
