import type { JobAdMain } from "../../../../../../schemas/types";
import OpportunitiesCard from "../../components/OpportunitiesCard";

type OpportunitySimilarJobsProps = {
  similarJobs: JobAdMain[];
};

const OpportunitySimilarJobs = ({
  similarJobs,
}: OpportunitySimilarJobsProps) => {
  return (
    <section className="space-y-6">
      <h2 className="title-2 font-bold text-center">Similar Jobs</h2>
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        role="list"
        aria-label="Similar jobs list"
      >
        {similarJobs.map((jobAd) => (
          <OpportunitiesCard key={jobAd.id} jobAd={jobAd} />
        ))}
      </div>
    </section>
  );
};

export default OpportunitySimilarJobs;
