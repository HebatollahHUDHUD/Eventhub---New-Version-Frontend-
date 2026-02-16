import { getData } from "@/lib/request-server";
import { API_URL } from "@/constant";
import type { JobAdMainDetailsResponse } from "../../../../../schemas/types";
import OpportunityHeader from "./components/OpportunityHeader";
import OpportunityBadges from "./components/OpportunityBadges";
import OpportunityAbout from "./components/OpportunityAbout";
import OpportunityJobDetails from "./components/OpportunityJobDetails";
import OpportunityAdBanner from "./components/OpportunityAdBanner";
import OpportunitySimilarJobs from "./components/OpportunitySimilarJobs";

const storageUrl = API_URL.replace(/\/api$/, "");

type OpportunityContentProps = {
  slug: string;
};

const OpportunityContent = async ({ slug }: OpportunityContentProps) => {
  const data = await getData<JobAdMainDetailsResponse>({
    endpoint: `/job-ads/${slug}`,
    config: {
      next: {
        tags: ["job-ad-details"],
      },
    },
  });

  const jobAd = data.status === "success" ? data.result?.job_ad : null;
  const similarJobAds =
    data.status === "success" ? data.result?.similar_job_ads : [];

  if (!jobAd) return null;

  const photoUrl = jobAd.user?.photo
    ? `${storageUrl}${jobAd.user.photo}`
    : undefined;

  const jobDetails = [
    { label: "Gender", value: jobAd.gender || "N/A" },
    {
      label: "Years of Experience",
      value: jobAd.experience_years ? `${jobAd.experience_years} Years` : "N/A",
    },
    { label: "Country", value: jobAd.country?.name || "N/A" },
  ];

  return (
    <div className="space-y-10 py-10">
      <section className="container px-6 xl:px-20">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left - Main content + Job Details */}
          <div className="flex-1 flex flex-col md:flex-row gap-8">
            <div className="flex-1 space-y-6">
              <OpportunityHeader
                image={photoUrl}
                companyName={jobAd.user?.name || "Company"}
                category={jobAd.title}
              />

              <OpportunityBadges
                badges={jobAd.skills?.map((s) => s.name) || []}
              />

              <OpportunityAbout content={jobAd.about} />
            </div>

            <div className="w-full md:w-auto md:min-w-80 lg:min-w-96 shrink-0">
              <OpportunityJobDetails
                details={jobDetails}
                isActive={jobAd.status === "active" || !jobAd.status}
              />
            </div>
          </div>

          {/* Right - Ad Banner (separate column) */}
          <div className="lg:w-91.75 shrink-0">
            <OpportunityAdBanner />
          </div>
        </div>
      </section>

      <section className="container-sm">
        {similarJobAds && similarJobAds.length > 0 ? (
          <OpportunitySimilarJobs similarJobs={similarJobAds} />
        ) : (
          <div className="text-center py-10">
            <h2 className="title-2 font-bold">Similar Jobs</h2>
            <p className="description mt-2">
              No similar jobs found at the moment.
            </p>
          </div>
        )}
      </section>
    </div>
  );
};

export default OpportunityContent;
