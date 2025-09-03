import { applyFromTo } from "./core";

const fromOpacity = { opacity: 0 };

/** Fades element in from opacity 0 to 1. */
export const fadeIn = (el, opts) =>
  applyFromTo(el, fromOpacity, { opacity: 1 }, opts);

export const fadeInUp = (el, opts) =>
  applyFromTo(el, { opacity: 0, y: 16 }, { opacity: 1, y: 0 }, opts);
export const fadeInDown = (el, opts) =>
  applyFromTo(el, { opacity: 0, y: -16 }, { opacity: 1, y: 0 }, opts);
export const fadeInLeft = (el, opts) =>
  applyFromTo(el, { opacity: 0, x: -16 }, { opacity: 1, x: 0 }, opts);
export const fadeInRight = (el, opts) =>
  applyFromTo(el, { opacity: 0, x: 16 }, { opacity: 1, x: 0 }, opts);

export const slideInUp = (el, opts) =>
  applyFromTo(el, { y: 24 }, { y: 0 }, opts);
export const slideInDown = (el, opts) =>
  applyFromTo(el, { y: -24 }, { y: 0 }, opts);
export const slideInLeft = (el, opts) =>
  applyFromTo(el, { x: -24 }, { x: 0 }, opts);
export const slideInRight = (el, opts) =>
  applyFromTo(el, { x: 24 }, { x: 0 }, opts);

export const scaleIn = (el, opts) =>
  applyFromTo(el, { scale: 0.9, opacity: 0 }, { scale: 1, opacity: 1 }, opts);
export const zoomIn = (el, opts) =>
  applyFromTo(el, { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1 }, opts);
export const rotateIn = (el, opts) =>
  applyFromTo(el, { rotate: -8, opacity: 0 }, { rotate: 0, opacity: 1 }, opts);
export const flipInX = (el, opts) =>
  applyFromTo(
    el,
    { rotateX: -90, opacity: 0, transformPerspective: 600 },
    { rotateX: 0, opacity: 1 },
    opts
  );
export const flipInY = (el, opts) =>
  applyFromTo(
    el,
    { rotateY: -90, opacity: 0, transformPerspective: 600 },
    { rotateY: 0, opacity: 1 },
    opts
  );
