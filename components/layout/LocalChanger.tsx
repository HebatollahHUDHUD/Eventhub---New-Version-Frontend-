"use client";
import { useSearchParams } from "next/navigation";
import { useLocale } from "next-intl";
import { useTransition } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";
import Image from "next/image";
import cookies from "js-cookie";
import { COOKIE_NAME } from "@/constant";

const LocalChanger = () => {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const searchParams = useSearchParams();

  const [isPending, startTransition] = useTransition();

  const handleChange = (lang: string) => {
    startTransition(() => {
      router.push(pathname + "?" + searchParams.toString(), { locale: lang });
      cookies.set(COOKIE_NAME, lang);
      router.refresh();
    });
  };
  return (
    <button
      onClick={() => handleChange(locale === "ar" ? "en" : "ar")}
      disabled={isPending}
      className="flex items-center gap-2 text-sm"
    >

      <span>{locale === "en" ? "عربي" : "English"}</span>
    </button>
  );
};

export default LocalChanger;
