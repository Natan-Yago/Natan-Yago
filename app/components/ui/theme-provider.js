"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

/**
 * Enhanced Theme Provider using next-themes
 * 
 * Features:
 * - Prevents theme flickering on page load
 * - System preference detection with automatic updates
 * - Persistent theme storage
 * - Smooth theme transitions
 * - SSR compatibility without hydration mismatch
 */
export function ThemeProvider({ children, ...props }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange={false}
      storageKey="theme"
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}

// Re-export useTheme hook from next-themes for consistency
export { useTheme } from "next-themes";
