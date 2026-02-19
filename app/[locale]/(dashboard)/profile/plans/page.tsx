"use client";

import { useGetData } from "@/hooks/useFetch";
import LoadingPage from "@/components/common/LoadingPage";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslations } from "next-intl";
import { ProfilePlanResponse } from "@/schemas/types";
import PlanCard, { getPlanIcon } from "@/components/home/PlanCard";
import { CircleCheckBig } from "lucide-react";
import { riyalSVG } from "@/public/SVGs";
import moment from "moment";
import Image from "next/image";

const PlansPage = () => {
  const t = useTranslations("dashboard.plans");

  const { data, isLoading } = useGetData<ProfilePlanResponse>({
    endpoint: "/profile/plan",
    queryKey: ["profile-plan"],
  });

  if (isLoading) return <LoadingPage />;

  const currentSubscription = data?.status === "success" ? data.result?.current_subscription : null;
  const currentPlan = currentSubscription?.plan || null;
  const allOtherPlans = data?.status === "success" ? data.result?.other_plans || [] : [];
  const otherPlans = allOtherPlans.filter((plan) => Number(plan.price) !== 0);

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
              <div className="flex flex-col md:flex-row gap-6 rounded-lg overflow-hidden border bg-background">
                {/* Plan Icon/Name Section */}
                <div className="shrink-0 h-auto">
                  <div
                    className="relative flex flex-col items-center justify-center w-32 h-full rounded-e-full"
                    style={{
                      background: "linear-gradient(180deg, #797DE5 0%, #333441 100%)",
                    }}
                  >
                    <Image src={getPlanIcon(currentPlan.name)} alt="Plan Icon" width={48} height={48} />

                    <span className="text-white text-sm font-semibold mt-1 text-center px-2">
                      {currentPlan.name}
                    </span>
                  </div>
                </div>

                {/* Plan Details */}
                <div className="flex-1 space-y-4 p-6">
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

              {/* Subscription Dates */}
              <div className="flex flex-col sm:flex-row gap-4 text-sm text-muted-foreground">
                {currentSubscription?.start_date && (
                  <p>
                    <span className="font-medium">{t("start-date")}:</span>{" "}
                    {moment(currentSubscription.start_date).format("DD/MM/YYYY")}
                  </p>
                )}
                {currentSubscription?.end_date && (
                  <p>
                    <span className="font-medium">{t("valid-till")}:</span>{" "}
                    {moment(currentSubscription.end_date).format("DD/MM/YYYY")}
                  </p>
                )}
              </div>
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
                  is_recommended={!!plan.is_featured}
                  plan={plan}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      )}


    </div>
  );
};

export default PlansPage;
