"use client";
import { forwardRef, useRef } from "react";
import * as entry from "@/app/lib/animation/entry";
import { useAnimate } from "@/app/lib/animation/hooks/use-animate";

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
    blur = false,
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
      const finalOptions = blur === false ? options : { ...options, blur };
      fn(el, finalOptions);
    },
    [animation, JSON.stringify(options), blur]
  );

  return (
    <Tag ref={targetRef} className={className} {...rest}>
      {children}
    </Tag>
  );
});

export default AnimatedDiv;
