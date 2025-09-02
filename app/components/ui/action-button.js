"use client";

import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";

/**
 * ActionButton Component
 *
 * A reusable button component that can be used for navigation with customizable icon and text
 * With GSAP animation for text slide effect on hover
 *
 * @param {Object} props - Component props
 * @param {string} props.href - The URL to navigate to
 * @param {string} props.text - The button text
 * @param {string} props.hoverText - The text to display on hover (defaults to same as text)
 * @param {React.ReactNode} props.icon - The icon component to display
 * @param {string} props.iconPosition - Position of the icon, either 'left' or 'right' (default: 'right')
 * @param {string} props.className - Additional CSS classes
 * @param {Object} props.rest - Any additional props to pass to the Link component
 */
export default function ActionButton({
  href,
  text,
  hoverText = text,
  icon,
  iconPosition = "right",
  className = "",
  ...rest
}) {
  const buttonRef = useRef(null);
  const textContainerRef = useRef(null);
  const defaultTextRef = useRef(null);
  const hoverTextRef = useRef(null);
  const [maxWidth, setMaxWidth] = useState(0);

  useEffect(() => {
    const button = buttonRef.current;
    const defaultText = defaultTextRef.current;
    const hoverText = hoverTextRef.current;

    // Set initial positions
    gsap.set(hoverText, { y: "100%", opacity: 0 });

    // Create animations but don't play them yet
    const tl = gsap.timeline({ paused: true });
    tl.to(
      defaultText,
      { y: "-100%", opacity: 0, duration: 0.3, ease: "power2.inOut" },
      0
    ).to(
      hoverText,
      { y: "0%", opacity: 1, duration: 0.3, ease: "power2.inOut" },
      0
    );

    // Event handlers
    const handleMouseEnter = () => {
      tl.play();
    };

    const handleMouseLeave = () => {
      tl.reverse();
    };

    // Add event listeners
    if (button) {
      button.addEventListener("mouseenter", handleMouseEnter);
      button.addEventListener("mouseleave", handleMouseLeave);
    }

    // Cleanup
    return () => {
      if (button) {
        button.removeEventListener("mouseenter", handleMouseEnter);
        button.removeEventListener("mouseleave", handleMouseLeave);
      }
      tl.kill();
    };
  }, []);

  useEffect(() => {
    const textContainer = textContainerRef.current;
    const defaultText = defaultTextRef.current;
    const hoverText = hoverTextRef.current;

    if (!textContainer || !defaultText || !hoverText) return;

    // Reset any previously set widths
    textContainer.style.width = "auto";
    defaultText.style.width = "auto";
    hoverText.style.width = "auto";

    // Get initial width of default text
    const defaultWidth = defaultText.offsetWidth;
    const hoverWidth = hoverText.offsetWidth;

    // Determine the maximum width to use for both states
    const newMaxWidth = Math.max(defaultWidth, hoverWidth);
    setMaxWidth(newMaxWidth);

    // Set fixed width for both states
    textContainer.style.width = `${newMaxWidth}px`;
  }, [text, hoverText]);

  return (
    <Link
      ref={buttonRef}
      href={href}
      className={`bg-background inline-flex items-center px-4 py-1 border border-border rounded-2xl text-[13px] font-regular text-foreground hover:bg-accent focus:outline-none w-auto ${className}`}
      role="button"
      aria-label={text}
      {...rest}
    >
      {icon && iconPosition === "left" && (
        <span className="mr-2 flex-shrink-0">{icon}</span>
      )}
      <div
        className="relative overflow-hidden transition-none"
        ref={textContainerRef}
      >
        <div ref={defaultTextRef} className="whitespace-nowrap block">
          {text}
        </div>
        <div
          className="absolute top-0 left-0 whitespace-nowrap block opacity-0 translate-y-full"
          ref={hoverTextRef}
        >
          {hoverText}
        </div>
      </div>
      {icon && iconPosition === "right" && (
        <span className="ml-2 flex-shrink-0">{icon}</span>
      )}
    </Link>
  );
}
