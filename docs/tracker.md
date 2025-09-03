## GSAP Modular Animation System — Tracker

This tracker provides a bird's-eye view of the modular GSAP animation system documentation and its implementation across the codebase.

### Scope

- Framework: Next.js 15 App Router (app/\*), React 19, Tailwind CSS 4
- Animations: GSAP core + ScrollTrigger (+ TextPlugin), Lenis scrollerProxy already configured
- Deliverables:
  - docs/gsap-animation-system.md (guide with 24 steps, code, prompts)
  - Category modules under `app/lib/animation/*` (when implemented)
  - Hook API and `<AnimatedDiv>` component

### Overall Status

- Documentation: Drafted in `docs/gsap-animation-system.md` (updated with JS-only rule)
- Implementation: Core library implemented (entry/exit/core/scroll/scroll-patterns/attention/transform/text/interactive/loading/hooks/component)

### How to use this tracker

- Each step has two statuses: Doc and Code. Update Code as you implement.
- Suggested values: Pending, In Progress, Done, N/A.

### Step Checklist (Doc / Code)

- [x] 1. Audit and prerequisites — Doc: Done / Code: Done
- [x] 2. Package and plugin setup — Doc: Done / Code: Done
- [x] 3. SSR and client-only usage rules — Doc: Done / Code: Done
- [x] 4. Reduced motion policy — Doc: Done / Code: Done
- [x] 5. Canonical config and types — Doc: Done / Code: Done (JS-only; .d.ts optional, omitted)
- [x] 6. Core tween helpers — Doc: Done / Code: Done
- [x] 7. ScrollTrigger utilities (Lenis-aware) — Doc: Done / Code: Done
- [x] 8. Entry animations module — Doc: Done / Code: Done
- [x] 9. Exit animations module — Doc: Done / Code: Done
- [x] 10. Attention/Emphasis module — Doc: Done / Code: Done
- [x] 11. Transform utilities — Doc: Done / Code: Done
- [x] 12. Text animations — Doc: Done / Code: Done
- [x] 13. Interactive/hover animations — Doc: Done / Code: Done
- [x] 14. Scroll-based patterns — Doc: Done / Code: Done
- [x] 15. Loading animations — Doc: Done / Code: Done
- [x] 16. Hook-based API — Doc: Done / Code: Done
- [x] 17. Component-based API — Doc: Done / Code: Done
- [x] 18. File organization and naming — Doc: Done / Code: Done
- [x] 19. Examples in sections — Doc: Done / Code: Pending
- [x] 20. Accessibility and theming considerations — Doc: Done / Code: Pending
- [x] 21. Performance checklist — Doc: Done / Code: Pending
- [x] 22. Types and DX — Doc: Done / Code: Done (JSDoc preferred; no TS)
- [x] 23. Testing and verification — Doc: Done / Code: Pending
- [x] 24. Final authoring — Doc: Done / Code: N/A

### Notes / Decisions Log

- Honor prefers-reduced-motion: non-essential animations should be skipped.
- Use once-only plugin registration guarded for client (app/lib/animation/gsap-client.js).
- Keep text splitting free (no paid SplitText); suggest SplitType or manual splitting.
- Do not duplicate existing Lenis scrollerProxy; rely on provider.

### Next Actions

- Wire example usages into `app/components/sections/*` and `app/components/ui/project-card.js`.
- Verify reduced-motion behavior and ScrollTrigger refresh on route changes.
