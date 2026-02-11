"use client";

import { Button } from "@/components/ui/button";
import { parseAsString, useQueryStates } from "nuqs";
import type { BlogCategory } from "../../../../../schemas/types";

const categories: BlogCategory[] = [
  "all",
  "business",
  "conference",
  "marketing",
  "sales",
  "organizing",
];

const BlogsFilters = () => {
  const [queryParams, setQueryParams] = useQueryStates({
    page: parseAsString.withDefault("1"),
    category: parseAsString.withDefault("all"),
  });

  const handleCategoryChange = (category: BlogCategory) => {
    setQueryParams({
      page: "1",
      category
    });
  };

  return (
    <nav
      className="flex items-center justify-center gap-4 flex-wrap"
      aria-label="Blog category filters"
    >
      {categories.map((category) => (
        <Button
          key={category}
          size="sm"
          variant={queryParams.category === category ? "secondary" : "muted"}
          onClick={() => handleCategoryChange(category)}
          className="rounded-full capitalize"
          aria-pressed={queryParams.category === category}
          aria-label={`Filter by ${category} category`}
        >
          {category}
        </Button>
      ))}
    </nav>
  );
};

export default BlogsFilters;