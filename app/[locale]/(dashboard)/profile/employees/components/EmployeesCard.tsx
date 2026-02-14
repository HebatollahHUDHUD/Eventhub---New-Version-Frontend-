"use client";

import { Employee } from "@/schemas/types";
import { Button } from "@/components/ui/button";
import Image from "@/components/common/image";
import { useTranslations } from "next-intl";
import Link from "next/link";

type EmployeesCardProps = {
  employee: Employee;
};

const EmployeesCard = ({ employee }: EmployeesCardProps) => {
  const t = useTranslations("common");

  return (
    <article className="relative bg-background flex flex-col">
      <div>
        <Image
          src="/images/placeholder.png"
          alt={employee.title}
          width={400}
          height={267}
          className="w-32 h-32 rounded-full object-cover"
        />
      </div>

      <h2 className="font-bold text-lg line-clamp-2">{employee.name}</h2>

      <div className="mt-auto space-y-2 ">
        <Button
          size={"lg"}
          variant="outlineSecondary"
          className="w-full"
          asChild
        >
          <Link href={`/profile/employees/${employee.id}`}>
            {t("view")}
          </Link>
        </Button>
      </div>
    </article>
  );
};

export default EmployeesCard;

