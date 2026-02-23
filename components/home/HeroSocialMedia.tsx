"use client";

import { Instagram, Twitter, Facebook } from "lucide-react";

import { useGetData } from "@/hooks/useFetch";
import { useTranslations } from "next-intl";

const HeroSocialMedia = () => {
  const t = useTranslations("home.hero");
  const { data } = useGetData<any>({
    endpoint: "/info",
    queryKey: ["Info"],
  });

  const infoData = data?.status === "success" ? data.result : null;

  // Get social media URLs from infoData
  const getSocialUrl = (infoKey: string) => {
    const url = infoData?.[infoKey];
    if (!url) return null;
    return url.startsWith("http") ? url : `https://${url}`;
  };

  const facebookUrl = getSocialUrl("social_media_facebook_url");
  const instagramUrl = getSocialUrl("social_media_instagram_url");
  const twitterUrl = getSocialUrl("social_media_x_url");

  if (!infoData || (!facebookUrl && !instagramUrl && !twitterUrl)) return null;

  return (
    <>
      {/* Social Media Icons - Desktop */}
      <div className="absolute -start-6 top-4 hidden xl:flex flex-col items-center gap-5">
        <span className="h-28 w-[3px] bg-white" />

        {instagramUrl && (
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/80 hover:text-accentPink transition-colors duration-300"
            aria-label="Instagram"
          >
            <Instagram className="size-5" />
          </a>
        )}
        {twitterUrl && (
          <a
            href={twitterUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/80 hover:text-accentPink transition-colors duration-300"
            aria-label="Twitter"
          >
            <Twitter className="size-5" />
          </a>
        )}
        {facebookUrl && (
          <a
            href={facebookUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/80 hover:text-accentPink transition-colors duration-300"
            aria-label="Facebook"
          >
            <Facebook className="size-5" />
          </a>
        )}

        <span className="text-white text-xs font-medium mb-6 [writing-mode:vertical-rl] [text-orientation:mixed] tracking-wider">
          {t("social.follow")}
        </span>
      </div>

      {/* Social Media Icons - Mobile */}
      <div className="flex xl:hidden items-center gap-4 mb-8">
        <span className="text-white text-sm font-medium">{t("social.follow")}</span>
        {instagramUrl && (
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/80 hover:text-accentPink transition-colors"
            aria-label="Instagram"
          >
            <Instagram className="size-5" />
          </a>
        )}
        {twitterUrl && (
          <a
            href={twitterUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/80 hover:text-accentPink transition-colors"
            aria-label="Twitter"
          >
            <Twitter className="size-5" />
          </a>
        )}
        {facebookUrl && (
          <a
            href={facebookUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/80 hover:text-accentPink transition-colors"
            aria-label="Facebook"
          >
            <Facebook className="size-5" />
          </a>
        )}
      </div>
    </>
  )
}

export default HeroSocialMedia