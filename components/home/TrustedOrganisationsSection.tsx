"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Image from "@/components/common/image";
import type { HomeFeaturedCompany } from "@/schemas/home";
import { Badge } from "../ui/badge";

interface TrustedOrganisationsSectionProps {
  title: string;
  subtitle: string;
  featured_companies: HomeFeaturedCompany[];
}

const TrustedOrganisationsSection = ({ title, subtitle, featured_companies }: TrustedOrganisationsSectionProps) => {
  const t = useTranslations("home.trustedOrganisations");

  return (
    <section className="relative py-16 md:py-20 lg:py-24 overflow-hidden bg-primary">
      <div className="container relative z-10">
        <div className="space-y-6 md:space-y-10">
          <div className="space-y-4">
            <Badge
              variant={"secondary"}
              className="rounded-full capitalize px-6 py-2"
            >
              {t("tag")}
            </Badge>

            <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
              <div className="space-y-2 max-w-xl">
                <h2 className="title-2 text-primary-foreground leading-snug">
                  {title}
                </h2>
                <p className="text-primary-foreground/80">
                  {subtitle}
                </p>
              </div>


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
          {featured_companies && featured_companies.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6">
              {featured_companies.map((company) => (
                <div
                  key={company.id}
                  className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col items-center justify-center gap-3 min-h-[120px] hover:opacity-80"
                >
                  {company.photo ? (
                    <Image
                      src={company.photo}
                      alt={company.name}
                      className="w-full h-full object-contain max-h-16"
                      width={120}
                      height={64}
                    />
                  ) : (
                    <p className="font-semibold text-sm md:text-base text-foreground text-center">
                      {company.name}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default TrustedOrganisationsSection;
