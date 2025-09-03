import { getScrollTrigger } from "./gsap-client";
import { applyFromTo } from "./core";

export const scrollFade = (
  el,
  { start = "top 85%", once = true, ...opts } = {}
) => {
  const ScrollTrigger = getScrollTrigger();
  if (!ScrollTrigger || !el) return null;
  const tween = applyFromTo(el, { opacity: 0 }, { opacity: 1 }, opts);
  tween.scrollTrigger = ScrollTrigger.create({ trigger: el, start, once });
  return tween;
};

export const scrollScale = (
  el,
  { start = "top 85%", once = true, from = 0.9, to = 1, ...opts } = {}
) => {
  const ScrollTrigger = getScrollTrigger();
  if (!ScrollTrigger || !el) return null;
  const tween = applyFromTo(
    el,
    { scale: from, opacity: 0 },
    { scale: to, opacity: 1 },
    opts
  );
  tween.scrollTrigger = ScrollTrigger.create({ trigger: el, start, once });
  return tween;
};

export const scrollSlide = (
  el,
  { start = "top 85%", once = true, axis = "y", amount = 24, ...opts } = {}
) => {
  const ScrollTrigger = getScrollTrigger();
  if (!ScrollTrigger || !el) return null;
  const fromVars = axis === "x" ? { x: amount } : { y: amount };
  const tween = applyFromTo(
    el,
    { ...fromVars, opacity: 0 },
    { [axis]: 0, opacity: 1 },
    opts
  );
  tween.scrollTrigger = ScrollTrigger.create({ trigger: el, start, once });
  return tween;
};

export { parallax } from "./scroll";
