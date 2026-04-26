"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import ScrollReveal from "../components/ScrollReveal";

const navLinks = [
  { href: "/", label: "home" },
  { href: "/blogs", label: "blogs" },
  { href: "/#projects", label: "projects" },
  { href: "/logs", label: "logs" },
  { href: "/#contact", label: "contact" },
];

export default function Footer() {
  const [visitorCount, setVisitorCount] = useState<number | null>(null);

  useEffect(() => {
    // Fetch visitor count from GoatCounter API
    const fetchVisitorCount = async () => {
      try {
        // GoatCounter API endpoint for total visits
        const response = await fetch('https://xaudev.goatcounter.com/api/v0/stats/hits', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        if (response.ok) {
          const data = await response.json();
          // GoatCounter returns total hits
          setVisitorCount(data.total || data.count || 0);
        } else {
          // Fallback: try to get from the count.js global
          if (typeof window !== 'undefined' && (window as any).goatcounter) {
            const count = (window as any).goatcounter.count;
            if (count) setVisitorCount(count);
          }
        }
      } catch (error) {
        console.log('Could not fetch visitor count');
      }
    };

    fetchVisitorCount();
  }, []);

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

        {/* Middle - Friends */}
        <ScrollReveal direction="up" delay={0.1}>
          <div>
            <p className="text-neutral-500 text-sm mb-3" style={{ fontFamily: "var(--font-aeonik)" }}>
              friends & people
            </p>
            <div className="flex flex-wrap gap-2">
              <Link
                href="https://itsnutt.me"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block hover:opacity-80 transition-opacity"
              >
                <Image
                  src="/button/xaudev.png"
                  alt="itsnutt.me"
                  width={88}
                  height={31}
                  className="rounded"
                />
              </Link>
              <Link
                href="https://tinywifi.cc"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block hover:opacity-80 transition-opacity"
              >
                <Image
                  src="https://www.tinywifi.cc/images/buttons/tinywifi.png"
                  alt="tinywifi"
                  width={88}
                  height={31}
                  className="rounded"
                />
              </Link>
            </div>
          </div>
        </ScrollReveal>

        {/* Right side - Navigation */}
        <ScrollReveal direction="up" delay={0.2}>
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
