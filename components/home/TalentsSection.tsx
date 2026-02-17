
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import TalentsList from "./TalentsList";

interface TalentsSectionProps {
  title: string;
  subtitle: string;
}

const TalentsSection = ({ title, subtitle }: TalentsSectionProps) => {
  const t = useTranslations("home.talents");

  return (
    <section className="relative py-6 md:py-8 lg:py-12">
      {/* Decorative "TALENTS" text on the right */}
      <div className="absolute end-0 top-1/2 -translate-y-1/2 hidden lg:block pointer-events-none z-0">
        <span className="text-[120px] lg:text-[180px] font-black text-gray-200/30 [writing-mode:vertical-rl] [text-orientation:mixed] select-none">
          TALENTS
        </span>
      </div>

      <div className="container relative z-10">
        <div className="space-y-8 md:space-y-12">
          {/* Top Button */}
          <div className="flex justify-center">
            <Button
              asChild
              size={"sm"}
              variant={"secondary"}
              className="rounded-full"
            >
              <Link href="/talent">
                {t("hireButton")}
              </Link>
            </Button>
          </div>

          {/* Heading */}
          <div className="space-y-2 max-w-xl mx-auto text-center">
            <h2 className="title-2 font-bold!">
              {title}
            </h2>
            <p className="text-muted-foreground">
              {subtitle}
            </p>
          </div>

          {/* Talent Cards */}
          <Suspense fallback={<div className="text-center py-12">Loading talents...</div>}>
            <TalentsList />
          </Suspense>

          {/* View More Button */}
          <div className="flex justify-center">
            <Button
              asChild
              variant={"pink"}
            >
              <Link href="/talent" className="flex items-center gap-2">
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

export default TalentsSection;
