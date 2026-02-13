import { useTranslations } from "next-intl";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { cn } from "@/lib/utils";

export type StatusType =
  | "created"
  | "new"
  | "completed"
  | "cancelled"
  | "closed"
  | "paid"
  | "not-paid"
  | "hold"
  | "pending"
  | "rejected"
  | "approved"
  | "reviewing"
  | "accepted"
  | "processing"
  | "partial_completed"
  | "delivered"
  | "arrived"
  | "available"
  | "salary"
  | "main"
  | "in_progress"
  | "not_available"
  | "retired"
  | "In Progress"
  | "opened"
  | "active"
  | "inactive"
  | "appointed"
  | "reappointed"
  | "dismissed"
  | "resigned"
  | "suspended"
  | "contract_ended"
  | "job_loss"
  | "out_of_service"
  | "removed"
  | "operated"
  | "need_approval"

export default function Status({
  status,
  tooltip,
  className,
}: {
  status: StatusType;
  tooltip?: string;
  className?: string;
}) {
  const t = useTranslations("statuses");
  const classes: Record<StatusType, string> = {
    created: "text-sky-600",
    new: "text-sky-600",
    completed: "text-secondary",
    cancelled: "text-destructive",
    opened: "text-indigo-600",
    closed: "text-destructive",
    paid: "text-secondary",
    available: "text-secondary",
    "not-paid": "text-yellow-600",
    hold: "text-muted-foreground",
    pending: "text-muted-foreground",
    rejected: "text-destructive",
    approved: "text-blue-600",
    reviewing: "text-yellow-600",
    accepted: "text-blue-600",
    processing: "text-orange-600",
    partial_completed: "text-orange-600",
    delivered: "text-destructive",
    arrived: "text-blue-600",
    salary: "text-primary",
    main: "text-secondary",
    in_progress: "text-orange-600",
    not_available: "text-destructive",
    retired: "text-destructive",
    "In Progress": "text-orange-600",
    active: "text-primary",
    inactive: "text-destructive",
    appointed: "text-blue-600",
    reappointed: "text-blue-600",
    dismissed: "text-destructive",
    resigned: "text-destructive",
    suspended: "text-yellow-600",
    contract_ended: "text-orange-600",
    job_loss: "text-destructive",
    out_of_service: "text-destructive",
    removed: "text-destructive",
    operated: "text-green-600",
    need_approval: "text-yellow-600",
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger className={tooltip ? "cursor-help" : "cursor-default"}>
          <p
            className={cn(
              "p-1 text-sm font-semibold text-center",
              classes[status],
              className
            )}
          >
            {status ? t(`statuses.${status}`) : "-"}
          </p>
        </TooltipTrigger>

        {tooltip && (
          <TooltipContent>
            <p>{tooltip || t(`statuses.${status}`)}</p>
          </TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  );
}
