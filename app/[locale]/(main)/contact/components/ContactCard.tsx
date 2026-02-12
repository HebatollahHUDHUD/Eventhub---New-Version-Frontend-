import Link from "next/link";
import { ContactItem } from "@/schemas/types";

export default function ContactCard({
  icon,
  title,
  value,
  href,
  isExternal,
}: ContactItem) {
  return (
    <div className="flex flex-col items-center text-center space-y-3">
      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-accentPurple text-white shadow-md">
        {icon}
      </div>

      <h3 className="title-3">{title}</h3>

      {isExternal ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-accentPurple title-4 underline hover:text-secondary/80 duration-200"
        >
          {value}
        </a>
      ) : (
        <Link
          href={href}
          className="text-accentPurple title-4 underline hover:text-secondary/80 duration-200"
        >
          {value}
        </Link>
      )}
    </div>
  );
}
