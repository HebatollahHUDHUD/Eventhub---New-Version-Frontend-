import { getData } from "@/lib/request-server";
import TalentCard from "@/app/[locale]/(main)/talent/components/TalentCard";
import type { Talent, TalentCardData, TalentsResponse } from "@/schemas/types";

const TalentsList = async () => {
  const data = await getData<TalentsResponse>({
    endpoint: "/users",
    config: {
      queryParams: {
        page: "1",
        // user_type: "talent",
      },
      next: {
        tags: ["talent"],
      },
    },
  });

  // Response structure: data.result.users.data
  const talentItems = data.status === "success" ? data?.result?.users?.data : [];

  const talentsToShow: Talent[] = talentItems
    .slice(0, 4)

  if (talentsToShow.length === 0) return null

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 pt-8">
      {talentsToShow.map((talent) => (
        <TalentCard
          key={talent.id}
          id={talent.id}
          name={talent.name}
          role={talent.role}
          projects={30}
          years={30}
          skills={30}
          image={"/images/placeholder.png"}
        />
      ))}
    </div>
  );

};

export default TalentsList;
