"use client";

import { useEffect, useState, useCallback } from "react";
import type { Heading } from "@/lib/blogs";

interface TableOfContentsProps {
  headings: Heading[];
}

export default function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: "-80px 0px -60% 0px",
        threshold: 0,
      }
    );

    headings.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  const handleClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: "smooth" });
      history.replaceState(null, "", `#${id}`);
    }
  }, []);

  if (headings.length === 0) return null;

  return (
    <nav>
      <p
        className="text-sm text-neutral-500 mb-4"
        style={{ fontFamily: "var(--font-aeonik)" }}
      >
        Table of Contents
      </p>
      <ul className="space-y-2">
        {headings.map((heading) => {
          const isActive = activeId === heading.id;
          const isH3 = heading.level === 3;

          return (
            <li
              key={heading.id}
              className={isH3 ? "pl-4" : ""}
            >
              <a
                href={`#${heading.id}`}
                onClick={(e) => handleClick(e, heading.id)}
                className={`
                  block transition-colors duration-200
                  ${isH3 ? "text-xs" : "text-sm"}
                  ${
                    isActive
                      ? "text-white"
                      : "text-neutral-500 hover:text-white"
                  }
                `}
                style={{ fontFamily: "var(--font-aeonik)" }}
              >
                {heading.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
