import { getData } from "@/lib/request-server";
import TalentCard from "@/app/[locale]/(main)/talent/components/TalentCard";
import type { Talent, TalentsResponse } from "@/schemas/types";

const TalentsList = async () => {
  const data = await getData<TalentsResponse>({
    endpoint: "/users",
    config: {
      queryParams: {
        page: "1",
        user_type: "talent",
      },
      next: {
        tags: ["talent"],
      },
    },
  });

  const talentItems = data.status === "success" ? data?.result?.users?.data : [];

  const talentsToShow: Talent[] = talentItems
    .slice(0, 4)

  if (talentsToShow.length === 0) return null

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 pt-8">
      {talentsToShow.map((item) => (
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
  );

};

export default TalentsList;
