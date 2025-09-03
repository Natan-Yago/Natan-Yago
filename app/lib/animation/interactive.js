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
