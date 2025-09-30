"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import ProjectCard from "./project-card";
import AnimatedPagination from "./animated-pagination";

/**
 * Carousel (mobile-first one-column)
 *
 * - Auto-rotates through provided `projects` with blur/fade crossfade
 * - Renders a single ProjectCard at a time
 * - Has an AnimatedPagination beneath it with optional background images
 */
export default function Carousel({
  projects = [],
  intervalMs = 3000,
  backgroundImages = [],
  className = "",
  paginationFillColor,
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const currentRef = useRef(null);
  const prevRef = useRef(null);
  const timerRef = useRef(null);

  const safeProjects = useMemo(
    () => (Array.isArray(projects) ? projects : []),
    [projects]
  );
  const length = safeProjects.length;

  const nextIndex = useCallback(
    (idx) => (length === 0 ? 0 : (idx + 1) % length),
    [length]
  );

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (length <= 1) return;
    timerRef.current = setInterval(() => {
      setActiveIndex((i) => nextIndex(i));
    }, Math.max(1800, intervalMs));
  }, [intervalMs, length, nextIndex]);

  const stopTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = null;
  }, []);

  useEffect(() => {
    startTimer();
    return () => stopTimer();
  }, [startTimer, stopTimer]);

  // Crossfade + blur animation between prev and current
  const animateSwap = useCallback(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const prevEl = prevRef.current;
    const curEl = currentRef.current;
    if (!curEl) return;

    gsap.set(curEl, { opacity: 0, filter: "blur(10px)" });

    const tl = gsap.timeline();
    if (prevEl) {
      tl.to(prevEl, {
        opacity: 0,
        filter: "blur(10px)",
        duration: 0.4,
        ease: "power3.out",
      });
    }
    tl.to(
      curEl,
      { opacity: 1, filter: "blur(0px)", duration: 0.5, ease: "power3.out" },
      prevEl ? "<" : 0
    );

    return () => tl.kill();
  }, []);

  useEffect(() => {
    const cleanup = animateSwap();
    return () => cleanup && cleanup();
  }, [activeIndex, animateSwap]);

  const handleDotClick = useCallback(
    (i) => {
      stopTimer();
      setActiveIndex(i);
      startTimer();
    },
    [startTimer, stopTimer]
  );

  const prevProject = useMemo(() => {
    if (length <= 1) return null;
    const prevIdx = (activeIndex - 1 + length) % length;
    return safeProjects[prevIdx];
  }, [activeIndex, length, safeProjects]);

  const currentProject = safeProjects[activeIndex];

  return (
    <div className={`w-full ${className}`}>
      <div className="relative">
        {/* Previous (for crossfade) */}
        {prevProject && (
          <div className="absolute inset-0" ref={prevRef} aria-hidden="true">
            <ProjectCard project={prevProject} />
          </div>
        )}

        {/* Current */}
        <div ref={currentRef}>
          {currentProject && <ProjectCard project={currentProject} />}
        </div>
      </div>

      <AnimatedPagination
        className="mt-3"
        length={length}
        activeIndex={activeIndex}
        onDotClick={handleDotClick}
        durationMs={intervalMs}
        fillColor={paginationFillColor}
      />
    </div>
  );
}
