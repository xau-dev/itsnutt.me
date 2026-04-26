"use client";

import Link from "next/link";
import ScrollReveal from "../components/ScrollReveal";
import SkeletonImage from "../components/SkeletonImage";

const projects = [
  {
    title: "Autonomous Delivery Drone System",
    image: "/images/logs/soldering.jpg",
    href: "/blogs/autonomous-drones-ros-ardupilot",
  },
  {
    title: "Water Surface Autonomous Drone",
    image: "/images/test.png",
    href: "#",
  },
  {
    title: "Custom Midi Controller",
    image: "/images/blogs/midi.png",
    href: "/blogs/custom-midi-controller",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="px-4 sm:px-8 md:px-16 lg:px-24 py-12 sm:py-16">
      <ScrollReveal direction="up">
        <h2
          className="text-3xl sm:text-4xl md:text-5xl font-normal text-white tracking-tight mb-6 sm:mb-10"
          style={{ fontFamily: "var(--font-domaine-condensed)" }}
        >
          What I&apos;ve Built
        </h2>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
        {projects.map((project, index) => (
          <ScrollReveal key={project.title} direction="up" delay={0.1 * (index + 1)} className="h-full">
            <div
              className="group border border-neutral-800 bg-neutral-900/30 backdrop-blur-sm overflow-hidden hover:border-neutral-700 transition-colors flex flex-col h-full"
              style={{ borderRadius: "15px" }}
            >
              <div className="relative aspect-video overflow-hidden">
                <SkeletonImage
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5 flex flex-col flex-1">
                <h3 className="text-white text-base font-medium mb-4 leading-snug flex-1">
                  {project.title}
                </h3>
                <Link
                  href={project.href}
                  className="inline-flex items-center gap-2 text-neutral-500 text-sm hover:text-white transition-colors group/link"
                >
                  View more
                  <span className="group-hover/link:translate-x-1 transition-transform">
                    →
                  </span>
                </Link>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
