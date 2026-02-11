import { CircleHelp } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
import { questionMarkSVG } from "@/public/SVGs";

interface QACardProps {
  question: string;
  answer: string;
  icon?: ReactNode;
  className?: string;
}

export default function QACard({
  question,
  answer,
  icon,
  className,
}: QACardProps) {
  return (
    <article className={cn("flex items-start gap-4", className)}>
      {/* Icon */}
      <div className="shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-[#797DE5] text-xl text-white">
        {icon || questionMarkSVG()}
      </div>

      {/* Content */}
      <div className="space-y-1.5">
        <h3 className="text-base font-bold text-primary">
          {question}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {answer}
        </p>
      </div>
    </article>
  );
}
