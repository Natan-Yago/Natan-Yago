"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ThemeSwitcher from "../ui/theme-switcher";

const navItems = [
  { name: "Projects", href: "#projects" },
  { name: "Work Experience", href: "#work-experience" },
  { name: "Connect", href: "#connect" },
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container-narrow">
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
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
            >
              <span className="sr-only">
                {mobileMenuOpen ? "Close main menu" : "Open main menu"}
              </span>
              {mobileMenuOpen ? "Close" : "Menu"}
            </button>
          </div>
          
          {/* Desktop Navigation (center) */}
          <div className="hidden md:flex md:items-center md:justify-center md:flex-1">
            <nav className="flex" role="navigation" aria-label="Main navigation">
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

      {/* Mobile menu */}
      <div 
        className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          mobileMenuOpen 
            ? "max-h-96 opacity-100" 
            : "max-h-0 opacity-0"
        }`}
        id="mobile-menu"
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-background/95 backdrop-blur-sm">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="block px-3 py-2 rounded-md text-base font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-colors duration-200"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
