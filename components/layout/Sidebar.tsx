"use client";

import Image from "next/image";

import { Link, usePathname } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import {
  BellIcon,
  BookmarkIcon,
  FileText,
  FileTextIcon,
  LayoutGridIcon,
  LogOutIcon,
  MessageSquareText,
  SettingsIcon,
  UserIcon,
  Users2Icon,
} from "lucide-react";
import { getUserSession } from "@/lib/userSession";
import { logoutAction } from "@/actions/logout";
import { UserType } from "@/constant";
import { useGetData } from "@/hooks/useFetch";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const Sidebar = () => {
  const pathname = usePathname();
  const t = useTranslations("navigation");
  const user = getUserSession();
  const type = user?.user_type || UserType.COMPANY;
  const endpoint = `/${type}/profile/info`;
  const locale = useLocale();

  const { data } = useGetData<any>({
    endpoint,
    queryKey: ["Profile", endpoint],
  });

  const profileDate = data?.status === "success" ? data?.result : null;

  const links = [
    {
      name: "dashboard",
      href: "/dashboard",
      icon: <LayoutGridIcon size={26} />,
      permission: UserType.COMPANY,
    },
    {
      name: "privet-information",
      href: "/profile",
      icon: <UserIcon size={26} />,
    },
    {
      name: "change-password",
      href: "/change-password",
      icon: <BookmarkIcon size={26} />,
    },
    {
      name: "job-ads",
      href: "/profile/job-ads",
      icon: <SettingsIcon size={26} />,
      permission: UserType.COMPANY,
    },
    {
      name: "company-plans",
      href: "/profile/company-plans",
      icon: <BookmarkIcon size={26} />,
    },
    {
      name: "events",
      href: "/profile/events",
      icon: <FileText size={26} />,
      permission: UserType.COMPANY,
    },
    {
      name: "my-messages",
      href: "/profile/messages",
      icon: <MessageSquareText size={26} />,
    },
    {
      name: "employees",
      href: "/profile/employees",
      icon: <Users2Icon size={26} />,
    },
  ];

  return (
    <div
      className={cn(
        "flex-1 w-full bg-background z-10 fixed max-w-72 top-0 start-0 h-[calc(100vh-80px)] overflow-y-auto hide-scrollbar ltr:-translate-x-full translate-x-full duration-300",
        "lg:p-4 lg:sticky lg:w-auto lg:ltr:translate-x-0 lg:translate-x-0"
      )}
    >
      <div className="h-full pt-6 pb-2 px-2 flex flex-col items-center justify-start gap-6 lg:border lg:rounded-xl lg:shadow-sm">
        <div className="flex flex-col items-center gap-2">
          <Avatar className="w-[100px] h-[100px] rounded-full">
            <AvatarImage
              src={profileDate?.avatar ? profileDate?.avatar : undefined}
              alt={
                profileDate?.first_name || profileDate?.company_name || "User"
              }
              className="object-cover"
            />
            <AvatarFallback>
              {(profileDate?.first_name || profileDate?.company_name)
                ?.slice(0, 2)
                ?.toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <div className="text-center">
            <h2 className="title-sm text-primary">
              {profileDate?.first_name
                ? profileDate?.first_name + " " + profileDate?.last_name
                : profileDate?.company_name || "Guest"}
            </h2>

            {profileDate?.employer_name && (
              <p className="title-xs font-semibold text-muted-foreground">
                {profileDate?.employer_name}
              </p>
            )}

            {(profileDate?.position_ar || profileDate?.position) && (
              <p className="title-xs font-semibold text-muted-foreground">
                {locale === "ar"
                  ? profileDate?.position_ar || profileDate?.position
                  : profileDate?.position || profileDate?.position_ar}
              </p>
            )}
          </div>
        </div>

        <ul className="w-full space-y-1">
          {links
            .filter((item) => !item.permission || item.permission === type)
            .map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className={cn(
                    "flex items-center gap-2 py-3 px-4 rounded-xl text-primary duration-300 hover:bg-primary/20",
                    pathname === link.href &&
                    "bg-primary! text-primary-foreground"
                  )}
                >
                  {link.icon}
                  {t(link.name)}
                </Link>
              </li>
            ))}
        </ul>

        <button
          className="mt-auto w-full flex items-center gap-2 py-3 px-4 rounded-xl text-primary duration-300 cursor-pointer hover:bg-primary/20"
          onClick={async () => {
            await logoutAction();
          }}
        >
          <LogOutIcon size={26} />

          <span>{t("logout")}</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
