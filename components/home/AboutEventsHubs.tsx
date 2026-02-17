"use client";

import { useTranslations } from "next-intl";
import VideoPlayer from "@/components/common/VideoPlayer";
import { Users, Handshake, Brain } from "lucide-react";
import { cn } from "@/lib/utils";
import { circlesToDownLeftSVG, circlesToLeftSVG } from "@/public/SVGs";
import type { HomeAboutUsItem } from "@/schemas/home";

interface AboutEventsHubsProps {
  title: string;
  description: string;
  video: string | null;
  videoUrl: string;
  items: HomeAboutUsItem[];
}

const AboutEventsHubs = ({ title, description, video, videoUrl, items }: AboutEventsHubsProps) => {
  const t = useTranslations("home.aboutEventsHubs");

  const icons = [Users, Handshake, Brain];
  const iconColors = ["text-orange-500", "text-purple-500", "text-teal-500"];

  const infoCards = items.slice(0, 3).map((item, index) => ({
    icon: icons[index] || Users,
    text: item.title,
    iconColor: iconColors[index] || "text-orange-500",
    bgColor: "bg-orange-50/80",
    iconBg: "bg-orange-100/80",
  }));

  return (
    <section className="relative py-16 md:py-20 lg:py-24 overflow-hidden">
      {/* Decorative SVG circles - top end */}
      <div className="absolute top-[-100px] end-[-180px] z-0">
        {circlesToDownLeftSVG}
      </div>

      {/* Decorative SVG circles - bottom start */}
      <div className="absolute bottom-[20%] start-[-5%] scale-[0.8] z-0">
        {circlesToLeftSVG}
      </div>

      {/* Pink/Red blur - top start */}
      <div
        className="absolute top-[100px] start-[-100px] w-[400px] h-[400px] md:w-[600px] md:h-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-pink-300/30 blur-3xl z-0 pointer-events-none"
        aria-hidden="true"
      />

      {/* Blue/Purple blur - bottom end */}
      <div
        className="absolute bottom-[20%] end-0 w-[400px] h-[400px] md:w-[600px] md:h-[600px] translate-x-1/2 translate-y-1/2 rounded-full bg-violet-300/30 blur-3xl z-0 pointer-events-none"
        aria-hidden="true"
      />

      <div className="container relative z-10">
        <div className="space-y-12 md:space-y-16 lg:space-y-20">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-center title-2 tracking-tight">
              {title}
            </h2>
            <p className="text-center text-muted-foreground mt-4 max-w-2xl mx-auto">
              {description}
            </p>
          </div>

          {/* Video Player */}
          {(video || videoUrl) && (
            <div>
              <VideoPlayer
                url={video || videoUrl}
                poster={t("video.poster")}
                className="w-full aspect-video max-w-3xl mx-auto rounded-3xl shadow-2xl border border-border/50"
              />
            </div>
          )}

          {/* Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 lg:gap-10 max-w-6xl mx-auto">
            {infoCards.map((card, index) => {
              const Icon = card.icon;
              return (
                <div
                  key={index}
                  className={"flex items-center gap-4"}
                >
                  {/* Icon Container */}
                  <div className="shrink-0 inline-flex items-center justify-center w-20 h-20 rounded-2xl shadow-md bg-background">
                    <Icon className={cn("size-10", card.iconColor)} strokeWidth={2} />
                  </div>

                  {/* Text */}
                  <p className="title-4 text-foreground font-medium leading-relaxed">
                    {card.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutEventsHubs;
