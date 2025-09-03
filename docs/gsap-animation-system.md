## GSAP Modular Animation System for Next.js 15 (App Router)

This guide establishes a modular, extensible GSAP animation system tailored to this repository and stack. It includes SSR-safe usage patterns, reduced-motion compliance, Lenis + ScrollTrigger integration, category-based animation modules, hook and component APIs, and examples in existing sections.

Important: JavaScript-only implementation. Do not add .ts or .tsx files. Prefer JSDoc for IntelliSense. Any .d.ts mentioned in this guide is strictly optional and may be omitted.

### Table of Contents

- 1. Audit and prerequisites
- 2. Package and plugin setup
- 3. SSR and client-only usage rules
- 4. Reduced motion policy
- 5. Canonical config and types
- 6. Core tween helpers
- 7. ScrollTrigger utilities (Lenis-aware)
- 8. Entry animations module
- 9. Exit animations module
- 10. Attention/Emphasis module
- 11. Transform utilities
- 12. Text animations
- 13. Interactive/hover animations
- 14. Scroll-based patterns
- 15. Loading animations
- 16. Hook-based API
- 17. Component-based API
- 18. File organization and naming
- 19. Examples in sections
- 20. Accessibility and theming considerations
- 21. Performance checklist
- 22. Types and DX
- 23. Testing and verification
- 24. Final authoring

---

## 1) Audit and prerequisites

Rationale

- Confirm GSAP usage points and existing features to avoid duplication and ensure compatibility: App Router, client components with "use client", reduced-motion guard in `app/globals.css`, GSAP already used in UI/sections, Lenis + ScrollTrigger scrollerProxy configured, and `AnimatedInView` exists for once-only reveals.

What to do

- Verify that smooth scroll and ScrollTrigger proxy are already set (don’t re-register).
- Centralize animation helpers in `app/lib/animation/*`.
- Plan to standardize: `killTweensOf`, `will-change`, `overwrite:'auto'`, `immediateRender:true`, and cleanup via `clearProps`.

AI kickoff prompt

