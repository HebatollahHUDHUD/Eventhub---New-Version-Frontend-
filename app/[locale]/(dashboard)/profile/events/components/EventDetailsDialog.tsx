"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import Image from "@/components/common/image";
import { useTranslations } from "next-intl";
import { Event } from "@/schemas/types";
import moment from "moment";
import { MapPin } from "lucide-react";

interface EventDetailsDialogProps {
  event: Event;
  trigger: React.ReactNode;
}

const EventDetailsDialog = ({ event, trigger }: EventDetailsDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations("dashboard.events");

  // Format dates
  const startDate = moment(event.from_date).format("MM/DD/YYYY");
  const endDate = moment(event.to_date).format("MM/DD/YYYY");
  
  // Format times (check_in_time and check_out_time are in HH:MM format)
  const formatTime = (time: string) => {
    if (!time) return "-";
    const [hours, minutes] = time.split(":");
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? "PM" : "AM";
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const checkInTime = formatTime(event.check_in_time);
  const checkOutTime = formatTime(event.check_out_time);

  // Get event image from attachments or use placeholder
  const eventImage = event.attachments && event.attachments.length > 0
    ? event.attachments[0].file_path
    : "/images/placeholder.png";

  // Open location in Google Maps
  const handleOpenLocation = () => {
    if (event.lat && event.lng) {
      const url = `https://www.google.com/maps?q=${event.lat},${event.lng}`;
      window.open(url, "_blank");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{t("event-details") || "Event Details"}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Event Image */}
          <div className="w-full aspect-4/3 overflow-hidden rounded-lg">
            <Image
              src={eventImage}
              alt={event.title}
              width={600}
              height={450}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Event Details */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-sm font-semibold text-muted-foreground">{t("event-title")}</p>
                <p className="text-base font-medium">{event.title}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-semibold text-muted-foreground">{t("event-type")}</p>
                <p className="text-base font-medium">{event.event_type?.name || "-"}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-sm font-semibold text-muted-foreground">{t("from-date")}</p>
                <p className="text-base font-medium">{startDate}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-semibold text-muted-foreground">{t("to-date")}</p>
                <p className="text-base font-medium">{endDate}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-sm font-semibold text-muted-foreground">{t("check-in-time")}</p>
                <p className="text-base font-medium">{checkInTime}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-semibold text-muted-foreground">{t("check-out-time")}</p>
                <p className="text-base font-medium">{checkOutTime}</p>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="flex-col sm:flex-row gap-2">
          {event.lat && event.lng && (
            <Button
              onClick={handleOpenLocation}
              variant="default"
              className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white"
            >
              <MapPin className="mr-2 h-4 w-4" />
              {t("open-location") || "Open Location"}
            </Button>
          )}
          <Button
            onClick={() => setIsOpen(false)}
            variant="outline"
            className="w-full sm:w-auto"
          >
            {t("done") || "Done"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EventDetailsDialog;
