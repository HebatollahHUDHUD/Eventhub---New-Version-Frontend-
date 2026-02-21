"use client";

import { Button } from "@/components/ui/button";
import { parseAsString, useQueryStates } from "nuqs";
import { useGetData } from "@/hooks/useFetch";
import { useTranslations } from "next-intl";
import { useUpdateSearchParams } from "@/hooks/useSearchParams";

const OpportunitiesFilters = () => {
  const t = useTranslations("common");
  const { data } = useGetData<any>({
    endpoint: "/system-lookups?type=job_ad_category",
    queryKey: ["job_ad_categories"],
  })
  const {
    queryParams,
    updateParamsAndRefresh,
  } = useUpdateSearchParams({
    page: parseAsString.withDefault("1"),
    category_id: parseAsString.withDefault("all"),
  });

  const handleCategoryChange = (category: any) => {
    updateParamsAndRefresh({
      page: "1",
      category_id: category,
    });
  };

  const categories = data?.status === "success" ? data?.result?.system_lookups || [] : [];

  return (
    <nav
      className="flex items-center justify-center gap-4 flex-wrap"
      aria-label="Opportunity category filters"
    >
      <Button
        size="sm"
        variant={queryParams.category_id === "all" ? "secondary" : "muted"}
        onClick={() => handleCategoryChange("all")}
        className="rounded-full capitalize"
        aria-pressed={queryParams.category_id === "all"}
        aria-label={`Filter by ${t("all")} category`}
      >
        {t("all")}
      </Button>

      {categories.map((category: any) => (
        <Button
          key={category?.id}
          size="sm"
          variant={queryParams.category_id === category?.id ? "secondary" : "muted"}
          onClick={() => handleCategoryChange(category?.id)}
          className="rounded-full capitalize"
          aria-pressed={queryParams.category_id === category?.id}
          aria-label={`Filter by ${category?.name} category`}
        >
          {category?.name}
        </Button>
      ))}
    </nav>
  );
};

export default OpportunitiesFilters;
