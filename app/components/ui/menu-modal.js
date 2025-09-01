"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { gsap } from "gsap";

/**
 * MenuModal
 * Full-viewport responsive menu with GSAP entrance/exit animations.
 * Header stays visible by keeping modal z-index below header (z-40 vs z-50 header).
 */
export default function MenuModal({ isOpen, onClose, items = [], id }) {
  const [isDisplayed, setIsDisplayed] = useState(false);
  const backdropRef = useRef(null);
  const panelRef = useRef(null);
  const tlRef = useRef(null);

  const prefersReducedMotion = useRef(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      prefersReducedMotion.current = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
    }
  }, []);

  const animateIn = useCallback(() => {
    if (prefersReducedMotion.current) {
      gsap.set(backdropRef.current, { opacity: 1, pointerEvents: "auto" });
      gsap.set(panelRef.current, { y: 0, opacity: 1 });
      return;
    }
    const tl = gsap.timeline();
    tl.set(backdropRef.current, { opacity: 0, pointerEvents: "auto" })
      .set(panelRef.current, { y: 20, opacity: 0 })
      .to(
        backdropRef.current,
        { opacity: 1, duration: 0.2, ease: "power1.out" },
        0
      )
      .to(
        panelRef.current,
        { y: 0, opacity: 1, duration: 0.3, ease: "power2.out" },
        0.05
      );
    tlRef.current = tl;
  }, []);

  const animateOut = useCallback((onComplete) => {
    if (prefersReducedMotion.current) {
      gsap.set(backdropRef.current, { opacity: 0, pointerEvents: "none" });
      gsap.set(panelRef.current, { y: 20, opacity: 0 });
      onComplete?.();
      return;
    }
    const tl = gsap.timeline({ onComplete });
    tl.to(
      panelRef.current,
      { y: 20, opacity: 0, duration: 0.2, ease: "power2.in" },
      0
    )
      .to(
        backdropRef.current,
        { opacity: 0, duration: 0.2, ease: "power1.in" },
        0.05
      )
      .set(backdropRef.current, { pointerEvents: "none" });
    tlRef.current = tl;
  }, []);

  useEffect(() => {
    if (isOpen) {
      setIsDisplayed(true);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isDisplayed) return;

    if (isOpen) {
      animateIn();
      // Move focus to first link after opening for a11y
      const timeout = setTimeout(() => {
        const firstLink = panelRef.current?.querySelector("a, button");
        if (firstLink) firstLink.focus();
      }, 50);
      return () => clearTimeout(timeout);
    }

    animateOut(() => setIsDisplayed(false));
  }, [isDisplayed, isOpen, animateIn, animateOut]);

  useEffect(() => {
    if (!isDisplayed) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        onClose?.();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isDisplayed, onClose]);

  if (!isDisplayed) return null;

  const handleBackdropClick = (e) => {
    if (e.target === backdropRef.current) {
      onClose?.();
    }
  };

  return (
    <div
      ref={backdropRef}
      id={id}
      className="fixed inset-0 z-40 bg-background/90 backdrop-blur-md pointer-events-none"
      onMouseDown={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-label="Main menu"
    >
      <div
        ref={panelRef}
        className="fixed left-0 right-0 top-16 bottom-0 overflow-y-auto"
      >
        <nav className="h-full w-full flex flex-col items-center justify-center gap-6 p-6">
          {items.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-2xl md:text-3xl text-foreground hover:text-accent-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              onClick={onClose}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
