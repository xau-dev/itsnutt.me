import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "../components/ScrollReveal";
import Footer from "../components/Footer";

interface GalleryItem {
  id: string;
  src: string;
  title: string;
  description: string;
  date: string;
  category: string;
}

// Gallery data with metadata
const galleryItems: GalleryItem[] = [
  {
    id: "1",
    src: "/images/drone.png",
    title: "Autonomous Drone Build",
    description:
      "Pixhawk 6X flight controller paired with Raspberry Pi 5 running ROS 2. This setup handles autonomous waypoint navigation, obstacle avoidance with LiDAR, and real-time telemetry. Built for a university research project on swarm coordination.",
    date: "Apr 2026",
    category: "Robotics",
  },
  {
    id: "2",
    src: "/images/test.png",
    title: "Portfolio Site V2",
    description:
      "A complete redesign of my personal site built with Next.js 16, Tailwind CSS v4, and motion. Features smooth scroll, draggable polaroid stack, scroll-triggered animations, and a blog system with markdown support.",
    date: "Apr 2026",
    category: "Web Dev",
  },
  {
    id: "3",
    src: "/icons/davinci.png",
    title: "Video Production Setup",
    description:
      "DaVinci Resolve workflow for color grading FPV drone footage. Custom LUTs and node trees for cinematic look. Also experimenting with Fusion for motion graphics.",
    date: "Apr 2026",
    category: "Creative",
  },
  {
    id: "4",
    src: "/icons/cloudflare.png",
    title: "Infrastructure Stack",
    description:
      "Cloudflare Workers + Pages for edge deployment. Using R2 for object storage, D1 for SQLite at the edge, and KV for caching. Zero cold starts, global distribution.",
    date: "Apr 2026",
    category: "DevOps",
  },
  {
    id: "5",
    src: "/icons/Vercel.png",
    title: "Vercel Deployments",
    description:
      "Experimenting with Next.js 16 on Vercel. Testing the new React 19 features, server components, and the latest caching strategies. Also trying out the new analytics.",
    date: "Apr 2026",
    category: "Web Dev",
  },
];

// Sort by date descending
const sortedItems = [...galleryItems].sort((a, b) => {
  const dateA = new Date(a.date + " 01");
  const dateB = new Date(b.date + " 01");
  return dateB.getTime() - dateA.getTime();
});

function TimelineItem({
  item,
  index,
  isLeft,
}: {
  item: GalleryItem;
  index: number;
  isLeft: boolean;
}) {
  return (
    <ScrollReveal direction="up" delay={0.1 * index}>
      <div
        className={`relative flex items-center gap-8 ${
          isLeft ? "flex-row" : "flex-row-reverse"
        }`}
      >
        {/* Content side */}
        <div className={`flex-1 ${isLeft ? "text-right pr-8" : "text-left pl-8"}`}>
          <div
            className="inline-flex items-center gap-2 mb-3"
            style={{ fontFamily: "var(--font-aeonik)" }}
          >
            <span className="text-neutral-500 text-sm">{item.date}</span>
            <span className="text-neutral-700">•</span>
            <span
              className="px-2.5 py-0.5 border border-neutral-800 bg-neutral-900/50 text-neutral-400 text-xs"
              style={{ borderRadius: "12px" }}
            >
              {item.category}
            </span>
          </div>

          <h3
            className="text-xl sm:text-2xl font-medium text-white mb-3 tracking-tight"
            style={{ fontFamily: "var(--font-aeonik)" }}
          >
            {item.title}
          </h3>

          <p className="text-neutral-400 text-sm leading-relaxed">
            {item.description}
          </p>
        </div>

        {/* Timeline dot */}
        <div className="relative z-10 flex-shrink-0">
          <div
            className="w-4 h-4 rounded-full bg-white border-4 border-neutral-900"
            style={{ boxShadow: "0 0 0 2px rgba(255,255,255,0.2)" }}
          />
        </div>

        {/* Image side */}
        <div className="flex-1">
          <div
            className="group border border-neutral-800 bg-neutral-900/30 backdrop-blur-sm overflow-hidden hover:border-neutral-700 transition-all duration-300"
            style={{ borderRadius: "15px" }}
          >
            <div className="relative aspect-[16/10] overflow-hidden">
              <Image
                src={item.src}
                alt={item.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </div>
        </div>
      </div>
    </ScrollReveal>
  );
}

function MobileTimelineItem({
  item,
  index,
}: {
  item: GalleryItem;
  index: number;
}) {
  return (
    <ScrollReveal direction="up" delay={0.1 * index}>
      <div className="relative pl-8">
        {/* Timeline line */}
        <div className="absolute left-[7px] top-0 bottom-0 w-px bg-neutral-800" />

        {/* Timeline dot */}
        <div className="absolute left-0 top-6 z-10">
          <div
            className="w-4 h-4 rounded-full bg-white border-4 border-neutral-900"
            style={{ boxShadow: "0 0 0 2px rgba(255,255,255,0.2)" }}
          />
        </div>

        <div className="pb-12">
          {/* Image */}
          <div
            className="group border border-neutral-800 bg-neutral-900/30 backdrop-blur-sm overflow-hidden hover:border-neutral-700 transition-all duration-300 mb-4"
            style={{ borderRadius: "15px" }}
          >
            <div className="relative aspect-[16/10] overflow-hidden">
              <Image
                src={item.src}
                alt={item.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </div>

          {/* Content */}
          <div style={{ fontFamily: "var(--font-aeonik)" }}>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-neutral-500 text-sm">{item.date}</span>
              <span className="text-neutral-700">•</span>
              <span
                className="px-2 py-0.5 border border-neutral-800 bg-neutral-900/50 text-neutral-400 text-xs"
                style={{ borderRadius: "12px" }}
              >
                {item.category}
              </span>
            </div>

            <h3 className="text-lg font-medium text-white mb-2 tracking-tight">
              {item.title}
            </h3>

            <p className="text-neutral-400 text-sm leading-relaxed">
              {item.description}
            </p>
          </div>
        </div>
      </div>
    </ScrollReveal>
  );
}

export default function GalleryPage() {
  return (
    <div className="min-h-full bg-grid-lines relative">
      <div className="max-w-[1400px] mx-auto relative z-10 px-4 sm:px-8 md:px-16 lg:px-24 py-16">
        <ScrollReveal direction="up">
          <div className="mb-16">
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
              Gallery
            </h1>
            <p className="text-neutral-400 text-lg" style={{ fontFamily: "var(--font-aeonik)" }}>
              A timeline of builds, projects, and experiments
            </p>
          </div>
        </ScrollReveal>

        {/* Desktop Timeline - Alternating sides */}
        <div className="hidden md:block relative">
          {/* Center line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-neutral-800 -translate-x-1/2" />

          <div className="space-y-16">
            {sortedItems.map((item, index) => (
              <TimelineItem
                key={item.id}
                item={item}
                index={index}
                isLeft={index % 2 === 0}
              />
            ))}
          </div>
        </div>

        {/* Mobile Timeline - Single column */}
        <div className="md:hidden">
          {sortedItems.map((item, index) => (
            <MobileTimelineItem key={item.id} item={item} index={index} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
