import { applyTo } from "./core";

export const fadeOut = (el, opts) => applyTo(el, { opacity: 0 }, opts);
export const fadeOutUp = (el, opts) =>
  applyTo(el, { opacity: 0, y: -16 }, opts);
export const fadeOutDown = (el, opts) =>
  applyTo(el, { opacity: 0, y: 16 }, opts);
export const fadeOutLeft = (el, opts) =>
  applyTo(el, { opacity: 0, x: -16 }, opts);
export const fadeOutRight = (el, opts) =>
  applyTo(el, { opacity: 0, x: 16 }, opts);

export const slideOutUp = (el, opts) => applyTo(el, { y: -24 }, opts);
export const slideOutDown = (el, opts) => applyTo(el, { y: 24 }, opts);
export const slideOutLeft = (el, opts) => applyTo(el, { x: -24 }, opts);
export const slideOutRight = (el, opts) => applyTo(el, { x: 24 }, opts);

export const scaleOut = (el, opts) =>
  applyTo(el, { scale: 0.9, opacity: 0 }, opts);
export const zoomOut = (el, opts) =>
  applyTo(el, { scale: 0.8, opacity: 0 }, opts);
export const rotateOut = (el, opts) =>
  applyTo(el, { rotate: 8, opacity: 0 }, opts);
