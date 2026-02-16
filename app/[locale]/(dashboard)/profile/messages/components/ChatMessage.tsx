"use client";

import { cn } from "@/lib/utils";
import moment from "moment";
import FileViewer from "./FileViewer";
import { useLocale } from "next-intl";
import { MessageType } from "@/schemas/messages";
import MessageAvatar from "./MessageAvatar";
import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { useTranslations } from "next-intl";

interface ChatMessageProps {
  msg: MessageType;
  showAvatar?: boolean;
  showSenderName?: boolean;
  isGrouped?: boolean;
}

export const ChatMessage = ({
  msg,
  showAvatar = true,
  showSenderName = true,
  isGrouped = false
}: ChatMessageProps) => {
  const t = useTranslations("messages");
  const isUser = msg.is_mine;
  const [copied, setCopied] = useState(false);

  const formatDate = (dateString?: string) => {
    if (!dateString) return "";

    const date = moment(dateString);
    const now = moment();

    if (date.isSame(now, "day")) {
      return date.format("HH:mm");
    }

    if (date.isSame(now, "year")) {
      return date.format("MMM DD, HH:mm");
    }

    return date.format("YYYY-MM-DD HH:mm");
  };

  const copyToClipboard = async () => {
    if (msg.body) {
      await navigator.clipboard.writeText(msg.body);
      setCopied(true);
      toast(t("message-copied-to-clipboard") || "Message copied to clipboard", "default");
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className={cn(
      "flex gap-2 group/message",
      isUser ? "justify-end" : "justify-start",
      !isGrouped && "mt-4"
    )}>
      {!isUser && showAvatar && (
        <div className={cn("shrink-0", isGrouped && "opacity-0")}>
          <MessageAvatar
            image={msg.sender?.photo || ""}
            name={msg.sender?.name || ""}
            size="sm"
          />
        </div>
      )}

      <div
        className={cn(
          "group min-w-[100px] rounded-md max-w-[70%] relative space-y-1",
          isUser ? "text-end" : "text-start"
        )}
      >
        {!isUser && showSenderName && !isGrouped && (
          <p className="text-xs font-medium text-muted-foreground mb-1 px-1">
            {msg.sender?.name || ""}
          </p>
        )}

        <div className={cn(
          "space-y-2 px-3 py-2 rounded-lg relative",
          isUser
            ? "bg-primary text-primary-foreground"
            : "bg-muted text-foreground",
          "hover:opacity-90 transition-opacity"
        )}>
          {msg.body && (
            <div className="flex items-start gap-2 group/copy">
              <p className="whitespace-pre-wrap">{msg.body}</p>
              {msg.body && (
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "h-6 w-6 opacity-0 group-hover/copy:opacity-100 transition-opacity",
                    isUser ? "text-primary-foreground/70 hover:text-primary-foreground" : "text-muted-foreground"
                  )}
                  onClick={copyToClipboard}
                >
                  {copied ? (
                    <Check className="h-3 w-3" />
                  ) : (
                    <Copy className="h-3 w-3" />
                  )}
                </Button>
              )}
            </div>
          )}

          {msg.attachments?.length > 1 ? (
            <div
              className={cn(
                "text-sm grid grid-cols-2 gap-2 max-w-[460px]",
                msg.body ? "mt-2 pt-2 border-t border-current/20" : ""
              )}
            >
              {msg.attachments.map((file, i) => (
                <div key={i} className="flex items-center">
                  <FileViewer
                    url={file.file_path}
                    fileName={file.file_name}
                    width={200}
                    height={200}
                    hasBg
                    className="w-full h-auto object-contain"
                  />
                </div>
              ))}
            </div>
          ) : msg.attachments?.length === 1 ? (
            <div
              className={cn(
                "space-y-1 text-sm",
                msg.body ? "mt-2 pt-2 border-t border-current/20" : ""
              )}
            >
              {msg.attachments.map((file: any, i: number) => (
                <FileViewer
                  key={i}
                  url={file.file_path}
                  fileName={file.file_name}
                  width={200}
                  height={200}
                  hasBg
                  className="max-w-[200px] w-full h-auto object-contain"
                />
              ))}
            </div>
          ) : null}
        </div>

        <p className="text-xs opacity-60 mt-1 px-1">
          {formatDate(msg.created_at)}
        </p>
      </div>
    </div>
  );
};
