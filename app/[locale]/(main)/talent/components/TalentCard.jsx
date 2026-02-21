 "use client";

import PleaseLoginDialog from "@/components/common/PleaseLoginDialog";
import Image from "@/components/common/image";
import { Button } from "@/components/ui/button";
import { getUserSession } from "@/lib/userSession";
import { useTranslations } from "next-intl";
import Link from "next/link";

const TalentCard = ({ id, name, role, projects, years, skills, image, average_rating = 0 }) => {
  const t = useTranslations("talent.card");
  const user = getUserSession()

  const isLoggedIn = !!user

  // Render stars based on average_rating (0-5 scale)
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.round(average_rating); // Round to nearest integer

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<span key={i} className="text-yellow-400">★</span>);
      } else {
        stars.push(<span key={i} className="text-gray-300">★</span>);
      }
    }
    return stars;
  };

  return (
    <div className="pt-12">
    <div className="bg-gradient-to-br from-purple-200 to-white rounded-3xl p-6 shadow-lg flex flex-col items-center text-center relative">
      
      {/* Circle Image */}
      <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white -mt-18">
        <Image src={image} alt={name} className="w-full h-full object-cover" width={96} height={96} />
      </div>

      {/* Name and Role */}
      <h2 className="mt-4 font-bold text-lg">{name}</h2>
      <p className="text-gray-500">{role}</p>

      {/* Rating */}
      <div className="flex items-center mt-2">
        {renderStars()}
      </div>

      {/* Stats */}
      <div className="flex justify-between w-full mt-4 text-gray-600 font-medium">
        <div>
          <p className="text-sm">{t("projects")}</p>
          <p className="text-lg">{projects || "0"}</p>
        </div>
        <div>
          <p className="text-sm">{t("years")}</p>
          <p className="text-lg">{years || "0"}</p>
        </div>
        <div>
          <p className="text-sm">{t("skills")}</p>
          <p className="text-lg">{skills || "0"}</p>
        </div>
      </div>

      {/* Button */}
      {isLoggedIn ? (
        <Button
          asChild
          variant={"secondary"}
          className="rounded-full capitalize w-3/4 mt-3"
        >
          <Link href={`/talent/${id}`} aria-label={`${t("details")} - ${name}`}>
            {t("details")}
          </Link>
        </Button>
      ) : (
        <PleaseLoginDialog>

      <Button
        variant={"secondary"}
        className="rounded-full capitalize w-3/4 mt-3"
      >
                 {t("details")}

      </Button>
        </PleaseLoginDialog>

      )}
    </div>
    </div>

  );
};

export default TalentCard;
