export const DURATIONS = {
  fast: 0.3,
  normal: 0.6,
  slow: 1.0,
};

export const DELAYS = {
  immediate: 0,
  short: 0.15,
  medium: 0.3,
  long: 0.6,
};

export const EASES = {
  ease: "power2.out",
  easeIn: "power2.in",
  easeOut: "power2.out",
  easeInOut: "power2.inOut",
  bounce: "bounce.out",
  elastic: "elastic.out(1, 0.5)",
};

export const DEFAULTS = {
  duration: DURATIONS.normal,
  delay: DELAYS.immediate,
  ease: EASES.ease,
};
