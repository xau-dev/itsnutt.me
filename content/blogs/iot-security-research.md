---
title: "Security Research: Finding Vulnerabilities in IoT Devices"
excerpt: "How I approach IoT security testing. From firmware extraction to finding critical vulnerabilities in consumer devices."
date: "2025-11-22"
readTime: "12 min read"
tags: ["Security", "IoT", "Research"]
thumbnail: "/images/test.png"
---

# Security Research: Finding Vulnerabilities in IoT Devices

IoT devices are everywhere and most are terribly insecure. Here's my methodology for finding vulnerabilities.

## The Problem

Consumer IoT devices often:
- Ship with default credentials
- Have unencrypted firmware updates
- Expose debug interfaces
- Run outdated software with known CVEs

## My Approach

### 1. Reconnaissance
- Identify the device chipset and SoC
- Find FCC filings for internal photos
- Check for open source components

### 2. Firmware Extraction
- Serial console access (UART)
- SPI flash dumping
- OTA update interception

![IoT device teardown showing UART pins](/images/drone.png)
*Teardown of a smart camera revealing debug UART pins*

### 3. Static Analysis
- String analysis for hardcoded secrets
- Binary analysis with Ghidra
- Dependency scanning for known vulnerabilities

### 4. Dynamic Analysis
- Network traffic interception
- API endpoint fuzzing
- Authentication bypass attempts

## Common Findings

| Vulnerability | Severity | Frequency |
|--------------|----------|-----------|
| Hardcoded credentials | Critical | Very Common |
| Unencrypted comms | High | Common |
| Command injection | Critical | Moderate |
| Buffer overflows | High | Rare |

## Responsible Disclosure

Always follow responsible disclosure:
1. Contact the vendor privately
2. Allow 90 days for remediation
3. Publish after fix or deadline

## Tools I Use

- **Binwalk** — Firmware extraction
- **Ghidra** — Reverse engineering
- **Burp Suite** — Web API testing
- **UART** — Serial console access
