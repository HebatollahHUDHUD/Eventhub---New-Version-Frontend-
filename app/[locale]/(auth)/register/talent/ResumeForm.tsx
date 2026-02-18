"use client";

import * as z from "zod";
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
import { useTranslations } from "next-intl";
import { usePostData } from "@/hooks/useFetch";
import { toast } from "@/components/ui/toast";
import { LoaderIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import InputFile from "@/components/ui/InputFile";
import { serialize } from "object-to-formdata";

const resumeSchema = z.object({
  resume: z.instanceof(File).optional(),
});

const ResumeForm = ({ onSuccess }: { onSuccess: (data: any) => void }) => {
  const t = useTranslations("auth");

  const form = useForm<z.infer<typeof resumeSchema>>({
    resolver: zodResolver(resumeSchema),
    defaultValues: {
      resume: undefined,
    },
  });

  const { mutateAsync } = usePostData<z.infer<typeof resumeSchema>>({
    endpoint: "/auth/extract-resume",
  });

  async function onSubmit(values: z.infer<typeof resumeSchema>) {
    try {
      const res = (await mutateAsync(
        serialize(values)
      )) as any;

      if (res.status === "success") {
        toast(t("resume.success-msg"), "success");
        onSuccess({
          resume: values.resume,
          ...res.result,
        });
      } else {
        toast(res.message || t("resume.upload-failed"), "destructive");
      }
    } catch (error: any) {
      console.log(error);
      toast(
        error?.response?.data?.message ||
        "Failed to login. Please try again.",
        "destructive"
      );
    }
  }

  const isLoading = form.formState.isSubmitting;

  return (
    <Card className="max-w-2xl mx-auto">
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="resume"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <InputFile
                      isResume
                      files={field.value ? [field.value as File] : []}
                      onChange={(value) => field.onChange(value?.[0])}
                      options={{
                        accept: {
                          "application/pdf": [".pdf"],
                        },
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />


            <div className="flex justify-end">
              <Button
                type="submit"
                size={"lg"}
                disabled={isLoading}
                variant={"accentSecondary"}
              >
                {isLoading ? (
                  <LoaderIcon className="animate-spin" />
                ) : (
                  t("upload-resume")
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ResumeForm;
