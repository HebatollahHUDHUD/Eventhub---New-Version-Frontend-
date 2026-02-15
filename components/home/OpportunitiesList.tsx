import { getData } from "@/lib/request-server";
import OpportunitiesCard from "@/app/[locale]/(main)/opportunities/components/OpportunitiesCard";
import type { JobAdsResponse, Opportunity } from "@/schemas/types";
import { getLocale } from "next-intl/server";
import { getLocalizedText } from "@/lib/getLocalizedText";

const OpportunitiesList = async () => {
  // Get locale once at the top
  const locale = await getLocale();

  const data = await getData<JobAdsResponse>({
    endpoint: "/job-ads",
    config: {
      queryParams: {
        page: "1",
      },
      next: {
        tags: ["job-ads"],
      },
    },
  });

  // Response structure: data.result.job_ads.data
  const jobAds = data.status === "success" ? data?.result?.job_ads?.data : [];

  // Transform JobAd to Opportunity format
  const opportunities: Opportunity[] = jobAds.slice(0, 8).map((jobAd) => ({
    id: jobAd.id,
    title: getLocalizedText(jobAd.title, locale),
    image: jobAd.attachments?.[0]?.file_path,
    company_name: jobAd.user?.name,
    slug: jobAd.id.toString(),
    category: jobAd.skills?.[0]?.slug || "all",
  }));

  if (opportunities.length === 0) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
      {opportunities.map((opportunity) => (
        <OpportunitiesCard key={opportunity.id} opportunity={opportunity} />
      ))}
    </div>
  );

};

export default OpportunitiesList;
