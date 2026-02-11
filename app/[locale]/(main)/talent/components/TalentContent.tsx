import { getData } from '@/lib/request-server';
import TalentFilters from './TalentFilters';
import TalentCard from './TalentCard';
import TalentSearchFilters from './TalentSearchFilters';
import { Suspense } from 'react';

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
        <Suspense fallback={<div>Loading...</div>}>
          <TalentList searchParams={searchParams} />
        </Suspense>
      </div>
    </div>
  );
};

export default TalentContent;

const TalentList = async ({ searchParams }: TalentContentProps) => {
 
  const data = await getData<any>({
    endpoint: "/talent",
    config: {
      next: {
        tags: ["talent"],
      },
    }
  });

  const talnt = data.status === "success" ? data?.result : null;


  const talentItems = talnt?.data;

  // Static card data
  const staticCard = {
    id: '1',
    name: 'Static Talent',
    role: 'Example Position',
    projects: 25,
    years: 5,
    skills: 10,
    image: '/images/image1.png'
  };

  const allCards = talentItems ? [staticCard, ...talentItems] : [staticCard];

  return (
    <div className="space-y-6">
      <div
        className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-center'
        role="list"
        aria-label="Talent items list"
      >
        {allCards?.map((item: any) => (
          <TalentCard 
            key={item.id}
            id={item.id}
            name={item.name}
            role={item.role}
            projects={item.projects}
            years={item.years}
            skills={item.skills}
            image={item.image}
          />
        ))}
      </div>
    </div>
  );
};