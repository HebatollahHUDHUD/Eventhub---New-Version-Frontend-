import { useTranslations } from "next-intl";
import { cyrclesToDownSVG } from "@/public/SVGs";

export default function AboutIntro() {
  const t = useTranslations("about");

  return (
    <section className="relative  ">
      {/* Decorative SVG circles */}
      <div className="absolute scale-[0.8] top-[-200px]  start-[-250px] w-full z-0">
        {cyrclesToDownSVG}
      </div>
      <div className="py-8 md:py-12 lg:py-16">
        
     

      {/* Content grid */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-10 gap-8 lg:gap-12 px-4 md:px-8 lg:px-12 ">
        {/* Left column - Tagline */}
        <div className="flex  lg:col-span-4">
          <h1 className="title-1 text-primary leading-snug font-normal! lg:text-[55px]!">
            {t("hero_tagline")}
          </h1>
        </div>

        {/* Right column - Who is Events Hubs */}
        <div className="space-y-4 lg:col-span-6">
          <h2 className="title-3 font-bold! text-primary">
            {t("who_is_events_hubs")}
          </h2>
          <p className="description leading-relaxed">
            {t("who_is_events_hubs_description")}
          </p>
        </div>
      </div> 
      
      </div>
    </section>
  );
}