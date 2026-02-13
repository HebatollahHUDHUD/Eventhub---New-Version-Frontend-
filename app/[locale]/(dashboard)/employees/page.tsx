import { useTranslations } from "next-intl";

const EmployeesPage = () => {
  const t = useTranslations("navigation");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-primary">{t("employees")}</h1>
        <p className="text-muted-foreground mt-2">
          Manage your employees and team members.
        </p>
      </div>

      <div className="bg-background rounded-lg p-6">
        {/* Employees list will go here */}
        <p className="text-muted-foreground">Employees management coming soon...</p>
      </div>
    </div>
  );
};

export default EmployeesPage;
