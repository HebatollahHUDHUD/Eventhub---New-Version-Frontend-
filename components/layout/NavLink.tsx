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
      {...props}
      href={href}
      className={cn(
        "p-2 text-primary-foreground duration-300 font-semibold hover:text-secondary/80",
        props.className,
        isActive && "text-secondary",
      )}
    >
      {children}
    </Link>
  );
};

export default NavLink;
