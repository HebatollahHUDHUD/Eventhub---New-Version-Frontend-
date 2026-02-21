"use client";

import { useState } from "react";
import Image from "@/components/common/image";
import { Play } from "lucide-react";
import { cn } from "@/lib/utils";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel";

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
  const thumbnails = items // Show max 4 thumbnails

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
        {selectedItem.isVideo ?
          <video
            src={selectedItem.src}
            controls
            width={800}
            height={600}
            className="w-full h-full object-contain"
          />
          :
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
        }
      </div>

      {/* Thumbnail Row */}

      {thumbnails.length > 1 && (
        <div dir="ltr">
          <Carousel
            opts={{
              align: "start"
            }}
          >
            <CarouselContent>
              {thumbnails.map((item, index) => {
                const isSelected = selectedIndex === index;
                return (
                  <CarouselItem
                    key={item.id}
                    className={cn(
                      "basis-1/4 relative aspect-4/3 overflow-hidden rounded-md cursor-pointer transition-all duration-200",
                      isSelected
                        ? "ring-2 ring-primary ring-offset-2"
                        : "opacity-70 hover:opacity-100",
                      thumbnailClassName
                    )}
                    onClick={() => handleThumbnailClick(index)}
                  >
                    {item.isVideo ?
                      <video
                        src={item.src}
                        controls
                        width={200}
                        height={150}
                        className="w-full h-full object-contain"
                      />
                      :
                      <Image
                        src={item.src}
                        alt={item.alt || `Thumbnail ${index + 1}`}
                        width={200}
                        height={150}
                        className="w-full h-full object-cover"
                      />
                    }

                  </CarouselItem>
                );
              })}
            </CarouselContent>

            <CarouselPrevious className="rounded-md bg-muted" />
            <CarouselNext className="rounded-md bg-muted" />
          </Carousel>
        </div>

      )}
    </div>
  );
};

export default GalleryThumbnail;
