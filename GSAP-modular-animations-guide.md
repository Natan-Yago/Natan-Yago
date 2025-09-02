## Modular GSAP Across the Project — Step-by-Step Guide for Cursor

This guide explains a modular, scalable approach to using GSAP in this Next.js App Router project. It breaks the work into small, Cursor-friendly steps with precise prompts, example snippets, and acceptance criteria.

### Goals

- Centralize GSAP setup and helpers
- Reuse simple hooks and wrappers across sections and UI
- Respect prefers-reduced-motion and clean up on unmount
- Keep components declarative and animation logic maintainable

### Project Assumptions

- Next.js 15 App Router, React 19
- TailwindCSS 4, theming via `next-themes`
- Client components guard with "use client"
- Current usage patterns: `gsap.fromTo`, `gsap.context`, cleanup on unmount

---

## Phase 0 — Preparation (no code changes yet)

- Identify target spots for refactor: `app/components/sections/hero.js`, `work-experience.js`, `connect.js`, `selected-projects.js`, and any UI button or card hover animations.
- Decide on three composition layers:
  - Hook-level: `useGsap` and `usePrefersReducedMotion`
  - Component wrappers: `AnimatedOnMount`, `AnimatedInView`
  - Section timelines: compose per-section sequences (optional presets)

Cursor prompt:

```
Scan all client components under app/components/** that import gsap. List each file and the animation effect(s) used (mount, hover, scroll, timeline), plus any cleanup pattern.
```

Acceptance: A short inventory list to scope the refactor.

---

## Phase 1 — Core Utilities (shared, no animations yet)

### 1.1 Create a central GSAP module

- File: `app/lib/gsap.js`
- Responsibilities:
  - Export `gsap` instance
  - Optionally register plugins (only if installed)
  - Provide a `createGsapContext` helper for safe setup/cleanup

Cursor prompt:

```
Create app/lib/gsap.js that exports gsap and a helper:
- export { gsap }
- export const createGsapContext = (scope, fn) => {
    let ctx = gsap.context(fn, scope);
    return () => ctx.revert();
  }
Do not register plugins yet.
```

### 1.2 Add reduced-motion detection

- File: `app/lib/use-prefers-reduced-motion.js`
- Hook returns a boolean flag; fall back to false on SSR

Cursor prompt:

```
Create app/lib/use-prefers-reduced-motion.js with a React hook that returns true when (prefers-reduced-motion: reduce). Guard for SSR and add an event listener to update on change.
```

Acceptance: Both files exist and export the expected symbols.

---

## Phase 2 — Reusable Hooks for Animations

### 2.1 `useGsap` — one hook to set up and clean up

- File: `app/lib/use-gsap.js`
- Signature:
  - `useGsap({ scopeRef, setup, deps = [] })`
  - Internally uses `createGsapContext` and returns nothing; handles cleanup

Cursor prompt:

```
Create app/lib/use-gsap.js that exports useGsap({ scopeRef, setup, deps = [] }).
Implementation:
- useEffect(() => createGsapContext(scopeRef.current, setup), deps)
- If scopeRef.current is falsy, early return
- Ensure the cleanup from createGsapContext is returned
```

### 2.2 `useMountAnimation` — convenience for mount-only effects

- File: `app/lib/use-mount-animation.js`
- Signature:
  - `useMountAnimation(scopeRef, animateFn)`
  - Calls `useGsap` once with empty deps

Cursor prompt:

```
Create app/lib/use-mount-animation.js that calls useGsap with the provided scopeRef and animateFn, running once on mount.
```

Acceptance: Hooks compile and can be imported.

---

## Phase 3 — Component Wrappers (Declarative)

### 3.1 `AnimatedOnMount`

- File: `app/components/ui/animated-on-mount.js`
- Props:
  - `as = 'div'`, `className`, `animate`, `children`
- Behavior:
  - Renders a wrapper element with a ref
  - Calls `useMountAnimation(ref, animate)`

Cursor prompt:

```
Create app/components/ui/animated-on-mount.js (client component) that wraps children, accepts an animate(ref, gsap) function, and runs it on mount using useMountAnimation.
```

