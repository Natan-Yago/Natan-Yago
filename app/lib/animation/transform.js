import { applyTo } from "./core";

export const rotate = (el, deg, opts) => applyTo(el, { rotate: deg }, opts);
export const rotateX = (el, deg, opts) => applyTo(el, { rotateX: deg }, opts);
export const rotateY = (el, deg, opts) => applyTo(el, { rotateY: deg }, opts);
export const skewX = (el, deg, opts) => applyTo(el, { skewX: deg }, opts);
export const skewY = (el, deg, opts) => applyTo(el, { skewY: deg }, opts);
export const scaleX = (el, v, opts) => applyTo(el, { scaleX: v }, opts);
export const scaleY = (el, v, opts) => applyTo(el, { scaleY: v }, opts);
export const translateX = (el, v, opts) => applyTo(el, { x: v }, opts);
export const translateY = (el, v, opts) => applyTo(el, { y: v }, opts);
