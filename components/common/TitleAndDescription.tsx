import { cn } from "@/lib/utils";

interface TitleAndDescriptionProps {
  title?: string;
  description?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  className?: string;
}

export default function TitleAndDescription({
  title,
  description,
  titleClassName,
  descriptionClassName,
  className,
}: TitleAndDescriptionProps) {
  return (
    <header className={cn("text-center space-y-4", className)}>
      {title && (
        <h2 className={cn("title-1 text-primary", titleClassName)}>
          {title}
        </h2>
      )}
      {description && (
        <p className={cn("description max-w-2xl mx-auto", descriptionClassName)}>
          {description}
        </p>
      )}
    </header>
  );
}
