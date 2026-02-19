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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { useTranslations } from "next-intl";
import { SkillsFormSchema, SkillsFormType } from "@/lib/schemas";
import { useGetData, usePostData } from "@/hooks/useFetch";
import { toast } from "@/components/ui/toast";
import { LoaderIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TalentProfile } from "@/schemas/types";
import SelectPosition from "@/components/select/SelectPosition";
import SelectLanguage from "@/components/select/SelectLanguage";
import SelectSkills from "@/components/select/SelectSkillsTags";
import SelectBadge from "@/components/select/SelectBadge";
import InputFile from "@/components/ui/InputFile";
import { serialize } from "object-to-formdata";
import { useEffect } from "react";
import Image from "@/components/common/image";

const SkillsForm = ({ profile, refetch }: { profile: TalentProfile; refetch?: () => void }) => {
  const t = useTranslations("dashboard.skills-form");

  const endpoint = "/system-lookups?type=badge";
  const { data: BadgesData } = useGetData<any>({
    endpoint,
    queryKey: ["Badges", endpoint],
  });

  const badges = BadgesData?.status === "success" ? BadgesData?.result?.system_lookups : [];

  const form = useForm<SkillsFormType>({
    resolver: zodResolver(SkillsFormSchema),
    defaultValues: {
      position_id: profile?.position?.id || undefined,
      language_ids: profile?.languages?.map((language: any) => language.id) || [],
      skill_ids: profile?.skills?.map((skill: any) => skill.id) || [],
      badge_ids: profile?.badges?.map((badge: any) => badge.id) || [],
      experience_years: profile?.experience_years || undefined,
      bio: profile?.bio || "",
      available_for_work: profile?.available_for_work ? 1 : 0,
      price_per_project: profile?.price_per_project || undefined,
      facebook_url: "",
      instagram_url: profile?.instagram_url || "",
      youtube_url: profile?.youtube_url || "",
      linkedin_url: profile?.linkedin_url || "",
      resume: undefined,
    },
  });


  const { mutateAsync } = usePostData<SkillsFormType>({
    endpoint: "/profile",
  });

  async function onSubmit(values: SkillsFormType) {
    try {
      const formData = serialize(values, {
        indices: true,
      });

      const res = (await mutateAsync(formData as any)) as any;

      if (res.status === "success") {
        toast(res.message, "success");
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
          {t("title")}
        </CardTitle>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Resume Upload */}
            <FormField
              control={form.control}
              name="resume"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("resume")}</FormLabel>
                  <FormControl>
                    <InputFile
                      isResume={true}
                      files={field.value ? [field.value] : []}
                      onChange={(files) => field.onChange(files?.[0] || undefined)}
                      defaultValue={profile?.resume ? [profile?.resume] : []}
                      options={{
                        multiple: false,
                        maxFiles: 1,
                        accept: {
                          "application/pdf": [".pdf"],
                          "application/msword": [".doc"],
                          "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
                        },
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Current Position */}
              <FormField
                control={form.control}
                name="position_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("current-position")}</FormLabel>
                    <SelectPosition onChange={field.onChange} value={field.value} />
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Years of Experience */}
              <FormField
                control={form.control}
                name="experience_years"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("years-of-experience")}</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        min={0}
                        placeholder={t("enter-years-of-experience")}
                        onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : undefined)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* About Me */}
              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem className="col-span-full">
                    <FormLabel>{t("about-me")}</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder={t("enter-about-me")}
                        className="min-h-[120px]"
                        maxLength={250}
                      />
                    </FormControl>
                    <div className="text-sm text-muted-foreground">
                      {field.value?.length || 0}/250 {t("max-letters")}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Availability to work Now */}
              <FormField
                control={form.control}
                name="available_for_work"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("availability-to-work")}</FormLabel>
                    <FormControl>
                      <RadioGroup
                        value={field.value?.toString()}
                        onValueChange={(value) => field.onChange(parseInt(value))}
                        className="flex gap-6"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="1" id="available-yes" />
                          <label htmlFor="available-yes" className="cursor-pointer">
                            {t("yes")}
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="0" id="available-no" />
                          <label htmlFor="available-no" className="cursor-pointer">
                            {t("no")}
                          </label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Price / Project */}
              <FormField
                control={form.control}
                name="price_per_project"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("price-per-project")}</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        min={0}
                        placeholder={t("enter-price-per-project")}
                        onChange={(e) => field.onChange(e.target.value ? parseFloat(e.target.value) : undefined)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Availabilities Badges */}

              <div className="col-span-full space-y-2">
                <FormLabel>{t("availabilities-badges")}</FormLabel>


                <div className="py-4 space-y-2 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                  {badges?.map((badge: any) => (
                    <div key={badge.id} className="flex items-center gap-2">
                      <Checkbox id={badge.id.toString()}
                        checked={form.watch("badge_ids")?.includes(badge.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            form.setValue("badge_ids", [...form.watch("badge_ids") || [], badge.id]);
                          } else {
                            form.setValue("badge_ids", form.watch("badge_ids")?.filter((id: number) => id !== badge.id) || []);
                          }
                        }}
                      />
                      <div className="flex flex-col items-center justify-center">
                        <Image src={badge.image} alt={badge.name} width={100} height={100} className="w-9 h-9 object-contain" />

                        <label htmlFor={badge.id.toString()} className="cursor-pointer text-sm">{badge.name}</label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>


              {/* Skills/Tags */}
              <FormField
                control={form.control}
                name="skill_ids"
                render={({ field }) => (
                  <FormItem className="col-span-full">
                    <FormLabel>{t("skills-tags")}</FormLabel>
                    <SelectSkills
                      isMultiple
                      value={field.value || []}
                      onChange={field.onChange}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Languages */}
              <FormField
                control={form.control}
                name="language_ids"
                render={({ field }) => (
                  <FormItem className="col-span-full">
                    <FormLabel>{t("languages")}</FormLabel>
                    <SelectLanguage
                      isMultiple
                      value={field.value || []}
                      onChange={field.onChange}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Social Media Links */}
              <FormField
                control={form.control}
                name="facebook_url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("facebook-link")}</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder={t("enter-facebook-link")}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="instagram_url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("instagram-link")}</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder={t("enter-instagram-link")}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="youtube_url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("youtube-link")}</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder={t("enter-youtube-link")}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="linkedin_url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("linkedin-link")}</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder={t("enter-linkedin-link")}
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
                {t("save")}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default SkillsForm;
