"use client";

import Image from "next/image";

import { Link, usePathname } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import {
  BellIcon,
  BookmarkIcon,
  FileTextIcon,
  LayoutGridIcon,
  LogOutIcon,
  SettingsIcon,
  UserIcon,
} from "lucide-react";
import DeleteAlert from "../common/DeleteAlert";
import { getUserSession } from "@/lib/userSession";
import { logoutAction } from "@/actions/logout";
import { UserType } from "@/constant";
import { useGetData } from "@/hooks/useFetch";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const Sidebar = () => {
  const pathname = usePathname();
  const t = useTranslations("navigation");
  const user = getUserSession();
  const type = user?.user_type || UserType.SPEAKER;
  const endpoint = `/${type}/profile/info`;
  const locale = useLocale();

  const { data } = useGetData<any>({
    endpoint,
    queryKey: ["Profile", endpoint],
  });

  const profileDate = data?.status === "success" ? data?.response : null;

  const links = [
    {
      name: "dashboard",
      href: "/dashboard",
      icon: <LayoutGridIcon size={26} />,
    },
    {
      name: "my-profile",
      href: "/profile",
      icon: <UserIcon size={26} />,
    },
    {
      name: "resume",
      href: "/resume",
      icon: <FileTextIcon size={26} />,
      permission: UserType.SPEAKER,
    },
    // {
    //   name: "applications",
    //   href: "/applications",
    //   icon: <ReceiptTextIcon size={26} />,
    //   permission: UserType.COMPANY,
    // },
    {
      name: "manage-events",
      href: "/manage-events",
      icon: <FileTextIcon size={26} />,
      permission: UserType.COMPANY,
    },
    {
      name: "notifications",
      href: "/notifications",
      icon: <BellIcon size={26} />,
    },
    {
      name: "saved-events",
      href: "/saved-events",
      icon: <BookmarkIcon size={26} />,
      permission: UserType.SPEAKER,
    },
    {
      name: "saved-candidates",
      href: "/saved-candidates",
      icon: <BookmarkIcon size={26} />,
      permission: UserType.COMPANY,
    },
    {
      name: "change-password",
      href: "/change-password",
      icon: <SettingsIcon size={26} />,
    },
  ];

  return (
    <div
      className={cn(
        "flex-1 w-full bg-background z-10 fixed max-w-72 top-0 start-0 h-dvh overflow-y-auto hide-scrollbar ltr:-translate-x-full translate-x-full duration-300",
        "lg:sticky lg:w-auto lg:ltr:translate-x-0 lg:translate-x-0"
      )}
    >
      <div className="h-full pt-8 pb-4 px-4 flex flex-col items-center justify-start gap-6">
        <Link href="/" className="xl:max-w-56 shrink-0 flex justify-start">
          <Image
            src="/logo2.svg"
            alt={t("brand-name")}
            unoptimized
            width={140}
            height={80}
            loading="lazy"
            className="w-28 h-12 object-contain"
          />
        </Link>

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

        <ul className="w-full">
          {links
            .filter((item) => !item.permission || item.permission === type)
            .map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className={cn(
                    "flex items-center gap-2 py-4 px-4 rounded-2xl text-primary duration-300 hover:bg-primary/20",
                    pathname === link.href &&
                      "!bg-primary text-primary-foreground"
                  )}
                >
                  {link.icon}
                  {t(link.name)}
                </Link>
              </li>
            ))}

          <li>
            <DeleteAlert
              className="py-4 px-4 w-full h-auto text-base justify-start rounded-2xl !text-primary duration-300 hover:bg-primary/20 [&_svg]:size-7"
              variant={"ghost"}
              endpoint={`/${type}/profile/delete`}
              refetch={async () => {
                await logoutAction();
              }}
              desc={t("delete-account-desc")}
              hasIcon
              btnTxt={t("delete-account")}
            />
          </li>
        </ul>

        {type === UserType.COMPANY && (
          <div className="space-y-3 w-full">
            <div className="space-y-1.5">
              <p className="text-sm text-muted-foreground">
                {t("unlock-profile")}
              </p>

              <CompleteRange
                value={
                  ((profileDate?.plan_info?.plan?.count_unlook -
                    profileDate?.plan_info?.count_unlook) /
                    profileDate?.plan_info?.plan?.count_unlook) *
                  100
                }
              />

              <div className="flex items-center justify-between gap-2">
                <p className="text-sm text-destructive">
                  {t("used")}:{" "}
                  {profileDate?.plan_info?.plan?.count_unlook -
                    profileDate?.plan_info?.count_unlook || 0}
                </p>

                <p className="text-sm text-green-600">
                  {t("available")}: {profileDate?.plan_info?.count_unlook || 0}
                </p>
              </div>
            </div>

            <div className="space-y-1.5">
              <p className="text-sm text-muted-foreground">{t("post-event")}</p>

              <CompleteRange
                value={
                  ((profileDate?.plan_info?.plan?.count_event -
                    profileDate?.plan_info?.count_event) /
                    profileDate?.plan_info?.plan?.count_event) *
                  100
                }
              />

              <div className="flex items-center justify-between gap-2">
                <p className="text-sm text-destructive">
                  {t("used")}:{" "}
                  {profileDate?.plan_info?.plan?.count_event -
                    profileDate?.plan_info?.count_event || 0}
                </p>

                <p className="text-sm text-green-600">
                  {t("available")}: {profileDate?.plan_info?.count_event || 0}
                </p>
              </div>
            </div>
          </div>
        )}

        {type === UserType.SPEAKER && (
          <div className="w-full space-y-1.5">
            <p className="text-sm text-muted-foreground">
              {profileDate?.profile_progress}%
            </p>

            <CompleteRange value={profileDate?.profile_progress} />

            <p className="text-sm text-muted-foreground">
              {t("profile-complete")}{" "}
            </p>
          </div>
        )}

        <button
          className="mt-auto w-full flex items-center gap-2 py-4 px-4 rounded-2xl text-primary duration-300 hover:bg-primary/20"
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

const CompleteRange = ({ value }: { value: number }) => {
  return (
    <div className="w-full h-1.5 bg-primary rounded-full overflow-hidden">
      <div
        className="h-full bg-secondary"
        style={{
          width: `${value || 0}%`,
        }}
      ></div>
    </div>
  );
};
