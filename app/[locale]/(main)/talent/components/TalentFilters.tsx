"use client";

import { Button } from "@/components/ui/button";
import { parseAsString, useQueryStates } from "nuqs";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

const user_types: string[] = [
  "talent",
  "recruiter",
];

const TalentFilters = () => {
  const router = useRouter();
  const t = useTranslations("talent.filters");
  const [queryParams, setQueryParams] = useQueryStates({
    page: parseAsString.withDefault("1"),
    user_type: parseAsString.withDefault("talent"),
  });

  const handleCategoryChange = async (user_type: string) => {
    await setQueryParams({
      page: "1",
      user_type,
    });
    router.refresh();
  };

  return (
    <nav
      className="flex items-center justify-center gap-4 flex-wrap"
      aria-label="Talent category filters"
    >
      {user_types.map((user_type) => (
        <Button
          key={user_type}
          size="lg"
          variant={queryParams.user_type === user_type ? "secondary" : "muted"}
          onClick={() => handleCategoryChange(user_type)}
          className="rounded-full capitalize"
          aria-pressed={queryParams.user_type === user_type}
          aria-label={`Filter by ${user_type} category`}
        >
          {user_type === "talent" ? t("talents") : t("recruitment")}
        </Button>
      ))}
    </nav>
  );
};

export default TalentFilters;
