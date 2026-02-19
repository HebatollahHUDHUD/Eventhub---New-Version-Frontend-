"use client";

import { useGetData } from "@/hooks/useFetch";
import PortfolioForm from "@/app/[locale]/(dashboard)/profile/portfolio/components/PortfolioForm";
import PortfolioCard from "@/app/[locale]/(dashboard)/profile/portfolio/components/PortfolioCard";
import LoadingPage from "@/components/common/LoadingPage";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslations } from "next-intl";

const Page = () => {
  const t = useTranslations("dashboard.portfolio");
  const endpoint = "/profile/projects";

  const { data, isLoading, refetch } = useGetData<any>({
    endpoint,
    queryKey: ["profile-projects"],
  });

  const projects = data?.status === "success" ? data?.result?.projects : null;

  if (isLoading) return <LoadingPage />;

  if (!projects) return null;

  return (
    <div className="space-y-6">
      <PortfolioForm
        refetch={refetch}
      />

      {projects && projects.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>{t("projects")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {projects.map((project: any) => (
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
