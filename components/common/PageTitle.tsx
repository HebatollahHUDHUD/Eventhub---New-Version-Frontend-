import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type PageTitleProps = {
  title: string;
  description?: ReactNode;
  className?: string;
};

const PageTitle = ({ title, description, className }: PageTitleProps) => {
  return (
    <div className={cn("space-y-4 mx-auto text-center", className)}>
      <h2 className="title-2">{title}</h2>
      {description && <p className="description max-w-3xl mx-auto">{description}</p>}
    </div>
  );
};

export default PageTitle;
