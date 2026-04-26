"use client";

import { useRef, useEffect, useState, useMemo } from "react";
import ScrollReveal from "../components/ScrollReveal";

const allAwards = [
  "🥇 1st Place @ The Essential Soft Skill @ Chulalongkorn university",
  "🥈 Sliver Award Best Innovation @ WSYII at Kuala Lumpur, Malaysia",
  "🥇 Best Project proposal @ AYC2025 ASEAN Youth Camp",
  "Qualified for TICTA as finalist @ Microsoft Thailand",
  "Qualifed for KMUTNB @ KMUTNB INNOVATIVE AWARDS",
  "Qualified for Capital Market Hackathon as Finalist @ Stock Exchange of Thailand[SET]",
  "🥈 2nd place in Innovative Projects @ MRC Robotics",
];

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function ScrollRow({
  direction,
  children,
}: {
  direction: "left" | "right";
  children: React.ReactNode;
}) {
  const rowRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const row = rowRef.current;
    if (!row) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = row.getBoundingClientRect();
      const fadeWidth = window.innerWidth >= 768 ? 192 : 128;
      const x = e.clientX - rect.left;

      const inLeftFade = x < fadeWidth;
      const inRightFade = x > rect.width - fadeWidth;
      setIsPaused(inLeftFade || inRightFade);
    };

    const handleMouseLeave = () => {
      setIsPaused(false);
    };

    row.addEventListener("mousemove", handleMouseMove);
    row.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      row.removeEventListener("mousemove", handleMouseMove);
      row.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={rowRef}
      className={`flex whitespace-nowrap ${
        direction === "left" ? "animate-scroll-left" : "animate-scroll-right"
      } ${isPaused ? "![animation-play-state:paused]" : ""}`}
    >
      {children}
    </div>
  );
}

export default function Awards() {
  // Generate shuffled arrays for each row - stable across re-renders
  const row1Awards = useMemo(() => {
    const shuffled = shuffleArray(allAwards);
    return [...shuffled, ...shuffled, ...shuffled, ...shuffled, ...shuffled, ...shuffled];
  }, []);

  const row2Awards = useMemo(() => {
    const shuffled = shuffleArray(allAwards);
    return [...shuffled, ...shuffled, ...shuffled, ...shuffled, ...shuffled, ...shuffled];
  }, []);

  const row3Awards = useMemo(() => {
    const shuffled = shuffleArray(allAwards);
    return [...shuffled, ...shuffled, ...shuffled, ...shuffled, ...shuffled, ...shuffled];
  }, []);

  return (
    <section className="px-4 sm:px-8 md:px-16 lg:px-24 py-12 sm:py-16 overflow-hidden">
      <ScrollReveal direction="up">
        <h2
          className="text-3xl sm:text-4xl md:text-5xl font-normal text-white tracking-tight mb-6 sm:mb-10 text-center"
          style={{ fontFamily: "var(--font-domaine-condensed)" }}
        >
          Awards &amp; Recognitions
        </h2>
      </ScrollReveal>

      <div className="flex flex-col gap-6 relative">
        {/* Left fade overlay */}
        <div className="absolute left-0 top-0 bottom-0 w-32 md:w-48 bg-gradient-to-r from-black via-black/80 to-transparent z-10 pointer-events-none" />
        {/* Right fade overlay */}
        <div className="absolute right-0 top-0 bottom-0 w-32 md:w-48 bg-gradient-to-l from-black via-black/80 to-transparent z-10 pointer-events-none" />

        <div className="overflow-hidden py-2">
          {/* Row 1 - scrolls left */}
          <div className="py-2">
            <ScrollRow direction="left">
              {row1Awards.map((award, index) => (
                <span
                  key={`row1-${index}`}
                  className="inline-flex items-center px-6 py-3 mx-3 border border-neutral-800/60 bg-neutral-900/20 backdrop-blur-md text-neutral-300 text-base hover:border-neutral-700 transition-colors cursor-default shrink-0"
                  style={{ borderRadius: "15px" }}
                >
                  {award}
                </span>
              ))}
            </ScrollRow>
          </div>

          {/* Row 2 - scrolls right (reversed animation) */}
          <div className="py-2">
            <ScrollRow direction="right">
              {row2Awards.map((award, index) => (
                <span
                  key={`row2-${index}`}
                  className="inline-flex items-center px-6 py-3 mx-3 border border-neutral-800/60 bg-neutral-900/20 backdrop-blur-md text-neutral-300 text-base hover:border-neutral-700 transition-colors cursor-default shrink-0"
                  style={{ borderRadius: "15px" }}
                >
                  {award}
                </span>
              ))}
            </ScrollRow>
          </div>

          {/* Row 3 - scrolls left */}
          <div className="py-2">
            <ScrollRow direction="left">
              {row3Awards.map((award, index) => (
                <span
                  key={`row3-${index}`}
                  className="inline-flex items-center px-6 py-3 mx-3 border border-neutral-800/60 bg-neutral-900/20 backdrop-blur-md text-neutral-300 text-base hover:border-neutral-700 transition-colors cursor-default shrink-0"
                  style={{ borderRadius: "15px" }}
                >
                  {award}
                </span>
              ))}
            </ScrollRow>
          </div>
        </div>
      </div>
    </section>
  );
}
