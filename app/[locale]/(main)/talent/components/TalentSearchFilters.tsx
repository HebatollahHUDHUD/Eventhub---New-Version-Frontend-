"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { RotateCcw } from 'lucide-react';
import { useTranslations } from "next-intl";

const TalentSearchFilters = () => {
  const t = useTranslations("talent.search");
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
      <Select>
        <SelectTrigger className="w-full">
          <SelectValue placeholder={t("job_title_skill")} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">{t("job_title_skill")}</SelectItem> 
        </SelectContent>
      </Select>
      
      <Select>
        <SelectTrigger className="w-full">
          <SelectValue placeholder={t("location")} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">{t("location")}</SelectItem>
        </SelectContent>
      </Select>
      
      <Select>
        <SelectTrigger className="w-full">
          <SelectValue placeholder={t("gender")} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">{t("gender")}</SelectItem>
        </SelectContent>
      </Select>
      
      <Select>
        <SelectTrigger className="w-full">
          <SelectValue placeholder={t("rate")} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">{t("rate")}</SelectItem>
        </SelectContent>
      </Select>
      
      <div className="flex gap-2">
        <Button className="flex-1" variant={"secondary"} size={"lg"}>
          {t("search")}
        </Button>
        <Button variant="outline" size="icon" aria-label={t("reset")}>
          <RotateCcw className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default TalentSearchFilters;