### 3.2 `AnimatedInView` (optional without ScrollTrigger)

- File: `app/components/ui/animated-in-view.js`
- Props:
  - `as = 'div'`, `className`, `animateEnter`, `rootMargin = '0px 0px -10% 0px'`
- Behavior:
  - Uses `IntersectionObserver` to trigger `animateEnter(ref, gsap)` the first time it comes into view

Cursor prompt:

```
Create app/components/ui/animated-in-view.js (client) that uses IntersectionObserver to call animateEnter on first intersection. Clean up observer on unmount.
```

Acceptance: Both wrappers compile and can be used in any section.

---

## Phase 4 — Animation Presets (Reusability)

### 4.1 Preset functions

- File: `app/lib/animation-presets.js`
- Export small helpers like:
  - `fadeInUp(ref, gsap, { duration = 0.8, y = 30 } = {})`
  - `fadeScaleIn(ref, gsap, { duration = 0.6, scale = 0.95 } = {})`
- Each preset respects reduced motion: if reduced, set final state instantly

Cursor prompt:

```
Create app/lib/animation-presets.js exporting fadeInUp and fadeScaleIn functions. Each accepts (ref, gsap, options) and applies fromTo with sensible defaults and reduced-motion guard.
```

Acceptance: Importable presets that do not throw when ref is missing.

---

## Phase 5 — Refactor Example: `hero.js`

Goal: Replace inline gsap calls with the new hook and presets.

Cursor prompt (read-only first):

```
Open app/components/sections/hero.js and identify current refs and animations used for title and paragraph.
```

Cursor prompt (refactor plan):

```
Refactor hero.js to:
1) Import { gsap } from app/lib/gsap and { fadeInUp } from app/lib/animation-presets.
2) Replace useEffect + gsap.context with useGsap({ scopeRef, setup }) where scopeRef is a wrapper div around the section.
3) In setup, call fadeInUp on titleRef and textRef with small stagger.
4) Keep "use client" and preserve classes/styles.
```

Acceptance: Behavior functionally identical; code is shorter and centralized.

---

## Phase 6 — Refactor Other Sections

Targets: `work-experience.js`, `connect.js`, `selected-projects.js`.

Cursor prompt per file:

```
For FILE_PATH, replace local gsap setup with useMountAnimation or AnimatedOnMount as appropriate. Use fadeInUp preset for titles; for content blocks, use fadeScaleIn with small delay. Confirm cleanup is automatic.
```

Acceptance: Each section uses shared hooks/presets; no local gsap timelines unless needed for complex sequences.

---

## Phase 7 — Section Timelines (Complex Sequences, Optional)

Pattern: Build a per-section timeline when multiple elements need coordinated sequencing.

Implementation guidance:

- Use `useGsap` with a `setup` that:
  - Defines a `const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 0.8 } })`
  - Adds steps: `tl.fromTo(...)` elements in order with overlaps
  - Returns nothing; cleanup handled by context

Cursor prompt:

```
In work-experience.js, create a small timeline that animates section title, then each SpotlightBorder card with a 0.1s stagger. Use useGsap with a scopeRef wrapping the section content.
```

Acceptance: Smooth, coordinated entrance; no memory leaks.

---

## Phase 8 — Optional: Scroll-based Effects (No Plugin) or ScrollTrigger (If Added)

Without plugins:
- Use `IntersectionObserver` in `AnimatedInView` for simple enter-once effects.

With ScrollTrigger (optional library):
- If adding `gsap/ScrollTrigger`, register it in `app/lib/gsap.js` and create a helper `createScrollTrigger(ref, options)`.

Cursor prompt (optional):

```
Install gsap ScrollTrigger and wire it in app/lib/gsap.js (registerPlugin). Add a helper createScrollTrigger(ref, config) that guards for reduced motion and SSR.
```

Acceptance: Compiles locally; only used where truly necessary.

---

## Phase 9 — Accessibility and Reduced Motion

- Always check `usePrefersReducedMotion`; skip animated transitions and place elements directly in final state.
- Avoid parallax or continuous motion by default.
- Ensure focus states are visible and not obstructed by animations.

