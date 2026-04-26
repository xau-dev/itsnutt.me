---
title: "Computer Vision for Object Detection on Edge Devices"
excerpt: "Running YOLO on a Raspberry Pi 5 for real-time object detection. Optimizing models, handling thermal throttling, and achieving 30fps on a $80 board."
date: "2025-12-10"
readTime: "10 min read"
tags: ["AI", "Computer Vision", "Edge Computing"]
---

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

![YOLO object detection on Raspberry Pi](/images/drone.png)
*Real-time object detection running on Raspberry Pi 5 at 30fps*

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
