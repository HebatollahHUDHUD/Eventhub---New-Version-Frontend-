"use client";

import { useGetData } from "@/hooks/useFetch";
import LoadingPage from "@/components/common/LoadingPage";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslations } from "next-intl";
import { ProfilePlanResponse, TalentProfileResponse } from "@/schemas/types";
import PlanCard from "@/components/home/PlanCard";
import { useState } from "react";
import PurchaseDialog from "@/components/home/PurchaseDialog";
import { CircleCheckBig } from "lucide-react";
import { riyalSVG } from "@/public/SVGs";
import moment from "moment";

const PlansPage = () => {
  const t = useTranslations("dashboard.plans");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<{
    name: string;
    price: number;
    id?: string | number;
  } | null>(null);

  const { data, isLoading, refetch } = useGetData<ProfilePlanResponse>({
    endpoint: "/profile/plan",
    queryKey: ["profile-plan"],
  });

  // Fetch profile to get subscription end_date
  const { data: profileData, refetch: refetchProfile } = useGetData<TalentProfileResponse>({
    endpoint: "/profile",
    queryKey: ["profile"],
  });

  if (isLoading) return <LoadingPage />;

  const currentPlan = data?.status === "success" ? data.result?.current_subscription : null;
  const otherPlans = data?.status === "success" ? data.result?.other_plans || [] : [];
  const subscription = profileData?.status === "success" ? profileData.result?.profile?.current_subscription : null;

  const handlePurchase = (plan: { name: string; price: number; id?: string | number }) => {
    setSelectedPlan(plan);
    setDialogOpen(true);
  };

  const handlePurchaseSuccess = () => {
    refetch();
    refetchProfile();
  };

  return (
    <div className="space-y-6">
      {/* My Plan Section */}
      <Card>
        <CardHeader>
          <CardTitle>{t("my-plan")}</CardTitle>
        </CardHeader>
        <CardContent>
          {currentPlan ? (
            <div className="space-y-4">
              {/* Current Plan Card - Horizontal Layout */}
              <div className="flex flex-col md:flex-row gap-6 p-6 rounded-lg border bg-background">
                {/* Plan Icon/Name Section */}
                <div className="shrink-0">
                  <div
                    className="relative flex flex-col items-center justify-center w-32 h-32 rounded-full"
                    style={{
                      background: "linear-gradient(180deg, #797DE5 0%, #333441 100%)",
                    }}
                  >
                    <span className="text-white text-2xl font-bold">K</span>
                    <span className="text-white text-sm font-semibold mt-1">{currentPlan.name}</span>
                  </div>
                </div>

                {/* Plan Details */}
                <div className="flex-1 space-y-4">
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold text-foreground flex items-center gap-1">
                      {riyalSVG("#000", "32px", "32px")}
                      {parseFloat(currentPlan.price) === 0 ? "00.00" : parseFloat(currentPlan.price).toFixed(2)}
                    </span>
                    <span className="text-sm text-muted-foreground font-medium">
                      /{t("month")}
                    </span>
                  </div>

                  {/* Features */}
                  <ul className="space-y-2">
                    {currentPlan.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <CircleCheckBig className="size-4 shrink-0 text-green-500 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Valid Till Date */}
              {subscription?.end_date && (
                <p className="text-sm text-muted-foreground">
                  {t("valid-till")} {moment(subscription.end_date).format("DD/MM/YYYY")}
                </p>
              )}
            </div>
          ) : (
            <p className="text-muted-foreground text-center py-8">
              {t("no-current-plan")}
            </p>
          )}
        </CardContent>
      </Card>

      {/* Upgrade Plan Section */}
      {otherPlans.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>{t("upgrade-plan")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherPlans.map((plan) => (
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
                  disabled={currentPlan?.id === plan.id}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Purchase Dialog */}
      <PurchaseDialog
        open={dialogOpen}
        onOpenChange={(open) => {
          setDialogOpen(open);
          if (!open) {
            handlePurchaseSuccess();
          }
        }}
        planDetails={selectedPlan}
      />
    </div>
  );
};

export default PlansPage;
