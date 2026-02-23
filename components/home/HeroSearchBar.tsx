"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin, Tag } from "lucide-react";
import SelectCountry from "../select/SelectCountry";
import SelectSkills from "../select/SelectSkillsTags";
import { useRouter } from "next/navigation";

const HeroSearchBar = () => {
  const router = useRouter();
  const t = useTranslations("home.hero");
  const [selectedSkills, setSelectedSkills] = useState<string>("");
  const [selectedLocation, setSelectedLocation] = useState<string>("");

  const handleSearch = () => {
    router.push(`/talent?skills_id=${selectedSkills}&country_id=${selectedLocation}`);
  }

  return (
    <div className="bg-background rounded-xl p-2.5 sm:rounded-full sm:p-1.5 flex flex-col sm:flex-row sm:items-center gap-1.5 shadow-2xl border border-border">
      <SelectSkills
        className="flex-1 border-none!"
        value={selectedSkills}
        onChange={setSelectedSkills}
        icon={<Tag className="size-4 text-accentPink shrink-0 group-hover:scale-110 transition-transform" />}
      />
      {/* Location Dropdown */}
      <SelectCountry
        className="flex-1 border-none!"
        value={selectedLocation}
        onChange={setSelectedLocation}
        icon={<MapPin className="size-4 text-accentPink shrink-0 group-hover:scale-110 transition-transform" />}
      />

      {/* Search Button */}
      <Button
        variant="pink"
        size="lg"
        className="z-10 rounded-full px-8 sm:px-10 gap-2 shrink-0 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 sm:h-12"
        disabled={!selectedSkills && !selectedLocation}
        onClick={handleSearch}
      >
        {t("search.button")}
        <ArrowRight className="size-4" />
      </Button>
    </div>
  )
}

export default HeroSearchBar