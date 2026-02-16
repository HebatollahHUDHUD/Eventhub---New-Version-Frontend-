import { getData } from "@/lib/request-server";
import OpportunitiesCard from "./OpportunitiesCard";
import OpportunitiesCardSkeleton from "./OpportunitiesCardSkeleton";
import { Suspense } from "react";
import type { JobAdsMainResponse } from "../../../../../schemas/types";
import Pagination from "@/components/common/Pagination";

type OpportunitiesContentProps = {
  searchParams?: Record<string, string | undefined>;
};

const OpportunitiesContentSkeleton = () => {
  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      aria-label="Loading opportunities"
    >
      {Array.from({ length: 8 }).map((_, index) => (
        <OpportunitiesCardSkeleton key={index} />
      ))}
    </div>
  );
};

const OpportunitiesContent = ({ searchParams }: OpportunitiesContentProps) => {
  return (
    <div className="container-sm">
      <Suspense fallback={<OpportunitiesContentSkeleton />}>
        <OpportunitiesList searchParams={searchParams} />
      </Suspense>
    </div>
  );
};

export default OpportunitiesContent;

const OpportunitiesList = async ({
  searchParams,
}: OpportunitiesContentProps) => {
  const queryParams = {
    page: searchParams?.page || "1",
    per_page: "20",
    ...searchParams,
  };

  const data = await getData<JobAdsMainResponse>({
    endpoint: "/job-ads",
    config: {
      next: {
        tags: ["job-ads"],
      },
      queryParams,
    },
  });

  const jobAds =
    data.status === "success" ? data.result?.job_ads : null;
  const jobAdsList = jobAds?.data || [];
  const pagination = jobAds?.pagination || null;

  return (
    <div className="space-y-6">
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        role="list"
        aria-label="Opportunities list"
      >
        {jobAdsList.map((jobAd) => (
          <OpportunitiesCard key={jobAd.id} jobAd={jobAd} />
        ))}
      </div>

      <Pagination pagination={pagination} />
    </div>
  );
};
