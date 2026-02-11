import { cn } from "@/lib/utils";

interface StatCardProps {
  value: string;
  label: string;
  highlightColor: string;
  className?: string;
}

export default function StatCard({
  value,
  label,
  highlightColor,
  className,
}: StatCardProps) {
  return (
    <article className={cn("flex flex-col items-center text-center space-y-4", className)}>
      <span className="relative inline-block text-4xl md:text-5xl lg:text-6xl font-semibold text-primary leading-none">
        {value}
        <span
          className={cn(
            "absolute bottom-0 start-[45%] end-0 h-[70%] -z-10 rounded-sm",
            highlightColor
          )}
          aria-hidden="true"
        />
      </span>
      <span className="title-4 mt-2 text-base md:text-lg text-primary text-center">
        {label}
      </span>
    </article>
  );
}
