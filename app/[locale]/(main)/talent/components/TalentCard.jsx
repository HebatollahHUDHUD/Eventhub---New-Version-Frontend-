 "use client";

import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import Link from "next/link";

const TalentCard = ({ id, name, role, projects, years, skills, image }) => {
  const t = useTranslations("talent.card");
  
  return (
    <div className=" bg-linear-to-br from-purple-200 to-white rounded-3xl p-6 shadow-lg flex flex-col items-center text-center relative">
      
      {/* Circle Image */}
      <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white -mt-18">
        <img src={image} alt={name} className="w-full h-full object-cover" />
      </div>

      {/* Name and Role */}
      <h2 className="mt-4 font-bold text-lg">{name}</h2>
      <p className="text-gray-500">{role}</p>

      {/* Rating */}
      <div className="flex items-center mt-2 text-yellow-400">
        <span>★</span>
        <span>★</span>
        <span>★</span>
        <span>★</span>
        <span className="text-gray-300">★</span>
      </div>

      {/* Stats */}
      <div className="flex justify-between w-full mt-4 text-gray-600 font-medium">
        <div>
          <p className="text-sm">{t("projects")}</p>
          <p className="text-lg">{projects}</p>
        </div>
        <div>
          <p className="text-sm">{t("years")}</p>
          <p className="text-lg">{years}</p>
        </div>
        <div>
          <p className="text-sm">{t("skills")}</p>
          <p className="text-lg">{skills}</p>
        </div>
      </div>

      {/* Button */}
      <Button
        asChild
        variant={"secondary"}
        className="rounded-full capitalize w-3/4 mt-3"
      >
        <Link href={`/talent/${id}`} aria-label={`${t("details")} - ${name}`}>
          {t("details")}
        </Link>
      </Button>
    </div>
  );
};

export default TalentCard;
