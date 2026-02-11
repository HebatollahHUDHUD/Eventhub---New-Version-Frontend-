type SearchParams = Record<string, string | string[] | undefined>;

export function searchParamsToQueryParams(
  searchParams: SearchParams
): Record<string, string | number> {
  const queryParams: Record<string, string | number> = {};

  Object.entries(searchParams).forEach(([key, value]) => {
    if (value === undefined) return;

    if (Array.isArray(value)) {
      // take first value (Next.js behavior)
      if (value[0] !== undefined) {
        queryParams[key] = value[0];
      }
    } else {
      queryParams[key] = value;
    }
  });

  return queryParams;
}
