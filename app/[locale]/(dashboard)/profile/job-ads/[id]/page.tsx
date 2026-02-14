"use client";

import LoadingPage from "@/components/common/LoadingPage";

import { useGetData } from "@/hooks/useFetch";
import { JobAdDetailsResponse } from "@/schemas/types";
import { parseAsString, useQueryStates } from "nuqs";
import JobAdForm from "../components/Form";
import { useParams } from "next/navigation";

const JobAdsDetails = () => {
  const { id } = useParams();

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
    </div>
  );
};

export default JobAdsDetails;
