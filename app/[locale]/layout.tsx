import "../globals.css";

import { getTranslations, setRequestLocale } from "next-intl/server";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Metadata } from "next";
import { cairo, inter } from "@/providers/fonts";
import { SearchParamsProvider } from "@/providers/search-params";
import { QueryProvider } from "@/providers/query";
import { Toaster } from "@/components/ui/sonner";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export const generateStaticParams = async () =>
  routing.locales.map((locale) => ({ locale }));

export async function generateMetadata() {
  const t = await getTranslations("main");

  const metadata: Metadata = {
    title: t("title"),
    description: t("description"),
  };
  return metadata;
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  return (
    <html lang={locale} className={`${inter.variable} ${cairo.variable}`}
      dir={locale === "ar" ? "rtl" : "ltr"}
    >
      <body className="font-cairo">
        <QueryProvider>
          <SearchParamsProvider>
            <NextIntlClientProvider>
              <div className={"font-cairo"}>
                {children}

                <Toaster />
              </div>
            </NextIntlClientProvider>
          </SearchParamsProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
