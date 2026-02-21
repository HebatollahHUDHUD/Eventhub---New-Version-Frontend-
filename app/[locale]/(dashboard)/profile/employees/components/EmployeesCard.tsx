"use client";

import { Employee } from "@/schemas/types";
import { Button } from "@/components/ui/button";
import Image from "@/components/common/image";
import { useTranslations } from "next-intl";
import Link from "next/link";
import ChangeEmployeeStatus from "./ChangeEmployeeStatus";
import { useQueryClient } from "@tanstack/react-query";
import SendMessageDialog from "./SendMessageDialog";

type EmployeesCardProps = {
  employee: Employee;
  refetch?: () => void;
  hasMessage?: boolean;
  jobAdApplicantId?: number;
};

const EmployeesCard = ({ employee, refetch, hasMessage = false, jobAdApplicantId }: EmployeesCardProps) => {
  const t = useTranslations("common");
  const queryClient = useQueryClient();

  const handleRefetch = () => {
    refetch?.();
    queryClient.invalidateQueries({ queryKey: ["employees"] });
  }

  return (
    <article className="relative bg-background flex flex-col items-center justify-center gap-4">
      <div>
        <Image
          src={employee.user.photo || "/images/placeholder.png"}
          alt={employee.user.name}
          width={400}
          height={267}
          className="w-32 h-32 rounded-full object-cover"
        />
      </div>

      <div className="text-center space-y-1">

        <h2 className="font-bold text-lg line-clamp-2">{employee.user.name}</h2>

        {employee.position && (
          <p className="text-sm text-muted-foreground">{employee.position.name}</p>
        )}
      </div>

      <div className="mt-auto space-y-2 w-full">
        {employee.company_verification_status === "pending" && (
          <>
            <ChangeEmployeeStatus id={employee.id} status="confirmed" refetch={handleRefetch} />
            <ChangeEmployeeStatus id={employee.id} status="declined" refetch={handleRefetch} />
          </>
        )}
        <Button
          size={"lg"}
          variant="outlineSecondary"
          className="w-full"
          asChild
        >
          <Link href={`/talent/${employee.user.id}`}>
            {t("view")}
          </Link>
        </Button>

        {hasMessage && (
          <SendMessageDialog
            jobAdApplicantId={jobAdApplicantId}
            trigger={
              <Button
                size={"lg"}
                variant="outlineOrange"
                className="w-full"
              >
                {t("message")}
              </Button>
            }
          />
        )}
      </div>
    </article>
  );
};

export default EmployeesCard;

