"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import cookieClient from "js-cookie";
import { SESSION_NAME } from "@/constant";
import PlanCard from "@/components/home/PlanCard";
import { PricingSwitch } from "@/components/home/PricingSwitch";
import { useGetData } from "@/hooks/useFetch";
import { getUserSession } from "@/lib/userSession";
import PageTitle from "../common/PageTitle";
import type { Plan } from "@/schemas/types";
import PaymentStatusDialog from "./PaymentStatusDialog";
import AdBanner from "../common/AdBanner";

type PlanType = "company" | "personal";

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

interface PricingPlansProps {
  title: string;
  subtitle: string;
  description: string;
  plans: Plan[];
}

const PricingPlans = ({ title, subtitle, description, plans: allPlans }: PricingPlansProps) => {
  const t = useTranslations("home.pricingPlans");
  const searchParams = useSearchParams();
  const loggedUser = getUserSession();
  const initialPlanType: PlanType = loggedUser?.user_type === "company" ? "company" : "personal";
  const [planType, setPlanType] = useState<PlanType>(loggedUser ? initialPlanType : "company");

  // Payment status check: only if logged in and payment_id param is present
  const paymentId = searchParams.get("payment_id");
  const isLoggedIn = !!cookieClient.get(SESSION_NAME);
  const [paymentStatusOpen, setPaymentStatusOpen] = useState(
    !!paymentId && isLoggedIn
  );

  // Fetch current subscription only when user is logged in and payment status check is done
  const { data: profilePlanData } = useGetData<ProfilePlanResponse>({
    endpoint: "/profile",
    queryKey: ["profile"],
    enabled: isLoggedIn && !paymentStatusOpen,
  });

  const activeSubscription =
    isLoggedIn &&
      profilePlanData?.status === "success" &&
      profilePlanData.result?.profile?.current_subscription
      ? profilePlanData.result.profile.current_subscription
      : null;

  const plans = allPlans.filter((plan) => {
    // Filter by plan type
    if (plan.type !== planType) return false;

    // Hide free plans if user is logged in
    if (isLoggedIn && Number(plan.price) === 0) return false;

    return true;
  });

  return (
    <section className="relative py-6 md:py-8 lg:py-12 overflow-hidden">
      <div className="container space-y-10 md:space-y-14 relative z-10">
        <div className="space-y-10 md:space-y-14">
          {/* Title and Description */}
          <PageTitle
            title={title}
            description={subtitle}
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
          {plans.length > 0 ? (
            <div className="flex flex-wrap justify-center">
              {plans.map((plan) => (
                <div
                  key={plan.id}
                  className="h-auto w-full px-2 md:w-[50%] lg:w-[33.33%] xl:w-[25%]">
                  <PlanCard
                    plan={plan}
                    is_recommended={!!plan.is_featured}
                    disabled={activeSubscription?.plan?.id === plan.id}
                  />
                </div>

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

        <AdBanner
          dir="Horizontal"
          position="home_plans_section"
        />
      </div>


      <PaymentStatusDialog
        onOpenChange={setPaymentStatusOpen}
        open={paymentStatusOpen}
        paymentId={paymentId}
      />
    </section>
  );
};

export default PricingPlans;
