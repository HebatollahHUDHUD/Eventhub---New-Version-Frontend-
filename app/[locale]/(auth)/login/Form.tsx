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
import { loginSchema } from "@/lib/schemas";
import { usePostData } from "@/hooks/useFetch";
import { toast } from "@/components/ui/toast";
import { LoaderIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { loginAction } from "@/actions/login";
import Link from "next/link";
import { UserType } from "@/constant";

const LoginForm = () => {
  const router = useRouter();
  const t = useTranslations("auth");

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  const { mutateAsync } = usePostData<z.infer<typeof loginSchema>>({
    endpoint: "/auth/login",
  });

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    try {
      const res = (await mutateAsync(values)) as any;

      if (res.status === "success") {
        toast(t("login.success-msg"), "success");

        const token = res.result?.token || res.result?.access_token;
        const userSession = res.result?.profile || res.result?.user;

        if (token && userSession) {
          await loginAction(
            token,
            JSON.stringify(userSession)
          );

          if (userSession?.user_type === UserType.COMPANY) {
            router.replace("/dashboard");
          } else {
            router.replace("/profile");
          }
        } else {
          toast(t("session-missing"), "destructive");
        }
        return;
      } else {
        toast(res.message || t("login-failed"), "destructive");
      }
    } catch (error: any) {
      console.log(error);
      toast(
        error?.response?.data?.message ||
        t("login-error"),
        "destructive"
      );
    }
  }

  const isLoading = form.formState.isSubmitting;

  return (
    <Card className="max-w-md mx-auto">
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="identifier"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {t("fields.email-address")}
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t("fields.enter-email")}
                      type="text"
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
                  <FormLabel>{t("fields.password")}</FormLabel>
                  <FormControl>
                    <PasswordInput
                      placeholder={t("fields.enter-password")}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex flex-col items-center gap-4">


              <Button
                type="submit"
                size={"lg"}
                disabled={isLoading}
                variant={"accentSecondary"}
              >
                {isLoading ? (
                  <LoaderIcon className="animate-spin" />
                ) : (
                  t("login.button")
                )}
              </Button>

              <div className="text-center text-sm text-muted-foreground">
                {t("login.dont-have-account")}{" "}
                <Link
                  href="/register"
                  className="text-clr-orange hover:text-clr-orange/80 hover:underline font-medium"
                >
                  {t("login.register-link")}
                </Link>
              </div>

            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
