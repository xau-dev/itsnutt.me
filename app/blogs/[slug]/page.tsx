"use client";

import Link from "next/link";
import ScrollReveal from "../../components/ScrollReveal";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
  slug: string;
  content: string;
}

const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Building Autonomous Drones with ROS and ArduPilot",
    excerpt: "A deep dive into setting up a fully autonomous drone system using ROS for high-level control and ArduPilot for flight management.",
    date: "Jan 15, 2026",
    readTime: "8 min read",
    tags: ["Robotics", "Drones", "ROS"],
    slug: "autonomous-drones-ros-ardupilot",
    content: "After 6 months of testing, crashes, and countless hours of debugging, I've finally got a fully autonomous drone system running. Here's what I learned.",
  },
  {
    id: "2",
    title: "FPV Drone Racing: From Zero to 120km/h",
    excerpt: "My journey getting into FPV drone racing. The crashes, the builds, and the moment it finally clicked.",
    date: "Dec 28, 2025",
    readTime: "6 min read",
    tags: ["FPV", "Drones", "Racing"],
    slug: "fpv-drone-racing-guide",
    content: "FPV (First Person View) drone racing is the most exhilarating thing I've ever done. It's like being a fighter pilot, but the aircraft costs $300 and fits in your backpack.",
  },
  {
    id: "3",
    title: "Computer Vision for Object Detection on Edge Devices",
    excerpt: "Running YOLO on a Raspberry Pi 5 for real-time object detection.",
    date: "Dec 10, 2025",
    readTime: "10 min read",
    tags: ["AI", "Computer Vision", "Edge Computing"],
    slug: "cv-object-detection-edge",
    content: "Getting YOLO to run at 30fps on a $80 Raspberry Pi 5 wasn't easy, but it's possible. Here's how.",
  },
  {
    id: "4",
    title: "Security Research: Finding Vulnerabilities in IoT Devices",
    excerpt: "How I approach IoT security testing. From firmware extraction to finding critical vulnerabilities.",
    date: "Nov 22, 2025",
    readTime: "12 min read",
    tags: ["Security", "IoT", "Research"],
    slug: "iot-security-research",
    content: "IoT devices are everywhere and most are terribly insecure. Here's my methodology for finding vulnerabilities.",
  },
  {
    id: "5",
    title: "Designing PCBs with KiCad: A Beginner's Journey",
    excerpt: "From zero electronics knowledge to designing my first 4-layer PCB.",
    date: "Nov 05, 2025",
    readTime: "7 min read",
    tags: ["Hardware", "PCB", "KiCad"],
    slug: "pcb-design-kicad-beginner",
    content: "Six months ago I couldn't tell a resistor from a capacitor. Now I've designed a 4-layer PCB that actually works. Here's how I got there.",
  },
  {
    id: "6",
    title: "Why I Switched from Firebase to Supabase for My Projects",
    excerpt: "After 2 years with Firebase, I made the switch. Here's what I gained, what I lost.",
    date: "Oct 18, 2025",
    readTime: "5 min read",
    tags: ["Backend", "Database", "DevOps"],
    slug: "firebase-to-supabase",
    content: "After 2 years of Firebase, I switched to Supabase for all my new projects. Here's the breakdown.",
  },
];

function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    return (
      <div className="min-h-full bg-grid-lines relative">
        <div className="max-w-[1400px] mx-auto relative z-10 px-4 sm:px-8 md:px-16 lg:px-24 py-16">
          <ScrollReveal direction="up">
            <div className="mb-12">
              <Link
                href="/blogs"
                className="inline-flex items-center gap-2 text-neutral-500 text-sm hover:text-white transition-colors mb-8"
                style={{ fontFamily: "var(--font-aeonik)" }}
              >
                <span>←</span> Back to blogs
              </Link>
              
              <h1 className="text-4xl text-white mb-4">Post not found</h1>
              <p className="text-neutral-400">This blog post doesn&apos;t exist.</p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full bg-grid-lines relative">
      <div className="max-w-[900px] mx-auto relative z-10 px-4 sm:px-8 md:px-16 lg:px-24 py-16">
        <ScrollReveal direction="up">
          <div className="mb-12">
            <Link
              href="/blogs"
              className="inline-flex items-center gap-2 text-neutral-500 text-sm hover:text-white transition-colors mb-8"
              style={{ fontFamily: "var(--font-aeonik)" }}
            >
              <span>←</span> Back to blogs
            </Link>

            <div className="flex items-center gap-3 mb-6">
              <span className="text-neutral-500 text-sm" style={{ fontFamily: "var(--font-aeonik)" }}>
                {post.date}
              </span>
              <span className="text-neutral-700">•</span>
              <span className="text-neutral-500 text-sm" style={{ fontFamily: "var(--font-aeonik)" }}>
                {post.readTime}
              </span>
            </div>
            
            <h1
              className="text-3xl sm:text-4xl md:text-5xl font-normal text-white tracking-tight mb-6"
              style={{ fontFamily: "var(--font-domaine-condensed)" }}
            >
              {post.title}
            </h1>

            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center px-3 py-1 border border-neutral-800 bg-neutral-900/50 text-neutral-400 text-xs"
                  style={{ borderRadius: "15px", fontFamily: "var(--font-aeonik)" }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={0.2}>
          <article 
            className="prose prose-invert prose-neutral max-w-none"
            style={{ fontFamily: "var(--font-aeonik)" }}
          >
            <div className="text-neutral-300 leading-relaxed whitespace-pre-wrap">
              {post.content}
            </div>
          </article>
        </ScrollReveal>
      </div>
    </div>
  );
}
