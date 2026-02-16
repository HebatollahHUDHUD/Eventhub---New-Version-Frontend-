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
import { Checkbox } from "@/components/ui/checkbox";
import { useTranslations } from "next-intl";
import { ExperienceSchema, ExperienceType } from "@/lib/schemas";
import { usePostData } from "@/hooks/useFetch";
import { toast } from "@/components/ui/toast";
import { LoaderIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SelectCompany from "@/components/select/SelectCompany";
import SelectPosition from "@/components/select/SelectPosition";
import { TalentProfile } from "@/schemas/types";
import DeleteModal from "@/components/common/DeleteAlert";
import ViewExperienceDialog from "./ViewExperienceDialog";

const ExperienceForm = ({ profile, refetch }: { profile: TalentProfile, refetch?: () => void }) => {
  const t = useTranslations("dashboard.skills-experiences");
  const form = useForm<ExperienceType>({
    resolver: zodResolver(ExperienceSchema),
    defaultValues: {
      company_id: undefined,
      position_id: undefined,
      other_company: "",
      other_position: "",
      from_date: "",
      to_date: undefined,
      is_current: 0 as number,
      description: "",
    },
  });

  const isCurrent = form.watch("is_current") === 1;


  const { mutateAsync } = usePostData<ExperienceType>({
    endpoint: "/profile/experiences",
  });

  async function onSubmit(values: ExperienceType) {
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
      toast(t("error-msg"), "destructive");
    }
  }

  const isLoading = form.formState.isSubmitting;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {t("experience")}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="position_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("position")}</FormLabel>
                    <SelectPosition
                      onChange={(value) => {
                        field.onChange(value);
                        // Clear other_position when position_id is selected
                        if (value) {
                          form.setValue("other_position", "");
                        }
                      }}
                      value={field.value}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="company_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("company")}</FormLabel>
                    <SelectCompany
                      onChange={field.onChange}
                      value={field.value}
                    />
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
                        disabled={isCurrent}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="is_current"
                render={({ field }) => (
                  <FormItem className="flex items-center gap-3">
                    <FormControl>
                      <Checkbox
                        checked={field.value === 1}
                        onCheckedChange={(checked) => {
                          field.onChange(checked ? 1 : 0);
                          if (checked) {
                            form.setValue("to_date", undefined);
                          }
                        }}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        {t("currently-working")}
                      </FormLabel>
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
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

        {profile.experiences.length > 0 && (
          <div className="space-y-2">
            {profile.experiences?.map((experience, index) => (
              <div className="flex items-center gap-2">
                <span>{index + 1}-</span>
                <div className="flex-1 px-4 py-2 flex items-center justify-between bg-muted rounded-md">
                  <div className="flex items-center gap-2">
                    <p className="title-xs font-semibold">
                      {experience.company?.name || experience.other_company},
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {experience.position?.name || experience.other_position}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <ViewExperienceDialog experience={experience} />

                    <DeleteModal
                      endpoint={`/profile/experiences/${experience.id}`}
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

export default ExperienceForm;
