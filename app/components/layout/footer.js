"use client";

import ThemeSwitcher from "@/components/ui/theme-switcher";
import Grid, { GridRow } from "@/components/ui/grid";
import AnimatedInView from "@/components/ui/animated-in-view";

/**
 * Simple Footer Component
 *
 * Features:
 * - 3-column grid layout
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
              <div className="flex justify-between items-center">
                <AnimatedInView
                  animation="fadeIn"
                  blur
                  className="opacity-0"
                  threshold={0}
                  rootMargin="0px 0px 25% 0px"
                >
                  <p className="text-xs text-muted-foreground">
                    {currentYear} Natan Yago. All rights reserved.
                  </p>
                </AnimatedInView>
                <AnimatedInView
                  animation="fadeIn"
                  options={{ delay: 0.08 }}
                  blur
                  className="opacity-0"
                  threshold={0}
                  rootMargin="0px 0px 25% 0px"
                >
                  <ThemeSwitcher />
                </AnimatedInView>
              </div>
            }
          />
        </Grid>
      </div>
    </footer>
  );
}
