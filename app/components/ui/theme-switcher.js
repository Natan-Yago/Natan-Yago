"use client";

import { useTheme } from "./theme-provider";
import { ComputerDesktopIcon, MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

/**
 * Enhanced Theme Switcher Component
 * 
 * Features:
 * - Three theme options: system, dark, light
 * - Smooth transitions between themes
 * - Proper hydration handling
 * - Accessible with ARIA labels and keyboard navigation
 * - Visual feedback for active theme
 */
export default function ThemeSwitcher() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render until mounted to prevent hydration issues
  if (!mounted) {
    return (
      <div className="flex items-center gap-1.5 rounded-full border border-border p-0.5 transform scale-90">
        <div className="p-1 rounded-full w-[26px] h-[26px]" />
        <div className="p-1 rounded-full w-[26px] h-[26px]" />
        <div className="p-1 rounded-full w-[26px] h-[26px]" />
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
    <div 
      className="flex items-center gap-2 rounded-full border border-border p-0.5 transform scale-90 transition-all duration-200 ease-in-out bg-background"
      role="radiogroup"
      aria-label="Theme selection"
    >
      {themes.map(({ name, icon: Icon, label }) => (
        <button
          key={name}
          onClick={() => setTheme(name)}
          className={`
            p-1 rounded-full transition-all duration-200 ease-in-out
            focus:outline-none cursor-pointer
            ${
              theme === name
                ? "bg-border shadow-sm scale-105"
                : "hover:scale-105"
            }
          `}
          aria-label={label}
          aria-pressed={theme === name}
          role="radio"
          tabIndex={0}
        >
          <Icon className={`h-[18px] w-[18px] transition-colors duration-200 ${theme === name ? 'text-foreground' : 'text-muted-foreground'}`} />
        </button>
      ))}
    </div>
  );
}
