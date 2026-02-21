import { getData } from "@/lib/request-server";
import { getTranslations } from "next-intl/server";
import LegalFilter from "./LegalFilter";

type LegalPageData = {
  legal_page_name: string;
  legal_page_billing_and_cancellation: string;
  legal_page_privacy_policy: string;
  legal_page_terms_of_use_for_companies: string;
  legal_page_terms_of_use_for_users: string;
  legal_page_terms_of_use_last_update: string | null;
  legal_page_privacy_policy_last_update: string | null;
  legal_page_cookie_policy_last_update: string | null;
  legal_page_key_risks_last_update: string | null;
  legal_page_cancellation_and_refund_policy_last_update: string | null;
  legal_page_merchandise_service_prices_last_update: string | null;
};

type LegalPageResponse = {
  status: string;
  result: LegalPageData;
};

const page = async ({ searchParams }: { searchParams: Promise<{ tab: string }> }) => {
  const t = await getTranslations("footer");
  const params = await searchParams;
  const activeTab = params.tab || "billing-cancellation";
  const data = await getData<LegalPageResponse>({
    endpoint: "/legal",
    config: {
      next: {
        tags: ["legal"],
      },
    },
  });

  const legalData: LegalPageData | null = data.status === "success" ? (data.result as unknown as LegalPageData) : null;

  if (!legalData) {
    return (
      <main className="container-sm py-10">
        <div className="text-center">
          <p className="text-muted-foreground">Failed to load legal documents.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="container-sm py-10 space-y-10 pt-32">


      <LegalFilter />

      {/* Content */}
      {activeTab === "billing-cancellation" && (
        <div
          className="space-y-4 [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:mb-4 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:mb-3 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:mb-2 [&_p]:mb-4 [&_p]:text-foreground [&_small]:text-sm [&_small]:text-muted-foreground"
          dangerouslySetInnerHTML={{
            __html: legalData.legal_page_billing_and_cancellation || "",
          }}
        />
      )}
      {activeTab === "privacy-policy" && (
        <div
          className="space-y-4 [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:mb-4 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:mb-3 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:mb-2 [&_p]:mb-4 [&_p]:text-foreground [&_small]:text-sm [&_small]:text-muted-foreground"
          dangerouslySetInnerHTML={{
            __html: legalData.legal_page_privacy_policy || "",
          }}
        />
      )}

      {activeTab === "terms-companies" && (
        <div
          className="space-y-4 [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:mb-4 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:mb-3 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:mb-2 [&_p]:mb-4 [&_p]:text-foreground [&_small]:text-sm [&_small]:text-muted-foreground"
          dangerouslySetInnerHTML={{
            __html: legalData.legal_page_terms_of_use_for_companies || "",
          }}
        />
      )}
      {activeTab === "terms-users" && (
        <div
          className="space-y-4 [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:mb-4 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:mb-3 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:mb-2 [&_p]:mb-4 [&_p]:text-foreground [&_small]:text-sm [&_small]:text-muted-foreground"
          dangerouslySetInnerHTML={{
            __html: legalData.legal_page_terms_of_use_for_users || "",
          }}
        />
      )}
    </main>
  );
};

export default page;
