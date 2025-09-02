"use client";

import React from "react";

const cx = (...classes) => classes.filter(Boolean).join(" ");

// Tailwind-only 3-column grid
export default function Grid({ children, className = "", ...props }) {
  // Mobile-first columns then tighten at md+
  const base =
    "grid w-full gap-px bg-border border-b border-border grid-cols-[2.5fr_95fr_2.5fr] md:grid-cols-[1fr_minmax(auto,600px)_1fr]";
  return (
    <div className={cx(base, className)} {...props}>
      {children}
    </div>
  );
}

export function GridRow({
  left = null,
  center = null,
  right = null,
  centerMuted = false,
  centerClassName = "",
  leftClassName = "",
  rightClassName = "",
}) {
  const cell = "p-2 md:p-4 h-full bg-background";
  const centerBg = centerMuted ? "bg-[hsl(var(--muted))]" : "bg-background";
  return (
    <>
      <div className={cx(cell, leftClassName)}>{left}</div>
      <div className={cx(cell, centerBg, centerClassName)}>{center}</div>
      <div className={cx(cell, rightClassName)}>{right}</div>
    </>
  );
}

export function GridCell({
  children,
  centerMuted = false,
  className = "",
  ...props
}) {
  const cell = "p-2 md:p-4 h-full";
  const centerBg = centerMuted ? "bg-[hsl(var(--muted))]" : "";
  return (
    <div className={cx(cell, centerBg, className)} {...props}>
      {children}
    </div>
  );
}
