"use client";

/**
 * Grid UI primitives built on top of the global 3-column grid classes.
 *
 * Usage patterns:
 * - <Grid> wraps a full section's grid rows
 * - <GridRow> renders exactly three grid cells (left/center/right)
 * - <GridCell> provides low-level control if you want to hand-build rows
 *
 * These components only compose CSS classes defined in globals.css and do not
 * introduce any layout behavior beyond class application.
 */

import React from "react";

const cx = (...classes) => classes.filter(Boolean).join(" ");

export default function Grid({ children, className = "", ...props }) {
  return (
    <div className={cx("grid-layout-3col", className)} {...props}>
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
  return (
    <>
      <div className={cx("grid-cell", leftClassName)}>{left}</div>
      <div
        className={cx(
          "grid-cell",
          centerMuted && "grid-cell-center-color",
          centerClassName
        )}
      >
        {center}
      </div>
      <div className={cx("grid-cell", rightClassName)}>{right}</div>
    </>
  );
}

export function GridCell({
  children,
  centerMuted = false,
  className = "",
  ...props
}) {
  return (
    <div
      className={cx(
        "grid-cell",
        centerMuted && "grid-cell-center-color",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
