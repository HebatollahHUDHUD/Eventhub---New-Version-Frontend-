import { useTranslations } from "next-intl";

const DashboardPage = () => {
  const t = useTranslations("navigation");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-primary">{t("dashboard")}</h1>
        <p className="text-muted-foreground mt-2">
          Welcome to your dashboard. Manage your account and activities from here.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Dashboard content will go here */}
      </div>
    </div>
  );
};

export default DashboardPage;