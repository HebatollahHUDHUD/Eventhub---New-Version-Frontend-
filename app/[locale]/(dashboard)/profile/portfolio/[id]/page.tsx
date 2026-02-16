"use client";

import LoadingPage from "@/components/common/LoadingPage";
import { useGetData } from "@/hooks/useFetch";
import { ProjectDetailsResponse } from "@/schemas/types";
import PortfolioForm from "@/app/[locale]/(dashboard)/profile/portfolio/components/PortfolioForm";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useTranslations } from "next-intl";
import DeleteModal from "@/components/common/DeleteAlert";

const ProjectDetailsPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const t = useTranslations("dashboard.portfolio");

  const { data, isLoading, refetch } = useGetData<ProjectDetailsResponse>({
    endpoint: `/profile/projects/${id}`,
    queryKey: [`profile-projects-${id}`],
  });

  const project = data?.status === "success" ? data?.result?.project : null;

  if (isLoading) return <LoadingPage />;

  if (!project) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-muted-foreground">{t("project-not-found")}</p>
      </div>
    );
  }

  const handleDeleteSuccess = () => {
    router.push("/profile/portfolio");
  };

  return (
    <div className="space-y-6">
      {/* Back Link */}
      <Link href="/profile/portfolio">
        <Button variant="ghost" size="sm" className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          {t("back-to-project-list")}
        </Button>
      </Link>

      {/* Project Details Title */}
      <h1 className="text-2xl font-bold">{t("project-details")}</h1>

      {/* Form */}
      <PortfolioForm
        project={project}
        isUpdate={true}
        refetch={refetch}
      />

      {/* Delete Button */}
      <div className="flex justify-end">
        <DeleteModal
          endpoint={`/profile/projects/${id}`}
          refetch={handleDeleteSuccess}
          className=""
          size="lg"
        />
      </div>
    </div>
  );
};

export default ProjectDetailsPage;
