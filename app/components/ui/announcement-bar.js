"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";

/**
 * AnnouncementBar Component
 * 
 * A promotional banner or announcement bar with glowing hover effect
 * 
 * @param {Object} props - Component props
 * @param {string} props.message - The message to display in the announcement bar
 * @param {string} [props.link] - URL to navigate to when the announcement is clicked
 * @param {React.ReactNode} [props.icon] - Optional icon to display after the text
 * @param {string} [props.className] - Additional CSS classes
 */
export default function AnnouncementBar({
  message,
  link = "#",
  icon = "→",
  className = ""
}) {
  const barRef = useRef(null);
  const glowRef = useRef(null);
  
  useEffect(() => {
    const bar = barRef.current;
    const glow = glowRef.current;
    
    if (!bar || !glow) return;
    
    // Initial state - subtle glow
    gsap.set(glow, { 
      opacity: 0.5,
      scale: 1
    });
    
    // Create hover animation
    const enterAnimation = () => {
      gsap.to(glow, {
        opacity: 0.8,
        scale: 1.03,
        duration: 0.5,
        ease: "power2.out"
      });
    };
    
    const leaveAnimation = () => {
      gsap.to(glow, {
        opacity: 0.5,
        scale: 1,
        duration: 0.5,
        ease: "power2.out"
      });
    };
    
    // Add event listeners
    bar.addEventListener('mouseenter', enterAnimation);
    bar.addEventListener('mouseleave', leaveAnimation);
    
    // Cleanup
    return () => {
      bar.removeEventListener('mouseenter', enterAnimation);
      bar.removeEventListener('mouseleave', leaveAnimation);
    };
  }, []);
  
  return (
    <Link 
      href={link}
      className={`block w-full ${className}`}
    >
      <div className="flex justify-center py-4">
        <div 
          ref={barRef}
          className="relative inline-flex items-center justify-center px-4 py-1 rounded-full bg-black text-white text-center text-sm font-medium transition-all duration-300 hover:scale-[1.02]"
        >
          {/* Glow effect */}
          <div 
            ref={glowRef}
            className="absolute inset-0 rounded-full bg-[#00ffa3] blur-[10px] -z-10"
            aria-hidden="true"
          ></div>
          
          {/* Border */}
          <div 
            className="absolute inset-0 rounded-full border border-[#00ffa3] z-0"
            aria-hidden="true"
          ></div>
          
          {/* Content */}
          <div className="flex items-center justify-center space-x-2 z-10">
            <span>{message}</span>
            <span className="text-[#00ffa3]">{icon}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
