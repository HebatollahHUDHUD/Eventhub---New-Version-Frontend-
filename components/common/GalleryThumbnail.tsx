"use client";

import { useState } from "react";
import Image from "@/components/common/image";
import { Play } from "lucide-react";
import { cn } from "@/lib/utils";

export interface GalleryItem {
  id: string | number;
  src: string;
  alt?: string;
  isVideo?: boolean;
  videoUrl?: string;
}

interface GalleryThumbnailProps {
  items: GalleryItem[];
  defaultIndex?: number;
  className?: string;
  mainImageClassName?: string;
  thumbnailClassName?: string;
  showPlayButton?: boolean;
  onItemClick?: (item: GalleryItem, index: number) => void;
}

const GalleryThumbnail = ({
  items,
  defaultIndex = 0,
  className,
  mainImageClassName,
  thumbnailClassName,
  showPlayButton = true,
  onItemClick,
}: GalleryThumbnailProps) => {
  const [selectedIndex, setSelectedIndex] = useState(defaultIndex);

  if (!items || items.length === 0) {
    return null;
  }

  const selectedItem = items[selectedIndex] || items[0];
  const thumbnails = items.slice(0, 4); // Show max 4 thumbnails

  const handleThumbnailClick = (index: number) => {
    setSelectedIndex(index);
    if (onItemClick && items[index]) {
      onItemClick(items[index], index);
    }
  };

  const handleMainImageClick = () => {
    if (selectedItem.isVideo && selectedItem.videoUrl) {
      window.open(selectedItem.videoUrl, "_blank");
    }
  };

  return (
    <div className={cn("space-y-4", className)}>
      {/* Main Image */}
      <div className="relative w-full aspect-4/3 overflow-hidden rounded-lg group cursor-pointer">
        <Image
          src={selectedItem.src}
          alt={selectedItem.alt || `Gallery image ${selectedIndex + 1}`}
          width={800}
          height={600}
          className={cn(
            "w-full h-full object-cover transition-opacity duration-300 shadow-lg",
            mainImageClassName
          )}
          hasPreview
        />

        {/* Play Button Overlay for Videos */}
        {selectedItem.isVideo && showPlayButton && (
          <div
            className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors"
            onClick={handleMainImageClick}
          >
            <div className="bg-white/90 rounded-full p-4 group-hover:bg-white transition-colors">
              <Play className="w-8 h-8 text-gray-900 ml-1" fill="currentColor" />
            </div>
          </div>
        )}
      </div>

      {/* Thumbnail Row */}
      {thumbnails.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {thumbnails.map((item, index) => {
            const isSelected = selectedIndex === index;
            return (
              <div
                key={item.id}
                className={cn(
                  "relative aspect-4/3 overflow-hidden rounded-md cursor-pointer transition-all duration-200",
                  isSelected
                    ? "ring-2 ring-primary ring-offset-2"
                    : "opacity-70 hover:opacity-100",
                  thumbnailClassName
                )}
                onClick={() => handleThumbnailClick(index)}
              >
                <Image
                  src={item.src}
                  alt={item.alt || `Thumbnail ${index + 1}`}
                  width={200}
                  height={150}
                  className="w-full h-full object-cover"
                />

                {/* Play Button Overlay for Video Thumbnails */}
                {item.isVideo && showPlayButton && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                    <div className="bg-white/90 rounded-full p-2">
                      <Play className="w-4 h-4 text-gray-900 ml-0.5" fill="currentColor" />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default GalleryThumbnail;
