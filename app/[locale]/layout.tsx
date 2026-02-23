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
import { getData } from "@/lib/request-server";
import { BASE_URL } from "@/constant";
import { InfoSchema } from "@/schemas/shared";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export const generateStaticParams = async () =>
  routing.locales.map((locale) => ({ locale }));

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("main");


  const data = await getData<InfoSchema>({
    endpoint: "/info",
    config: {
      next: {
        tags: ["info"],
      },
    },
  });

  const infoData = data.status === "success" ? data.result : null;



  // Get favicon URL
  const faviconUrl = infoData?.website_favicon || "/favicon.ico";

  // Get OG image URL
  const ogImageUrl = infoData?.website_og_image || undefined;

  const metadata: Metadata = {
    title: infoData?.website_name || t("title"),
    description: infoData?.website_desc || t("description"),
    keywords: infoData?.website_keywords
      ? infoData.website_keywords.split(",").map(k => k.trim())
      : undefined,
    icons: {
      icon: faviconUrl,
      shortcut: faviconUrl,
      apple: faviconUrl,
    },
    openGraph: {
      title: infoData?.website_name || t("title"),
      description: infoData?.website_desc || t("description"),
      type: "website",
      ...(ogImageUrl && {
        images: [
          {
            url: ogImageUrl,
            width: 1200,
            height: 630,
            alt: infoData?.website_name || "Events Hubs",
          },
        ],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title: infoData?.website_name || t("title"),
      description: infoData?.website_desc || t("description"),
      ...(ogImageUrl && {
        images: [ogImageUrl],
      }),
    },
    metadataBase: new URL(BASE_URL),
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
