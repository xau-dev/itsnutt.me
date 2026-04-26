---
title: "Building Autonomous Drones with ROS and ArduPilot"
excerpt: "A deep dive into setting up a fully autonomous drone system using ROS for high-level control and ArduPilot for flight management. Lessons learned from 6 months of testing."
date: "2026-01-15"
readTime: "8 min read"
tags: ["Robotics", "Drones", "ROS"]
thumbnail: "/images/drone.png"
---

# Building Autonomous Drones with ROS and ArduPilot

After 6 months of testing, crashes, and countless hours of debugging, I've finally got a fully autonomous drone system running. Here's what I learned.

## The Stack

- **ArduPilot** for flight control and low-level navigation
- **ROS 2** for high-level mission planning and sensor fusion
- **MAVLink** for communication between the flight controller and onboard computer
- **Raspberry Pi 5** as the onboard computer

## Why This Combination?

ArduPilot handles the critical flight control tasks — stabilization, GPS navigation, failsafes. ROS handles the higher-level decision making — obstacle avoidance, mission planning, computer vision.

![Drone setup showing Pixhawk flight controller and Raspberry Pi](/images/drone.png)
*The flight stack: Pixhawk 6X running ArduPilot + Raspberry Pi 5 with ROS 2*

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

![Test flight waypoint mission](/images/test.png)
*Screenshot of a completed autonomous waypoint mission in QGroundControl*

## What's Next

Working on swarm coordination — multiple drones flying in formation with collision avoidance.
