"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import ScrollReveal from "../components/ScrollReveal";
import SkeletonImage from "../components/SkeletonImage";

interface PolaroidData {
  id: number;
  image: string;
  caption: string;
  bgColor: string;
}

const polaroids: PolaroidData[] = [
  {
    id: 0,
    image: "/images/drone.png",
    caption: "Testing our first Autonomous drone",
    bgColor: "bg-neutral-100",
  },
  {
    id: 1,
    image: "/images/test.png",
    caption: "FPV Racing Setup",
    bgColor: "bg-neutral-50",
  },
  {
    id: 2,
    image: "/images/drone.png",
    caption: "Marine ROV Prototype",
    bgColor: "bg-stone-100",
  },
  {
    id: 3,
    image: "/images/test.png",
    caption: "Autonomous Mobile Robot",
    bgColor: "bg-zinc-100",
  },
];

// Random rotations for the back layers
const backRotations = [8, -5, 3, -7, 6, -3];
const backOffsets = [
  { x: 6, y: -4 },
  { x: -3, y: 3 },
  { x: 8, y: -2 },
  { x: -5, y: 5 },
  { x: 4, y: -6 },
  { x: -2, y: 2 },
];

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [hasDragged, setHasDragged] = useState(false);
  const dragStartPos = useRef({ x: 0, y: 0 });
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const clickHandled = useRef(false);
  const polaroidRef = useRef<HTMLDivElement>(null);
  
  // Motion values for drag - no constraints, free drag
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Track grab point for rotation based on where you grab
  const grabOffset = useRef({ x: 0, y: 0 });
  const polaroidSize = useRef({ width: 0, height: 0 });
  
  // Spring physics for smooth drag with recoil
  const springX = useSpring(x, { 
    stiffness: 100, 
    damping: 10,
    mass: 1.5,
    restDelta: 0.001 
  });
  const springY = useSpring(y, { 
    stiffness: 100, 
    damping: 10,
    mass: 1.5,
    restDelta: 0.001 
  });
  
  // Corner-based rotation: when you grab a corner, it rotates around that point
  const cornerRotate = useMotionValue(0);
  const springCornerRotate = useSpring(cornerRotate, { 
    stiffness: 60, 
    damping: 8,
    mass: 2,
  });
  
  // Velocity-based rotation for swing effect
  const velocityRotate = useMotionValue(0);
  const springVelocityRotate = useSpring(velocityRotate, {
    stiffness: 40,
    damping: 6,
    mass: 3,
  });
  
  // Combine rotations
  const totalRotation = useTransform(
    [springCornerRotate, springVelocityRotate],
    ([corner, velocity]) => (corner as number) + (velocity as number)
  );
  
  // Track mouse position relative to polaroid container
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePos({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);
  
  // Auto-cycle every 5 seconds
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % polaroids.length);
    }, 5000);
    
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);
  
  const cyclePolaroid = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % polaroids.length);
    // Reset timer on manual click
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % polaroids.length);
    }, 5000);
  }, []);
  
  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    dragStartPos.current = { x: e.clientX, y: e.clientY };
    clickHandled.current = false;
    setIsDragging(false);
    
    // Calculate grab point relative to polaroid center (normalized -1 to 1)
    if (polaroidRef.current) {
      const rect = polaroidRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      polaroidSize.current = { width: rect.width, height: rect.height };
      
      // Normalize to -1 (left/top) to 1 (right/bottom)
      grabOffset.current = {
        x: (e.clientX - centerX) / (rect.width / 2),
        y: (e.clientY - centerY) / (rect.height / 2),
      };
      
      // Apply initial corner rotation
      const cornerX = grabOffset.current.x;
      const cornerY = grabOffset.current.y;
      
      // Calculate rotation based on which corner/side was grabbed
      // Top-left corner → rotates counter-clockwise
      // Top-right corner → rotates clockwise
      // Bottom corners → opposite rotation
      const cornerRotation = (cornerX * cornerY * 15) + (cornerX * 8);
      cornerRotate.set(cornerRotation);
    }
  }, [cornerRotate]);
  
  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging) return;
    
    // Calculate velocity-based rotation (swing effect)
    const velocityX = e.movementX;
    const velocityY = e.movementY;
    
    // Swing in the direction of movement
    const swingRotation = velocityX * 0.8 + (velocityY * 0.3);
    velocityRotate.set(swingRotation);
    
    // Update corner rotation based on new position
    if (polaroidRef.current) {
      const rect = polaroidRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const currentOffsetX = (e.clientX - centerX) / (rect.width / 2);
      const currentOffsetY = (e.clientY - centerY) / (rect.height / 2);
      
      // Dynamic corner rotation that changes as you drag
      const dynamicRotation = (currentOffsetX * currentOffsetY * 20) + (currentOffsetX * 10);
      cornerRotate.set(dynamicRotation);
    }
  }, [isDragging, cornerRotate, velocityRotate]);
  
  const handlePointerUp = useCallback((e: React.PointerEvent) => {
    const dx = Math.abs(e.clientX - dragStartPos.current.x);
    const dy = Math.abs(e.clientY - dragStartPos.current.y);
    
    // If moved less than 5px, treat as click
    if (dx < 5 && dy < 5 && !isDragging && !clickHandled.current) {
      clickHandled.current = true;
      setCurrentIndex((prev) => (prev + 1) % polaroids.length);
      // Reset timer on manual click
      if (intervalRef.current) clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % polaroids.length);
      }, 5000);
    }
    setIsDragging(false);
    
    // Reset rotations with spring physics (recoil effect)
    cornerRotate.set(0);
    velocityRotate.set(0);
  }, [isDragging, cornerRotate, velocityRotate]);
  
  const handleDragStart = () => {
    setIsDragging(true);
    setHasDragged(true);
  };

  // Get visible polaroids (current + 3 back layers)
  const visiblePolaroids = [
    polaroids[currentIndex],
    polaroids[(currentIndex + 1) % polaroids.length],
    polaroids[(currentIndex + 2) % polaroids.length],
    polaroids[(currentIndex + 3) % polaroids.length],
  ];

  return (
    <section id="home" className="px-4 sm:px-8 md:px-16 lg:px-24 pt-32 sm:pt-40 pb-0 overflow-visible">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8 md:gap-10">
        <div className="max-w-2xl md:flex-1">
          <ScrollReveal direction="up" delay={0.1}>
            <h1
              className="text-3xl sm:text-4xl md:text-5xl font-normal text-white tracking-tight mb-2"
              style={{ fontFamily: "var(--font-domaine)", fontWeight: 400 }}
            >
              👋 Sawasdee, I&apos;m Nutt
            </h1>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.2}>
            <p
              className="text-neutral-500 text-sm mb-8"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              sa-wat-dee (/sa.wǎt.diː/), Thai for &quot;hello&quot;
            </p>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.3}>
            <p className="text-neutral-300 text-lg leading-relaxed mb-4">
              I&apos;m a{" "}
              <span className="text-white font-medium italic">
                developer, security researcher, designer and FPV pilot
              </span>
              <br />
              who enjoys building random things. including{" "}
              <span className="text-white font-medium italic">autonomous</span>
              <br />
              <span className="text-white font-medium italic">system.</span>
            </p>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.4}>
            <p className="text-neutral-300 text-lg leading-relaxed mb-4">
              From tools and bots to robotics and real world embedded
              <br />
              projects.
            </p>
          </ScrollReveal>
        </div>

        {/* Draggable Polaroid Stack - hidden on mobile */}
        <ScrollReveal direction="up" delay={0.5} className="hidden md:block">
          <div 
            ref={containerRef}
            className="relative w-full md:w-auto flex justify-center md:justify-start"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <motion.div
              ref={polaroidRef}
              drag
              dragMomentum={false}
              dragElastic={0.25}
              onDragStart={handleDragStart}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              style={{ 
                x: springX, 
                y: springY, 
                rotate: totalRotation,
                transformOrigin: `${50 + grabOffset.current.x * 30}% ${50 + grabOffset.current.y * 30}%`,
              }}
              whileHover={{ scale: 1.02 }}
              whileDrag={{ scale: 1.05, cursor: "grabbing" }}
              className="relative group cursor-grab active:cursor-grabbing touch-none select-none"
            >
              {/* Invisible full-size hit area for dragging */}
              <div 
                className="absolute inset-0 z-50 cursor-grab active:cursor-grabbing"
                style={{ 
                  top: '-40px', 
                  left: '-40px', 
                  right: '-40px', 
                  bottom: '-60px' 
                }}
              />

              {/* Floating hint that follows mouse */}
              {isHovering && !isDragging && !hasDragged && (
                <motion.div
                  className="absolute pointer-events-none z-50"
                  style={{
                    left: mousePos.x + 25,
                    top: mousePos.y - 50,
                  }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.15 }}
                >
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-neutral-800/90 backdrop-blur-sm rounded-full border border-neutral-700 shadow-lg">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-neutral-400">
                      <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <animate attributeName="d" values="M12 5V19M5 12H19;M12 8V16M8 12H16;M12 5V19M5 12H19" dur="1.5s" repeatCount="indefinite"/>
                      </path>
                    </svg>
                    <span className="text-neutral-300 text-xs font-medium whitespace-nowrap">Try dragging me</span>
                  </div>
                </motion.div>
              )}

              {/* Back layers - 3 polaroids peeking from behind */}
              {visiblePolaroids.slice(1).map((polaroid, i) => (
                <motion.div
                  key={`back-${polaroid.id}-${currentIndex}`}
                  className={`absolute w-64 sm:w-72 lg:w-[22rem] ${polaroid.bgColor} rounded-sm p-3 pb-4 shadow-lg pointer-events-none`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1,
                    rotate: backRotations[i],
                    x: backOffsets[i].x * 4,
                    y: backOffsets[i].y * 4,
                  }}
                  transition={{ type: "spring", stiffness: 200, damping: 20, delay: i * 0.05 }}
                  style={{ zIndex: 3 - i }}
                >
                  <div className="relative w-full aspect-square bg-neutral-300 overflow-hidden rounded-sm">
                    <Image
                      src={polaroid.image}
                      alt={polaroid.caption}
                      fill
                      className="object-cover opacity-40"
                      draggable={false}
                    />
                  </div>
                </motion.div>
              ))}

              {/* Main polaroid - current */}
              <motion.div 
                className={`relative w-64 sm:w-72 lg:w-[22rem] ${visiblePolaroids[0].bgColor} rounded-sm p-3.5 lg:p-4 pb-5 lg:pb-6 shadow-2xl z-10 pointer-events-none`}
                animate={{ 
                  rotate: [-2, 1, -1, 2][currentIndex % 4],
                }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
              >
                <div className="relative w-full aspect-square bg-neutral-200 overflow-hidden rounded-sm">
                  <SkeletonImage
                    src={visiblePolaroids[0].image}
                    alt={visiblePolaroids[0].caption}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    priority
                    draggable={false}
                  />
                </div>
                <p className="text-neutral-700 text-xs mt-3 text-center" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                  {visiblePolaroids[0].caption}
                </p>
                
                {/* Auto-cycle indicator */}
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex gap-1">
                  {polaroids.map((_, i) => (
                    <div 
                      key={i}
                      className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                        i === currentIndex ? 'bg-white scale-125' : 'bg-neutral-600'
                      }`}
                    />
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
