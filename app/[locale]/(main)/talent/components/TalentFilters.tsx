"use client";

import { Button } from "@/components/ui/button";
import { parseAsString, useQueryStates } from "nuqs";
import { useTranslations } from "next-intl";
import type { TalentCategory } from "../../../../../schemas/types";

const categories: TalentCategory[] = [
  "recruitment",
  "talents",
];

const TalentFilters = () => {
  const t = useTranslations("talent.filters");
  const [queryParams, setQueryParams] = useQueryStates({
    page: parseAsString.withDefault("1"),
    category: parseAsString.withDefault("recruitment"),
  });

  const handleCategoryChange = (category: TalentCategory) => {
    setQueryParams({
      page: "1",
      category
    });
  };

  return (
    <nav
      className="flex items-center justify-center gap-4 flex-wrap"
      aria-label="Talent category filters"
    >
      {categories.map((category) => (
        <Button
          key={category}
          size="lg"
          variant={queryParams.category === category ? "secondary" : "muted"}
          onClick={() => handleCategoryChange(category)}
          className="rounded-full capitalize"
          aria-pressed={queryParams.category === category}
          aria-label={`Filter by ${category} category`}
        >
          {category === "talents" ? t("talents") : t("recruitment")}
        </Button>
      ))}
    </nav>
  );
};

export default TalentFilters;
