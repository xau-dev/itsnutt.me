"use client";

import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "../components/ScrollReveal";

interface Tool {
  name: string;
  icon: string;
  width: number;
  height: number;
  isLogo?: boolean;
}

interface ToolGroup {
  category: string;
  tools: Tool[];
  rank: number;
}

const toolGroups: ToolGroup[] = [
  {
    rank: 1,
    category: "Robotics & IoT",
    tools: [
      { name: "Foxglove", icon: "/icons/foxglove-lockup-white 1.svg", width: 80, height: 20, isLogo: true },
      { name: "ArduPilot", icon: "/icons/ardupilot.svg", width: 16, height: 16 },
      { name: "Arduino", icon: "/icons/arduino.svg", width: 16, height: 16 },
      { name: "ESP32", icon: "/icons/esp32.svg", width: 16, height: 16 },
      { name: "Raspberry Pi", icon: "/icons/raspberrypi.svg", width: 16, height: 16 },
      { name: "MAVLink", icon: "/icons/mavlink.svg", width: 16, height: 16 },
      { name: "ROS", icon: "/icons/ros.svg", width: 16, height: 16 },
    ],
  },
  {
    rank: 2,
    category: "Computer Vision & AI",
    tools: [
      { name: "OpenCV", icon: "/icons/opencv.svg", width: 16, height: 16 },
      { name: "YOLO", icon: "/icons/yolo.svg", width: 16, height: 16 },
      { name: "TensorFlow", icon: "/icons/tensorflow.svg", width: 16, height: 16 },
    ],
  },
  {
    rank: 3,
    category: "3D & Design",
    tools: [
      { name: "Blender", icon: "/icons/blender.svg", width: 16, height: 16 },
      { name: "Figma", icon: "/icons/figma.svg", width: 16, height: 16 },
      { name: "Lightroom", icon: "/icons/Adobe Lightroom.svg", width: 16, height: 16 },
      { name: "Photoshop", icon: "/icons/Adobe Photoshop.svg", width: 16, height: 16 },
      { name: "After Effects", icon: "/icons/Adobe After Effects.svg", width: 16, height: 16 },
      { name: "Davinci Resolve", icon: "/icons/davinci.png", width: 16, height: 16 },
    ],
  },
  {
    rank: 4,
    category: "Frontend & Frameworks",
    tools: [
      { name: "React", icon: "/icons/react.svg", width: 16, height: 16 },
      { name: "Next.js", icon: "/icons/nextjs.svg", width: 16, height: 16 },
      { name: "Node.js", icon: "/icons/nodejs.svg", width: 16, height: 16 },
      { name: "Fast API", icon: "/icons/fastapi.svg", width: 16, height: 16 },
    ],
  },
  {
    rank: 5,
    category: "DevOps & Deployment",
    tools: [
      { name: "Docker", icon: "/icons/Docker.svg", width: 16, height: 16 },
      { name: "Vercel", icon: "/icons/Vercel.png", width: 16, height: 16 },
      { name: "Cloudflare", icon: "/icons/cloudflare.png", width: 16, height: 16 },
      { name: "Postman", icon: "/icons/Postman.svg", width: 16, height: 16 },
    ],
  },
  {
    rank: 6,
    category: "Languages",
    tools: [
      { name: "Python", icon: "/icons/Python.svg", width: 16, height: 16 },
      { name: "C++", icon: "/icons/C++.svg", width: 16, height: 16 },
      { name: "Javascript", icon: "/icons/Javascript.svg", width: 16, height: 16 },
    ],
  },
  {
    rank: 7,
    category: "Security & Testing",
    tools: [
      { name: "Burp Suite", icon: "/icons/burpsuite.svg", width: 16, height: 16 },
    ],
  },
  {
    rank: 8,
    category: "Hardware Design",
    tools: [
      { name: "KiCad", icon: "/icons/kicad.svg", width: 16, height: 16 },
      { name: "EasyEDA", icon: "/icons/easyeda.svg", width: 16, height: 16 },
    ],
  },
  {
    rank: 9,
    category: "Data Science",
    tools: [
      { name: "Jupyter", icon: "/icons/jupyter.svg", width: 16, height: 16 },
      { name: "Kaggle", icon: "/icons/kaggle.svg", width: 16, height: 16 },
    ],
  },
  {
    rank: 10,
    category: "Backend & Database",
    tools: [
      { name: "Firebase", icon: "/icons/firebase.svg", width: 16, height: 16 },
      { name: "Supabase", icon: "/icons/supabase.svg", width: 16, height: 16 },
    ],
  },
];

function ToolItem({ tool }: { tool: Tool }) {
  return (
    <span
      className="inline-flex items-center gap-2 px-4 py-2 border border-neutral-800 bg-neutral-900/50 text-neutral-300 text-sm hover:border-neutral-700 hover:bg-neutral-800/50 hover:text-white transition-colors cursor-default"
      style={{ borderRadius: "15px", fontFamily: "var(--font-aeonik)" }}
    >
      <Image
        src={tool.icon}
        alt={tool.name}
        width={tool.width}
        height={tool.height}
        className={tool.isLogo ? "opacity-90" : "opacity-70"}
      />
      {tool.name}
    </span>
  );
}

function ToolCard({ group, index }: { group: ToolGroup; index: number }) {
  return (
    <ScrollReveal direction="up" delay={0.1 * index}>
      <div
        className="border border-neutral-800 bg-neutral-900/30 backdrop-blur-sm p-6 hover:border-neutral-700 transition-colors break-inside-avoid mb-6"
        style={{ borderRadius: "15px" }}
      >
        <div className="flex items-center gap-3 mb-4">
          <span className="text-neutral-600 text-sm font-mono">
            #{String(group.rank).padStart(2, '0')}
          </span>
          <h2 className="text-white text-lg font-medium" style={{ fontFamily: "var(--font-aeonik)" }}>
            {group.category}
          </h2>
        </div>
        
        <div className="flex flex-wrap gap-3">
          {group.tools.map((tool) => (
            <ToolItem key={tool.name} tool={tool} />
          ))}
        </div>
      </div>
    </ScrollReveal>
  );
}

export default function ToolsPage() {
  return (
    <div className="min-h-full bg-grid-lines relative">
      <div className="max-w-[1400px] mx-auto relative z-10 px-8 md:px-16 lg:px-24 py-16">
        <ScrollReveal direction="up">
          <div className="mb-12">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-neutral-500 text-sm hover:text-white transition-colors mb-8"
              style={{ fontFamily: "var(--font-aeonik)" }}
            >
              <span>←</span> Back to home
            </Link>
            
            <h1
              className="text-4xl md:text-5xl font-normal text-white tracking-tight mb-4"
              style={{ fontFamily: "var(--font-domaine-condensed)" }}
            >
              Tech Stack
            </h1>
            <p className="text-neutral-400 text-lg" style={{ fontFamily: "var(--font-aeonik)" }}>
              Ranked by how cool I think they are
            </p>
          </div>
        </ScrollReveal>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-6">
          {toolGroups.map((group, index) => (
            <ToolCard key={group.category} group={group} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
