export const isReducedMotion = () => {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

export const NOOP_TWEEN = { kill: () => {} };

export const withMotionGuard = (fn) => {
  return (...args) => {
    if (isReducedMotion()) return NOOP_TWEEN;
    return fn(...args);
  };
};
