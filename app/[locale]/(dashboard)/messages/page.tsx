import { useTranslations } from "next-intl";

const MessagesPage = () => {
  const t = useTranslations("navigation");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-primary">{t("my-messages")}</h1>
        <p className="text-muted-foreground mt-2">
          View and manage your messages and conversations.
        </p>
      </div>

      <div className="bg-background rounded-lg p-6">
        {/* Messages list will go here */}
        <p className="text-muted-foreground">Messages coming soon...</p>
      </div>
    </div>
  );
};

export default MessagesPage;
