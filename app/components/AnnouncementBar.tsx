"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";

interface AnnouncementBarProps {
  title: string;
  href: string;
}

export default function AnnouncementBar({ title, href }: AnnouncementBarProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem("announcement-dismissed");
    if (!dismissed) {
      setIsVisible(true);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    setIsDismissed(true);
    localStorage.setItem("announcement-dismissed", "true");
  };

  return (
    <AnimatePresence>
      {isVisible && !isDismissed && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          className="pt-20 sm:pt-24 px-4 sm:px-8 md:px-16 lg:px-24"
        >
          <div className="flex items-center justify-between gap-4 py-2 px-4 border border-neutral-800 bg-neutral-900/30"
            style={{ borderRadius: "15px" }}
          >
            <Link
              href={href}
              className="flex items-center gap-3 group"
            >
              <span className="px-2 py-0.5 text-[10px] text-neutral-900 bg-white font-medium"
                style={{ borderRadius: "8px", fontFamily: "var(--font-aeonik)" }}
              >
                New
              </span>
              <span
                className="text-sm text-neutral-400 group-hover:text-white transition-colors"
                style={{ fontFamily: "var(--font-aeonik)" }}
              >
                {title}
              </span>
              <span className="text-neutral-500 group-hover:text-white group-hover:translate-x-0.5 transition-all">
                →
              </span>
            </Link>

            <button
              onClick={handleDismiss}
              className="text-neutral-500 hover:text-white transition-colors cursor-pointer shrink-0"
              aria-label="Dismiss announcement"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
