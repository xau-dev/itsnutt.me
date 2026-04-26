"use client";

import Link from "next/link";
import ScrollReveal from "../components/ScrollReveal";

const navLinks = [
  { href: "/", label: "home" },
  { href: "/blogs", label: "blogs" },
  { href: "/projects", label: "projects" },
  { href: "/gallery", label: "gallery" },
  { href: "/contact", label: "contact" },
];

export default function Footer() {
  return (
    <footer className="py-8 sm:py-12 px-4 sm:px-8 md:px-16 lg:px-24 border-t border-neutral-800">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 sm:gap-8">
        {/* Left side */}
        <ScrollReveal direction="up">
          <div>
            <Link
              href="/"
              className="text-white text-lg font-medium tracking-tight hover:opacity-80 transition-opacity"
              style={{ fontFamily: "var(--font-aeonik)" }}
            >
              xaudev
            </Link>
            <p className="text-neutral-500 text-sm mt-2">
              &copy; 2026 xaudev All rights reserved.
            </p>
            <div className="flex items-center gap-4 mt-4">
              <Link
                href="https://github.com/xau-dev/itsnutt.me"
                className="text-neutral-400 text-sm hover:text-white transition-colors underline underline-offset-4"
              >
                View source code
              </Link>
              <Link
                href="#"
                className="text-neutral-400 text-sm hover:text-white transition-colors underline underline-offset-4"
              >
                report problems
              </Link>
            </div>
          </div>
        </ScrollReveal>

        {/* Right side - Navigation */}
        <ScrollReveal direction="up" delay={0.1}>
          <div className="flex flex-col gap-3" style={{ fontFamily: "var(--font-aeonik)" }}>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-neutral-400 text-sm hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </footer>
  );
}
