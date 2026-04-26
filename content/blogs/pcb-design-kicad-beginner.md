---
title: "Designing PCBs with KiCad: A Beginner's Journey"
excerpt: "From zero electronics knowledge to designing my first 4-layer PCB. The mistakes I made, the resources that helped."
date: "2025-11-05"
readTime: "7 min read"
tags: ["Hardware", "PCB", "KiCad"]
---

# Designing PCBs with KiCad: A Beginner's Journey

Six months ago I couldn't tell a resistor from a capacitor. Now I've designed a 4-layer PCB that actually works. Here's how I got there.

## Why KiCad?

- **Free and open source**
- **Active community** with great tutorials
- **Professional features** — differential pairs, length matching, 3D viewer
- **No limitations** on board size or layers

## The Learning Path

### Month 1: Basics
- Ohm's Law and basic components
- Schematic symbols and footprints
- Simple 2-layer boards

### Month 2: Layout
- Trace width and current capacity
- Ground planes and return paths
- Component placement strategies

### Month 3: Advanced
- 4-layer stackup design
- Impedance control
- Differential pair routing

## Biggest Mistakes

1. **Ignoring datasheets** — Always check recommended layouts
2. **Too thin traces** — Calculate current capacity properly
3. **No ground plane** — Causes noise and EMI issues
4. **Wrong footprint** — Double-check pin numbering

## Resources That Helped

- **KiCad official docs** — Surprisingly good
- **Phil's Lab YouTube** — Excellent PCB tutorials
- **JLCPCB design rules** — Know your manufacturer

## Current Project

A drone flight controller with:
- STM32H7 microcontroller
- 9-axis IMU
- Barometer and magnetometer
- 6 motor outputs

![KiCad PCB layout](/images/test.png)
*4-layer PCB layout in KiCad with impedance-controlled traces*

First revision had 3 errors. Second revision worked perfectly.
