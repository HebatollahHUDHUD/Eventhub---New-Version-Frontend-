"use client";

import dynamic from "next/dynamic";
import { cn } from "@/lib/utils";

const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

interface VideoPlayerProps {
  url: string;
  className?: string;
  poster?: string;
}

export default function VideoPlayer({
  url,
  className,
  poster,
}: VideoPlayerProps) {
  return (
    <figure
      className={cn(
        "relative rounded-2xl overflow-hidden bg-black",
        className
      )}
    >
      <ReactPlayer
        src={url}
        controls
        light={poster || true}
        width="100%"
        height="100%"
      />
    </figure>
  );
}