```
Scan the repo to confirm existing GSAP/ScrollTrigger usage, presence of Lenis scrollerProxy, and `AnimatedInView`. Propose where to place core animation helpers under `app/lib/animation/*` and any updates to `AnimatedInView` in `app/components/ui/animated-in-view.js`.
```

---

## 2) Package and plugin setup

Rationale

- Ensure `gsap` and `@gsap/react` are installed. Only register plugins once on the client: `ScrollTrigger`, `TextPlugin` (free). Avoid paid `SplitText`; use free alternatives.

File: `app/lib/animation/gsap-client.js`

```js
"use client";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";

let isRegistered = false;

export const getGSAP = () => {
  if (typeof window === "undefined") return null;
  if (!isRegistered) {
    gsap.registerPlugin(ScrollTrigger, TextPlugin);
    isRegistered = true;
  }
  return gsap;
};

export const getScrollTrigger = () => {
  const gsapInstance = getGSAP();
  return gsapInstance ? ScrollTrigger : null;
};
```

Notes

- If you need text splitting, prefer free options like `split-type` or manual split; avoid `SplitText` (paid) unless licensed.

AI kickoff prompt

```
Check/install `gsap` and `@gsap/react`. Draft `app/lib/animation/gsap-client.js` for one-time plugin registration guarded for client. Include ScrollTrigger and TextPlugin; document SplitText alternative.
```

---

## 3) SSR and client-only usage rules

Rationale

- GSAP touches the DOM; keep usage in client components. Use `@gsap/react`’s `useGSAP` and `gsap.context` to scope and clean up animations.

Snippet: Client-safe usage in a component

```js
"use client";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { getGSAP } from "app/lib/animation/gsap-client";

export default function Example() {
  const ref = useRef(null);

  useGSAP(() => {
    const gsap = getGSAP();
    if (!gsap || !ref.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(ref.current, { opacity: 0 }, { opacity: 1, duration: 0.6 });
    }, ref);

    return () => ctx.revert();
  }, []);

  return <div ref={ref}>Hello</div>;
}
```

Reduced motion guard

- Always check `prefers-reduced-motion` and skip non-essential animations.

AI kickoff prompt

```
Document SSR safety rules for GSAP in App Router, with examples using `useGSAP` and `gsap.context`, and a guard for `prefers-reduced-motion`.
```

---

## 4) Reduced motion policy

Rationale

- Respect users who prefer reduced motion by skipping animations or using instant state changes.

File: `app/lib/animation/reduced-motion.js`

```js
export const isReducedMotion = () => {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

export const NOOP_TWEEN = { kill: () => {} };

export const withMotionGuard = (fn) => {
  return (...args) => {
    if (isReducedMotion()) return NOOP_TWEEN;
    return fn(...args);
  };
};
```

Usage

- Core helpers and modules import `isReducedMotion` to skip/short-circuit animations.

AI kickoff prompt

```
Author a reduced-motion utility in `app/lib/animation/reduced-motion.js` exposing `isReducedMotion()` and a no-op wrapper. Show how to gate animations.
```

---

## 5) Canonical config and types

Rationale

JS-only note: This project is JavaScript-only. Prefer JSDoc for IntelliSense. The optional `app/lib/animation/types.d.ts` can be omitted. Do not create any .ts/.tsx files.

- Centralize durations, delays, easings and defaults; surface types for IntelliSense.

File: `app/lib/animation/config.js`

```js
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
```

File (ambient types): `app/lib/animation/types.d.ts`

```ts
export type AnimationDuration = "fast" | "normal" | "slow";
export type AnimationDelay = "immediate" | "short" | "medium" | "long";
export type AnimationEase =
  | "ease"
  | "easeIn"
  | "easeOut"
  | "easeInOut"
  | "bounce"
  | "elastic";

export interface AnimationOptions {
  duration?: AnimationDuration | number;
  delay?: AnimationDelay | number;
  ease?: AnimationEase | string;
  stagger?: number | GSAPStaggerVars;
  onComplete?: () => void;
}

export type EntryAnimation =
  | "fadeIn"
  | "fadeInUp"
  | "fadeInDown"
  | "fadeInLeft"
  | "fadeInRight"
  | "slideInUp"
  | "slideInDown"
  | "slideInLeft"
  | "slideInRight"
  | "scaleIn"
  | "zoomIn"
  | "rotateIn"
  | "flipInX"
  | "flipInY";

export type ExitAnimation =
  | "fadeOut"
  | "fadeOutUp"
  | "fadeOutDown"
  | "fadeOutLeft"
  | "fadeOutRight"
  | "slideOutUp"
  | "slideOutDown"
  | "slideOutLeft"
  | "slideOutRight"
  | "scaleOut"
  | "zoomOut"
  | "rotateOut";

export type AttentionAnimation =
  | "bounce"
  | "pulse"
  | "shake"
  | "wobble"
  | "flash"
  | "rubberBand"
  | "jello"
  | "heartbeat";

export type TransformAnimation =
  | "rotate"
  | "rotateX"
  | "rotateY"
  | "skewX"
  | "skewY"
  | "scaleX"
  | "scaleY"
  | "translateX"
  | "translateY";

export type TextAnimation =
  | "typewriter"
  | "textFadeIn"
  | "textSlideUp"
  | "textReveal"
  | "textSplit";

export type InteractiveAnimation =
  | "hoverLift"
  | "hoverScale"
  | "hoverRotate"
  | "hoverGlow"
  | "hoverTilt";

export type ScrollPattern =
  | "parallax"
  | "scrollFade"
  | "scrollScale"
  | "scrollSlide";

export type LoadingAnimation = "spin" | "progress" | "morphing" | "breathe";
```

AI kickoff prompt

```
Create `app/lib/animation/config.js` exporting duration/ease/delay maps and defaults; add `app/lib/animation/types.d.ts` with AnimationOptions/Category enums usable from JS.
```

---

## 6) Core tween helpers

Rationale

- Standardize setup/cleanup: `killTweensOf`, `will-change`, `overwrite:'auto'`, `immediateRender:true`, `clearProps` on complete. Reduced-motion shortcut.

File: `app/lib/animation/core.js`

```js
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

  const tween = gsap.fromTo(
    el,
    { ...fromVars },
    {
      ...toVars,
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
    }
  );

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

  const tween = gsap.from(el, {
    ...fromVars,
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
```

AI kickoff prompt

```
Implement `app/lib/animation/core.js` with `applyFromTo`, `applyTo`, `applyFrom` helpers that set will-change, kill tweens before starting, and clear styles on complete.
```

---

## 7) ScrollTrigger utilities (Lenis-aware)

Rationale

- Provide helpers to animate on viewport entry (once), parallax, and a safe refresh. Do not duplicate existing Lenis scrollerProxy; rely on provider-level setup.

File: `app/lib/animation/scroll.js`

```js
import { getGSAP, getScrollTrigger } from "./gsap-client";
import { applyFromTo, applyTo } from "./core";

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
```

AI kickoff prompt

```
Implement `app/lib/animation/scroll.js` exposing `inViewOnce(el, opts)`, `parallax(el, opts)`, and `safeRefresh()`. Use existing Lenis proxy assumptions.
```

---

## 8) Entry animations module

Rationale

- Provide common in-animations using `core` helpers and `config` defaults.

File: `app/lib/animation/entry.js`

```js
import { applyFromTo } from "./core";

const fromOpacity = { opacity: 0 };

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
```

AI kickoff prompt

```
Create `app/lib/animation/entry.js` implementing fadeIn, fadeInUp/Down/Left/Right, slideIn*, scaleIn, zoomIn, rotateIn, flipInX/Y using `core.js` helpers and config defaults.
```

---

## 9) Exit animations module

Rationale

- Mirror entry variants for exit transitions.

File: `app/lib/animation/exit.js`

```js
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
```

AI kickoff prompt

```
Create `app/lib/animation/exit.js` with fadeOut*, slideOut*, scaleOut, zoomOut, rotateOut, reusing config and `core.js`.
```

---

## 10) Attention/Emphasis module

Rationale

- Subtle, CPU-friendly emphasis patterns with automatic cleanup.

File: `app/lib/animation/attention.js`

```js
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
```

AI kickoff prompt

```
Create `app/lib/animation/attention.js` with bounce, pulse, shake, wobble, flash, rubberBand, jello, heartbeat; ensure CPU-friendly durations and clears.
```

---

## 11) Transform utilities

Rationale

- Lightweight transform wrappers.

File: `app/lib/animation/transform.js`

```js
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
```

AI kickoff prompt

```
Create `app/lib/animation/transform.js` providing rotate/rotateX/rotateY, skewX/Y, scaleX/Y, translateX/Y utilities wrapping `applyTo` with safe defaults.
```

---

## 12) Text animations

Rationale

- Use free `TextPlugin` and free splitting (manual or `split-type`). Avoid paid `SplitText`.

File: `app/lib/animation/text.js`

```js
import { getGSAP } from "./gsap-client";
import { applyFromTo, applyTo } from "./core";
import { isReducedMotion, NOOP_TWEEN } from "./reduced-motion";

export const typewriter = (el, { text, ...opts }) => {
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

// Free splitting fallback: wraps each character in a span.
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
```

AI kickoff prompt

```
Create `app/lib/animation/text.js` for typewriter, textFadeIn, textSlideUp, textReveal, textSplit using TextPlugin and a free splitting approach; include graceful fallback.
```

---

## 13) Interactive/hover animations

Rationale

- Provide hover/focus handlers with keyboard parity. Respect reduced motion.

File: `app/lib/animation/interactive.js`

```js
import { getGSAP } from "./gsap-client";
import { isReducedMotion } from "./reduced-motion";
import { applyTo } from "./core";

const buildHandlers = (enterTo, leaveTo) => {
  return (el, opts = {}) => {
    const onEnter = () => {
      if (!isReducedMotion()) applyTo(el, enterTo, opts);
    };
    const onLeave = () => {
      applyTo(el, leaveTo, { duration: "fast" });
    };
    const onKey = (e) => {
      if (e.key === "Enter" || e.key === " ") onEnter();
    };
    return {
      attach: () => {
        el.addEventListener("pointerenter", onEnter);
        el.addEventListener("pointerleave", onLeave);
        el.addEventListener("focus", onEnter);
        el.addEventListener("blur", onLeave);
        el.addEventListener("keydown", onKey);
      },
      detach: () => {
        el.removeEventListener("pointerenter", onEnter);
        el.removeEventListener("pointerleave", onLeave);
        el.removeEventListener("focus", onEnter);
        el.removeEventListener("blur", onLeave);
        el.removeEventListener("keydown", onKey);
      },
    };
  };
};

export const hoverLift = buildHandlers(
  { y: -4, boxShadow: "0 8px 24px rgba(0,0,0,0.08)" },
  { y: 0, boxShadow: "0 0 0 rgba(0,0,0,0)" }
);
export const hoverScale = buildHandlers({ scale: 1.03 }, { scale: 1 });
export const hoverRotate = buildHandlers({ rotate: 1 }, { rotate: 0 });
export const hoverGlow = buildHandlers(
  { boxShadow: "0 0 0 2px rgba(99,102,241,0.5)" },
  { boxShadow: "0 0 0 0 rgba(0,0,0,0)" }
);
export const hoverTilt = buildHandlers(
  { rotateX: 4, rotateY: -4, transformPerspective: 600 },
  { rotateX: 0, rotateY: 0 }
);
```

AI kickoff prompt

```
Create `app/lib/animation/interactive.js` with hoverLift/Scale/Rotate/Glow/Tilt returning attach/detach handlers for setup in components; include keyboard focus parity.
```

---

## 14) Scroll-based patterns

Rationale

- Offer common scroll-driven effects using `ScrollTrigger` (scrubbed or once-only).

File: `app/lib/animation/scroll-patterns.js`

```js
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
```

AI kickoff prompt

```
Create `app/lib/animation/scroll-patterns.js` implementing scrollFade, scrollScale, scrollSlide, parallax with configurable trigger/start/end/scrub.
```

---

## 15) Loading animations

Rationale

- Provide stoppable, GC-safe loaders (return a handle with `kill`).

File: `app/lib/animation/loading.js`

```js
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
```

AI kickoff prompt

```
Create `app/lib/animation/loading.js` with spin, progress, morphing, breathe, all stoppable and GC-safe.
```

---

## 16) Hook-based API

Rationale

- Thin wrappers over `@gsap/react` to encourage best practices: scoped context and dependency-driven reruns.

File: `app/lib/animation/hooks/use-animate.js`

```js
"use client";
import { useGSAP } from "@gsap/react";
import { getGSAP } from "../gsap-client";

export const useAnimate = (ref, fn, deps = []) => {
  useGSAP(() => {
    const gsap = getGSAP();
    if (!gsap || !ref?.current) return;
    const ctx = gsap.context(() => fn(ref.current, gsap), ref);
    return () => ctx.revert();
  }, deps);
};

export const useInView = (ref, fn, deps = []) => {
  useGSAP(() => {
    const gsap = getGSAP();
    if (!gsap || !ref?.current) return;
    const ctx = gsap.context(() => fn(ref.current, gsap), ref);
    return () => ctx.revert();
  }, deps);
};
```

AI kickoff prompt

```
Create `app/lib/animation/hooks/use-animate.js` exposing `useAnimate(ref, fn, deps)` and `useInView(ref, fn, deps)` showcasing best-practice usage.
```

---

## 17) Component-based API

Rationale

- Provide a simple `<AnimatedDiv>` that accepts `animation` name, `options`, and `as` prop, using entry defaults. Compose well with `AnimatedInView`.

File: `app/components/ui/animated-div.js`

```js
"use client";
import { forwardRef, useRef, useEffect } from "react";
import * as entry from "app/lib/animation/entry";
import { useAnimate } from "app/lib/animation/hooks/use-animate";

const animationMap = {
  fadeIn: entry.fadeIn,
  fadeInUp: entry.fadeInUp,
  fadeInDown: entry.fadeInDown,
  fadeInLeft: entry.fadeInLeft,
  fadeInRight: entry.fadeInRight,
  slideInUp: entry.slideInUp,
  slideInDown: entry.slideInDown,
  slideInLeft: entry.slideInLeft,
  slideInRight: entry.slideInRight,
  scaleIn: entry.scaleIn,
  zoomIn: entry.zoomIn,
  rotateIn: entry.rotateIn,
  flipInX: entry.flipInX,
  flipInY: entry.flipInY,
};

const AnimatedDiv = forwardRef(function AnimatedDiv(
  {
    as: Tag = "div",
    animation = "fadeIn",
    options = {},
    className = "",
    children,
    ...rest
  },
  ref
) {
  const localRef = useRef(null);
  const targetRef = ref ?? localRef;

  useAnimate(
    targetRef,
    (el) => {
      const fn = animationMap[animation] ?? entry.fadeIn;
      fn(el, options);
    },
    [animation, JSON.stringify(options)]
  );

  return (
    <Tag ref={targetRef} className={className} {...rest}>
      {children}
    </Tag>
  );
});

export default AnimatedDiv;
```

AI kickoff prompt

```
Create `app/components/ui/animated-div.js` (client) that accepts `animation`, `options`, and `as` prop; internally uses hook and `entry` defaults. Show how to compose with existing `AnimatedInView`.
```

---

## 18) File organization and naming

Rationale

- Ergonomic imports and tree-shaking via per-file modules and a barrel.

File: `app/lib/animation/index.js`

```js
export * as config from "./config";
export * as core from "./core";
export * as entry from "./entry";
export * as exit from "./exit";
export * as attention from "./attention";
export * as transform from "./transform";
export * as text from "./text";
export * as interactive from "./interactive";
export * as scroll from "./scroll";
export * as scrollPatterns from "./scroll-patterns";
export * as loading from "./loading";
export * as hooks from "./hooks/use-animate";
export { getGSAP, getScrollTrigger } from "./gsap-client";
```

AI kickoff prompt

```
Add `app/lib/animation/index.js` exporting all modules; document recommended import paths and tree-shaking notes.
```

---

## 19) Examples in sections

Rationale

- Demonstrate how to apply entry/scroll/interactive animations to existing sections and UI components.

Selected Projects: once-only entry for heading/button/cards (complements existing `AnimatedInView`)

```js
"use client";
import { useRef } from "react";
import AnimatedDiv from "app/components/ui/animated-div";
import { scrollPatterns } from "app/lib/animation";

export const SelectedProjectsHeader = () => {
  const ref = useRef(null);
  return (
    <AnimatedDiv
      ref={ref}
      animation="fadeInUp"
      options={{ duration: "normal" }}
      className="opacity-0"
    >
      <h2 className="text-2xl font-semibold">Selected Work</h2>
    </AnimatedDiv>
  );
};
```

ProjectCard hover

```js
"use client";
import { useEffect, useRef } from "react";
import { hoverLift } from "app/lib/animation/interactive";

export const ProjectCardHover = ({ children }) => {
  const ref = useRef(null);
  useEffect(() => {
    const ctrl = hoverLift(ref.current);
    ctrl.attach();
    return () => ctrl.detach();
  }, []);
  return (
    <div ref={ref} className="transition will-change-transform">
      {children}
    </div>
  );
};
```

Hero parallax sample

```js
"use client";
import { useRef } from "react";
import { parallax } from "app/lib/animation/scroll";
import { useAnimate } from "app/lib/animation/hooks/use-animate";

export const HeroParallax = () => {
  const ref = useRef(null);
  useAnimate(
    ref,
    (el) => {
      parallax(el, {
        yFrom: 40,
        yTo: -40,
        scrub: true,
        start: "top bottom",
        end: "bottom top",
      });
    },
    []
  );
  return <div ref={ref} className="h-64 bg-[var(--card)]" />;
};
```

AI kickoff prompt

```
Demonstrate usage in the sections: reveal headings/buttons/cards on scroll once; add hover to `ProjectCard`; show parallax sample in `hero.js`.
```

---

## 20) Accessibility and theming considerations

Rationale

- Interactive animations must have keyboard parity and ARIA safety. Avoid color-dependent cues; ensure dark/light work via CSS variables.

Guidance

- For interactive elements: ensure `tabIndex={0}` if not natively focusable, add `role="button"`, `aria-pressed` when toggled.
- Map hover effects to `focus`/`focus-visible` events.
- Avoid rapid flashing.
- Respect theme variables like `bg-background`, `text-foreground`, `border-border` in any custom styles.

AI kickoff prompt

```
Document A11y/theming guidance; update interactive utilities to include focus-visible equivalents and ARIA notes.
```

---

## 21) Performance checklist

Rationale

- Keep animations smooth and battery-friendly.

Checklist

- Use transforms and opacity; avoid layout-affecting properties.
- Add `will-change` hints and clear on complete.
- Always `killTweensOf` before starting new tweens on the same element.
- Use `overwrite: 'auto'` and `immediateRender: true` where helpful.
- Respect reduced motion.
- Avoid infinite timelines unless necessary; prefer event-driven animations.
- Call `safeRefresh()` after route transitions if ScrollTrigger-based animations depend on layout.

Next App Router tip

- In a client layout wrapper, call `safeRefresh()` on `usePathname()` change.

```js
"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { safeRefresh } from "app/lib/animation/scroll";

export default function RouteRefresh() {
  const pathname = usePathname();
  useEffect(() => {
    safeRefresh();
  }, [pathname]);
  return null;
}
```

AI kickoff prompt

```
Write a short performance checklist; wire `safeRefresh()` after route transitions if needed.
```

---

## 22) Types and DX

Rationale

- JavaScript-only: prefer JSDoc for IntelliSense; `.d.ts` files are optional; do not introduce `.ts`/`.tsx` files.

JSDoc example in `entry.js`

```js
/**
 * Fades element in from opacity 0 to 1.
 * @param {Element|Element[]} el
 * @param {import("./types").AnimationOptions} [opts]
 */
