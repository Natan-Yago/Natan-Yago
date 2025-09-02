"use client";

import ThemeSwitcher from "../ui/theme-switcher";
import Grid, { GridRow } from "../ui/grid";

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
        <Grid>
          <GridRow
            center={
              <div className="flex justify-between items-center pt-6">
                <p className="text-xs text-muted-foreground">
                  {currentYear} Natan Yago. All rights reserved.
                </p>
                <ThemeSwitcher />
              </div>
            }
          />
        </Grid>
      </div>
    </footer>
  );
}
