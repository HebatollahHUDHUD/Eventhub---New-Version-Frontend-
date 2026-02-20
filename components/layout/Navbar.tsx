"use client";

import cookieClient from "js-cookie";
import NavLink from "./NavLink";
import Image from "next/image";
import Link from "next/link";

import { useEffect, useState, Suspense } from "react";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { MenuIcon, UserIcon, XIcon } from "lucide-react";
import { SESSION_NAME } from "@/constant";
import { usePathname } from "next/navigation";
import LocalChanger from "./LocalChanger";
import { Button } from "../ui/button";

const navigation = [
  {
    name: "home",
    href: "/",
  },
  {
    name: "about",
    href: "/about",
  },
  {
    name: "talent",
    href: "/talent",
  },
  {
    name: "opportunities",
    href: "/opportunities",
  },
  {
    name: "blog",
    href: "/blogs",
  },
  {
    name: "pricing",
    href: "/pricing",
  }, {
    name: "contact",
    href: "/contact",
  },
];

const Navbar = () => {
  const pathname = usePathname();
  const isLoggedIn = cookieClient.get(SESSION_NAME);

  const t = useTranslations("navigation");
  const [isOpen, setIsOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  // Check if current page is home page (accounting for locale prefix)
  const isHomePage = pathname === "/" || pathname === "/ar" || pathname === "/en" || pathname.match(/^\/(ar|en)\/?$/);

  // Determine if navbar should have white background
  const shouldHaveWhiteBg = scrollY > 100 || !isHomePage;

  const toggleNav = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Handle scroll event
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    // Set initial scroll position
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav className={cn(
      "sticky top-0 w-full z-40 transition-all duration-300",
      shouldHaveWhiteBg ? "bg-white shadow-sm" : "bg-primary"
    )}>
      <div className="container">
        <div className="h-20 flex items-center justify-between">
          <Link href="/" className="flex justify-center items-center">
            <Image
              src={shouldHaveWhiteBg ? "/logo_blue.svg" : "/logo.svg"}
              alt={t("brand-name")}
              unoptimized
              width={140}
              height={80}
              loading="lazy"
              className="w-28 h-12 object-contain"
            />
          </Link>

          <div
            className={cn(
              "fixed top-0 end-0 bottom-0 z-50 max-w-full w-72 h-dvh ltr:translate-x-full -translate-x-full duration-300 origin-left overflow-hidden",
              isOpen && "translate-x-0 ltr:translate-x-0",
              "flex-1 flex flex-col xl:block xl:static xl:w-auto xl:ltr:translate-x-0 xl:translate-x-0 xl:h-auto xl:bg-transparent",
              shouldHaveWhiteBg ? "bg-white xl:bg-transparent" : "bg-primary xl:bg-transparent"
            )}
          >
            <div className="w-full h-20 border-b border-muted/20 p-4 relative xl:hidden">
              <Image
                src={shouldHaveWhiteBg ? "/logo_blue.svg" : "/logo.svg"}
                alt={t("brand-name")}
                width={150}
                height={55}
                className="w-28 h-12 object-contain mx-auto"
                quality={100}
              />

              <button
                className="absolute top-2 start-2 flex justify-center items-center bg-muted rounded-full w-8 h-8 [&_svg]:size-4"
                onClick={toggleNav}
                aria-label="Close Navigation"
                title="Close Navigation"
              >
                <XIcon />
              </button>
            </div>

            <ul className="p-4 flex flex-col xl:items-center xl:justify-center gap-2 xl:flex-row xl:p-0">
              {navigation.map((item) => (
                <li key={item.name}>
                  <NavLink href={item.href}
                    className={
                      shouldHaveWhiteBg ? "text-foreground" : "text-primary-foreground"
                    }

                  >{t(item.name)}</NavLink>
                </li>
              ))}

              <li>
                <Suspense fallback={null}>
                  <LocalChanger
                    className={
                      shouldHaveWhiteBg ? "text-foreground" : "text-primary-foreground"
                    }
                  />
                </Suspense>
              </li>

              {!isLoggedIn ? (
                <li className="xl:hidden mt-2">
                  <Link
                    href="/login"
                    className="text-secondary font-semibold hover:underline px-0"
                  >
                    {t("login")}
                  </Link>
                </li>
              ) : <li className="xl:hidden mt-2">
                <Button
                  asChild
                  variant="orange"
                  size="lg"
                >
                  <Link
                    href="/profile"

                  >
                    {t("profile")}
                  </Link>
                </Button>

              </li>}
            </ul>


          </div>

          <div className="relative z-10 flex items-center gap-4">
            {!isLoggedIn ? (
              <div className="hidden xl:flex items-center gap-4">
                <Button
                  asChild
                  variant="secondary"
                  size="lg"
                >
                  <Link
                    href="/login"
                  >
                    {t("login")}
                  </Link>
                </Button>

                <Button
                  asChild
                  variant="outlineSecondary"
                  size="lg"
                >
                  <Link
                    href="/register"
                  >
                    {t("register")}
                  </Link>
                </Button>
              </div>
            ) : (
              <Button
                asChild
                variant="orange"
                size="lg"
              >
                <Link
                  href="/profile"
                >
                  <UserIcon size={20} />
                  {t("profile")}
                </Link>
              </Button>
            )}


            <button
              className={cn(
                "xl:hidden",
                shouldHaveWhiteBg ? "text-foreground" : "text-primary-foreground"
              )}
              onClick={toggleNav}
              aria-label="Open Navigation"
              title="Open Navigation"
            >
              <MenuIcon size={30} />
            </button>
          </div>
        </div>
      </div>

      <div
        className={cn(
          "fixed inset-0 h-dvh w-dvw opacity-0 bg-black/80 z-40 invisible transition-opacity duration-150 xl:hidden",
          isOpen && "visible opacity-100"
        )}
        onClick={toggleNav}
      />
    </nav>
  );
};

export default Navbar;
