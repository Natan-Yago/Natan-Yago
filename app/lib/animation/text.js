import { getGSAP } from "./gsap-client";
import { applyFromTo, applyTo } from "./core";
import { isReducedMotion, NOOP_TWEEN } from "./reduced-motion";

export const typewriter = (el, { text, ...opts } = {}) => {
  const gsap = getGSAP();
  if (!gsap || !el) return NOOP_TWEEN;
  if (isReducedMotion()) {
    el.textContent = text ?? el.textContent;
    return NOOP_TWEEN;
  }
  return applyTo(el, { text: { value: text ?? el.textContent } }, opts);
};

export const textFadeIn = (el, opts) =>
  applyFromTo(el, { opacity: 0 }, { opacity: 1 }, opts);
export const textSlideUp = (el, opts) =>
  applyFromTo(el, { opacity: 0, y: 12 }, { opacity: 1, y: 0 }, opts);

export const textReveal = (
  el,
  { clipFrom = "inset(0 100% 0 0)", clipTo = "inset(0 0% 0 0)", ...opts } = {}
) => {
  const gsap = getGSAP();
  if (!gsap || !el) return NOOP_TWEEN;
  gsap.set(el, { overflow: "hidden" });
  return applyFromTo(el, { clipPath: clipFrom }, { clipPath: clipTo }, opts);
};

export const textSplit = (
  el,
  { by = "chars", animate = true, stagger = 0.02, ...opts } = {}
) => {
  const gsap = getGSAP();
  if (!gsap || !el) return NOOP_TWEEN;
  const text = el.textContent ?? "";
  const parts = by === "words" ? text.split(/(\s+)/) : Array.from(text);
  el.innerHTML = parts
    .map((p) => `<span class="inline-block will-change-auto">${p}</span>`)
    .join("");
  if (!animate || isReducedMotion()) return NOOP_TWEEN;
  const spans = el.querySelectorAll("span");
  return applyFromTo(
    spans,
    { opacity: 0, y: 8 },
    { opacity: 1, y: 0 },
    { stagger, ...opts }
  );
};
