import OpportunitiesCard from "./OpportunitiesCard";
import OpportunitiesCardSkeleton from "./OpportunitiesCardSkeleton";
import { Suspense } from "react";
import type { Opportunity } from "../../../../../schemas/types";
import Pagination from "@/components/common/Pagination";

type OpportunitiesContentProps = {
  searchParams?: Record<string, string | undefined>;
};

const staticOpportunities: Opportunity[] = [
  {
    id: 1,
    title: "Asher",
    image: "/images/placeholder.png",
    company_name: "Company Name",
    slug: "asher",
    category: "asher",
  },
  {
    id: 2,
    title: "Software Engineer",
    image: "/images/placeholder.png",
    company_name: "Company Name",
    slug: "software-engineer",
    category: "software engineer",
  },
  {
    id: 3,
    title: "Marketing",
    image: "/images/placeholder.png",
    company_name: "Company Name",
    slug: "marketing",
    category: "marketing",
  },
  {
    id: 4,
    title: "Photographer",
    image: "/images/placeholder.png",
    company_name: "Company Name",
    slug: "photographer",
    category: "photographer",
  },
  {
    id: 5,
    title: "Asher",
    image: "/images/placeholder.png",
    company_name: "Company Name",
    slug: "asher-2",
    category: "asher",
  },
  {
    id: 6,
    title: "Software Engineer",
    image: "/images/placeholder.png",
    company_name: "Company Name",
    slug: "software-engineer-2",
    category: "software engineer",
  },
  {
    id: 7,
    title: "Marketing",
    image: "/images/placeholder.png",
    company_name: "Company Name",
    slug: "marketing-2",
    category: "marketing",
  },
  {
    id: 8,
    title: "Photographer",
    image: "/images/placeholder.png",
    company_name: "Company Name",
    slug: "photographer-2",
    category: "photographer",
  },
  {
    id: 9,
    title: "Asher",
    image: "/images/placeholder.png",
    company_name: "Company Name",
    slug: "asher-2",
    category: "asher",
  },
  {
    id: 10,
    title: "Software Engineer",
    image: "/images/placeholder.png",
    company_name: "Company Name",
    slug: "software-engineer-2",
    category: "software engineer",
  },
  {
    id: 11,
    title: "Marketing",
    image: "/images/placeholder.png",
    company_name: "Company Name",
    slug: "marketing-2",
    category: "marketing",
  },
  {
    id: 12,
    title: "Photographer",
    image: "/images/placeholder.png",
    company_name: "Company Name",
    slug: "photographer-2",
    category: "photographer",
  },
];

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

const OpportunitiesList = ({ searchParams }: OpportunitiesContentProps) => {
  const category = searchParams?.category || "all";

  const filtered =
    category === "all"
      ? staticOpportunities
      : staticOpportunities.filter((opp) => opp.category === category);

  return (
    <div className="space-y-6">
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        role="list"
        aria-label="Opportunities list"
      >
        {filtered.map((opportunity) => (
          <OpportunitiesCard key={opportunity.id} opportunity={opportunity} />
        ))}
      </div>

      <Pagination />
    </div>
  );
};
