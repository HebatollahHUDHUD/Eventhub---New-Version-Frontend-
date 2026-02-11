import { useTranslations } from "next-intl";
import { circlesToDownLeftSVG, circlesToLeftSVG, cyrclesToDownSVG } from "@/public/SVGs";
import TitleAndDescription from "@/components/common/TitleAndDescription";
import FeatureCard from "@/components/common/FeatureCard";

export default function WhyEventsHubs() {
  const t = useTranslations("about");

  const features = [
    {
      number: "01",
      title: t("keen"),
      description: t("keen_description"),
      highlightColor: "bg-amber-200/60",
    },
    {
      number: "02",
      title: t("smart"),
      description: t("smart_description"),
      highlightColor: "bg-amber-200/60",
    },
    {
      number: "03",
      title: t("dedicated"),
      description: t("dedicated_description"),
      highlightColor: "bg-amber-200/60",
    },
    {
      number: "04",
      title: t("eager"),
      description: t("eager_description"),
      highlightColor: "bg-amber-200/60",
    },
    {
      number: "05",
      title: t("passionate"),
      description: t("passionate_description"),
      highlightColor: "bg-amber-200/60",
    },
    {
      number: "06",
      title: t("concerned"),
      description: t("concerned_description"),
      highlightColor: "bg-amber-200/60",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-[#F4F6F8]">
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

      <div className="relative z-10 py-12 md:py-16 lg:py-20 space-y-12 md:space-y-16 px-4 md:px-8 lg:px-12">
        {/* Section header */}
        <TitleAndDescription
          title={t("why_events_hubs")}
          description={t("why_events_hubs_description")}
        />

        {/* Feature cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-12">
          {features.map((feature) => (
            <FeatureCard
              key={feature.number}
              number={feature.number}
              title={feature.title}
              description={feature.description}
              highlightColor={feature.highlightColor}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
