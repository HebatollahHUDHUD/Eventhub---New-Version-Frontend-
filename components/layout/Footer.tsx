"use client";
import Image from "next/image";
import Link from "next/link";

import { InstagramIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useGetData } from "@/hooks/useFetch";
import NewsletterForm from "./NewsletterForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { usePostData } from "@/hooks/useFetch";
import { toast } from "../ui/toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { LoaderIcon } from "lucide-react";

const newsletterSchema = z.object({
  email: z.string().email(),
});

const Footer = () => {
  const t = useTranslations("footer");

  const { data } = useGetData<any>({
    endpoint: "/settings",
    queryKey: ["Settings"],
  });

  const settingsData =
    data && typeof data === "object" && "status" in data && data.status === "success" && "response" in data
      ? (data as any)?.response?.settings
      : null;

  const form = useForm<z.infer<typeof newsletterSchema>>({
    resolver: zodResolver(newsletterSchema),
  });

  const { mutateAsync } = usePostData<z.infer<typeof newsletterSchema>>({
    endpoint: "/subscribe-newsletter",
  });

  async function onSubmit(values: z.infer<typeof newsletterSchema>) {
    try {
      const res = (await mutateAsync(values)) as any;

      if (res.status === "success") {
        toast(t("subscribed-msg"), "success");
        form.reset();
      } else {
        toast(res.message, "destructive");
      }
    } catch (error) {
      console.log(error);
      toast("Failed to submit the form. Please try again.", "destructive");
    }
  }

  return (
    <footer className="bg-primary py-12 space-y-12">
      <div className="border-b border-border/60 pb-12">
        <div className="container space-y-10">

          <div className="relative bg-cyan-500 rounded-2xl p-6 md:p-8 lg:p-12 overflow-hidden">
            <div className="absolute inset-0">
              <Image src={"/images/newsletter_bg.svg"} alt="Footer Background" width={1000} height={1000} className="w-full h-full object-cover" />
            </div>

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-center">
              {/* Left Side - Text */}
              <div className="space-y-3 max-w-sm">
                <h3 className="title-2 font-medium! text-primary-foreground leading-tight" dangerouslySetInnerHTML={{ __html: t("newsletter-title") }} />
                <p className="description text-primary-foreground/80!">
                  {t("newsletter-desc")}
                </p>
              </div>

              {/* Right Side - Form */}
              <div>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="w-full"
                    key={form.formState.submitCount}
                  >
                    <div className="flex flex-col items-end gap-4">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem className="flex-1 w-full">
                            <FormControl>
                              <Input
                                {...field}
                                placeholder={t("enter-email")}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button
                        size={"xl"}
                        type="submit"
                        disabled={form.formState.isSubmitting}
                        variant={"secondary"}
                      >
                        {form.formState.isSubmitting ? (
                          <LoaderIcon className="animate-spin size-5" />
                        ) : (
                          t("send")
                        )}
                      </Button>
                    </div>
                  </form>
                </Form>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center gap-4">
            <Link href="/" className="hover:opacity-90 transition-opacity">
              <Image src={"/logo.svg"} alt="Events Hubs" width={100} height={100} />
            </Link>

            <p className="text-white/80 text-sm md:text-base max-w-3xl mx-auto">
              {t("tagline")}
            </p>
          </div>
        </div>
      </div>

      <div className="container space-y-10">
        <nav className="flex flex-wrap items-center justify-center gap-4 md:gap-6 lg:gap-8">
          <Link
            href="/about"
            className="text-white/90 hover:text-white hover:underline transition-colors text-sm md:text-base"
          >
            {t("about")}
          </Link>
          <Link
            href="/recruitment"
            className="text-white/90 hover:text-white hover:underline transition-colors text-sm md:text-base"
          >
            {t("recruitment") || "Recruitment"}
          </Link>
          <Link
            href="/talent"
            className="text-white/90 hover:text-white hover:underline transition-colors text-sm md:text-base"
          >
            {t("talent")}
          </Link>
          <Link
            href="/opportunities"
            className="text-white/90 hover:text-white hover:underline transition-colors text-sm md:text-base"
          >
            {t("opportunities")}
          </Link>
          <Link
            href="/pricing"
            className="text-white/90 hover:text-white hover:underline transition-colors text-sm md:text-base"
          >
            {t("pricing")}
          </Link>
          <Link
            href="/contact"
            className="text-white/90 hover:text-white hover:underline transition-colors text-sm md:text-base"
          >
            {t("contact")}
          </Link>
        </nav>



        <div className="flex items-center justify-center gap-4 md:gap-10">

          <a
            href={
              settingsData?.facebook_link?.startsWith("http")
                ? settingsData?.facebook_link
                : `https://${settingsData?.facebook_link}`
            }
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
          >
            <Image src={"/icons/facebook.svg"} alt="Facebook" width={24} height={24}
              unoptimized
              quality={100}
              className="w-10 h-10 object-contain"
            />
          </a>

          <a
            href={
              settingsData?.instagram_link?.startsWith("http")
                ? settingsData?.instagram_link
                : `https://${settingsData?.instagram_link}`
            }
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <Image src={"/icons/instagram.svg"} alt="Instagram" width={24} height={24}
              unoptimized
              quality={100}
              className="w-10 h-10 object-contain"
            />
          </a>

          <a
            href={
              settingsData?.youtube_link?.startsWith("http")
                ? settingsData?.youtube_link
                : `https://${settingsData?.youtube_link}`
            }
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube"
          >
            <Image src={"/icons/youtube.svg"} alt="YouTube" width={24} height={24}
              unoptimized
              quality={100}
              className="w-10 h-10 object-contain"
            />
          </a>

          <a
            href={
              settingsData?.tiktok_link?.startsWith("http")
                ? settingsData?.tiktok_link
                : `https://${settingsData?.tiktok_link}`
            }
            target="_blank"
            rel="noopener noreferrer"
            aria-label="TikTok"
          >
            <Image src={"/icons/tiktok.svg"} alt="TikTok" width={24} height={24}
              unoptimized
              quality={100}
              className="w-10 h-10 object-contain"
            />
          </a>

          <a
            href={
              settingsData?.snapchat_link?.startsWith("http")
                ? settingsData?.snapchat_link
                : `https://${settingsData?.snapchat_link}`
            }
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Snapchat"
          >
            <Image src={"/icons/snapchat.svg"} alt="Snapchat" width={24} height={24}
              unoptimized
              quality={100}
              className="w-10 h-10 object-contain"
            />
          </a>
        </div>


        <div className="flex items-center justify-center gap-4 md:gap-6">
          <Link
            href="/billing-cancellation"
            className="text-white/80 hover:text-white hover:underline transition-colors"
          >
            {t("billing-cancellation") || "Billing and Cancellation"}
          </Link>
          <span className="text-white/40">|</span>
          <Link
            href="/privacy-policy"
            className="text-white/80 hover:text-white hover:underline transition-colors"
          >
            {t("privacy-policy")}
          </Link>
          <span className="text-white/40">|</span>
          <Link
            href="/terms-companies"
            className="text-white/80 hover:text-white hover:underline transition-colors"
          >
            {t("terms-companies") || "Terms & Conditions For Companies"}
          </Link>
          <span className="text-white/40">|</span>
          <Link
            href="/terms-users"
            className="text-white/80 hover:text-white hover:underline transition-colors"
          >
            {t("terms-users") || "Terms & Conditions For Users"}
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
