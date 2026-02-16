"use client";

import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormControl } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Paperclip, Send, X, Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "@/components/common/image";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

import { toast } from "@/components/ui/toast";
import { serialize } from "object-to-formdata";
import { usePostData } from "@/hooks/useFetch";

interface ChatInputFormProps {
  refetch: () => void;
  onSend: () => void;
  conversation_id: number;
  onOptimisticMessage?: (messageData: { body?: string; attachments: File[] }) => void;
}

interface SendMessageFormData {
  body?: string;
  attachments: File[];
}

export const ChatInputForm = ({
  refetch,
  conversation_id,
  onSend,
  onOptimisticMessage,
}: ChatInputFormProps) => {
  const t = useTranslations("messages");
  const [previewOpen, setPreviewOpen] = useState(false);
  const [formData, setFormData] = useState(1)
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const form = useForm<SendMessageFormData>({
    defaultValues: { body: undefined, attachments: [] },
  });

  const {
    setValue,
    watch,
    reset,
    formState: { isSubmitting },
  } = form;

  // Auto-resize textarea
  const bodyValue = watch("body");
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [bodyValue]);

  const handleFiles = (files: FileList | null) => {
    const prev = watch("attachments");

    if (files) {
      setValue("attachments", [...prev, ...Array.from(files)]);
      setPreviewOpen(true);
    }
  };

  const handleDeleteAttachment = (index: number) => {
    const prev = watch("attachments");
    setValue(
      "attachments",
      prev.filter((_, i) => i !== index)
    );
  };

  const { mutateAsync } = usePostData({
    endpoint: `/messages/conversations/${conversation_id}/send`,
  });

  async function onSubmit(data: SendMessageFormData) {
    const values = {
      body: data.body,
      attachments: data.attachments,
    }

    if (!values.body && values.attachments.length === 0) {
      return toast(t("please_enter_message_or_attach_files"), "destructive");
    }

    if (!data.body) {
      values.body = undefined;
    }

    const formData = serialize(values, {
      indices: true,
      nullsAsUndefineds: true,
      booleansAsIntegers: true,
    });

    if (onOptimisticMessage) {
      onOptimisticMessage({
        body: values.body,
        attachments: values.attachments,
      });

      setFormData(prev => prev + 1);
    }

    reset({
      body: undefined,
      attachments: [],
    });

    setPreviewOpen(false);

    try {
      const res = await mutateAsync(formData as any);

      onSend();

      if (res?.status === "success") {
      } else {
        toast(res?.message || t("error_sending_message"), "destructive");
      }

      refetch();

    } catch (error: any) {
      toast(
        error?.response?.data?.message || t("error_sending_message"),
        "destructive"
      );
      refetch();
    }
  }

  const isDisabled =
    ((!watch("body") || watch("body")?.trim() === "") &&
      watch("attachments").length === 0) ||
    isSubmitting;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex items-center gap-2"
        key={formData}
      >
        <FormField
          control={form.control}
          name="body"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <Textarea
                  {...field}
                  ref={(e) => {
                    field.ref(e);
                    textareaRef.current = e;
                  }}
                  placeholder={t("type-a-message")}
                  rows={1}
                  className="resize-none min-h-[40px] max-h-[120px] overflow-y-auto"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      if (!isDisabled) {
                        form.handleSubmit(onSubmit)();
                      }
                    }
                  }}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="attachments"
          render={() => (
            <FormItem>
              <FormControl>
                <input
                  type="file"
                  multiple
                  id="chat-files"
                  className="hidden"
                  onChange={(e) => handleFiles(e.target.files)}
                />
              </FormControl>

              <label
                htmlFor="chat-files"
                className="h-10 w-10 flex items-center justify-center hover:bg-muted hover:text-muted-foreground"
              >
                <Paperclip className="w-5 h-5" />
              </label>
            </FormItem>
          )}
        />

        {/* Preview Dialog */}
        <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>{t("selected-attachments")}</DialogTitle>
            </DialogHeader>

            <div className="grid grid-cols-3 gap-3 py-3">
              {watch("attachments")?.map((file, index) => {
                const isImage = file.type.startsWith("image/");
                const isVideo = file.type.startsWith("video/");
                return (
                  <div
                    key={index}
                    className="relative border rounded-lg overflow-hidden group"
                  >
                    {isImage ? (
                      <Image
                        src={URL.createObjectURL(file)}
                        alt={file.name}
                        width={100}
                        height={100}
                        className="object-contain w-full h-auto aspect-5/3"
                      />
                    ) : isVideo ? (
                      <video
                        src={URL.createObjectURL(file)}
                        className="object-contain w-full h-auto aspect-5/3"
                        controls={false}
                      />
                    ) : (
                      <div className="flex items-center justify-center h-auto aspect-5/3 text-xs text-muted-foreground p-2">
                        {file.name}
                      </div>
                    )}

                    <Button
                      size="icon"
                      variant="destructive"
                      className="absolute top-1 right-1 h-6 w-6 opacity-80"
                      onClick={() => handleDeleteAttachment(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                );
              })}

              {/* Add More */}
              <label
                htmlFor="chat-files"
                className="flex flex-col items-center justify-center border border-dashed rounded-lg h-auto aspect-5/3 cursor-pointer hover:bg-accent/30 transition"
              >
                <Plus className="w-6 h-6 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">{t("add-more")}</span>
              </label>
            </div>

            <DialogFooter>
              <Button
                onClick={() => setPreviewOpen(false)}
                variant="outline"
                type="button"
              >
                {t("cancel")}
              </Button>
              <Button
                onClick={form.handleSubmit(onSubmit)}
                disabled={isDisabled}
              >
                {t("send")}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Button type="submit" size="icon" disabled={isDisabled}>
          <Send className="w-5 h-5" />
        </Button>
      </form>
    </Form>
  );
};
