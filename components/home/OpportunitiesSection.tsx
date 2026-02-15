

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import OpportunitiesList from "./OpportunitiesList";
import { circlesToDownLeftSVG, circlesToLeftSVG } from "@/public/SVGs";

const OpportunitiesSection = () => {
  const t = useTranslations("home.opportunities");

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
          {/* Top Button */}
          <div className="flex justify-center">
            <Button
              asChild
              size={"sm"}
              variant={"secondary"}
              className="rounded-full"
            >
              <Link href="/opportunities">
                {t("button")}
              </Link>
            </Button>
          </div>

          {/* Heading and Description */}
          <div className="max-w-6xl mx-auto space-y-4 text-center">
            <h2 className="title-2 tracking-tight">
              {t("title")}
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {t("description")}
            </p>
          </div>

          {/* Opportunity Cards */}
          <Suspense fallback={<div className="text-center py-12">Loading opportunities...</div>}>
            <OpportunitiesList />
          </Suspense>

          {/* View More Button */}
          <div className="flex justify-center">
            <Button
              asChild
              variant={"pink"}
            >
              <Link href="/opportunities" className="flex items-center gap-2">
                {t("viewMore")}
                <ArrowUpRight className="size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OpportunitiesSection;
