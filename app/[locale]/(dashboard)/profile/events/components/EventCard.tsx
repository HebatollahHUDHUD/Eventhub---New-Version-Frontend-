"use client";

import { Event } from "@/schemas/types";
import { Button } from "@/components/ui/button";
import Image from "@/components/common/image";
import { useTranslations } from "next-intl";
import moment from "moment";
import Status, { StatusType } from "@/components/common/Status";
import Link from "next/link";

type EventCardProps = {
  event: Event;
};

const EventCard = ({ event }: EventCardProps) => {
  const t = useTranslations("dashboard.events");

  const formattedDate = moment(event.created_at).format("MMM DD, YYYY");

  return (
    <article className="relative bg-background flex flex-col">
      <div>
        <Image
          src="/images/placeholder.png"
          alt={event.title}
          width={400}
          height={267}
          className="w-full aspect-[3/2] rounded-2xl object-cover"
        />
      </div>

      <div className="flex flex-col gap-2 py-4 flex-1">
        <h2 className="font-bold text-lg line-clamp-2">{event.title}</h2>

        <p className="text-sm text-muted-foreground">{formattedDate}</p>

        <div className="">
          <Status status={event.status as StatusType} />
        </div>

        {/* View Button */}
        <div className="mt-auto pt-2">
          <Button
            size={"lg"}
            variant="outlineSecondary"
            className="w-full"
            asChild
          >
            <Link href={`/profile/events/${event.id}`}>
              {t("view")}
            </Link>
          </Button>
        </div>
      </div>
    </article>
  );
};

export default EventCard;
