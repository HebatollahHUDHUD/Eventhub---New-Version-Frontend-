import { getData } from '@/lib/request-server';
import TalentFilters from './TalentFilters';
import TalentCard from './TalentCard';
import TalentSearchFilters from './TalentSearchFilters';
import { Suspense } from 'react';
import { Talent, TalentsResponse } from '@/schemas/types';

type TalentContentProps = {
  searchParams?: Record<string, string | undefined>;
};

const TalentContent = ({ searchParams }: TalentContentProps) => {

  return (
    <div className="space-y-8">
      <TalentFilters />

      <div className="container-sm">
        <TalentSearchFilters />
      </div>
      <div className="container-sm mt-20">
        <Suspense
          fallback={<div>Loading...</div>}
        >
          <TalentList searchParams={searchParams} />
        </Suspense>
      </div>
    </div>
  );
};

export default TalentContent;

const TalentList = async ({ searchParams }: TalentContentProps) => {

  const data = await getData<TalentsResponse>({
    endpoint: "/users",
    config: {
      queryParams: {
        page: "1",
        user_type: "talent",
        ...searchParams,
      },
    },
  });

  const talentItems = data.status === "success" ? data?.result?.users?.data : [];

  return (
    <div className="space-y-6">
      <div
        className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-center'
        role="list"
        aria-label="Talent items list"
      >
        {talentItems?.map((item: Talent) => (
          <TalentCard
            key={item.id}
            id={item.id}
            name={item.name}
            role={item.position?.name || item.other_position || "-"}
            projects={item.projects_count}
            years={item.experience_years}
            skills={item.skills_count}
            image={item.photo}
            average_rating={item.average_rating}
          />
        ))}
      </div>
    </div>
  );
};