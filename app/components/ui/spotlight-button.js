"use client";

import Link from "next/link";
import SpotlightBorder from "@/components/ui/spotlight-border";

/**
 * SpotlightButton
 *
 * A minimal button-style Link wrapped with SpotlightBorder to get the
 * cursor-follow border highlight. Uses the main border color by default.
 */
export default function SpotlightButton({
  href,
  text,
  className = "",
  borderColor = "hsl(var(--primary))",
  radiusClass = "rounded-2xl",
  target,
  rel,
  ariaLabel,
}) {
  const isExternal = target === "_blank";
  const relValue = isExternal ? rel || "noopener noreferrer" : rel;

  return (
    <SpotlightBorder
      borderColor={borderColor}
      radiusClass={radiusClass}
      className={`inline-block ${className}`}
    >
      <Link
        href={href}
        target={target}
        rel={relValue}
        aria-label={ariaLabel || text}
        className={`bg-background inline-flex items-center px-4 py-1 border border-border ${radiusClass} text-[13px] font-regular text-foreground hover:bg-accent focus:outline-none w-auto`}
      >
        <span className="whitespace-nowrap">{text}</span>
      </Link>
    </SpotlightBorder>
  );
}
