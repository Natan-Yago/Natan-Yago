"use client";

import React, { useRef, useState } from 'react';

/**
 * SpotlightBorder component
 * 
 * A reusable component that adds a spotlight border effect to any content
 * The spotlight follows the mouse cursor around the border
 * 
 * @param {ReactNode} children - The content to wrap with the spotlight border
 * @param {string} className - Additional classes to apply to the main container
 * @param {string} borderColor - Color of the spotlight border (default: "rgb(var(--accent))")
 * @param {string} spotlightSize - Size of the spotlight (default: "30% 30px")
 * @returns {JSX.Element}
 */
export default function SpotlightBorder({ 
  children, 
  className = "", 
  borderColor = "rgb(var(--accent))",
  spotlightSize = "30% 30px"
}) {
  const divRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e) => {
    if (!divRef.current) return;

    const div = divRef.current;
    const rect = div.getBoundingClientRect();

    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    <div className={`relative ${className}`}>
      <div 
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative z-10 rounded-lg"
      >
        {children}
      </div>
      <div
        ref={divRef}
        style={{
          border: `1px solid ${borderColor}`,
          opacity,
          WebkitMaskImage: `radial-gradient(${spotlightSize} at ${position.x}px ${position.y}px, black 45%, transparent)`,
          maskImage: `radial-gradient(${spotlightSize} at ${position.x}px ${position.y}px, black 45%, transparent)`
        }}
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 z-20 h-full w-full cursor-default rounded-lg border bg-transparent transition-opacity duration-500"
      />
    </div>
  );
}
