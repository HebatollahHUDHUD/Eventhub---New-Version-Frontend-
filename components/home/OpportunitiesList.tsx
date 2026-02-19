import OpportunitiesCard from "@/app/[locale]/(main)/opportunities/components/OpportunitiesCard";
import type { HomeOpportunity } from "@/schemas/home";

interface OpportunitiesListProps {
  opportunities: HomeOpportunity[];
}

const OpportunitiesList = ({ opportunities }: OpportunitiesListProps) => {

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
      {opportunities.map((opportunity) => (
        <OpportunitiesCard key={opportunity.id}
          jobAd={opportunity as any} />
      ))}
    </div>
  );

};

export default OpportunitiesList;
