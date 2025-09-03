import { getGSAP } from "./gsap-client";
import { DURATIONS, DELAYS, EASES, DEFAULTS } from "./config";
import { isReducedMotion, NOOP_TWEEN } from "./reduced-motion";

const resolveDuration = (d) =>
  typeof d === "number" ? d : DURATIONS[d] ?? DEFAULTS.duration;
const resolveDelay = (d) =>
  typeof d === "number" ? d : DELAYS[d] ?? DEFAULTS.delay;
const resolveEase = (e) =>
  typeof e === "string" && EASES[e] ? EASES[e] : e || DEFAULTS.ease;

const setWillChange = (gsap, el, props = "transform, opacity, filter") => {
  gsap.set(el, { willChange: props });
};

const clearHints = (gsap, el) => {
  gsap.set(el, { clearProps: "willChange,filter" });
};

export const applyFromTo = (el, fromVars, toVars, opts = {}) => {
  const gsap = getGSAP();
  if (!gsap || !el) return NOOP_TWEEN;
  if (isReducedMotion()) {
    gsap.set(el, { ...toVars });
    return NOOP_TWEEN;
  }

  gsap.killTweensOf(el);
  setWillChange(gsap, el);

  // Optional blur support: opts.blur can be boolean or number (pixels)
  const blurValue =
    typeof opts.blur === "number" ? opts.blur : opts.blur ? 4 : 0;

  // Ensure the filter string contains a blur() with the given px, replacing if exists
  const ensureBlur = (filterStr, px) => {
    const base = filterStr || "";
    const blurSnippet = `blur(${px}px)`;
    const regex = /blur\([^\)]*\)/;
    if (regex.test(base)) return base.replace(regex, blurSnippet);
    return base ? `${base} ${blurSnippet}` : blurSnippet;
  };

  const fromWith = { ...fromVars };
  const toWith = { ...toVars };
  if (blurValue > 0) {
    fromWith.filter = ensureBlur(fromWith.filter, blurValue);
    toWith.filter = ensureBlur(toWith.filter, 0);
  }

  const tween = gsap.fromTo(el, fromWith, {
    ...toWith,
    duration: resolveDuration(opts.duration),
    delay: resolveDelay(opts.delay),
    ease: resolveEase(opts.ease),
    overwrite: "auto",
    immediateRender: true,
    onComplete: () => {
      clearHints(gsap, el);
      opts.onComplete?.();
    },
    stagger: opts.stagger,
  });

  return tween;
};

export const applyTo = (el, toVars, opts = {}) => {
  const gsap = getGSAP();
  if (!gsap || !el) return NOOP_TWEEN;
  if (isReducedMotion()) {
    gsap.set(el, { ...toVars });
    return NOOP_TWEEN;
  }

  gsap.killTweensOf(el);
  setWillChange(gsap, el);

  const tween = gsap.to(el, {
    ...toVars,
    duration: resolveDuration(opts.duration),
    delay: resolveDelay(opts.delay),
    ease: resolveEase(opts.ease),
    overwrite: "auto",
    onComplete: () => {
      clearHints(gsap, el);
      opts.onComplete?.();
    },
    stagger: opts.stagger,
  });

  return tween;
};

export const applyFrom = (el, fromVars, opts = {}) => {
  const gsap = getGSAP();
  if (!gsap || !el) return NOOP_TWEEN;
  if (isReducedMotion()) return NOOP_TWEEN;

  gsap.killTweensOf(el);
  setWillChange(gsap, el);

  const blurValue =
    typeof opts.blur === "number" ? opts.blur : opts.blur ? 4 : 0;
  const fromWith = { ...fromVars };
  if (blurValue > 0) {
    const blurPart = `blur(${blurValue}px)`;
    fromWith.filter = fromWith.filter?.includes("blur(")
      ? fromWith.filter.replace(/blur\([^\)]*\)/, blurPart)
      : (fromWith.filter ? `${fromWith.filter} ` : "") + blurPart;
  }

  const tween = gsap.from(el, {
    ...fromWith,
    duration: resolveDuration(opts.duration),
    delay: resolveDelay(opts.delay),
    ease: resolveEase(opts.ease),
    overwrite: "auto",
    immediateRender: true,
    onComplete: () => {
      clearHints(gsap, el);
      opts.onComplete?.();
    },
    stagger: opts.stagger,
  });

  return tween;
};
