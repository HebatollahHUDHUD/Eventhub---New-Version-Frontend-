"use client";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { toast } from "@/components/ui/toast";
import { usePostData } from "@/hooks/useFetch";
import { Link, useRouter } from "@/i18n/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { z } from "zod";

const verifySchema = z.object({
  email: z.string().email(),
});

const SuccessAlert = ({
  email,
  type,
}: {
  email: string;
  type: "speaker" | "company";
}) => {
  const t = useTranslations("auth");
  const router = useRouter();

  const form = useForm<z.infer<typeof verifySchema>>({
    resolver: zodResolver(verifySchema),
    defaultValues: {
      email,
    },
  });

  const { mutateAsync } = usePostData<z.infer<typeof verifySchema>>({
    endpoint: `/${type}/send/otp`,
  });

  async function onSubmit(values: z.infer<typeof verifySchema>) {
    try {
      const res = (await mutateAsync(values)) as any;

      if (res.status === "success") {
        router.replace(`/verify-email?email=${email}&type=${type}`);
        return;
      } else {
        toast(res.message, "destructive");
      }
    } catch (error) {
      console.log(error);
      toast(t("submit-failed"), "destructive");
    }
  }

  return (
    <div className="bg-white px-6 py-10 gap-6 max-w-2xl mx-auto rounded-2xl flex flex-col items-center justify-center md:gap-8 md:px-10 md:py-14">
      <Image
        src={"/images/icons/check.png"}
        alt="check"
        width={200}
        height={200}
        quality={100}
        className="w-28 h-28 object-contain md:w-32 md:h-32"
        priority
      />

      <div className="space-y-2 text-center">
        <h2 className="title text-primary !font-medium">
          {t("account-created-successfully")}
        </h2>

        <p className="title-xs text-muted-foreground">
          {t("account-created-successfully-desc")}
        </p>
      </div>

      <div className="space-y-4 w-full flex flex-col">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <Button
              variant={"emerald"}
              className="w-full"
              type="submit"
              size={"xl"}
              disabled={form.formState.isSubmitting}
            >
              {t("verify-email")}
            </Button>
          </form>
        </Form>

        <Link href="/login">
          <Button variant={"outline"} className="w-full" size={"xl"}>
            {t("go-to-login")}
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default SuccessAlert;
