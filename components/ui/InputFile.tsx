"use client";

import { CloudUpload, Paperclip } from "lucide-react";
import {
  FileInput,
  FileUploader,
  FileUploaderContent,
  FileUploaderItem,
} from "./file-upload";
import Image from "next/image";
import { useTranslations } from "next-intl";

const InputFile = ({
  files,
  onChange,
  id = `fileInput-${Math.random()}`,
  options = {},
}: {
  files: File[] | string[];
  onChange: (value: File[] | null) => void;
  id?: string;
  options?: {
    multiple?: boolean;
    maxFiles?: number;
    maxSize?: number;
    accept?: { [key: string]: string[] };
  };
}) => {
  const t = useTranslations("common.file-upload");
  
  const dropZoneConfig = {
    maxFiles: 5,
    maxSize: 1024 * 1024 * 4,
    multiple: true,
    ...options,
  };

  return (
    <FileUploader
      value={
        Array.isArray(files) && files.length > 0 && typeof files[0] !== "string"
          ? (files as File[])
          : null
      }
      onValueChange={onChange}
      dropzoneOptions={dropZoneConfig}
      className="relative bg-background rounded-lg p-2"
    >
      <FileInput id={id} className="border-dashed shadow-none">
        <div className="flex items-center justify-center flex-col gap-4 p-8 w-full ">
          <Image
            src={"/images/upload.png"}
            alt="upload"
            width={300}
            height={300}
            quality={100}
            className="w-40 h-36 object-contain"
          />
          <div className="space-y-1">
            <p className="text-sm font-semibold text-primary dark:text-primary">
              {t("drag-drop-text") || "Drag & Drop your"} <span className="font-bold text-secondary">{t("images") || "Images"}</span>
            </p>
            <p className="text-xs text-primary dark:text-primary">
              {t("or") || "Or"} <span className="font-bold text-secondary">{t("browse") || "browse"}</span> {t("on-computer") || "on your computer"}
            </p>
          </div>

        </div>
      </FileInput>

      <FileUploaderContent>
        {files &&
          files.length > 0 &&
          files.map((file, i) => (
            <FileUploaderItem key={i} index={i}>
              <a
                href={
                  typeof file === "string" ? file : URL.createObjectURL(file)
                }
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium leading-none tracking-tight flex items-center gap-1.5 h-full w-full"
              >
                <Paperclip className="h-4 w-4 stroke-current" />
                <span>{typeof file === "string" ? file : file.name}</span>
              </a>
            </FileUploaderItem>
          ))}
      </FileUploaderContent>
    </FileUploader>
  );
};

export default InputFile;
