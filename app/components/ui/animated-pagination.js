"use client";

import { useEffect, useMemo, useRef } from "react";
import { gsap } from "gsap";

/**
 * AnimatedPagination
 *
 * A compact, mobile-friendly pagination with an animated sliding pill
 * over a row of dots. Optionally renders a subtle animated image track
 * beneath the dots using two or more images.
 */
export default function AnimatedPagination({
  length = 3,
  activeIndex = 0,
  onDotClick,
  durationMs = 3000,
  fillColor = "hsl(var(--primary))",
  className = "",
}) {
  const dotsRefs = useMemo(
    () => Array.from({ length }, () => ({ current: null })),
    [length]
  );
  const fillsRefs = useMemo(
    () => Array.from({ length }, () => ({ current: null })),
    [length]
  );
  // No rotating ring; only fill animation

  // Animate active dot width and inner fill progress
  useEffect(() => {
    if (length === 0) return;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const baseW = 12; // px for inactive dot (w-3)
    const activeW = 24; // px for active dot (2x wider)

    // Reset all to base
    dotsRefs.forEach((ref, i) => {
      const el = ref.current;
      const fill = fillsRefs[i]?.current;
      if (!el) return;
      if (i !== activeIndex) {
        gsap.killTweensOf(el);
        gsap.set(el, { width: baseW });
      }
      if (fill) {
        gsap.killTweensOf(fill);
        gsap.set(fill, { width: 0 });
      }
    });

    const activeDot = dotsRefs[activeIndex]?.current;
    const activeFill = fillsRefs[activeIndex]?.current;
    if (!activeDot || !activeFill) return;

    if (prefersReduced) {
      gsap.set(activeDot, { width: activeW });
      gsap.set(activeFill, { width: "100%" });
      return;
    }

    gsap.to(activeDot, { width: activeW, duration: 0.25, ease: "power3.out" });
    gsap.fromTo(
      activeFill,
      { width: 0 },
      {
        width: "100%",
        duration: Math.max(1, durationMs / 1000),
        ease: "linear",
      }
    );
  }, [activeIndex, durationMs, dotsRefs, fillsRefs, length]);

  return (
    <div className={`w-full flex flex-col items-center ${className}`}>
      {/* Dots row with per-dot fill */}
      <div className="relative flex items-center gap-3 px-1 py-2">
        {Array.from({ length }).map((_, i) => (
          <button
            key={i}
            ref={(el) => (dotsRefs[i].current = el)}
            type="button"
            role="tab"
            aria-label={`Go to slide ${i + 1}`}
            aria-selected={activeIndex === i}
            tabIndex={0}
            onClick={() => onDotClick?.(i)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") onDotClick?.(i);
            }}
            className="relative h-2.5 rounded-full bg-[hsl(var(--border))] overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--primary))]"
            style={{ width: 12 }}
          >
            <span
              ref={(el) => (fillsRefs[i].current = el)}
              aria-hidden="true"
              className="absolute left-0 top-0 bottom-0 rounded-full"
              style={{ width: 0, backgroundColor: fillColor }}
            />
            {/* Border-only look handled by base bg; no rotating ring */}
          </button>
        ))}
      </div>
    </div>
  );
}
