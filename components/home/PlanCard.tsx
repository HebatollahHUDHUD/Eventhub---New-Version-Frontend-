"use client";

import { useTranslations } from "next-intl";
import { CircleCheck, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface PlanFeature {
  name: string;
  is_active: boolean;
}

interface PlanCardProps {
  name: string;
  is_recommended: boolean;
  price: number;
  features: PlanFeature[];
  onPurchase: () => void;
}

const PlanCard = ({
  name,
  is_recommended,
  price,
  features,
  onPurchase,
}: PlanCardProps) => {
  const t = useTranslations("home.pricingPlans");

  const isFree = price === 0;

  const planIcon = (name.toLowerCase().includes("platinum") || name.includes("بلاتين"))
    ? "/icons/plan-icons/platinum.png"
    : (name.toLowerCase().includes("gold") || name.includes("ذهب"))
      ? "/icons/plan-icons/gold.png"
      : "/icons/plan-icons/muted.png";

  return (
    <article
      className={cn(
        "relative flex flex-col rounded-3xl bg-background shadow-lg overflow-hidden border border-border/50 transition-transform duration-300 hover:-translate-y-1",
       
      )}
    >
      {/* Recommended Badge */}
      {is_recommended && (
        <div className="absolute top-0 end-5 z-10 bg-amber-500 text-[9px]  text-white  uppercase tracking-[.25em] px-2 py-1 leading-tight">
          {t("recommended")}
        </div>
      )}

      {/* Curved Gradient Header */}
      <div
        className="relative flex flex-col items-center justify-center  pt-4 pb-6"
        style={{
          background:
            "linear-gradient(180deg, #797DE5 0%, #333441 100%)",
          // borderRadius: "0 0 50% 50% / 0 0 30px 30px",
          borderRadius: "0 0 70% 70% / 0 0 30px 30px",
        }}
      >
        {/* Icon Circle */}
        <div className="">
          <Image src={planIcon} alt="Plan Icon" width={48} height={48} />
        </div>
        {/* Plan Name */}
        <h3 className="text-lg font-bold text-white text-center">
          {name}
        </h3>
      </div>

      {/* Card Body */}
      <div className="flex flex-col flex-1 p-6 pt-4 space-y-6">

        {/* Price */}
        <div className="flex items-baseline justify-center gap-1">
          <span className="text-4xl md:text-5xl font-bold text-foreground">
            {isFree ? "00.00" : price.toFixed(2)}
          </span>
          <span className="text-sm text-muted-foreground font-medium">
            {t("perMonth")}
          </span>
        </div>

        {/* Features */}
        <ul className="space-y-3 flex-1">
          {features.map((feature, index) => (
            <li
              key={index}
              className={cn(
                "flex items-center gap-2 text-sm",
                feature.is_active
                  ? "text-foreground"
                  : "text-muted-foreground/40"
              )}
            >
              <CircleCheck
                className={cn(
                  "size-4 shrink-0",
                  feature.is_active
                    ? "text-primary"
                    : "text-muted-foreground/40"
                )}
              />
              <span>{feature.name}</span>
            </li>
          ))}
        </ul>

        {/* Purchase / Register Button */}
        <Button
          variant="default"
          size="lg"
          className="w-full uppercase tracking-wider font-bold"
          onClick={onPurchase}
        >
          {isFree ? t("registerNow") : t("purchaseNow")}
          <ArrowUpRight className="size-4" />
        </Button>
      </div>
    </article>
  );
};

export default PlanCard;
