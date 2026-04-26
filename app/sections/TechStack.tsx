"use client";

import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "../components/ScrollReveal";

const tools = [
  { name: "", icon: "/icons/foxglove-lockup-white 1.svg", width: 80, height: 20, isLogo: true },
  { name: "Docker", icon: "/icons/Docker.svg", width: 16, height: 16 },
  { name: "Vercel", icon: "/icons/Vercel.png", width: 16, height: 16 },
  { name: "Postman", icon: "/icons/Postman.svg", width: 16, height: 16 },

  { name: "Cloudflare", icon: "/icons/cloudflare.png", width: 16, height: 16 },
  { name: "Python", icon: "/icons/Python.svg", width: 16, height: 16 },
  { name: "C++", icon: "/icons/C++.svg", width: 16, height: 16 },
  { name: "Javascript", icon: "/icons/Javascript.svg", width: 16, height: 16 },

  { name: "Figma", icon: "/icons/figma.svg", width: 16, height: 16 },
  { name: "Lightroom", icon: "/icons/Adobe Lightroom.svg", width: 16, height: 16 },
  { name: "Photoshop", icon: "/icons/Adobe Photoshop.svg", width: 16, height: 16 },
  { name: "After Effects", icon: "/icons/Adobe After Effects.svg", width: 16, height: 16 },
  { name: "Davinci Resolve", icon: "/icons/davinci.png", width: 16, height: 16 },
];

function ToolItem({ tool }: any) {
  return (
    <span
      className="inline-flex items-center gap-2 px-4 py-2 border border-neutral-800 bg-neutral-900/50 text-neutral-300 text-sm hover:border-neutral-700 hover:bg-neutral-800/50 transition-colors cursor-default"
      style={{ borderRadius: "15px" }}
    >
      <Image
        src={tool.icon}
        alt={tool.name || "FOXGLOVE"}
        width={tool.width}
        height={tool.height}
        className={tool.isLogo ? "opacity-90" : "opacity-70"}
      />
      {tool.name}
    </span>
  );
}

  export default function TechStack() {
    return (
      <section className="relative -top-4 md:-top-8 lg:-top-12 px-4 sm:px-8 md:px-16 lg:px-24 pt-0 pb-12">
        <ScrollReveal direction="up">
          <p className="text-neutral-300 text-base sm:text-lg leading-relaxed mb-6">
            I work with tools and languages like
          </p>
        </ScrollReveal>

        <div className="flex flex-col gap-3 mb-3" style={{ fontFamily: "var(--font-aeonik)" }}>
          <ScrollReveal direction="up" delay={0.1}>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {tools.slice(0, 4).map((tool) => (
                <ToolItem key={tool.name || tool.icon} tool={tool} />
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.15}>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {tools.slice(4, 8).map((tool) => (
                <ToolItem key={tool.name || tool.icon} tool={tool} />
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.2}>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {tools.slice(8, 13).map((tool) => (
                <ToolItem key={tool.name || tool.icon} tool={tool} />
              ))}
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal direction="up" delay={0.25}>
          <Link
            href="/tools"
            className="inline-flex items-center gap-2 text-neutral-500 text-sm hover:text-white transition-colors group"
          >
            View more
            <span className="group-hover:translate-x-1 transition-transform">
              →
            </span>
          </Link>
        </ScrollReveal>
      </section>
    );
  }