Cursor prompt:

```
Augment presets to read usePrefersReducedMotion and conditionally set immediate states (setTo) instead of animating.
```

Acceptance: No motion when the user opts out.

---

## Phase 10 — Performance & Cleanup

- Use `gsap.context` or the provided `createGsapContext` so cleanup is automatic.
- Keep timelines local to components; avoid global state.
- Prefer simple `fromTo` with minimal DOM queries; keep refs close to elements.
- Re-render safety: rely on `deps` arrays in `useGsap` to avoid unnecessary re-inits.

Cursor prompt:

```
Review useGsap and ensure it guards when scopeRef.current is null. Confirm all animations are created inside the context and no dangling listeners remain on unmount.
```

Acceptance: No console warnings, no memory leaks.

---

## Phase 11 — Migration Checklist

- Component has "use client" when using hooks
- Imports `gsap` only from `app/lib/gsap`
- Uses `useGsap` or wrappers instead of ad-hoc useEffect + gsap calls
- Uses presets for common fades/scales; timelines for complex sequences
- Respects reduced motion
- Cleans up automatically

Cursor prompt:

```
For each section (hero, selected-projects, work-experience, connect):
1) Switch to shared hooks/wrappers
2) Replace local gsap.fromTo calls with presets
3) Verify visual parity and no hydration issues
```

---

## Phase 12 — Example Usage Snippets (for reference only)

AnimatedOnMount with preset:

```jsx
"use client";
import AnimatedOnMount from "@/app/components/ui/animated-on-mount";
import { fadeInUp } from "@/app/lib/animation-presets";
import { gsap } from "@/app/lib/gsap";

export default function ExampleTitle() {
  return (
    <AnimatedOnMount
      as="h2"
      className="text-3xl font-bold text-center"
      animate={(ref) => fadeInUp(ref, gsap, { y: 24, duration: 0.7 })}
    >
      Section Title
    </AnimatedOnMount>
  );
}
```

useGsap with a small timeline:

```jsx
"use client";
import { useRef } from "react";
import { gsap } from "@/app/lib/gsap";
import useGsap from "@/app/lib/use-gsap";

export default function ExampleTimeline() {
  const scopeRef = useRef(null);
  const titleRef = useRef(null);
  const cardRefs = useRef([]);

  useGsap({
    scopeRef,
    setup: () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 0.6 } });
      tl.from(titleRef.current, { opacity: 0, y: 24 })
        .from(cardRefs.current, { opacity: 0, y: 16, stagger: 0.1 }, "-=0.2");
    },
    deps: [],
  });

  return (
    <div ref={scopeRef}>
      <h2 ref={titleRef}>Timeline Section</h2>
      {[0,1,2].map((i) => (
        <div key={i} ref={(el) => (cardRefs.current[i] = el)}>Card {i+1}</div>
      ))}
    </div>
  );
}
```

---

## Phase 13 — Rollout Strategy

1) Add core libs (Phase 1–2)
2) Convert `hero.js` (Phase 5)
3) Convert one section at a time (Phase 6)
4) Add timelines where helpful (Phase 7)
5) Optionally integrate ScrollTrigger (Phase 8)

Cursor prompt:

```
Implement Phases 1–2, then refactor hero.js per Phase 5. Pause and verify visual parity. After approval, continue with the remaining sections one by one.
```

---

## Appendix — Quick Prompts Library

- "Create central gsap module and reduced-motion hook per Phase 1."
- "Add useGsap and useMountAnimation hooks per Phase 2."
- "Create AnimatedOnMount and AnimatedInView wrappers per Phase 3."
- "Add fadeInUp and fadeScaleIn presets per Phase 4."
- "Refactor hero.js to use shared hooks/presets (Phase 5)."
- "Refactor work-experience/connect/selected-projects (Phase 6)."
- "Add timeline to work-experience with stagger (Phase 7)."
- "Integrate ScrollTrigger helper (optional, Phase 8)."

This plan keeps animations consistent, centralized, and easy to iterate on while respecting accessibility and project conventions.


