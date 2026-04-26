"use client";

import Link from "next/link";
import ScrollReveal from "../components/ScrollReveal";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
  slug: string;
}

const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Building Autonomous Drones with ROS and ArduPilot",
    excerpt: "A deep dive into setting up a fully autonomous drone system using ROS for high-level control and ArduPilot for flight management. Lessons learned from 6 months of testing.",
    date: "Jan 15, 2026",
    readTime: "8 min read",
    tags: ["Robotics", "Drones", "ROS"],
    slug: "autonomous-drones-ros-ardupilot",
  },
  {
    id: "2",
    title: "FPV Drone Racing: From Zero to 120km/h",
    excerpt: "My journey getting into FPV drone racing. The crashes, the builds, and the moment it finally clicked. Plus a guide to building your first racing quad.",
    date: "Dec 28, 2025",
    readTime: "6 min read",
    tags: ["FPV", "Drones", "Racing"],
    slug: "fpv-drone-racing-guide",
  },
  {
    id: "3",
    title: "Computer Vision for Object Detection on Edge Devices",
    excerpt: "Running YOLO on a Raspberry Pi 5 for real-time object detection. Optimizing models, handling thermal throttling, and achieving 30fps on a $80 board.",
    date: "Dec 10, 2025",
    readTime: "10 min read",
    tags: ["AI", "Computer Vision", "Edge Computing"],
    slug: "cv-object-detection-edge",
  },
  {
    id: "4",
    title: "Security Research: Finding Vulnerabilities in IoT Devices",
    excerpt: "How I approach IoT security testing. From firmware extraction to finding critical vulnerabilities in consumer devices. A practical guide for beginners.",
    date: "Nov 22, 2025",
    readTime: "12 min read",
    tags: ["Security", "IoT", "Research"],
    slug: "iot-security-research",
  },
  {
    id: "5",
    title: "Designing PCBs with KiCad: A Beginner's Journey",
    excerpt: "From zero electronics knowledge to designing my first 4-layer PCB. The mistakes I made, the resources that helped, and the board that actually worked.",
    date: "Nov 05, 2025",
    readTime: "7 min read",
    tags: ["Hardware", "PCB", "KiCad"],
    slug: "pcb-design-kicad-beginner",
  },
  {
    id: "6",
    title: "Why I Switched from Firebase to Supabase for My Projects",
    excerpt: "After 2 years with Firebase, I made the switch. Here's what I gained, what I lost, and why PostgreSQL at the edge changed how I build applications.",
    date: "Oct 18, 2025",
    readTime: "5 min read",
    tags: ["Backend", "Database", "DevOps"],
    slug: "firebase-to-supabase",
  },
];

function BlogCard({ post, index }: { post: BlogPost; index: number }) {
  return (
    <ScrollReveal direction="up" delay={0.1 * index}>
      <Link href={`/blogs/${post.slug}`}>
        <article
          className="group border border-neutral-800 bg-neutral-900/30 backdrop-blur-sm p-6 hover:border-neutral-700 transition-all duration-300 h-full flex flex-col"
          style={{ borderRadius: "15px" }}
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-neutral-500 text-sm" style={{ fontFamily: "var(--font-aeonik)" }}>
              {post.date}
            </span>
            <span className="text-neutral-700">•</span>
            <span className="text-neutral-500 text-sm" style={{ fontFamily: "var(--font-aeonik)" }}>
              {post.readTime}
            </span>
          </div>

          <h2 
            className="text-white text-xl font-medium mb-3 group-hover:text-neutral-300 transition-colors leading-snug"
            style={{ fontFamily: "var(--font-aeonik)" }}
          >
            {post.title}
          </h2>

          <p className="text-neutral-400 text-sm leading-relaxed mb-4 flex-1">
            {post.excerpt}
          </p>

          <div className="flex flex-wrap gap-2 mt-auto">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-3 py-1 border border-neutral-800 bg-neutral-900/50 text-neutral-400 text-xs hover:border-neutral-700 hover:text-neutral-300 transition-colors"
                style={{ borderRadius: "15px", fontFamily: "var(--font-aeonik)" }}
              >
                {tag}
              </span>
            ))}
          </div>
        </article>
      </Link>
    </ScrollReveal>
  );
}

export default function BlogsPage() {
  return (
    <div className="min-h-full bg-grid-lines relative">
      <div className="max-w-[1400px] mx-auto relative z-10 px-4 sm:px-8 md:px-16 lg:px-24 py-16">
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
              Blog
            </h1>
            <p className="text-neutral-400 text-lg" style={{ fontFamily: "var(--font-aeonik)" }}>
              Thoughts on robotics, security, and building things
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {blogPosts.map((post, index) => (
            <BlogCard key={post.id} post={post} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
