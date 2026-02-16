"use client";

import { JobAd } from "@/schemas/types";
import { Button } from "@/components/ui/button";
import Image from "@/components/common/image";
import { useTranslations } from "next-intl";
import moment from "moment";
import Status, { StatusType } from "@/components/common/Status";
import Link from "next/link";

type JobAdCardProps = {
  jobAd: JobAd;
};

const JobAdCard = ({ jobAd }: JobAdCardProps) => {
  const t = useTranslations("dashboard.job-ads");

  const formattedDate = moment(jobAd.created_at).format("MMM DD, YYYY");

  return (
    <article className="relative bg-background flex flex-col">
      <div>
        <Image
          src="/images/placeholder.png"
          alt={jobAd.title.en}
          width={400}
          height={267}
          className="w-full aspect-3/2 rounded-2xl object-cover"
        />
      </div>

      <div className="flex flex-col gap-2 py-4 flex-1">
        <h2 className="font-bold text-lg line-clamp-2">{jobAd.title.en}</h2>

        <p className="text-sm text-muted-foreground">{formattedDate}</p>

        <div className="">
          <Status status={jobAd.status as StatusType} />
        </div>

        {/* View Button */}
        <div className="mt-auto pt-2">
          <Button
            size={"lg"}
            variant="outlineSecondary"
            className="w-full"
            asChild
          >
            <Link href={`/job-ads/${jobAd.id}`}>
              {t("view")}
            </Link>
          </Button>
        </div>
      </div>
    </article>
  );
};

export default JobAdCard;
