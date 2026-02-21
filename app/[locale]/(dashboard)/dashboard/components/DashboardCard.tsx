import { JSX } from "react";

const DashboardCard = ({
  title,
  value,
  icon,
}: {
  title: string;
  value: string | number;
  icon?: JSX.Element;
}) => {
  return (
    <div className="bg-card border rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <p className="text-2xl font-extrabold text-foreground">{value}</p>
          <p className="text-sm text-muted-foreground mt-1">{title}</p>
        </div>
        {icon && (
          <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center shrink-0">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardCard;
