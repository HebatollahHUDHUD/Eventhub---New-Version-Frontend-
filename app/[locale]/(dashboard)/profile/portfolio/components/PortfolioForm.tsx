"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useTranslations } from "next-intl";
import { PortfolioSchema, PortfolioType } from "@/lib/schemas";
import { usePostData } from "@/hooks/useFetch";
import { toast } from "@/components/ui/toast";
import { LoaderIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import InputFile from "@/components/ui/InputFile";
import { serialize } from "object-to-formdata";
import { TalentProfile, Project } from "@/schemas/types";
import { useEffect } from "react";
import { useLocale } from "next-intl";

const PortfolioForm = ({
  refetch,
  project,
  isUpdate
}: {
  refetch?: () => void;
  project?: Project | null;
  isUpdate?: boolean;
}) => {
  const t = useTranslations("dashboard.portfolio");
  const locale = useLocale();

  const form = useForm<PortfolioType>({
    resolver: zodResolver(PortfolioSchema),
    defaultValues: {
      title: { en: "" },
      description: { en: "" },
      date: "",
      attachments: [],
    },
  });

  // Populate form when editing
  useEffect(() => {
    if (project && isUpdate) {
      const titleEn = typeof project.title === "string"
        ? project.title
        : (project.title as Record<string, string>)?.en || "";

      const descriptionEn = typeof project.description === "string"
        ? project.description
        : (project.description as Record<string, string>)?.en || "";

      form.reset({
        id: project.id,
        title: {
          en: titleEn,
          ar: typeof project.title === "object" ? (project.title as Record<string, string>)?.ar : undefined
        },
        description: {
          en: descriptionEn,
          ar: typeof project.description === "object" ? (project.description as Record<string, string>)?.ar : undefined
        },
        date: project.date,
        attachments: [],
      });
    } else {
      form.reset({
        title: { en: "" },
        description: { en: "" },
        date: "",
        attachments: [],
      });
    }
  }, [project, isUpdate, form]);

  const { mutateAsync } = usePostData<PortfolioType>({
    endpoint: "/profile/projects",
  });

  async function onSubmit(values: PortfolioType) {
    try {
      const formData = serialize(values, {
        indices: true,
      });

      const res = (await mutateAsync(formData as any)) as any;

      if (res.status === "success") {
        toast(res.message, "success");
        form.reset();
        refetch?.();
        return;
      } else {
        toast(res.message, "destructive");
      }
    } catch (error) {
      console.log(error);
      toast(t("error-msg"), "destructive");
    }
  }

  const isLoading = form.formState.isSubmitting;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {isUpdate ? t("edit-project") || "Edit Project" : t("title")}
        </CardTitle>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Project Name */}
              <FormField
                control={form.control}
                name="title.en"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("project-name")}</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder={t("enter-project-name")}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Date */}
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("date")}</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="date"
                        placeholder={t("enter-date")}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Description */}
              <FormField
                control={form.control}
                name="description.en"
                render={({ field }) => (
                  <FormItem className="col-span-full">
                    <FormLabel>{t("description")}</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder={t("enter-description")}
                        className="min-h-[120px]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Images & Videos Upload */}
              <FormField
                control={form.control}
                name="attachments"
                render={({ field }) => (
                  <FormItem className="col-span-full">
                    <FormLabel>{t("images-videos")}</FormLabel>
                    <FormControl>
                      <InputFile
                        files={field.value || []}
                        defaultValue={project?.attachments || []}
                        onChange={field.onChange}
                        options={{
                          multiple: true,
                          maxFiles: 10,
                          accept: {
                            "image/*": [".jpg", ".jpeg", ".png", ".gif", ".webp"],
                            "video/*": [".mp4", ".mov", ".avi", ".mkv", ".webm"],
                          },
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-end">
              <Button
                type="submit"
                size={"lg"}
                disabled={isLoading}
                variant={"accentSecondary"}
              >
                {isLoading && (
                  <LoaderIcon className="animate-spin" />
                )}
                {isUpdate ? t("update") : t("save")}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default PortfolioForm;
