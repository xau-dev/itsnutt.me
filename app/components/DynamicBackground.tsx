"use client";

import { useEffect, useRef } from "react";

interface Blob {
  x: number;
  y: number;
  radiusX: number;
  radiusY: number;
  rotation: number;
  rotationSpeed: number;
  vx: number;
  vy: number;
  opacity: number;
  points: { angle: number; radiusOffset: number }[];
  morphSpeed: number;
  morphPhase: number;
}

function createBlob(width: number, height: number): Blob {
  const pointCount = 8 + Math.floor(Math.random() * 6);
  const points = [];

  for (let i = 0; i < pointCount; i++) {
    points.push({
      angle: (i / pointCount) * Math.PI * 2,
      radiusOffset: 0.8 + Math.random() * 0.4,
    });
  }

  return {
    x: Math.random() * width,
    y: Math.random() * height,
    radiusX: 100 + Math.random() * 200,
    radiusY: 100 + Math.random() * 200,
    rotation: Math.random() * Math.PI * 2,
    rotationSpeed: (Math.random() - 0.5) * 0.002,
    vx: (Math.random() - 0.5) * 0.5,
    vy: (Math.random() - 0.5) * 0.5,
    opacity: 0.02 + Math.random() * 0.03,
    points,
    morphSpeed: 0.5 + Math.random() * 1,
    morphPhase: Math.random() * Math.PI * 2,
  };
}

export default function DynamicBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let time = 0;
    let width = window.innerWidth;
    let height = window.innerHeight;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    resize();
    window.addEventListener("resize", resize);

    const blobCount = 8;
    const blobs: Blob[] = [];

    for (let i = 0; i < blobCount; i++) {
      blobs.push(createBlob(width, height));
    }

    const animate = () => {
      time += 0.016;
      ctx.clearRect(0, 0, width, height);

      blobs.forEach((blob) => {
        // Move blob
        blob.x += blob.vx;
        blob.y += blob.vy;
        blob.rotation += blob.rotationSpeed;
        blob.morphPhase += blob.morphSpeed * 0.016;

        // Bounce off edges with padding
        const padding = Math.max(blob.radiusX, blob.radiusY);
        if (blob.x < -padding) {
          blob.x = -padding;
          blob.vx = Math.abs(blob.vx);
        }
        if (blob.x > width + padding) {
          blob.x = width + padding;
          blob.vx = -Math.abs(blob.vx);
        }
        if (blob.y < -padding) {
          blob.y = -padding;
          blob.vy = Math.abs(blob.vy);
        }
        if (blob.y > height + padding) {
          blob.y = height + padding;
          blob.vy = -Math.abs(blob.vy);
        }

        // Draw organic blob shape
        ctx.save();
        ctx.translate(blob.x, blob.y);
        ctx.rotate(blob.rotation);

        ctx.beginPath();

        const pointCount = blob.points.length;
        for (let i = 0; i <= pointCount; i++) {
          const point = blob.points[i % pointCount];
          const morphOffset =
            Math.sin(blob.morphPhase + point.angle * 3) * 0.15;
          const currentRadius = point.radiusOffset + morphOffset;

          const px = Math.cos(point.angle) * blob.radiusX * currentRadius;
          const py = Math.sin(point.angle) * blob.radiusY * currentRadius;

          if (i === 0) {
            ctx.moveTo(px, py);
          } else {
            const prevPoint =
              blob.points[(i - 1 + pointCount) % pointCount];
            const prevMorphOffset =
              Math.sin(blob.morphPhase + prevPoint.angle * 3) * 0.15;
            const prevRadius = prevPoint.radiusOffset + prevMorphOffset;

            const prevPx =
              Math.cos(prevPoint.angle) * blob.radiusX * prevRadius;
            const prevPy =
              Math.sin(prevPoint.angle) * blob.radiusY * prevRadius;

            const cpx = (prevPx + px) / 2;
            const cpy = (prevPy + py) / 2;

            ctx.quadraticCurveTo(prevPx, prevPy, cpx, cpy);
          }
        }

        ctx.closePath();

        // Create gradient fill
        const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, blob.radiusX);
        gradient.addColorStop(0, `rgba(255, 255, 255, ${blob.opacity})`);
        gradient.addColorStop(0.5, `rgba(255, 255, 255, ${blob.opacity * 0.5})`);
        gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

        ctx.fillStyle = gradient;
        ctx.fill();

        ctx.restore();
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
}
