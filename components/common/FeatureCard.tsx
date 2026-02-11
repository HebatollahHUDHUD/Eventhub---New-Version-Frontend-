import { cn } from "@/lib/utils";

interface FeatureCardProps {
  number: string;
  title: string;
  description?: string;
  highlightColor: string;
  className?: string;
}

export default function FeatureCard({
  number,
  title,
  description,
  highlightColor,
  className,
}: FeatureCardProps) {
  return (
    <article className={cn("flex flex-col items-center text-center space-y-3", className)}>
      {/* Number with highlight */}
      <span className="relative inline-block title-1 font-semibold text-primary leading-none">
        {number}
        <span
          className={cn(
            "absolute bottom-0 start-[-20%] end-[40%] h-[85%] -z-10 rounded-sm",
            highlightColor
          )}
          aria-hidden="true"
        />
      </span>

      {/* Title */}
      <h3 className="title-4 font-bold uppercase text-primary">
        {title}
      </h3>

      {/* Description */}
      {description && (
        <p className="description leading-relaxed max-w-xs">
          {description}
        </p>
      )}
    </article>
  );
}
