"use client";

import { Button } from "@/components/ui/button";
import { useUpdateSearchParams } from "@/hooks/useSearchParams";
import { useTranslations } from "next-intl";
import { parseAsString } from "nuqs";

const LegalFilter = () => {
  const t = useTranslations("legal");
  const { updateParamsAndRefresh, queryParams } = useUpdateSearchParams({
    tab: parseAsString.withDefault("billing-cancellation"),
  })

  const tabs = [
    "billing-cancellation",
    "privacy-policy",
    "terms-companies",
    "terms-users",
  ]

  return (
    <div className="flex items-center justify-center gap-4">
      {tabs.map((tab) => (
        <Button key={tab} onClick={() => updateParamsAndRefresh({ tab })}
          variant={queryParams.tab === tab ? "secondary" : "muted"}
          className="rounded-full capitalize"
          aria-pressed={queryParams.tab === tab}
          aria-label={`Filter by ${t(tab)}`}
        >
          {t(tab)}
        </Button>
      ))}
    </div>
  )
}

export default LegalFilter