export const fadeIn = (el, opts) =>
  applyFromTo(el, { opacity: 0 }, { opacity: 1 }, opts);
```

AI kickoff prompt

```
Prefer JSDoc for IntelliSense in a JS-only codebase. If desired, add an optional `types.d.ts`; otherwise omit it.
```

---

## 23) Testing and verification

Rationale

- Verify across devices, themes, motion preferences, and navigation.

Manual QA matrix

- Devices: mobile, tablet, desktop
- Themes: light/dark
- Motion: reduced on/off
- Navigation: initial load, route change, back/forward
- Scroll-based: enter thresholds, scrub, refresh behavior

Optional E2E note (Playwright/Cypress)

- Assert element enters viewport and opacity/transform values change from initial to final.
- For once-only reveals, verify no re-trigger on subsequent scrolls.

AI kickoff prompt

```
Provide a QA checklist and a minimal Cypress/Playwright note for viewport-entry assertions (optional).
```

---

## 24) Final authoring

Acceptance checklist

- The MD file exists at `docs/gsap-animation-system.md` (this file).
- Guide includes all 24 steps with AI kickoff prompts and code snippets.
- Aligns with reduced motion, SSR safety, and existing Lenis proxy.
- No paid GSAP plugins required; text splitting alternatives documented.

- No `.ts`/`.tsx` source files introduced; optional `.d.ts` may be omitted.

AI kickoff prompt

```
Generate `/Users/rozi/Desktop/Natan-Yago/docs/gsap-animation-system.md` with all steps, code blocks, and links. Include a top-level TOC, Summary, and References.
```

---

## Summary

- Modular GSAP system defined under `app/lib/animation/*` with category modules, hooks, and a component API.
- SSR-safe patterns using `useGSAP` + `gsap.context`.
- Reduced-motion compliance and performance-first helpers.
- Examples integrated into sections and UI.

## References

- Setting up GSAP with Next.js (2025) — thomasaugot: [article](https://medium.com/@thomasaugot/setting-up-gsap-with-next-js-2025-edition-bcb86e48eab6)
- Optimizing GSAP in Next.js 15 — thomasaugot: [article](https://medium.com/@thomasaugot/optimizing-gsap-animations-in-next-js-15-best-practices-for-initialization-and-cleanup-2ebaba7d0232)
- GSAP ScrollTrigger with useGSAP in Next.js — guide: [article](https://medium.com/@ccjayanti/guide-to-using-gsap-scrolltrigger-in-next-js-with-usegsap-c48d6011f04a)
- Next + GSAP with Tailwind examples — dev.to: [article](https://dev.to/unnati_srivastava_0430094/creating-an-animated-website-using-gsap-with-nextjs-and-tailwind-css-55ab)
- Lenis + GSAP + Next.js example — GitHub: [repository](https://github.com/tnmod/lenis-gsap-nextjs-example)
