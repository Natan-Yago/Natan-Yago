"use client";

import { useRef, useEffect } from 'react';
import { gsap } from "gsap";
import { EnvelopeIcon, ArrowTopRightOnSquareIcon } from "@heroicons/react/24/solid";
import ActionButton from "../ui/action-button";
import SpotlightBorder from "../ui/spotlight-border";

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
  const contentRef = useRef(null);

  useEffect(() => {
    if (titleRef.current && contentRef.current) {
      // Animate title
      gsap.fromTo(titleRef.current, 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
      );
      
      // Animate content with slight delay
      gsap.fromTo(contentRef.current, 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.2, ease: "power3.out" }
      );
    }
    
    // Cleanup function
    return () => {
      if (titleRef.current) {
        gsap.killTweensOf(titleRef.current);
      }
      if (contentRef.current) {
        gsap.killTweensOf(contentRef.current);
      }
    };
  }, []);

  return (
    <section id="connect">
      <div className="grid-layout-3col">      
        {/* Row 1 */}
        <div className="grid-cell"></div>
        <div className="grid-cell grid-cell-center-color">
          <div className="flex justify-between items-center mb-10">
            <h2 
              ref={titleRef}
              className="text-base text-foreground text-left max-w-2xl"
            >
              Connect
            </h2>
            <ActionButton 
              href="mailto:natanyagodaev@gmail.com" 
              text="Email Me" 
              hoverText="Let's Chat" 
              icon={<EnvelopeIcon className="h-3 w-3" aria-hidden="true" />}
            />
          </div>
          
          <div ref={contentRef} className="grid grid-cols-1  gap-8 lg:gap-5">
            <SpotlightBorder borderColor="rgb(156, 156, 156)" spotlightSize="30% 40px">
              <div className="border border-border p-6 rounded-lg bg-background">
                {/* <h3 className="text-lg font-medium text-foreground mb-4">Get in Touch</h3> */}
                <p className="text-muted-foreground mb-6 text-sm">
                  I'm always open to discussing new projects, creative ideas or opportunities to be part of your vision.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-center">
                    <a href="mailto:natanyagodaev@gmail.com" className="text-sm font-regular text-foreground hover:text-primary transition-colors">
                      natanyagodaev@gmail.com
                    </a>
                  </div>
                  <div className="flex gap-3">
                    <a href="https://linkedin.com/in/natanyagodaev" className="text-foreground hover:text-primary transition-colors" aria-label="LinkedIn Profile">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                    </a>
                    <a href="https://github.com/natanyagodaev" className="text-foreground hover:text-primary transition-colors" aria-label="GitHub Profile">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
                    </a>
                  </div>
                </div>
              </div>
            </SpotlightBorder>

          </div>
        </div>
        <div className="grid-cell"></div>
      </div>
    </section>
  );
}
