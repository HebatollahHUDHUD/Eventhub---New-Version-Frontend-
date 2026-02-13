import { useTranslations } from "next-intl";

const EventsPage = () => {
  const t = useTranslations("navigation");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-primary">{t("events")}</h1>
        <p className="text-muted-foreground mt-2">
          Manage your events and event listings.
        </p>
      </div>

      <div className="bg-background rounded-lg p-6">
        {/* Events list/form will go here */}
        <p className="text-muted-foreground">Events management coming soon...</p>
      </div>
    </div>
  );
};

export default EventsPage;
