import { getGSAP, getScrollTrigger } from "./gsap-client";
import { applyFromTo } from "./core";

export const inViewOnce = (el, animate, opts = {}) => {
  const gsap = getGSAP();
  const ScrollTrigger = getScrollTrigger();
  if (!gsap || !ScrollTrigger || !el) return null;

  const trigger = ScrollTrigger.create({
    trigger: el,
    start: opts.start ?? "top 85%",
    once: true,
    onEnter: () => {
      animate?.(el);
    },
  });

  return trigger;
};

export const parallax = (
  el,
  {
    yFrom = 50,
    yTo = -50,
    start = "top bottom",
    end = "bottom top",
    scrub = true,
    ...rest
  } = {}
) => {
  const ScrollTrigger = getScrollTrigger();
  if (!ScrollTrigger || !el) return null;
  const tween = applyFromTo(
    el,
    { y: yFrom, opacity: rest.opacityFrom ?? 1 },
    { y: yTo, opacity: rest.opacityTo ?? 1 },
    rest
  );
  tween.scrollTrigger = ScrollTrigger.create({
    trigger: el,
    start,
    end,
    scrub,
  });
  return tween;
};

export const safeRefresh = () => {
  const ScrollTrigger = getScrollTrigger();
  if (!ScrollTrigger) return;
  requestAnimationFrame(() => ScrollTrigger.refresh());
};
