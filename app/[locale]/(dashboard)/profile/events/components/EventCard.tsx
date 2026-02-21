"use client";

import { Event } from "@/schemas/types";
import { Button } from "@/components/ui/button";
import Image from "@/components/common/image";
import { useTranslations } from "next-intl";
import moment from "moment";
import Status, { StatusType } from "@/components/common/Status";
import EventDetailsDialog from "./EventDetailsDialog";
import { getUserType } from "@/lib/userSession";
import { UserType } from "@/constant";
import Link from "next/link";
import ClockInBtn from "./ClockInBtn";

type EventCardProps = {
  event: Event;
  refetch: () => void;
};

const EventCard = ({ event, refetch }: EventCardProps) => {
  const userType = getUserType();

  const t = useTranslations("dashboard.events");

  const formattedDate = moment(event.created_at).format("MMM DD, YYYY");

  // Get event image from attachments or use placeholder
  const eventImage = event.attachments && event.attachments.length > 0
    ? event.attachments[0].file_path
    : "/images/placeholder.png";

  return (
    <article className="relative bg-background flex flex-col">
      <div>
        <Image
          src={eventImage}
          alt={event.title}
          width={400}
          height={267}
          className="w-full aspect-3/2 rounded-2xl object-cover"
        />
      </div>

      <div className="flex flex-col gap-2 py-4 flex-1">
        <h2 className="font-bold text-lg line-clamp-2">{event.title}</h2>

        <p className="text-sm text-muted-foreground">{formattedDate}</p>

        <div className="">
          <Status status={event.status as StatusType} />
        </div>

        {/* View Button */}
        <div className="mt-auto pt-2 space-y-2">
          {userType === UserType.COMPANY ? (
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
          ) : (
            <>

              <EventDetailsDialog
                event={event}
                trigger={
                  <Button
                    size={"lg"}
                    variant="outlineSecondary"
                    className="w-full"
                  >
                    {t("view")}
                  </Button>
                }
              />

              <ClockInBtn
                event={event}
                refetch={refetch}
              />
            </>

          )}
        </div>
      </div>
    </article>
  );
};

export default EventCard;
