"use client";

import JobAdForm from "./components/Form";
import JobAdsList from "./components/JobAdsList";
import LoadingPage from "@/components/common/LoadingPage";

import { useGetData } from "@/hooks/useFetch";
import { JobAdsResponse } from "@/schemas/types";
import { parseAsString, useQueryStates } from "nuqs";

const JobAdsPage = () => {
  const [queryParams] = useQueryStates({
    page: parseAsString.withDefault("1"),
  });

  const { data, isLoading, refetch } = useGetData<JobAdsResponse>({
    endpoint: "/profile/job-ads",
    queryKey: ["profile-job-ads"],
    config: {
      queryParams,
    },
  });

  const jobAds = data?.status === "success" ? data?.result : null;

  if (isLoading) return <LoadingPage />;

  return (
    <div className="space-y-6">
      <JobAdForm refetch={refetch} />

      <JobAdsList jobAds={jobAds?.job_ads?.data || []} />
    </div>
  );
};

export default JobAdsPage;
