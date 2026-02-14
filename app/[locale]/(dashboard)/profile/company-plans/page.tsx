import { useTranslations } from "next-intl";

const CompanyPlansPage = () => {
  const t = useTranslations("navigation");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-primary">{t("company-plans")}</h1>
        <p className="text-muted-foreground mt-2">
          View and manage your company subscription plans.
        </p>
      </div>

      <div className="bg-background rounded-lg p-6">
        {/* Company plans content will go here */}
        <p className="text-muted-foreground">Company plans information coming soon...</p>
      </div>
    </div>
  );
};

export default CompanyPlansPage;
