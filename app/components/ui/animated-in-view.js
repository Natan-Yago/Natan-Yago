"use client";

import { useEffect, useRef } from "react";
import * as entry from "@/lib/animation/entry";

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

export default function AnimatedInView({
  as: Tag = "div",
  animation = "fadeInUp",
  options = {},
  blur = false,
  threshold = 0.2,
  rootMargin = "0px 0px -10% 0px",
  once = true,
  className = "",
  children,
  ...rest
}) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const fn = animationMap[animation] ?? entry.fadeInUp;
    const finalOptions = blur === false ? options : { ...options, blur };

    let hasTriggered = false;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((ent) => {
          if (ent.isIntersecting && !hasTriggered) {
            fn(el, finalOptions);
            if (once) {
              hasTriggered = true;
              observer.unobserve(el);
              observer.disconnect();
            }
          }
        });
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [animation, JSON.stringify(options), blur, threshold, rootMargin, once]);

  return (
    <Tag ref={ref} className={className} {...rest}>
      {children}
    </Tag>
  );
}
