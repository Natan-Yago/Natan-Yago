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
      {themes.map(({ name, icon: Icon, label }, idx) => {
        const selected = theme === name;
        return (
          <button
            key={name}
            onClick={() => setTheme(name)}
            onKeyDown={(e) => {
              if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                e.preventDefault();
                const next = themes[(idx + 1) % themes.length].name;
                setTheme(next);
              } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                e.preventDefault();
                const prev = themes[(idx - 1 + themes.length) % themes.length].name;
                setTheme(prev);
              } else if (e.key === ' ' || e.key === 'Enter') {
                e.preventDefault();
                setTheme(name);
              }
            }}
            className={`
              p-1 rounded-full transition-all duration-200 ease-in-out
              focus:outline-none cursor-pointer
              ${selected ? 'bg-border shadow-sm scale-105' : 'hover:scale-105'}
            `}
            aria-label={label}
            role="radio"
            aria-checked={selected}
            tabIndex={selected ? 0 : -1}
            data-selected={selected ? 'true' : undefined}
          >
            <Icon className={`h-[18px] w-[18px] transition-colors duration-200 ${selected ? 'text-foreground' : 'text-muted-foreground'}`} />
          </button>
        );
      })}
    </div>
  );
}
