---
title: "Why I Switched from Firebase to Supabase for My Projects"
excerpt: "After 2 years with Firebase, I made the switch. Here's what I gained, what I lost, and why PostgreSQL at the edge changed everything."
date: "2025-10-18"
readTime: "5 min read"
tags: ["Backend", "Database", "DevOps"]
thumbnail: "/images/drone.png"
---

# Why I Switched from Firebase to Supabase

After 2 years of Firebase, I switched to Supabase for all my new projects. Here's the breakdown.

## What I Liked About Firebase

- **Real-time sync** — Works out of the box
- **Authentication** — Social login is trivial
- **Hosting** — One-click deploys
- **Ecosystem** — Google integration

## Why I Left

### 1. Vendor Lock-in
Firestore's document model doesn't translate well. Moving data out is painful.

### 2. Query Limitations
No joins, limited sorting, complex pricing for reads.

### 3. Cost Surprises
A poorly written query can cost $50/day. Hard to predict.

### 4. No Local Development
Emulators exist but aren't perfect. Development friction.

## Why Supabase

| Feature | Firebase | Supabase |
|---------|----------|----------|
| Database | Firestore | PostgreSQL |
| Real-time | Yes | Yes |
| Auth | Yes | Yes |
| Storage | Yes | Yes |
| SQL | No | Yes |
| Self-host | No | Yes |

## What I Gained

- **Full SQL power** — Joins, CTEs, window functions
- **Predictable pricing** — Based on compute, not reads
- **Local development** — Docker compose, identical to prod
- **Row-level security** — Declarative permissions

## What I Miss

- **Firebase's real-time** — Slightly more polished
- **Google ecosystem** — One less account

## Migration Strategy

1. Set up Supabase project
2. Export Firestore to JSON
3. Write migration scripts
4. Dual-write during transition
5. Cut over with feature flags

## Verdict

For new projects, Supabase wins. For existing Firebase apps, the migration cost may not be worth it unless you're hitting scaling issues.
