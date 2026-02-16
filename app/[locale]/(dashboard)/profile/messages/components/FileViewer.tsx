
import Image from "@/components/common/image";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

const FileViewer = ({
  url,
  className,
  width,
  height,
  fileName,
  hasBg,
}: {
  url: string;
  className?: string;
  width?: number;
  height?: number;
  fileName?: string;
  hasBg?: boolean;
}) => {
  const t = useTranslations("messages");

  const ext = url.split(".").pop()?.toLowerCase();

  if (["png", "jpg", "jpeg", "gif", "webp", "svg"].includes(ext!)) {
    return (
      <div className={cn("flex gap-2 items-start rounded-md", hasBg && "bg-muted")}>
        <Image
          src={url}
          alt="file"
          className={cn("rounded-md", className)}
          width={width}
          height={height}
        />
      </div>
    );
  }

  if (["mp4", "webm", "ogg"].includes(ext!)) {
    return <video src={url} controls className={className} />;
  }

  if (["mp3", "wav", "ogg"].includes(ext!)) {
    return <audio src={url} controls className="w-full" />;
  }

  if (["pdf", "doc", "docx", "xls", "xlsx", "ppt", "pptx"].includes(ext!)) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex gap-2 items-center p-2 rounded-md bg-white/10 w-full h-full"
      >
        <Image
          src={`/images/files/${ext}.png`}
          alt={fileName || "file"}
          className={"w-10 h-10 object-contain"}
          width={width}
          height={height}
        />

        <p className="text-sm wrap-break-word max-w-40">{fileName}</p>
      </a>
    );
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-600 underline"
    >
      {fileName || t("download_file")}
    </a>
  );
};

export default FileViewer;
