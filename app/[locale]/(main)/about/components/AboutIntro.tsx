import { useTranslations } from "next-intl";
import { cyrclesToDownSVG } from "@/public/SVGs";
import VideoPlayer from "@/components/common/VideoPlayer";
import type { AboutPage } from "@/schemas/shared";
import StatCard from "@/components/common/StatCard";

interface AboutIntroProps {
  data?: AboutPage | null;
}

export default function AboutIntro({ data }: AboutIntroProps) {
  const t = useTranslations("about");

  const title = data?.about_page_title || t("hero_tagline");
  const subtitle = data?.about_page_subtitle || t("who_is_events_hubs");
  const description = data?.about_page_desc || t("who_is_events_hubs_description");
  const videoUrl = data?.about_page_video 
  

  const stats = [
    { value: "+200", label: t("companies"), highlightColor: "bg-teal-300/50" },
    { value: "+350", label: t("recruitment"), highlightColor: "bg-sky-300/50" },
    { value: "+650", label: t("talents"), highlightColor: "bg-amber-300/50" },
  ];

  return (
    <section className="relative container">
      {/* Decorative SVG circles */}
      <div className="absolute scale-[0.8] top-[-200px] start-[-250px] w-full -z-10">
        {cyrclesToDownSVG}
      </div>

      <div className="py-8 md:py-12 lg:py-16 space-y-12 md:space-y-16">
        {/* Content grid */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-10 gap-8 lg:gap-12 px-4 md:px-8 lg:px-12">
          {/* Left column - Tagline */}
          <div className="flex lg:col-span-4">
            <h1 className="title-1 text-primary leading-snug font-normal! ">
              {title}
            </h1>
          </div>

          {/* Right column - Who is Events Hubs */}
          <div className="space-y-4 lg:col-span-6">
            <h2 className="title-3 font-bold! text-primary">
              {subtitle}
            </h2>
            <p className="description leading-relaxed">
              {description}
            </p>
          </div>
        </div>

        {/* Video section */}
        {videoUrl && (
          <div className="relative z-10 px-4 md:px-8 lg:px-12">
            <VideoPlayer
              url={videoUrl}
              className="w-full aspect-video max-h-[623px] rounded-2xl"
            />
          </div>
        )}

        {/* Stats section */}
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-12 px-4 md:px-8 lg:px-12">
          {stats.map((stat) => (
            <StatCard
              key={stat.label}
              value={stat.value}
              label={stat.label}
              highlightColor={stat.highlightColor}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
