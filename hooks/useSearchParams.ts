"use client";

import { useRouter } from "next/navigation";
import { useQueryStates } from "nuqs";

/**
 * Custom hook to manage search params with automatic router refresh
 * 
 * @param schema - The query states schema from nuqs (e.g., { page: parseAsString.withDefault("1") })
 * @returns An object containing queryParams, setQueryParams, and updateParamsAndRefresh function
 * 
 * @example
 * ```tsx
 * const { queryParams, updateParamsAndRefresh } = useSearchParams({
 *   page: parseAsString.withDefault("1"),
 *   user_type: parseAsString.withDefault("talent"),
 * });
 * 
 * // Update params and refresh
 * await updateParamsAndRefresh({ page: "1", user_type: "recruiter" });
 * ```
 */
export function useUpdateSearchParams<T extends Record<string, any>>(
  schema: T
) {
  const router = useRouter();
  const [queryParams, setQueryParams] = useQueryStates(schema);

  /**
   * Updates query params and refreshes the router
   * @param params - Partial object of params to update (values should match the parsed types, e.g., strings)
   */
  const updateParamsAndRefresh = async (params: Parameters<typeof setQueryParams>[0]) => {
    await setQueryParams(params);
    router.refresh();
  };

  return {
    queryParams,
    setQueryParams,
    updateParamsAndRefresh,
  };
}
