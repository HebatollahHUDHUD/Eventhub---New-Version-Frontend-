"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import cookieClient from "js-cookie";
import { SESSION_NAME } from "@/constant";
import TitleAndDescription from "@/components/common/TitleAndDescription";
import PlanCard from "@/components/home/PlanCard";
import PurchaseDialog from "@/components/home/PurchaseDialog";
import PaymentStatusDialog from "@/components/home/PaymentStatusDialog";
import { PricingSwitch } from "@/components/home/PricingSwitch";
import { useGetData } from "@/hooks/useFetch";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { getUserSession } from "@/lib/userSession";
import PageTitle from "../common/PageTitle";

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

interface ProfilePlanResponse {
  profile: {
    current_subscription: {
      id: number;
      plan: Plan;
      start_date: string;
      end_date: string;
      created_at: string;
      updated_at: string;
    } | null;
  };
}

const PricingPlans = () => {
  const t = useTranslations("home.pricingPlans");
  const searchParams = useSearchParams();
  const loggedUser = getUserSession();
  const initialPlanType: PlanType = loggedUser?.user_type === "company" ? "company" : "personal";
  const [planType, setPlanType] = useState<PlanType>(loggedUser ? initialPlanType : "company");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<{
    name: string;
    price: number;
    id?: string | number;
  } | null>(null);

  // Payment status check: only if logged in and payment_id param is present
  const paymentId = searchParams.get("payment_id");
  const isLoggedIn = !!cookieClient.get(SESSION_NAME);
  const [paymentStatusOpen, setPaymentStatusOpen] = useState(
    !!paymentId && isLoggedIn
  );
  const handlePaymentStatusClose = (open: boolean) => {
    setPaymentStatusOpen(open);
    if (!open && paymentId) {
      // Remove payment_id from URL without a full reload
      const url = new URL(window.location.href);
      url.searchParams.delete("payment_id");
      window.history.replaceState({}, "", url.toString());
    }
  };

  const { data, isLoading } = useGetData<PricingPageResponse>({
    endpoint: "/pricing-page",
    queryKey: ["pricing-plans"],
  });
  // const activeSubscription = loggedUser?.current_subscription ?? null;

  // Fetch current subscription only when user is logged in
  const { data: profilePlanData } = useGetData<ProfilePlanResponse>({
    endpoint: "/profile",
    queryKey: ["profile"],
    enabled: isLoggedIn,
  });

  const activeSubscription =
    isLoggedIn &&
    profilePlanData?.status === "success" &&
    profilePlanData.result?.profile?.current_subscription
      ? profilePlanData.result.profile.current_subscription
      : null;

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
          <PageTitle
            title={(data?.status === "success" ? data.result?.pricing_page_title : undefined) ?? t("title")}
            description={(data?.status === "success" ? data.result?.pricing_page_subtitle : undefined) ?? t("description")}
          />

          {/* Plan Type Toggle */}
          <div className="flex items-center justify-center gap-4">
            <span className="text-sm md:text-base font-semibold transition-colors duration-200 text-foreground">
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

            <span className="text-sm md:text-base font-semibold transition-colors duration-200 text-foreground">
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
                  disabled={activeSubscription?.plan?.id === plan.id}
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

      {/* Payment Status Dialog */}
      <PaymentStatusDialog
        open={paymentStatusOpen}
        onOpenChange={handlePaymentStatusClose}
        paymentId={paymentId}
      />
    </section>
  );
};

export default PricingPlans;
