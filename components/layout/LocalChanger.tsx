"use client";
import { useSearchParams } from "next/navigation";
import { useLocale } from "next-intl";
import { useTransition } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";
import Image from "next/image";
import cookies from "js-cookie";
import { COOKIE_NAME } from "@/constant";
import { cn } from "@/lib/utils";

const LocalChanger = ({ className }: { className?: string }) => {
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
      className={cn("ms-2 cursor-pointer flex items-center gap-2 font-semibold hover:text-secondary/80", className)}
      aria-label="Change language"
      title="Change language"
    >

      <span>{locale === "en" ? "عربي" : "English"}</span>
    </button>
  );
};

export default LocalChanger;
