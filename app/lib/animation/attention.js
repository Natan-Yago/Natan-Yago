import { getGSAP } from "./gsap-client";
import { isReducedMotion, NOOP_TWEEN } from "./reduced-motion";

const quick = { duration: 0.6, ease: "power2.out" };

export const bounce = (el) => {
  const gsap = getGSAP();
  if (!gsap || !el || isReducedMotion()) return NOOP_TWEEN;
  return gsap.to(el, { y: -8, yoyo: true, repeat: 1, ...quick });
};

export const pulse = (el) => {
  const gsap = getGSAP();
  if (!gsap || !el || isReducedMotion()) return NOOP_TWEEN;
  return gsap.to(el, { scale: 1.05, yoyo: true, repeat: 1, ...quick });
};

export const shake = (el) => {
  const gsap = getGSAP();
  if (!gsap || !el || isReducedMotion()) return NOOP_TWEEN;
  return gsap.to(el, {
    x: 8,
    repeat: 5,
    yoyo: true,
    duration: 0.05,
    ease: "power1.inOut",
  });
};

export const wobble = (el) => {
  const gsap = getGSAP();
  if (!gsap || !el || isReducedMotion()) return NOOP_TWEEN;
  return gsap.to(el, {
    rotate: 3,
    repeat: 3,
    yoyo: true,
    duration: 0.1,
    ease: "power1.inOut",
  });
};

export const flash = (el) => {
  const gsap = getGSAP();
  if (!gsap || !el || isReducedMotion()) return NOOP_TWEEN;
  return gsap.to(el, { opacity: 0.4, yoyo: true, repeat: 1, duration: 0.15 });
};

export const rubberBand = (el) => {
  const gsap = getGSAP();
  if (!gsap || !el || isReducedMotion()) return NOOP_TWEEN;
  return gsap
    .timeline()
    .to(el, { scaleX: 1.25, scaleY: 0.75, duration: 0.15 })
    .to(el, { scaleX: 0.75, scaleY: 1.25, duration: 0.15 })
    .to(el, { scaleX: 1.15, scaleY: 0.85, duration: 0.12 })
    .to(el, { scaleX: 1, scaleY: 1, duration: 0.12 });
};

export const jello = (el) => {
  const gsap = getGSAP();
  if (!gsap || !el || isReducedMotion()) return NOOP_TWEEN;
  return gsap
    .timeline()
    .to(el, { skewX: 12, duration: 0.12 })
    .to(el, { skewX: -10, duration: 0.12 })
    .to(el, { skewX: 6, duration: 0.1 })
    .to(el, { skewX: 0, duration: 0.1 });
};

export const heartbeat = (el) => {
  const gsap = getGSAP();
  if (!gsap || !el || isReducedMotion()) return NOOP_TWEEN;
  return gsap
    .timeline()
    .to(el, { scale: 1.05, duration: 0.1 })
    .to(el, { scale: 1, duration: 0.1 })
    .to(el, { scale: 1.05, duration: 0.12 })
    .to(el, { scale: 1, duration: 0.12 });
};
