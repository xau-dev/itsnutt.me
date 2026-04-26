---
title: "Building an Autonomous Drone with ROS and ArduPilot"
excerpt: "My autonomous drone project using ArduPilot, ROS 2, MAVLink, Raspberry Pi, and vision based landing."
date: "2026-01-15"
readTime: "4 min read"
tags: ["Robotics", "Drones", "Project"]
thumbnail: "/images/drone.png"
---

# Building an Autonomous Drone with ROS and ArduPilot

**Goal:** Build an autonomous drone that can fly waypoints, take off by itself, and land using ArUco marker detection.

**Status now:** The main hardware is done. Right now I am focusing on auto takeoff, auto landing, and making the system reliable in real tests.

![Drone setup showing flight controller, Raspberry Pi, and camera](/images/drone.png)

MicroAir H743 running ArduPilot with AM32 ESCs, Raspberry Pi 4, ROS 2, and a depth camera.

## The Stack

The drone uses ArduPilot for flight control, GPS navigation, failsafes, and return to home. It uses AM32 on the ESC side, ROS 2 for mission logic and computer vision, MAVLink for communication, and a Raspberry Pi 4 as the onboard computer.

For telemetry and manual control, I am using 2.4GHz LoRa instead of the usual 900MHz telemetry setup. A depth camera is used for ArUco marker detection and landing tests.

## Why This Stack?

ArduPilot handles the stable flight layer. ROS 2 handles the experimental autonomy layer, like vision processing and mission logic.

I separated them because I do not want experimental code directly controlling the flight controller. The flight controller should stay reliable, while the onboard computer handles higher level logic like vision and mission decisions.

## Main Challenges

The first challenge is communication. MAVLink works well, but the link still needs to stay stable during real flight. I use UART at 921600 baud for onboard communication and lowered the packet rate to avoid flooding the connection.

The second challenge is auto landing. GPS is not accurate enough to land on a specific target, so the plan is to use a depth camera to detect ArUco markers and send guidance data back to ArduPilot.

The third challenge is vision reliability. Lighting, vibration, camera angle, and motion blur can all affect marker detection. A lot of the work is testing camera placement and making the landing logic safer when the marker is lost.

Safety is also a big part of the project. The setup needs geofence, return to home on signal loss, and manual override so the drone can fall back safely if autonomy fails.

## Current Progress

Right now, the main hardware build is finished. The project has the ArduPilot flight stack, Raspberry Pi onboard computer, MAVLink communication, ROS 2 direction, depth camera setup, and 2.4GHz LoRa telemetry.

The drone is not fully done yet. The main focus is making takeoff, landing, and vision guidance reliable enough for repeated testing.

![Waypoint mission testing in QGroundControl](/images/test.png)

Waypoint mission testing and flight monitoring in QGroundControl.

## Next Step

Next, I want to mount a GoPro under the drone to collect footage for AI training.

The bigger goal is to use the drone for agriculture, especially detecting crop or plant issues from aerial footage. For now, the priority is reliable flight, landing, and data collection before making the AI side more serious.