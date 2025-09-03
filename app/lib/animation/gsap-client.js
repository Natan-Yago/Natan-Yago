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
