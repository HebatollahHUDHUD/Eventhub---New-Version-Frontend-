"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import TitleAndDescription from "@/components/common/TitleAndDescription";
import PlanCard from "@/components/home/PlanCard";
import PurchaseDialog from "@/components/home/PurchaseDialog";
import { PricingSwitch } from "@/components/home/PricingSwitch";
import { useGetData } from "@/hooks/useFetch";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

type PlanType = "company" | "personal";

interface Plan {
  id: number;
  type: string;
  image: string | null;
  name: string;
  slug: string;
  features: string[];
  currency: string;
  price: string;
  billing_interval: string;
  is_featured: number;
}

interface PricingPageResponse {
  pricing_page_title: string;
  pricing_page_subtitle: string;
  plans: Plan[];
}

const PricingPlans = () => {
  const t = useTranslations("home.pricingPlans");
  const [planType, setPlanType] = useState<PlanType>("company");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<{
    name: string;
    price: number;
    id?: string | number;
  } | null>(null);

  const { data, isLoading } = useGetData<PricingPageResponse>({
    endpoint: "/pricing-page",
    queryKey: ["pricing-plans"],
  });

  const allPlans = data?.status === "success" ? data.result?.plans ?? [] : [];
  const plans = allPlans.filter((plan) => plan.type === planType);

  const handlePurchase = (plan: { name: string; price: number; id?: string | number }) => {
    setSelectedPlan(plan);
    setDialogOpen(true);
  };

  return (
    <section className="relative py-6 md:py-8 lg:py-12 overflow-hidden">
      <div className="container relative z-10">
        <div className="space-y-10 md:space-y-14">
          {/* Title and Description */}
          <TitleAndDescription
            title={(data?.status === "success" ? data.result?.pricing_page_title : undefined) ?? t("title")}
            description={(data?.status === "success" ? data.result?.pricing_page_subtitle : undefined) ?? t("description")}
          />

          {/* Plan Type Toggle */}
          <div className="flex items-center justify-center gap-4">
            <span
              className={cn(
                "text-sm md:text-base font-semibold transition-colors duration-200 text-foreground"

              )}
            >
              {t("companiesPlans")}
            </span>

            {/* Custom Toggle */}
            <PricingSwitch
              checked={planType === "personal"}
              onCheckedChange={(checked) =>
                setPlanType(checked ? "personal" : "company")
              }
              aria-label={t("toggleLabel")}
            />

            <span
              className={cn(
                "text-sm md:text-base font-semibold transition-colors duration-200 text-foreground"

              )}
            >
              {t("talentsPlans")}
            </span>
          </div>

          {/* Plans Grid */}
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="size-8 animate-spin text-primary" />
            </div>
          ) : plans.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
              {plans.map((plan) => (
                <PlanCard
                  key={plan.id}
                  name={plan.name}
                  is_recommended={!!plan.is_featured}
                  price={parseFloat(plan.price)}
                  features={plan.features.map((f) => ({ name: f, is_active: true }))}
                  onPurchase={() =>
                    handlePurchase({
                      name: plan.name,
                      price: parseFloat(plan.price),
                      id: plan.id,
                    })
                  }
                />
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center py-20">
              <p className="text-muted-foreground text-sm">
                {t("noPlans")}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Purchase Dialog */}
      <PurchaseDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        planDetails={selectedPlan}
      />
    </section>
  );
};

export default PricingPlans;
