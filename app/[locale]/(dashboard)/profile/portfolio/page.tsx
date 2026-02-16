"use client";

import { useGetData } from "@/hooks/useFetch";
import PortfolioForm from "@/app/[locale]/(dashboard)/profile/portfolio/components/PortfolioForm";
import PortfolioCard from "@/app/[locale]/(dashboard)/profile/portfolio/components/PortfolioCard";
import { TalentProfileResponse } from "@/schemas/types";
import LoadingPage from "@/components/common/LoadingPage";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslations } from "next-intl";

const Page = () => {
  const t = useTranslations("dashboard.portfolio");
  const endpoint = "/profile";

  const { data, isLoading, refetch } = useGetData<TalentProfileResponse>({
    endpoint,
    queryKey: ["Profile", endpoint],
  });

  const profile = data?.status === "success" ? data?.result?.profile : null;

  if (isLoading) return <LoadingPage />;

  if (!profile) return null;

  return (
    <div className="space-y-6">
      <PortfolioForm
        refetch={refetch}
      />

      {profile.projects && profile.projects.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>{t("projects")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {profile.projects.map((project) => (
                <PortfolioCard
                  key={project.id}
                  project={project}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Page;
