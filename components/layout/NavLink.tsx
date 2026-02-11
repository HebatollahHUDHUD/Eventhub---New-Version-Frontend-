"use client";

import Link from "next/link";

import { cn } from "@/lib/utils";
import { useParams, usePathname } from "next/navigation";
import { HTMLAttributes } from "react";

const NavLink = ({
  href,
  children,
  ...props
}: HTMLAttributes<HTMLAnchorElement> & {
  href: string;
  children: React.ReactNode;
}) => {
  const pathname = usePathname();
  const path = href.split("/")[1];
  const { locale } = useParams();
  const isActive =
    pathname.split("/")[2] === path ||
    (href === "/" && pathname === `/${locale}`);

  return (
    <Link
      href={href}
      className={cn(
        "p-2 text-primary-foreground duration-300 hover:text-secondary/80",
        isActive && "!text-secondary"
      )}
      {...props}
    >
      {children}
    </Link>
  );
};

export default NavLink;
