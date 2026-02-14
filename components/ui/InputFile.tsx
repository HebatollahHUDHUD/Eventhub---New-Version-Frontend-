"use client";

import { Paperclip, Trash2 } from "lucide-react";
import {
  FileInput,
  FileUploader,
  FileUploaderContent,
  FileUploaderItem,
} from "./file-upload";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { AttachmentType } from "@/schemas/types";
import { buttonVariants } from "./button";
import { cn } from "@/lib/utils";

const InputFile = ({
  files,
  onChange,
  id = `fileInput-${Math.random()}`,
  options = {},
  defaultValue = [],
}: {
  files: File[] | string[];
  defaultValue?: AttachmentType[];
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
              {t("drag-drop-text")} <span className="font-bold text-secondary">{t("images")}</span>
            </p>
            <p className="text-xs text-primary dark:text-primary">
              {t("or")} <span className="font-bold text-secondary">{t("browse")}</span> {t("on-computer")}
            </p>
          </div>

        </div>
      </FileInput>

      <FileUploaderContent>
        {defaultValue?.map((attachment, i) => (
          <div
            key={i}
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "h-6 p-1 flex justify-between gap-1 relative"
            )}
          >
            <a href={attachment.file_path} target="_blank" rel="noopener noreferrer" className="font-medium leading-none tracking-tight flex items-center gap-1.5 h-full w-full">
              <Paperclip className="h-4 w-4 stroke-current" />
              <span>{attachment.file_name}</span>
            </a>

            <button
              type="button"
              onClick={() => { }}
            >
              <span className="sr-only">remove item {i}</span>
              <Trash2 className="w-4 h-4 hover:stroke-destructive duration-200 ease-in-out" />
            </button>
          </div>
        ))}

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
