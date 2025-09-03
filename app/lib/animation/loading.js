import { getGSAP } from "./gsap-client";
import { NOOP_TWEEN } from "./reduced-motion";

export const spin = (
  el,
  { duration = 1, repeat = -1, ease = "linear" } = {}
) => {
  const gsap = getGSAP();
  if (!gsap || !el) return NOOP_TWEEN;
  return gsap.to(el, { rotate: 360, duration, ease, repeat });
};

export const progress = (el, { from = 0, to = 100, duration = 1 } = {}) => {
  const gsap = getGSAP();
  if (!gsap || !el) return NOOP_TWEEN;
  return gsap.fromTo(el, { width: `${from}%` }, { width: `${to}%`, duration });
};

export const morphing = (
  el,
  { values = [0.98, 1.02, 1], duration = 1.2 } = {}
) => {
  const gsap = getGSAP();
  if (!gsap || !el) return NOOP_TWEEN;
  return gsap.to(el, {
    scale: values,
    duration,
    repeat: -1,
    yoyo: true,
    ease: "power1.inOut",
  });
};

export const breathe = (
  el,
  { from = 0.98, to = 1.02, duration = 1.6 } = {}
) => {
  const gsap = getGSAP();
  if (!gsap || !el) return NOOP_TWEEN;
  return gsap.to(el, {
    scale: to,
    duration,
    repeat: -1,
    yoyo: true,
    ease: "power1.inOut",
  });
};
