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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useTranslations, useLocale } from "next-intl";
import { jobAdSchema } from "@/lib/schemas";
import { usePostData } from "@/hooks/useFetch";
import { toast } from "@/components/ui/toast";
import { LoaderIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SelectCountry from "@/components/select/SelectCountry";
import SelectSkills from "@/components/select/SelectSkillsTags";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { serialize } from "object-to-formdata";
import InputFile from "@/components/ui/InputFile";
import { JobAd } from "@/schemas/types";
import Status, { StatusType } from "@/components/common/Status";

const JobAdForm = ({ refetch, jobAd, isUpdate }: { refetch: () => void, jobAd?: JobAd | null, isUpdate?: boolean }) => {
  const t = useTranslations("dashboard.job-ads");
  const form = useForm<z.infer<typeof jobAdSchema>>({
    resolver: zodResolver(jobAdSchema),
    defaultValues: {
      title: { en: "" },
      about: { en: "" },
      country_id: undefined,
      gender: undefined,
      experience_years: undefined,
      skill_ids: [],
      attachments: [],

      ...(jobAd ? {
        id: jobAd.id,
        title: { en: jobAd.title?.en },
        about: { en: jobAd.about.en },
        country_id: jobAd.country.id,
        gender: jobAd.gender as "male" | "female" | "both" | undefined,
        experience_years: jobAd.experience_years.toString(),
        skill_ids: jobAd.skills.map((skill) => skill.id),
      } : {}),
    },
  });

  const { mutateAsync } = usePostData<z.infer<typeof jobAdSchema>>({
    endpoint: "/profile/job-ads",
  });

  async function onSubmit(values: z.infer<typeof jobAdSchema>) {
    try {
      const formData = serialize(values, {
        indices: true,
      });

      const res = (await mutateAsync(formData as any)) as any;

      if (res.status === "success") {
        toast(res.message, "success");
        form.reset();
        refetch();
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
          {isUpdate ? t("job-ad-details") : t("add-job-ad")}

          {isUpdate && (
            <Status
              status={jobAd?.status as StatusType || "active"}
            />
          )}
        </CardTitle>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="title.en"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("job-title")}</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder={t("enter-job-title")}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="country_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("country")}</FormLabel>
                    <SelectCountry onChange={field.onChange} value={field.value} />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="skill_ids"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("job-skills-tags")}</FormLabel>
                    <FormControl>
                      <SelectSkills
                        isMultiple
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="experience_years"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("years-of-experience")}</FormLabel>
                    <Input
                      {...field}
                      type="number"
                      min={0}
                      max={50}
                      placeholder={t("enter-experience-years")}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("gender")}</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={t("select-gender")} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="male">{t("male")}</SelectItem>
                        <SelectItem value="female">{t("female")}</SelectItem>
                        <SelectItem value="both">{t("both")}</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="about.en"
                render={({ field }) => (
                  <FormItem className="col-span-full">
                    <FormLabel>{t("about-the-job")}</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder={t("enter-about-job")}
                        {...field}
                        className="min-h-[120px]"
                        maxLength={250}
                      />
                    </FormControl>
                    <div className="text-sm text-muted-foreground">
                      {field.value?.toString().length || 0}/250 {t("max-letters")}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="attachments"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("job-image")}</FormLabel>
                    <FormControl>
                      <InputFile
                        files={field.value || []}
                        defaultValue={jobAd?.attachments || []}
                        onChange={field.onChange}
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

                {isUpdate ? t("update-job-ad") : t("add-job-ad")}

              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default JobAdForm;
