"use client";
import { useGSAP } from "@gsap/react";
import { getGSAP } from "../../animation/gsap-client";

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
