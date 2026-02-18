"use client";

import { XIcon, Loader2 } from "lucide-react";
import NextImage, { ImageProps } from "next/image";
import { useState, useEffect } from "react";

type CustomImageProps = Omit<ImageProps, "src" | "alt"> & {
  src?: string;
  alt?: string;
  hasPreview?: boolean;
  fallback?: string;
  className?: string;
};

// Helper function to check if src is valid (local path or external URL)
const isValidSrc = (src?: string): boolean => {
  if (!src) return false;
  return src.startsWith("/") || src.startsWith("http://") || src.startsWith("https://");
};

const Image = ({
  src,
  hasPreview,
  alt,
  fallback = "/images/placeholder.png",
  className,
  ...props
}: CustomImageProps) => {
  const [isView, setIsView] = useState(false);

  // Check if src is valid (local path or external URL), if not use fallback
  const [imgSrc, setImgSrc] = useState(() => {
    if (!src) return fallback;
    return isValidSrc(src) ? src : fallback;
  });
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Reset state when src changes
  useEffect(() => {
    const validSrc = !src ? fallback : (isValidSrc(src) ? src : fallback);
    if (validSrc) {
      setImgSrc(validSrc);
      setHasError(false);
      setIsLoading(true);
    } else {
      setImgSrc(fallback);
      setHasError(false);
      setIsLoading(false);
    }
  }, [src, fallback]);

  // Handle image load error using a hidden test image
  useEffect(() => {
    const validSrc = !src ? fallback : (isValidSrc(src) ? src : fallback);
    if (!validSrc || hasError || validSrc === fallback) return;

    const testImg = new window.Image();
    testImg.onload = () => {
      setIsLoading(false);
      setHasError(false);
    };
    testImg.onerror = () => {
      setHasError(true);
      setImgSrc(fallback);
      setIsLoading(false);
    };
    testImg.src = validSrc;

    return () => {
      testImg.onload = null;
      testImg.onerror = null;
    };
  }, [src, fallback, hasError]);

  // Handle keyboard events for preview modal
  useEffect(() => {
    if (!isView) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsView(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isView]);

  const handleImageClick = () => {
    if (hasPreview && !hasError && imgSrc !== fallback) {
      setIsView(true);
    }
  };

  const currentSrc = hasError ? fallback : imgSrc;

  return (
    <>
      <div className={`relative ${className || ""}`}>
        {isLoading && !hasError && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 animate-pulse">
            <Loader2 className="w-6 h-6 text-gray-400 animate-spin" />
          </div>
        )}
        <NextImage
          {...props}
          src={currentSrc}
          alt={alt ?? "image"}
          className={`transition-opacity duration-300 ${isLoading && !hasError ? "opacity-0" : "opacity-100"
            } ${hasPreview && !hasError && currentSrc !== fallback ? "cursor-pointer hover:opacity-90" : ""} ${className || ""}`}
          onClick={handleImageClick}
          onLoad={() => setIsLoading(false)}
          onError={() => {
            if (!hasError) {
              setHasError(true);
              setImgSrc(fallback);
              setIsLoading(false);
            }
          }}
          quality={100}
        />
      </div>

      {isView && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex justify-center items-center z-50 px-4 animate-in fade-in duration-200"
          onClick={() => setIsView(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Image preview"
        >
          <div
            className="bg-white dark:bg-gray-900 py-8 px-4 flex-1 max-w-4xl flex flex-col justify-center items-center gap-5 rounded-lg relative shadow-2xl animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsView(false)}
              className="absolute top-3 right-3 w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400"
              aria-label="Close preview"
            >
              <XIcon size={20} className="text-gray-700 dark:text-gray-300" />
            </button>
            <NextImage
              src={currentSrc}
              alt={alt ?? "image"}
              width={1200}
              height={1200}
              unoptimized
              className="w-full h-auto object-contain my-5 max-h-[80vh]"
              priority
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Image;
