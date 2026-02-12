"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import TitleAndDescription from "@/components/common/TitleAndDescription";
import PlanCard from "@/components/home/PlanCard";
import PurchaseDialog from "@/components/home/PurchaseDialog";
import { useGetData } from "@/hooks/useFetch";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

type PlanType = "companies" | "talents";

interface PlanFeature {
  name: string;
  is_active: boolean;
}

interface Plan {
  id: string | number;
  name: string;
  is_recommended: boolean;
  price: number;
  features: PlanFeature[];
}

interface PricingPageResponse {
  plans: Plan[];
}

// TODO: Remove mock data once the API is ready
const MOCK_FEATURES: PlanFeature[] = [
  { name: "Lorem ipsum dolor sit amet", is_active: true },
  { name: "Lorem ipsum dolor sit amet", is_active: true },
  { name: "Lorem ipsum dolor sit amet", is_active: true },
  { name: "Lorem ipsum dolor sit amet", is_active: true },
  { name: "Lorem ipsum dolor sit amet", is_active: false },
  { name: "Lorem ipsum dolor sit amet", is_active: false },
];

const MOCK_PLANS: Record<PlanType, Plan[]> = {
  companies: [
    { id: 1, name: "Free Plan", is_recommended: false, price: 0, features: MOCK_FEATURES },
    { id: 2, name: "Silver Plan", is_recommended: false, price: 50, features: MOCK_FEATURES },
    { id: 3, name: "Golden Plan", is_recommended: true, price: 100, features: MOCK_FEATURES },
    { id: 4, name: "Platinum Plan", is_recommended: false, price: 200, features: MOCK_FEATURES },
  ],
  talents: [
    { id: 5, name: "Free Plan", is_recommended: false, price: 0, features: MOCK_FEATURES },
    { id: 6, name: "Bronze Plan", is_recommended: false, price: 30, features: MOCK_FEATURES },
    { id: 7, name: "Silver Plan", is_recommended: true, price: 75, features: MOCK_FEATURES },
    { id: 8, name: "Gold Plan", is_recommended: false, price: 150, features: MOCK_FEATURES },
  ],
};

const USE_MOCK = true; // Set to false when API is ready

const PricingPlans = () => {
  const t = useTranslations("home.pricingPlans");
  const [planType, setPlanType] = useState<PlanType>("companies");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<{
    name: string;
    price: number;
  } | null>(null);

  const { data, isLoading } = useGetData<PricingPageResponse>({
    endpoint: "/pricing-page",
    config: {
      queryParams: {
        type: planType,
      },
    },
    queryKey: ["pricing-plans", planType],
  });

  const plans = USE_MOCK
    ? MOCK_PLANS[planType]
    : data?.status === "success"
      ? data.result?.plans ?? []
      : [];

  const handlePurchase = (plan: { name: string; price: number }) => {
    setSelectedPlan(plan);
    setDialogOpen(true);
  };

  return (
    <section className="relative py-16 md:py-20 lg:py-24 overflow-hidden">
      <div className="container relative z-10">
        <div className="space-y-10 md:space-y-14">
          {/* Title and Description */}
          <TitleAndDescription
            title={t("title")}
            description={t("description")}
          />

          {/* Plan Type Toggle */}
          <div className="flex items-center justify-center gap-4">
            <span
              className={cn(
                "text-sm md:text-base font-semibold transition-colors duration-200",
                planType === "companies"
                  ? "text-foreground"
                  : "text-muted-foreground"
              )}
            >
              {t("companiesPlans")}
            </span>

            {/* Custom Toggle */}
            <button
              type="button"
              role="switch"
              aria-checked={planType === "talents"}
              aria-label={t("toggleLabel")}
              className={cn(
                "relative inline-flex h-7 w-14 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                planType === "talents" ? "bg-primary" : "bg-primary"
              )}
              onClick={() =>
                setPlanType((prev) =>
                  prev === "companies" ? "talents" : "companies"
                )
              }
            >
              <span
                className={cn(
                  "pointer-events-none block h-5 w-5 rounded-full bg-white shadow-lg ring-0 transition-transform duration-200",
                  planType === "talents"
                    ? "translate-x-7"
                    : "translate-x-1"
                )}
              />
            </button>

            <span
              className={cn(
                "text-sm md:text-base font-semibold transition-colors duration-200",
                planType === "talents"
                  ? "text-foreground"
                  : "text-muted-foreground"
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
                  is_recommended={plan.is_recommended}
                  price={plan.price}
                  features={plan.features}
                  onPurchase={() =>
                    handlePurchase({
                      name: plan.name,
                      price: plan.price,
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
