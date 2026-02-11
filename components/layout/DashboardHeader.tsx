import { Link } from "@/i18n/navigation";
import { BellIcon } from "lucide-react";
import { Button } from "../ui/button";
import { useTranslations } from "next-intl";
import { getUserSession } from "@/lib/userSession";
import SearchInput from "../common/SearchInput";
import { UserType } from "@/constant";

const DashboardHeader = () => {
  const t = useTranslations("navigation");
  const user = getUserSession();
  const type = user?.user_type;

  return (
    <nav className="w-full">
      <div className="flex flex-col gap-4 xl:justify-between xl:items-center xl:flex-row">
        <div className="flex items-center justify-between gap-4">
          <ul className="flex items-center gap-4">
            <li>
              <Link href="/">{t("home")}</Link>
            </li>
            <li>
              {type === UserType.COMPANY ? (
                <Link href="/speakers">{t("speakers")}</Link>
              ) : (
                <Link href="/events">{t("events")}</Link>
              )}
            </li>
            <li>
              <Link href="/about-us">{t("about-us")}</Link>
            </li>
            <li>
              <Link href="/subscription">{t("my-subscription")}</Link>
            </li>
          </ul>

          <Link
            href="/notifications"
            className="block xl:hidden"
            title="Notifications"
            aria-label="Notifications"
          >
            <BellIcon size={22} className="text-primary" />
          </Link>
        </div>

        <div className="flex items-center justify-between gap-4 xl:justify-normal">
          <SearchInput className="bg-background rounded-full px-6 h-10 xl:h-11" />

          <Link
            href="/notifications"
            className="hidden xl:block"
            title="Notifications"
            aria-label="Notifications"
          >
            <BellIcon size={22} className="text-primary" />
          </Link>

          <Link href="/contact-us">
            <Button className="rounded-full h-10 xl:h-11" size={"lg"}>
              {t("contact-us")}
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default DashboardHeader;
