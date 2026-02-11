"use client";

import { useState, type ReactNode } from "react";
import { Loader2 } from "lucide-react";
import { Button, type buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { VariantProps } from "class-variance-authority";

interface DownloadButtonProps
  extends VariantProps<typeof buttonVariants> {
  url: string;
  label: string;
  icon?: ReactNode;
  filename?: string;
  className?: string;
}

export default function DownloadButton({
  url,
  label,
  icon,
  filename,
  variant = "pink",
  size = "lg",
  className,
}: DownloadButtonProps) {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    if (!url || isDownloading) return;

    setIsDownloading(true);

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Download failed");
      }

      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);

      // Extract filename from URL or Content-Disposition header, or use provided filename
      const resolvedFilename =
        filename ||
        response.headers.get("Content-Disposition")?.split("filename=")[1]?.replace(/"/g, "") ||
        url.split("/").pop() ||
        "download";

      const anchor = document.createElement("a");
      anchor.href = blobUrl;
      anchor.download = resolvedFilename;
      document.body.appendChild(anchor);
      anchor.click();

      // Cleanup
      document.body.removeChild(anchor);
      window.URL.revokeObjectURL(blobUrl);
    } catch {
      // Fallback: open the URL directly in a new tab
      window.open(url, "_blank", "noopener,noreferrer");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleDownload}
      disabled={isDownloading}
      className={cn("rounded-full", className)}
    >
      {label}
      {isDownloading ? (
        <Loader2 className="size-4 animate-spin" />
      ) : (
        icon
      )}
    </Button>
  );
}
