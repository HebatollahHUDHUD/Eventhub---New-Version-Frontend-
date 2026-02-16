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
import { useTranslations } from "next-intl";
import { ChangePasswordType, changePasswordSchema } from "@/lib/schemas";
import { usePostData } from "@/hooks/useFetch";
import { toast } from "@/components/ui/toast";
import { LoaderIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PasswordInput } from "@/components/ui/password-input";

const ChangePasswordForm = () => {
  const t = useTranslations("dashboard");

  const form = useForm<ChangePasswordType>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      current_password: "",
      password: "",
      password_confirmation: "",
    },
  });

  const { mutateAsync } = usePostData<ChangePasswordType>({
    endpoint: "/profile/password",
  });

  async function onSubmit(values: ChangePasswordType) {
    try {
      const res = (await mutateAsync(values as any)) as any;

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
        <CardTitle>{t("change-password")}</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="current_password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("current-password")}</FormLabel>
                    <FormControl>
                      <PasswordInput
                        placeholder={t("enter-current-password")}
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
                    <FormLabel>{t("new-password")}</FormLabel>
                    <FormControl>
                      <PasswordInput
                        placeholder={t("enter-new-password")}
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
                    <FormLabel>{t("confirm-password")}</FormLabel>
                    <FormControl>
                      <PasswordInput
                        placeholder={t("enter-confirm-password")}
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

export default ChangePasswordForm;
