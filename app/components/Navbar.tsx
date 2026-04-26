"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";

interface ScrollLink {
  type: "scroll";
  id: string;
  label: string;
}

interface PageLink {
  type: "link";
  href: string;
  label: string;
}

type NavLink = ScrollLink | PageLink;

const navLinks: NavLink[] = [
  { type: "scroll", id: "home", label: "home" },
  { type: "link", href: "/blogs", label: "blogs" },
  { type: "scroll", id: "projects", label: "projects" },
  { type: "link", href: "/logs", label: "logs" },
  { type: "scroll", id: "contact", label: "contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();
  
  // Transform for bubble effect
  const navBorderRadius = useTransform(scrollY, [0, 100], ["0px", "9999px"]);
  const navBackground = useTransform(
    scrollY, 
    [0, 100], 
    ["rgba(0,0,0,0)", "rgba(23,23,23,0.85)"]
  );
  const navBorder = useTransform(
    scrollY,
    [0, 100],
    ["1px solid rgba(0,0,0,0)", "1px solid rgba(64,64,64,0.5)"]
  );
  const navBoxShadow = useTransform(
    scrollY,
    [0, 100],
    ["0 0 0 rgba(0,0,0,0)", "0 8px 32px rgba(0,0,0,0.3)"]
  );
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScroll = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4">
      <motion.nav 
        className={`flex items-center justify-between py-3 px-6 md:px-8 w-full max-w-[1190px] ${
          isScrolled ? 'backdrop-blur-xl' : ''
        }`}
        style={{
          borderRadius: navBorderRadius,
          backgroundColor: navBackground,
          border: navBorder,
          boxShadow: navBoxShadow,
        }}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <motion.button
          onClick={() => handleScroll("home")}
          className="group relative text-white text-xl font-medium tracking-tight hover:opacity-90 transition-opacity cursor-pointer bg-transparent border-none shrink-0"
          style={{ fontFamily: "var(--font-aeonik)" }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          xaudev
          <span className="pointer-events-none absolute left-0 -bottom-0.5 h-px w-full origin-left scale-x-0 bg-white transition-transform duration-300 ease-out group-hover:scale-x-100" />
        </motion.button>

        <motion.div 
          className="flex items-center gap-6 md:gap-8" 
          style={{ fontFamily: "var(--font-aeonik)" }}
        >
          {navLinks.map((link, index) =>
            link.type === "scroll" ? (
              <motion.button
                key={link.id}
                onClick={() => handleScroll(link.id)}
                className="group relative text-neutral-400 text-sm md:text-base hover:text-white transition-colors cursor-pointer bg-transparent border-none"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {link.label}
                <span className="pointer-events-none absolute left-0 -bottom-1 h-px w-full origin-left scale-x-0 bg-white transition-transform duration-300 ease-out group-hover:scale-x-100" />
              </motion.button>
            ) : (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={link.href}
                  className="group relative text-neutral-400 text-sm md:text-base hover:text-white transition-colors"
                >
                  {link.label}
                  <span className="pointer-events-none absolute left-0 -bottom-1 h-px w-full origin-left scale-x-0 bg-white transition-transform duration-300 ease-out group-hover:scale-x-100" />
                </Link>
              </motion.div>
            )
          )}
        </motion.div>
      </motion.nav>
    </div>
  );
}
