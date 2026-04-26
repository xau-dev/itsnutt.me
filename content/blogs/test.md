---
title: "test post"
excerpt: "lol"
date: "2026-04-26"
readTime: "3 min read"
tags: ["PCB", "Designing", "Project"]
thumbnail: "/images/blogs/midi_render.png"
---

**Goal:** Build a custom MIDI controller from scratch, including the PCB, layout, soldering, firmware, and config software.

**Status now:** The first version works. It still needs polish, but the main hardware and software are already there.

![Custom MIDI controller render](/images/blogs/midi.png)

An assembled version of the PCB board.

## The Idea

I saw the Teenage Engineering OP-1 and got really interested in its design. The way it looks simple, premium and clean made me want to try building my own music controller instead of just buying one.

So I decided to design everything from scratch. The PCB, layout, controls, firmware, and config app were all part of the build.

This started as a small hardware experiment, but it slowly turned into a full custom MIDI controller.

![SCH](/images/blogs/midi_sch.png)

## Hardware

The controller uses a custom PCB with buttons, rotary encoders, diodes, and a microcontroller to read inputs and send MIDI signals.

Some parts looked simple in the design, but were annoying during real assembly and testing. That was probably the biggest lesson: PCB design is not just about making the schematic work. It also has to be easy to build and debug.

![PCB](/images/blogs/midi_pcb.png)

![Soldering components](/images/blogs/solder.png)

Turns out SMD was a better option than soldering everything manually.

## Firmware

The firmware reads the buttons and encoders, then sends MIDI messages to the computer.

This part took more debugging than expected. Some buttons were inconsistent, some encoder behavior felt wrong, and small wiring or diode issues could make the whole thing act weird.

## Config App

I also made a small app to configure the controller instead of hardcoding every control.

![Screenshot of the MIDI controller config program](/images/blogs/program.png)

Our custom app for configuring the MIDI controller.

## Current Progress

Right now, the first version is working. The PCB, controls, firmware, and config app are all in place.

Next, I want to clean up the firmware, improve the case, and make the next revision feel less like a prototype and more like a real music device.