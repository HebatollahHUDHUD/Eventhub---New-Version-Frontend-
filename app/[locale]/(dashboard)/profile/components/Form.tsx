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
import { CompanyProfileType, companyProfileSchema } from "@/lib/schemas";
import { usePostData } from "@/hooks/useFetch";
import { toast } from "@/components/ui/toast";
import { LoaderIcon } from "lucide-react";
import { PhoneInput } from "@/components/ui/phone-input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import InputImage from "@/components/common/InputImage";
import { serialize } from "object-to-formdata";
import SelectCountry from "@/components/select/SelectCountry";
import { UserType } from "@/constant";
import SelectLanguage from "@/components/select/SelectLanguage";

const ProfileForm = ({ profileInfo }: { profileInfo: any }) => {
  const t = useTranslations("dashboard");

  const form = useForm<CompanyProfileType>({
    resolver: zodResolver(companyProfileSchema),
    defaultValues: {
      name: profileInfo?.name || "",
      email: profileInfo?.email || "",
      mobile: profileInfo?.mobile || "",
      country_id: profileInfo?.country_id || undefined,
      incharge_person_name: profileInfo?.incharge_person_name || "",
      language_ids: profileInfo?.languages?.map((language: any) => language.id) || [],
      image: undefined,
    },
  });

  const { mutateAsync } = usePostData<CompanyProfileType>({
    endpoint: "/profile",
  });

  async function onSubmit(values: CompanyProfileType) {
    try {
      const formData = serialize(values);

      const res = (await mutateAsync(formData as any)) as any;

      if (res.status === "success") {
        toast(res.message, "success");
        form.reset();
        return;
      } else {
        toast(res.message, "destructive");
      }
    } catch (error) {
      console.log(error);
      toast("Failed to submit the form. Please try again.", "destructive");
    }
  }

  const isLoading = form.formState.isSubmitting;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("privet-information")}</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="col-span-full flex justify-center items-center mb-6">
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <InputImage
                          defValue={profileInfo?.photo || ""}
                          className="w-40 h-40 object-cover rounded-full overflow-hidden"
                          onChange={(e) => field.onChange(e)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("company-name")}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t("company-name")}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("email-address")}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t("enter-email")}
                        type="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="mobile"
                render={({ field }) => (
                  <FormItem className="flex flex-col items-start">
                    <FormLabel>{t("phone-number")}</FormLabel>
                    <FormControl className="w-full">
                      <PhoneInput
                        placeholder={t("phone-number")}
                        value={field.value}
                        onChange={(value) => field.onChange(value || "")}
                        defaultCountry="JO"
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

              {profileInfo?.user_type === UserType.COMPANY && (
                <FormField
                  control={form.control}
                  name="incharge_person_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {t("incharge-person-name")}
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder={
                            t("incharge-person-name")
                          }
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {profileInfo?.user_type !== UserType.COMPANY && (
                <FormField
                  control={form.control}
                  name="language_ids"
                  render={({ field }) => (
                    <FormItem>
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
              )}

            </div>

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
                  t("save-changes")
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ProfileForm;
