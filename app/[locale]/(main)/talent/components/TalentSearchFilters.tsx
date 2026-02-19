"use client";


import { DollarSign, MapPin, RotateCcw, Tag, User } from 'lucide-react';
import { useUpdateSearchParams } from '@/hooks/useSearchParams';
import { Button } from '@/components/ui/button';
import { useTranslations } from "next-intl";
import { parseAsString } from 'nuqs';

import SelectSkills from '@/components/select/SelectSkillsTags';
import SelectCountry from '@/components/select/SelectCountry';
import SelectGender from '@/components/select/SelectGender';
import SelectRate from '@/components/select/SelectRate';

const TalentSearchFilters = () => {
  const {
    queryParams,
    updateParamsAndRefresh,
  } = useUpdateSearchParams({
    skill_id: parseAsString.withDefault(""),
    country_id: parseAsString.withDefault(""),
    gender_id: parseAsString.withDefault(""),
    rate_id: parseAsString.withDefault(""),
  })

  const t = useTranslations("talent.search");

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-2 bg-muted/60 px-4 py-2 rounded-lg items-center">
      <SelectSkills
        value={queryParams.skill_id}
        onChange={(value) => updateParamsAndRefresh({ skill_id: value })}
        icon={<Tag className="size-4 text-accentPink shrink-0 group-hover:scale-110 transition-transform" />}
        className='border-none! bg-transparent! shadow-transparent px-2'
      />

      <SelectCountry
        value={queryParams.country_id}
        onChange={(value) => updateParamsAndRefresh({ country_id: value })}
        icon={<MapPin className="size-4 text-accentPink shrink-0 group-hover:scale-110 transition-transform" />}
        className='border-none! bg-transparent! shadow-transparent px-2'
      />

      <SelectGender
        value={queryParams.gender_id}
        onChange={(value) => updateParamsAndRefresh({ gender_id: value })}
        icon={<User className="size-4 text-accentPink shrink-0 group-hover:scale-110 transition-transform" />}
        className='border-none! bg-transparent! shadow-transparent px-2'
      />

      <SelectRate
        value={queryParams.rate_id}
        onChange={(value) => updateParamsAndRefresh({ rate_id: value })}
        icon={<DollarSign className="size-4 text-accentPink shrink-0 group-hover:scale-110 transition-transform" />}
        className='border-none! bg-transparent! shadow-transparent px-2'
      />

      <div className="flex gap-2">
        <Button className="flex-1 h-12" variant={"secondary"} size={"lg"} >
          {t("search")}
        </Button>
        <Button variant="outline" size="icon" aria-label={t("reset")} className='h-12 w-12'
          onClick={() => updateParamsAndRefresh({ skill_id: "", country_id: "", gender_id: "", rate_id: "" })}
        >
          <RotateCcw className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default TalentSearchFilters;
