"use client";

import Image from "next/image";
import Link from "next/link";
import ThemeSwitcher from "@/components/ui/theme-switcher";
import { useEffect, useRef, useState } from "react";
import MenuModal from "@/components/ui/menu-modal";
import AnimatedDiv from "@/components/ui/animated-div";
import * as entry from "@/lib/animation/entry";

const navItems = [
  { name: "Work", href: "/work" },
  { name: "Experience", href: "/#work-experience" },
  { name: "Connect", href: "/#connect" },
];

/**
 * Enhanced Header Component with Dark Mode Support
 *
 * Features:
 * - Responsive navigation with mobile menu
 * - Text-only menu button that switches between "Menu" and "Close"
 * - Dark mode support using CSS variables
 * - Sticky positioning with backdrop blur
 * - Accessible navigation with proper ARIA labels
 * - Theme switcher integration
 * - Smooth transitions for mobile menu
 */
export default function Header() {
  const [isHidden, setIsHidden] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const lastScrollYRef = useRef(0);
  const headerRef = useRef(null);
  const prevHiddenRef = useRef(false);

  useEffect(() => {
    lastScrollYRef.current = window.scrollY || 0;

    let ticking = false;
    const SCROLL_THRESHOLD = 6; // px to ignore tiny wobble

    const handleScroll = () => {
      if (isMenuOpen) return;
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        const currentY = window.scrollY || 0;
        const delta = currentY - lastScrollYRef.current;
        const absDelta = Math.abs(delta);

        if (absDelta > SCROLL_THRESHOLD) {
          if (currentY < 64) {
            // Near the top: always show
            setIsHidden(false);
          } else if (delta > 0) {
            // Scrolling down
            setIsHidden(true);
          } else {
            // Scrolling up
            setIsHidden(false);
          }

          lastScrollYRef.current = currentY;
        }

        ticking = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMenuOpen]);

  useEffect(() => {
    if (isMenuOpen) {
      setIsHidden(false);
    }
  }, [isMenuOpen]);

  // Fade+blur header when it reappears after being hidden (on scroll up)
  useEffect(() => {
    const wasHidden = prevHiddenRef.current;
    if (!isHidden && wasHidden && headerRef.current && !isMenuOpen) {
      entry.fadeIn(headerRef.current, { duration: "fast", blur: 6 });
    }
    prevHiddenRef.current = isHidden;
  }, [isHidden, isMenuOpen]);

  const handleToggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleCloseMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <header
        ref={headerRef}
        className={`sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md transition-colors duration-300 will-change-transform motion-safe:transition-transform ${
          isHidden ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        <div className="max-w-[37.5rem] mx-auto w-full px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo (left side) */}
            <div className="flex items-center">
              <AnimatedDiv animation="fadeIn" className="opacity-0">
                <Link href="/" className="flex items-center">
                  <Image
                    src="/ny.png"
                    alt="Logo"
                    width={36}
                    height={36}
                    className="h-9 w-auto rounded-full"
                  />
                </Link>
              </AnimatedDiv>
            </div>

            {/* Mobile menu button */}
            <div className="flex md:hidden">
              <AnimatedDiv animation="fadeIn" blur className="opacity-0">
                <button
                  type="button"
                  className="inline-flex items-center justify-center px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-colors duration-200 focus:outline-none"
                  aria-label={isMenuOpen ? "Close main menu" : "Open main menu"}
                  aria-expanded={isMenuOpen}
                  aria-controls="menu-modal"
                  onClick={handleToggleMenu}
                >
                  {isMenuOpen ? "Close" : "Menu"}
                </button>
              </AnimatedDiv>
            </div>

            {/* Desktop Navigation (center) */}
            <div className="hidden md:flex md:items-center md:justify-center md:flex-1">
              <nav
                className="flex"
                role="navigation"
                aria-label="Main navigation"
              >
                {navItems.map((item, index) => (
                  <AnimatedDiv
                    key={item.name}
                    animation="fadeIn"
                    options={{ delay: index * 0.08, duration: "fast" }}
                    className="opacity-0"
                  >
                    <Link
                      href={item.href}
                      className="text-muted-foreground hover:text-foreground px-3 py-2 text-sm font-medium rounded-md hover:bg-accent"
                    >
                      {item.name}
                    </Link>
                  </AnimatedDiv>
                ))}
              </nav>
            </div>

            {/* Theme Switcher (right side) - Hidden on mobile */}
            <div className="hidden md:flex items-center">
              <AnimatedDiv
                animation="fadeIn"
                options={{ delay: 0.16, duration: "fast" }}
                className="opacity-0"
              >
                <ThemeSwitcher />
              </AnimatedDiv>
            </div>
          </div>
        </div>
      </header>
      <MenuModal
        isOpen={isMenuOpen}
        onClose={handleCloseMenu}
        items={navItems}
        id="menu-modal"
      />
    </>
  );
}
