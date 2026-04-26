"use client";

import { useState } from "react";
import Image from "next/image";

interface SkeletonImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  draggable?: boolean;
}

export default function SkeletonImage({
  src,
  alt,
  fill,
  width,
  height,
  className = "",
  priority = false,
  draggable = true,
}: SkeletonImageProps) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className={`relative overflow-hidden ${fill ? "w-full h-full" : ""}`}>
      {/* Skeleton placeholder */}
      {isLoading && (
        <div
          className={`absolute inset-0 bg-neutral-800 animate-pulse ${className}`}
          style={{ borderRadius: "inherit" }}
        />
      )}
      <Image
        src={src}
        alt={alt}
        fill={fill}
        width={!fill ? width : undefined}
        height={!fill ? height : undefined}
        className={`${className} transition-opacity duration-500 ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
        onLoad={() => setIsLoading(false)}
        priority={priority}
        draggable={draggable}
      />
    </div>
  );
}
