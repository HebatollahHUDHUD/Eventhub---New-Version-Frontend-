import OpportunitiesCard from "@/app/[locale]/(main)/opportunities/components/OpportunitiesCard";
import type { HomeOpportunity } from "@/schemas/home";

interface OpportunitiesListProps {
  opportunities: HomeOpportunity[];
}

const OpportunitiesList = ({ opportunities }: OpportunitiesListProps) => {
  // Show only first 8 opportunities
  const opportunitiesToShow = opportunities.slice(0, 8);

  if (opportunitiesToShow.length === 0) return null;

  // Transform HomeOpportunity to Opportunity format for the card
  const transformedOpportunities = opportunitiesToShow.map((opp) => ({
    id: opp.id,
    title: opp.title,
    image: "",
    company_name: "",
    slug: opp.id.toString(),
    category: "all",
  }));

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
      {transformedOpportunities.map((opportunity) => (
        <OpportunitiesCard key={opportunity.id}
          jobAd={opportunity as any} />
      ))}
    </div>
  );

};

export default OpportunitiesList;
