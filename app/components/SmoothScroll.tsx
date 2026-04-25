"use client";

import { useEffect, useRef } from "react";

interface SmoothScrollOptions {
  lerp?: number;
  wheelMultiplier?: number;
  touchMultiplier?: number;
}

export default function SmoothScrollProvider({
  children,
  options = {},
}: {
  children: React.ReactNode;
  options?: SmoothScrollOptions;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollY = useRef(0);
  const targetY = useRef(0);
  const isTouch = useRef(false);
  const rafId = useRef<number>(0);

  const {
    lerp = 0.1,
    wheelMultiplier = 0.8,
    touchMultiplier = 1.5,
  } = options;

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    
    // Check for touch device
    isTouch.current = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    
    if (isTouch.current) {
      // On touch devices, use native smooth scroll with CSS
      html.style.scrollBehavior = "smooth";
      return;
    }

    // Disable native scroll
    html.style.overflow = "hidden";
    html.style.height = "100%";
    body.style.overflow = "hidden";
    body.style.height = "100%";

    const content = scrollRef.current;
    if (!content) return;

    // Set body height to match content
    const updateBodyHeight = () => {
      body.style.height = `${content.scrollHeight}px`;
    };
    
    updateBodyHeight();
    
    // Resize observer for dynamic content
    const resizeObserver = new ResizeObserver(updateBodyHeight);
    resizeObserver.observe(content);

    // Wheel handler
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      targetY.current += e.deltaY * wheelMultiplier;
      
      // Clamp to bounds
      const maxScroll = content.scrollHeight - window.innerHeight;
      targetY.current = Math.max(0, Math.min(targetY.current, maxScroll));
    };

    // Keyboard handler
    const handleKeyDown = (e: KeyboardEvent) => {
      const scrollAmount = 100;
      const maxScroll = content.scrollHeight - window.innerHeight;
      
      switch (e.key) {
        case "ArrowDown":
        case "PageDown":
          e.preventDefault();
          targetY.current = Math.min(targetY.current + scrollAmount, maxScroll);
          break;
        case "ArrowUp":
        case "PageUp":
          e.preventDefault();
          targetY.current = Math.max(targetY.current - scrollAmount, 0);
          break;
        case "Home":
          e.preventDefault();
          targetY.current = 0;
          break;
        case "End":
          e.preventDefault();
          targetY.current = maxScroll;
          break;
        case " ":
          e.preventDefault();
          if (e.shiftKey) {
            targetY.current = Math.max(targetY.current - window.innerHeight * 0.8, 0);
          } else {
            targetY.current = Math.min(targetY.current + window.innerHeight * 0.8, maxScroll);
          }
          break;
      }
    };

    // Animation loop
    const animate = () => {
      // Smooth interpolation
      scrollY.current += (targetY.current - scrollY.current) * lerp;
      
      // Apply transform
      content.style.transform = `translate3d(0, ${-scrollY.current}px, 0)`;
      
      // Update scroll position for other components
      window.scrollTo(0, scrollY.current);
      
      rafId.current = requestAnimationFrame(animate);
    };

    // Start animation
    rafId.current = requestAnimationFrame(animate);

    // Add listeners
    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      cancelAnimationFrame(rafId.current);
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleKeyDown);
      resizeObserver.disconnect();
      
      // Reset styles
      html.style.overflow = "";
      html.style.height = "";
      body.style.overflow = "";
      body.style.height = "";
      html.style.scrollBehavior = "";
    };
  }, [lerp, wheelMultiplier]);

  // On touch devices, just render children normally
  if (typeof window !== "undefined" && ("ontouchstart" in window || navigator.maxTouchPoints > 0)) {
    return <>{children}</>;
  }

  return (
    <div
      ref={scrollRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        willChange: "transform",
      }}
    >
      {children}
    </div>
  );
}
