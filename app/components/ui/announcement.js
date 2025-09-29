"use client";

import { BoltIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import AnimatedDiv from "./animated-div";

/**
 * Announcement Component
 *
 * A pill-shaped announcement banner with animated gradient border
 * Supports light and dark themes with proper contrast
 */
export default function Announcement({
  text = "New snippets",
  actionText = "Read more",
  href = "#",
  className = "",
  ...props
}) {
  return (
    <AnimatedDiv
      animation="fadeInUp"
      options={{ duration: "normal", delay: 0 }}
      blur
      className={`opacity-0 ${className}`}
      {...props}
    >
      <a
        href={href}
        className="group inline-flex items-center gap-2 px-4 py-2 border border-border transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
        style={{
          borderRadius: "6.1875rem", // 99px in rem (99/16)
        }}
      >
        <span className="text-[14px] font-regular text-foreground">{text}</span>

        <BoltIcon className="w-4 h-4 text-yellow-500" />

        <span className="text-[14px] font-regular text-foreground">
          {actionText}
        </span>

        <ArrowRightIcon className="w-4 h-4 text-foreground transition-transform duration-200 group-hover:translate-x-0.5" />
      </a>
    </AnimatedDiv>
  );
}
