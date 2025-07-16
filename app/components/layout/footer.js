"use client";

import ThemeSwitcher from "../ui/theme-switcher";

/**
 * Simple Footer Component
 * 
 * Features:
 * - 3-column grid layout (using grid-test.js structure)
 * - Footer content in center cell (cell 2)
 * - Copyright notice on the left
 * - Theme switcher on the right
 * - Dark mode support
 */
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-background mt-auto">
      <div>
        <div className="grid-layout-3col">
          {/* Row 1 - Footer content in center cell */}
          <div className="grid-cell"></div>
          <div className="grid-cell">
            {/* Footer content centered */}
            <div className="flex justify-between items-center pt-6">
              {/* Copyright notice - left side */}
              <p className="text-xs text-muted-foreground">
                {currentYear} Natan Yago. All rights reserved.
              </p>
              
              {/* Theme switcher - right side */}
              <ThemeSwitcher />
            </div>
          </div>
          <div className="grid-cell"></div>
        </div>
      </div>
    </footer>
  );
}
