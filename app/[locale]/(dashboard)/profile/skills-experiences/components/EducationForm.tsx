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
import { useTranslations } from "next-intl";
import { EducationSchema, EducationType } from "@/lib/schemas";
import { usePostData } from "@/hooks/useFetch";
import { toast } from "@/components/ui/toast";
import { LoaderIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TalentProfile } from "@/schemas/types";
import DeleteModal from "@/components/common/DeleteAlert";
import ViewEducationDialog from "./ViewEducationDialog";

const EducationForm = ({ profile, refetch }: { profile: TalentProfile, refetch?: () => void }) => {
  const t = useTranslations("dashboard.skills-experiences");
  const form = useForm<EducationType>({
    resolver: zodResolver(EducationSchema),
    defaultValues: {
      major: "",
      university: "",
      from_date: "",
      to_date: "",
    },
  });

  const { mutateAsync } = usePostData<EducationType>({
    endpoint: "/profile/educations",
  });

  async function onSubmit(values: EducationType) {
    try {
      const res = (await mutateAsync(values as any)) as any;

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
      toast(t("error-msg") || "Failed to submit. Please try again.", "destructive");
    }
  }

  const isLoading = form.formState.isSubmitting;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {t("education")}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="major"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("major")}</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder={t("enter-major")}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="university"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("university")}</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder={t("enter-university")}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="from_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("from-date")}</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="date"
                        placeholder={t("enter-from-date")}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="to_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("to-date")}</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="date"
                        placeholder={t("enter-to-date")}
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
                {t("add")}
              </Button>
            </div>
          </form>
        </Form>

        {profile.educations.length > 0 && (
          <div className="space-y-2">
            {profile.educations?.map((education, index) => (
              <div className="flex items-center gap-2">
                <span>{index + 1}-</span>
                <div className="flex-1 px-4 py-2 flex items-center justify-between bg-muted rounded-md">
                  <div className="flex items-center gap-2">
                    <p className="title-xs font-semibold">{education.major},</p>
                    <p className="text-sm text-muted-foreground">{education.university}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <ViewEducationDialog education={education} />

                    <DeleteModal
                      endpoint={`/profile/educations/${education.id}`}
                      refetch={refetch}
                      disabled={isLoading}
                      size="icon"
                      isIcon={true}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EducationForm;
