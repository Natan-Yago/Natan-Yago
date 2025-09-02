"use client";

import Image from "next/image";
import Link from "next/link";
import ThemeSwitcher from "../ui/theme-switcher";
import { useEffect, useRef, useState } from "react";
import MenuModal from "../ui/menu-modal";

const navItems = [
  { name: "Work", href: "/work" },
  { name: "Work Experience", href: "/#work-experience" },
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

  const handleToggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleCloseMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md transition-colors duration-300 will-change-transform motion-safe:transition-transform ${
          isHidden ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        <div className="max-w-[37.5rem] mx-auto w-full px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo (left side) */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <Image
                  src="/ny.png"
                  alt="Logo"
                  width={36}
                  height={36}
                  className="h-9 w-auto rounded-full"
                />
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="flex md:hidden">
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
            </div>

            {/* Desktop Navigation (center) */}
            <div className="hidden md:flex md:items-center md:justify-center md:flex-1">
              <nav
                className="flex"
                role="navigation"
                aria-label="Main navigation"
              >
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-muted-foreground hover:text-foreground px-3 py-2 text-sm font-medium rounded-md hover:bg-accent"
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Theme Switcher (right side) - Hidden on mobile */}
            <div className="hidden md:flex items-center">
              <ThemeSwitcher />
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
