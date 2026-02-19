"use client";

import { Link, usePathname } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import {
  BookOpenTextIcon,
  BookTextIcon,
  BookmarkIcon,
  BrainIcon,
  CreditCardIcon,
  FileText,
  FolderIcon,
  LayoutGridIcon,
  LogOutIcon,
  MessageSquareText,
  SettingsIcon,
  UserIcon,
  Users2Icon,
} from "lucide-react";
import { logoutAction } from "@/actions/logout";
import { UserType } from "@/constant";
import { useGetData } from "@/hooks/useFetch";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const Sidebar = () => {
  const pathname = usePathname();
  const t = useTranslations("navigation");
  const endpoint = "/profile";

  const { data } = useGetData<any>({
    endpoint,
    queryKey: ["profile"],
  });

  const profileDate = data?.status === "success" ? data?.result?.profile : null;

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
      permission: UserType.COMPANY,
    },
    {
      name: "personal-information",
      href: "/profile",
      icon: <LayoutGridIcon size={26} />,
      permission: [UserType.RECRUITER, UserType.TALENT],
    },
    {
      name: "change-password",
      href: "/profile/change-password",
      icon: <BookmarkIcon size={26} />,
    },
    {
      name: "skills-experience",
      href: "/profile/skills-experiences",
      icon: <BrainIcon size={26} />,
      permission: [UserType.RECRUITER, UserType.TALENT],
    },
    {
      name: "portfolio",
      href: "/profile/portfolio",
      icon: <FolderIcon size={26} />,
      permission: [UserType.RECRUITER, UserType.TALENT],
    },
    {
      name: "job-ads",
      href: "/profile/job-ads",
      icon: <SettingsIcon size={26} />,
      permission: UserType.COMPANY,
    },
    {
      name: "my-plan",
      href: "/profile/plans",
      icon: <CreditCardIcon size={26} />,
    }, {
      name: "e-books",
      href: "/profile/books",
      icon: <BookOpenTextIcon size={26} />,
      permission: [UserType.RECRUITER, UserType.TALENT],
    }, {
      name: "e-courses",
      href: "/profile/courses",
      icon: <BookTextIcon size={26} />,
      permission: [UserType.RECRUITER, UserType.TALENT],
    },
    {
      name: "events",
      href: "/profile/events",
      icon: <FileText size={26} />,
    },
    {
      name: "employees",
      href: "/profile/employees",
      icon: <Users2Icon size={26} />,
      permission: UserType.COMPANY,
    },
    {
      name: "my-messages",
      href: "/profile/messages",
      icon: <MessageSquareText size={26} />,
    },
  ];

  return (
    <div
      className={cn(
        "flex-1 w-full bg-background z-10 fixed max-w-72 top-0 start-0 h-[calc(100vh-80px)] overflow-y-auto hide-scrollbar ltr:-translate-x-full translate-x-full duration-300",
        "lg:top-20 lg:p-4 lg:sticky lg:w-auto lg:ltr:translate-x-0 lg:translate-x-0"
      )}
    >
      <div className="h-full pt-6 pb-2 px-2 flex flex-col items-center justify-start gap-6 lg:border lg:rounded-xl lg:shadow-sm">
        <div className="flex flex-col items-center gap-2">
          <Avatar className="w-[100px] h-[100px] rounded-full">
            <AvatarImage
              src={profileDate?.photo}
              alt={
                profileDate?.name || "User"
              }
              className="object-cover"
            />
            <AvatarFallback>
              {(profileDate?.name)
                ?.slice(0, 2)
                ?.toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <div className="text-center">
            <h2 className="title-sm text-primary">
              {profileDate?.name}
            </h2>

            {profileDate?.incharge_person_name && (
              <p className="title-xs font-semibold text-muted-foreground">
                {profileDate?.incharge_person_name}
              </p>
            )}

            {profileDate?.position && (
              <p className="title-xs font-semibold text-muted-foreground">
                {profileDate?.position?.name}
              </p>
            )}
          </div>
        </div>

        <ul className="w-full space-y-1">
          {links
            .filter((item) => !item.permission || item.permission === profileDate?.user_type || item.permission.includes(profileDate?.user_type))
            .map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className={cn(
                      "flex items-center gap-2 py-3 px-4 rounded-xl text-secondary duration-300 hover:bg-secondary/20",
                      isActive &&
                      "bg-secondary! text-secondary-foreground"
                    )}
                  >
                    <span className={cn("text-secondary/75", isActive && "text-secondary-foreground")}>
                      {link.icon}
                    </span>

                    <span className={cn("text-foreground", isActive && "text-secondary-foreground")}>
                      {t(link.name)}
                    </span>
                  </Link>
                </li>
              )
            })}
        </ul>

        <button
          className="mt-auto w-full flex items-center gap-2 py-3 px-4 rounded-xl text-secondary duration-300 cursor-pointer hover:bg-secondary/20"
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
