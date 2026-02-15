"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Zap, Layers, CheckCircle, Grid3x3, Sparkles, Flame, Boxes, Star } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface Company {
  id: number;
  name: string;
  logoColor: string;
  Icon: React.ComponentType<{ className?: string }>;
}

const companies: Company[] = [
  {
    id: 1,
    name: "Boltax",
    logoColor: "text-blue-500",
    Icon: Zap,
  },
  {
    id: 2,
    name: "Geotel",
    logoColor: "text-pink-500",
    Icon: Layers,
  },
  {
    id: 3,
    name: "Oklae",
    logoColor: "text-teal-500",
    Icon: CheckCircle,
  },
  {
    id: 4,
    name: "Majaeo",
    logoColor: "text-orange-500",
    Icon: Grid3x3,
  },
  {
    id: 5,
    name: "Versa",
    logoColor: "text-green-500",
    Icon: Sparkles,
  },
  {
    id: 6,
    name: "JACKOE",
    logoColor: "text-red-500",
    Icon: Flame,
  },
  {
    id: 7,
    name: "Makton",
    logoColor: "text-yellow-500",
    Icon: Boxes,
  },
  {
    id: 8,
    name: "Wowex",
    logoColor: "text-pink-600",
    Icon: Star,
  },
];

const TrustedOrganisationsSection = () => {
  const t = useTranslations("home.trustedOrganisations");

  return (
    <section className="relative py-16 md:py-20 lg:py-24 overflow-hidden bg-primary">
      <div className="container relative z-10">
        <div className="space-y-6 md:space-y-10">
          <div className="space-y-4">
            <Button asChild size={"sm"} variant={"secondary"} className="rounded-full">
              <Link href="/about">
                {t("tag")}
              </Link>
            </Button>

            <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
              <h2 className="max-w-xl title-2 text-primary-foreground leading-snug">
                {t("title")}
              </h2>


              <Button
                asChild
                variant={"pink"}
                className="rounded-lg"
              >
                <Link href="/about" className="flex items-center gap-2">
                  {t("button")}
                  <ArrowUpRight className="size-4" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Company Logos Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6">
            {companies.map((company) => {
              const Icon = company.Icon;
              return (
                <div
                  key={company.id}
                  className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col items-center justify-center gap-3 min-h-[120px] hover:opacity-80"
                >
                  <div className={cn("flex items-center justify-center", company.logoColor)}>
                    <Icon className="w-8 h-8" />
                  </div>
                  <p className={cn("font-semibold text-sm md:text-base", company.logoColor)}>
                    {company.name}
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

export default TrustedOrganisationsSection;
