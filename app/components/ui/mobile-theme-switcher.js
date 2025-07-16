"use client";

import { useTheme } from "./theme-provider";
import { ComputerDesktopIcon, MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

/**
 * Mobile Floating Theme Switcher Component
 * 
 * Features:
 * - Floats at bottom center on mobile devices
 * - Identical styling to desktop version
 * - Three theme options: system, dark, light
 * - Smooth transitions and animations
 * - Proper hydration handling
 * - Accessible with ARIA labels
 * - Only visible on mobile (hidden on desktop)
 */
export default function MobileThemeSwitcher() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render until mounted to prevent hydration issues
  if (!mounted) {
    return (
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 md:hidden">
        <div className="flex items-center gap-1.5 rounded-full border border-gray-200 dark:border-gray-800 p-0.5 transform scale-90 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md">
          <div className="p-1 rounded-full w-[26px] h-[26px]" />
          <div className="p-1 rounded-full w-[26px] h-[26px]" />
          <div className="p-1 rounded-full w-[26px] h-[26px]" />
        </div>
      </div>
    );
  }

  const themes = [
    {
      name: "system",
      icon: ComputerDesktopIcon,
      label: "System theme",
    },
    {
      name: "dark",
      icon: MoonIcon,
      label: "Dark theme",
    },
    {
      name: "light",
      icon: SunIcon,
      label: "Light theme",
    },
  ];

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 md:hidden">
      <div 
        className="flex items-center gap-1.5 rounded-full border border-gray-200 dark:border-gray-800 p-0.5 transform scale-90 transition-all duration-200 ease-in-out bg-white/90 dark:bg-gray-900/90 backdrop-blur-md"
        role="radiogroup"
        aria-label="Theme selection"
      >
        {themes.map(({ name, icon: Icon, label }) => (
          <button
            key={name}
            onClick={() => setTheme(name)}
            className={`
              p-1 rounded-full transition-all duration-200 ease-in-out
              focus:outline-none
              ${
                theme === name
                  ? "bg-gray-100 dark:bg-gray-800 shadow-sm scale-105"
                  : "hover:bg-gray-100 dark:hover:bg-gray-800 hover:scale-105"
              }
            `}
            aria-label={label}
            aria-pressed={theme === name}
            role="radio"
            tabIndex={0}
          >
            <Icon className="h-[18px] w-[18px] text-gray-700 dark:text-gray-300 transition-colors duration-200" />
          </button>
        ))}
      </div>
    </div>
  );
}
