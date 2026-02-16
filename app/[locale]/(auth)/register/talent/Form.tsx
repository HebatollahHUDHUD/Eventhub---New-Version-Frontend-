"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
} from "@/components/ui/form";
import { useTranslations } from "next-intl";
import { talentRegisterSchema } from "@/lib/schemas";
import { usePostData } from "@/hooks/useFetch";
import { toast } from "@/components/ui/toast";
import { useRouter } from "next/navigation";
import { serialize } from "object-to-formdata";
import { loginAction } from "@/actions/login";
import RegisterInfoForm from "./RegisterInfoForm";
import VerificationCodeForm from "./VerificationCodeForm";

const TalentRegisterForm = ({ extractData }: { extractData: any }) => {
  const router = useRouter();
  const t = useTranslations("auth");

  const form = useForm<z.infer<typeof talentRegisterSchema>>({
    resolver: zodResolver(talentRegisterSchema),
    defaultValues: {
      step: "1",
      user_type: "talent",
      name: extractData?.name || "",
      email: extractData?.email || "",
      mobile: extractData?.mobile || "",
      country_id: undefined,
      position_id: extractData?.position || undefined,
      skills: extractData?.skills || [],
      language_ids: [],
      password: "",
      password_confirmation: "",
      verification_code: undefined,
      image: undefined,
    },
  });

  const { mutateAsync } = usePostData<z.infer<typeof talentRegisterSchema>>({
    endpoint: "/auth/register",
  });

  async function onSubmit(values: z.infer<typeof talentRegisterSchema>) {
    try {
      // Create FormData for file upload
      const formData = serialize(values, {
        indices: true,
      });

      const res = (await mutateAsync(formData as any)) as any;

      if (res.status === "success") {
        toast(t("account-created-msg"), "success");

        if (values.step === "1" || res.result.need_verification) {
          form.setValue("step", "2");
          return;
        } else {
          const token = res.result.access_token;
          const userSession = res.result.profile;

          await loginAction(token, JSON.stringify(userSession), true);
          router.replace("/profile");
        }

      } else {
        toast(res.message, "destructive");
      }
    } catch (error) {
      toast(t("submit-failed"), "destructive");
    }
  }

  const isLoading = form.formState.isSubmitting;


  return (

    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {form.watch("step") === "1" && (
          <RegisterInfoForm form={form} isLoading={isLoading} />
        )}
        {form.watch("step") === "2" && (
          <VerificationCodeForm form={form} isLoading={isLoading} onSubmit={onSubmit} />
        )}

      </form>
    </Form>
  );
};

export default TalentRegisterForm;
