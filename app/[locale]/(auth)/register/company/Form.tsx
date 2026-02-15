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
import { PasswordInput } from "@/components/ui/password-input";
import { useTranslations } from "next-intl";
import { companyRegisterSchema } from "@/lib/schemas";
import { usePostData } from "@/hooks/useFetch";
import { toast } from "@/components/ui/toast";
import { LoaderIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { PhoneInput } from "@/components/ui/phone-input";
import { Card, CardContent } from "@/components/ui/card";
import InputImage from "@/components/common/InputImage";
import { serialize } from "object-to-formdata";
import SelectCountry from "@/components/select/SelectCountry";
import { loginAction } from "@/actions/login";

const RegisterForm = () => {
  const router = useRouter();
  const t = useTranslations("auth");

  const form = useForm<z.infer<typeof companyRegisterSchema>>({
    resolver: zodResolver(companyRegisterSchema),
    defaultValues: {
      user_type: "company",
      name: "",
      email: "",
      mobile: "",
      country_id: undefined,
      incharge_person_name: "",
      password: "",
      password_confirmation: "",
      image: undefined,
    },
  });

  const { mutateAsync } = usePostData<z.infer<typeof companyRegisterSchema>>({
    endpoint: "/auth/register",
  });

  async function onSubmit(values: z.infer<typeof companyRegisterSchema>) {
    try {
      // Create FormData for file upload
      const formData = serialize(values);

      const res = (await mutateAsync(formData as any)) as any;

      if (res.status === "success") {
        toast(t("account-created-msg"), "success");

        const token = res.result.token;
        const userSession = res.result.profile;

        await loginAction(token, JSON.stringify(userSession), true);
        router.replace("/dashboard");
        return;
      } else {
        toast(res.message, "destructive");
      }
    } catch (error) {
      console.log(error);
      toast(t("submit-failed"), "destructive");
    }
  }

  const isLoading = form.formState.isSubmitting;

  return (
    <Card className="max-w-4xl mx-auto">
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

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("password")}</FormLabel>
                    <FormControl>
                      <PasswordInput
                        placeholder={t("enter-password")}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password_confirmation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {t("password-confirmation")}
                    </FormLabel>
                    <FormControl>
                      <PasswordInput
                        placeholder={
                          t("confirm-password")
                        }
                        {...field}
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
                {isLoading ? (
                  <LoaderIcon className="animate-spin" />
                ) : (
                  t("create-account")
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default RegisterForm;
