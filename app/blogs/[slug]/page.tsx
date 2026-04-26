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
    content: `
# Building Autonomous Drones with ROS and ArduPilot

After 6 months of testing, crashes, and countless hours of debugging, I've finally got a fully autonomous drone system running. Here's what I learned.

## The Stack

- **ArduPilot** for flight control and low-level navigation
- **ROS 2** for high-level mission planning and sensor fusion
- **MAVLink** for communication between the flight controller and onboard computer
- **Raspberry Pi 5** as the onboard computer

## Why This Combination?

ArduPilot handles the critical flight control tasks — stabilization, GPS navigation, failsafes. ROS handles the higher-level decision making — obstacle avoidance, mission planning, computer vision.

## Key Challenges

### 1. Latency
The biggest issue was communication latency between ROS and ArduPilot. MAVLink is efficient, but running through a USB connection introduces delays.

**Solution:** Switched to UART communication at 921600 baud. Reduced latency from ~50ms to ~10ms.

### 2. Sensor Fusion
GPS alone isn't enough for precise indoor navigation.

**Solution:** Added a LiDAR and IMU, fused everything with an Extended Kalman Filter (EKF) in ROS.

### 3. Safety
When things go wrong with autonomous drones, they go wrong fast.

**Solution:** Multiple failsafes — geofence, return-to-home on signal loss, and a physical kill switch.

## Results

The drone can now:
- Take off and land autonomously
- Follow GPS waypoints with ±1m accuracy
- Avoid obstacles using LiDAR
- Return home safely on any failure

## What's Next

Working on swarm coordination — multiple drones flying in formation with collision avoidance.
    `,
  },
  {
    id: "2",
    title: "FPV Drone Racing: From Zero to 120km/h",
    excerpt: "My journey getting into FPV drone racing. The crashes, the builds, and the moment it finally clicked.",
    date: "Dec 28, 2025",
    readTime: "6 min read",
    tags: ["FPV", "Drones", "Racing"],
    slug: "fpv-drone-racing-guide",
    content: `
# FPV Drone Racing: From Zero to 120km/h

FPV (First Person View) drone racing is the most exhilarating thing I've ever done. It's like being a fighter pilot, but the aircraft costs $300 and fits in your backpack.

## Getting Started

### The Gear
- **Frame:** 5-inch carbon fiber (started with a cheap one, upgraded later)
- **Motors:** 2306 2450KV brushless
- **FC/ESC:** Betaflight F4 with 45A ESCs
- **Camera:** Caddx Ratel 2 (great low light performance)
- **Goggles:** DJI Goggles 2 (worth every penny)

### The Learning Curve

Week 1-2: Crashed. A lot. Like, every 30 seconds.
Week 3-4: Could fly in a straight line without hitting trees.
Week 5-8: Started doing basic acro maneuvers.
Month 3: First race. Came in last, but didn't crash.
Month 6: Consistent mid-pack finishes.

## Key Tips

1. **Start in a simulator** — Velocidrone or Liftoff. Save money on props.
2. **Get good goggles** — Cheap goggles ruin the experience.
3. **Build your own** — You'll crash and need to repair. Know your machine.
4. **Find a community** — Local racing groups are incredibly helpful.

## The Moment It Clicked

Around month 2, I stopped thinking about the controls. My hands just... knew. That's when FPV becomes flying, not operating.

## Current Setup

Now running a 6S setup that hits 120km/h in a dive. The acceleration is addictive.
    `,
  },
  {
    id: "3",
    title: "Computer Vision for Object Detection on Edge Devices",
    excerpt: "Running YOLO on a Raspberry Pi 5 for real-time object detection.",
    date: "Dec 10, 2025",
    readTime: "10 min read",
    tags: ["AI", "Computer Vision", "Edge Computing"],
    slug: "cv-object-detection-edge",
    content: `
# Computer Vision on Edge Devices

Getting YOLO to run at 30fps on a $80 Raspberry Pi 5 wasn't easy, but it's possible. Here's how.

## The Challenge

Edge devices have:
- Limited compute (no GPU)
- Thermal constraints
- Power limitations
- Memory constraints

## Optimization Strategy

### 1. Model Selection
Started with YOLOv8n (nano). It's the smallest variant and still surprisingly capable.

### 2. Quantization
Converted from FP32 to INT8 using TensorRT. This alone gave 3x speedup.

### 3. Input Resolution
Dropped from 640x640 to 416x416. Slight accuracy loss, massive speed gain.

### 4. Frame Skipping
Process every 2nd frame, interpolate between. Looks smooth, saves compute.

## Results

| Metric | Before | After |
|--------|--------|-------|
| FPS | 4 | 32 |
| Latency | 250ms | 31ms |
| Power | 8W | 6.5W |
| Temp | 85°C | 72°C |

## Thermal Management

The Pi 5 throttles at 85°C. Added:
- Active cooling fan
- Thermal pads
- Undervolting (-0.05V)

Now stable at 72°C under full load.

## Use Cases

Currently deployed for:
- Drone landing zone detection
- Person counting for occupancy
- Wildlife monitoring (low power solar setup)
    `,
  },
  {
    id: "4",
    title: "Security Research: Finding Vulnerabilities in IoT Devices",
    excerpt: "How I approach IoT security testing. From firmware extraction to finding critical vulnerabilities.",
    date: "Nov 22, 2025",
    readTime: "12 min read",
    tags: ["Security", "IoT", "Research"],
    slug: "iot-security-research",
    content: `
# IoT Security Research

IoT devices are everywhere and most are terribly insecure. Here's my methodology for finding vulnerabilities.

## Reconnaissance

### 1. Information Gathering
- FCC filings (often have internal photos)
- Firmware downloads from manufacturer
- Datasheets for main chips
- Cloud API documentation

### 2. Hardware Analysis
- Open the device
- Identify UART pins
- Find JTAG if present
- Document all chips

## Firmware Extraction

### Methods (in order of preference):
1. **Manufacturer download** — easiest, often available
2. **UART console** — boot into shell, dump flash
3. **SPI flash programmer** — direct chip read
4. **JTAG** — most reliable, requires hardware

## Analysis Tools

- **Binwalk** — extract file systems
- **Ghidra** — reverse engineer binaries
- ** Firmwalker** — find interesting files
- ** QEMU** — emulate for dynamic analysis

## Common Vulnerabilities

### 1. Hardcoded Credentials
Found in ~60% of devices I've tested. Usually:
- Default passwords
- Backdoor accounts
- Hardcoded API keys

### 2. Command Injection
Web interfaces often pass user input directly to system() calls.

### 3. Missing Authentication
Internal APIs that should require auth but don't.

### 4. Update Mechanism Issues
- No signature verification
- HTTP instead of HTTPS
- No rollback protection

## Responsible Disclosure

Always follow responsible disclosure:
1. Contact manufacturer privately
2. Give 90 days to fix
3. Publish after fix or deadline

## Tools I Use

- Burp Suite for web API testing
- nmap for network scanning
- Wireshark for protocol analysis
- Custom scripts for fuzzing
    `,
  },
  {
    id: "5",
    title: "Designing PCBs with KiCad: A Beginner's Journey",
    excerpt: "From zero electronics knowledge to designing my first 4-layer PCB.",
    date: "Nov 05, 2025",
    readTime: "7 min read",
    tags: ["Hardware", "PCB", "KiCad"],
    slug: "pcb-design-kicad-beginner",
    content: `
# PCB Design with KiCad

Six months ago I couldn't tell a resistor from a capacitor. Now I've designed a 4-layer PCB that actually works. Here's how I got there.

## Starting Point

Zero electronics knowledge. I knew how to code and solder, but that's it.

## Learning Path

### Month 1: Basics
- Ohm's Law
- Basic components (resistors, capacitors, inductors)
- How transistors work
- Digital logic basics

### Month 2: KiCad Fundamentals
- Schematic capture
- Footprint assignment
- PCB layout basics
- Design rules

### Month 3: First PCB
A simple LED blinker. Took 3 revisions to get right.

### Month 4-5: Complex Designs
- Motor driver board
- Sensor interface board
- Power supply module

### Month 6: 4-Layer Design
My first serious board — a flight controller for a custom drone.

## Key Lessons

### 1. Ground Planes Are Critical
Don't just route ground like any other signal. Use planes.

### 2. Decoupling Capacitors
Every IC needs them. Place close to power pins.

### 3. Trace Width Matters
Current capacity depends on width. Use online calculators.

### 4. Test Points
Add them everywhere. You'll need them for debugging.

## Common Mistakes

1. **Wrong footprints** — double-check everything
2. **No mounting holes** — your board needs to attach to something
3. **Ignoring thermal** — hot components need copper pours
4. **Forgetting labels** — silkscreen is your friend

## Resources

- KiCad official docs (excellent)
- "The Art of Electronics" (the bible)
- YouTube: Phil's Lab, Robert Feranec
- JLCPCB for cheap prototypes ($2 for 5 boards!)
    `,
  },
  {
    id: "6",
    title: "Why I Switched from Firebase to Supabase for My Projects",
    excerpt: "After 2 years with Firebase, I made the switch. Here's what I gained, what I lost.",
    date: "Oct 18, 2025",
    readTime: "5 min read",
    tags: ["Backend", "Database", "DevOps"],
    slug: "firebase-to-supabase",
    content: `
# Firebase to Supabase Migration

After 2 years of Firebase, I switched to Supabase for all my new projects. Here's the breakdown.

## Why I Left Firebase

### 1. Vendor Lock-in
Firebase is deeply integrated into Google's ecosystem. Moving away is painful.

### 2. Query Limitations
Firestore's querying is limited. No full-text search, no complex joins.

### 3. Cost Surprises
Firebase pricing can be unpredictable. Had a $400 bill from a single day's traffic spike.

### 4. Local Development
Emulators exist but aren't perfect. Supabase runs locally identically to production.

## What Supabase Offers

### PostgreSQL
Real relational database. Complex queries, full-text search, PostGIS for geospatial.

### Real-time
Built on PostgreSQL's LISTEN/NOTIFY. More reliable than Firebase's WebSocket approach.

### Auth
Built-in auth with multiple providers. Row Level Security (RLS) is powerful.

### Storage
S3-compatible object storage. Simple API.

## Migration Process

### Step 1: Schema Design
Moved from NoSQL documents to proper relational schema. Took time but worth it.

### Step 2: Data Migration
Wrote scripts to export from Firestore and import to PostgreSQL. ~10k documents.

### Step 3: Auth Migration
Supabase has Firebase Auth migration tools. Smooth process.

### Step 4: Client Updates
Updated React hooks from Firebase to Supabase. Similar API.

## Trade-offs

### What I Lost
- Firebase's offline persistence (Supabase has less mature solution)
- Google's ecosystem integration
- Some built-in analytics

### What I Gained
- SQL power and flexibility
- Predictable pricing
- Self-hosting option
- Better local development
- Open source

## Current Setup

Using Supabase for:
- PostgreSQL database
- Authentication
- Real-time subscriptions
- Edge functions (replacing Cloud Functions)

For storage, still using Cloudflare R2 (S3-compatible, cheaper).
    `,
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
