"use client";

import { Project } from "@/schemas/types";
import { Button } from "@/components/ui/button";
import Image from "@/components/common/image";
import { useTranslations } from "next-intl";
import moment from "moment";
import { useLocale } from "next-intl";
import Link from "next/link";
import { useParams } from "next/navigation";

type PortfolioCardProps = {
  project: Project;
  isTalent?: boolean;
};

const PortfolioCard = ({ project, isTalent }: PortfolioCardProps) => {
  const { id } = useParams();
  const t = useTranslations("dashboard.portfolio");
  const locale = useLocale();

  const getTitle = () => {
    if (typeof project.title === "string") {
      return project.title;
    }
    return project.title?.[locale] || project.title?.en;
  };

  const formattedDate = project.date ? moment(project.date).format("MMM DD, YYYY") : "-";

  // Get first attachment as thumbnail, or use placeholder
  const thumbnail = project.attachments && project.attachments.length > 0
    ? project.attachments[0].file_path
    : "/images/placeholder.png";

  return (
    <article className="relative bg-background flex flex-col rounded-lg overflow-hidden border">
      <div className="relative">
        <Image
          src={thumbnail}
          alt={getTitle()}
          width={400}
          height={267}
          className="w-full aspect-3/2 object-cover"
        />
      </div>

      <div className="flex flex-col gap-2 p-4 flex-1">
        <h2 className="font-bold text-lg line-clamp-2">{getTitle()}</h2>
        <p className="text-sm text-muted-foreground">{formattedDate}</p>

        <div className="mt-auto pt-2">
          {!isTalent ? (
            <Button
              size={"lg"}
              variant="outlineSecondary"
              className="w-full"
              asChild
            >
              <Link href={`/profile/portfolio/${project.id}`}>
                {t("edit")}
              </Link>
            </Button>
          ) : <Button
            size={"lg"}
            variant="outlineSecondary"
            className="w-full"
            asChild
          >
            <Link href={`/talent/${id}/portfolio/${project.id}`}>
              {t("view")}
            </Link>
          </Button>}
        </div>
      </div>
    </article>
  );
};

export default PortfolioCard;
