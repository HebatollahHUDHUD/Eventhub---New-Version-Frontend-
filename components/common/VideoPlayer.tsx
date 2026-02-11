"use client";

import { useRef, useState } from "react";
import { Play } from "lucide-react";
import { cn } from "@/lib/utils";

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
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handleEnded = () => {
    setIsPlaying(false);
  };

  return (
    <figure
      className={cn(
        "relative rounded-2xl overflow-hidden bg-black",
        className
      )}
    >
      <video
        ref={videoRef}
        src={url}
        poster={poster}
        controls={isPlaying}
        onPause={handlePause}
        onEnded={handleEnded}
        className="w-full h-full object-cover"
        preload="metadata"
      />

      {/* Play button overlay */}
      {!isPlaying && (
        <button
          onClick={handlePlay}
          aria-label="Play video"
          className="absolute inset-0 flex items-center justify-center bg-black/30 transition-opacity hover:bg-black/40"
        >
          <span className="flex items-center justify-center w-14 h-14 md:w-18 md:h-18 rounded-full bg-primary">
            <Play className="w-6 h-6 md:w-8 md:h-8 text-primary-foreground fill-primary-foreground ms-0.5" />
          </span>
        </button>
      )}
    </figure>
  );
}
