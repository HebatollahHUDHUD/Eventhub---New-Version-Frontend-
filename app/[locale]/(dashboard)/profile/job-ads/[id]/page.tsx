"use client";

import LoadingPage from "@/components/common/LoadingPage";

import { useGetData } from "@/hooks/useFetch";
import { JobAdDetailsResponse } from "@/schemas/types";
import JobAdForm from "../components/Form";
import { useParams } from "next/navigation";
import EmployeesCard from "../../employees/components/EmployeesCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslations } from "next-intl";

const JobAdsDetails = () => {
  const { id } = useParams();
  const t = useTranslations("dashboard.job-ads");
  const { data, isLoading, refetch } = useGetData<JobAdDetailsResponse>({
    endpoint: `/profile/job-ads/${id}`,
    queryKey: [`profile-job-ads-${id}`],
  });

  const jobAd = data?.status === "success" ? data?.result?.job_ad : null;

  if (isLoading) return <LoadingPage />;



  return (
    <div className="space-y-6">
      <JobAdForm
        isUpdate={true}
        refetch={refetch}
        jobAd={jobAd}
      />

      <Card>
        <CardHeader>
          <CardTitle>{t("applicants")}</CardTitle>
        </CardHeader>
        <CardContent>
          {jobAd?.applicants && jobAd.applicants.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {jobAd.applicants.map((applicant) => {


                return (
                  <EmployeesCard
                    key={applicant.id}
                    employee={{ user: applicant } as any}
                    refetch={refetch}
                    hasMessage={true}
                    jobAdApplicantId={applicant.id}
                  />
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              {t("no-applicants") || "No applicants yet"}
            </div>
          )}
        </CardContent>
      </Card>


    </div>
  );
};

export default JobAdsDetails;
