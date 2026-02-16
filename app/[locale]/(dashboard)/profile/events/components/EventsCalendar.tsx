"use client";

import { useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import type { EventClickArg } from "@fullcalendar/core";
import { parseAsString, useQueryStates } from "nuqs";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { format, startOfWeek, endOfWeek } from "date-fns";
import moment from "moment";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Event } from "@/schemas/types";
import { useTranslations } from "next-intl";

const EventsCalendar = ({ eventsData }: { eventsData: Event[] }) => {
  const t = useTranslations("dashboard.events");
  const calendarRef = useRef<FullCalendar>(null);
  const [currentView, setCurrentView] = useState<"dayGridMonth" | "timeGridWeek">("dayGridMonth");
  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  const [_, setQueryParams] = useQueryStates({
    from_date: parseAsString.withDefault(moment().startOf("month").format("YYYY-MM-DD")),
    to_date: parseAsString.withDefault(moment().endOf("month").format("YYYY-MM-DD")),
  });

  const events = eventsData.map((event, index) => {
    const startDate = new Date(`${event.from_date}T${event.check_in_time || "00:00:00"}`);
    const endDate = new Date(`${event.to_date}T${event.check_out_time || "23:59:59"}`);

    // Generate a color based on event type or use default colors
    const colors = [
      "#3b82f6", // blue
      "#f97316", // orange
      "#ec4899", // pink
      "#f472b6", // light pink
      "#8b5cf6", // purple
      "#06b6d4", // cyan
    ];
    const colorIndex = index % colors.length;
    const backgroundColor = colors[colorIndex];
    const borderColor = colors[colorIndex];

    return {
      id: event.id.toString(),
      title: event.title,
      start: startDate,
      end: endDate,
      backgroundColor,
      borderColor,
      extendedProps: {
        event_type: event.event_type,
        status: event.status,
        check_in_time: event.check_in_time,
        check_out_time: event.check_out_time,
      },
    };
  });

  const handleDatesSet = (arg: { start: Date; end: Date; view: { type: string } }) => {
    const viewType = arg.view.type;
    setCurrentView(viewType as "dayGridMonth" | "timeGridWeek");
    setCurrentDate(arg.start);
    setQueryParams({
      from_date: moment(arg.start).format("YYYY-MM-DD"),
      to_date: moment(arg.end).format("YYYY-MM-DD"),
    });
  };

  const handlePrev = () => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.prev();
    }
  };

  const handleNext = () => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.next();
    }
  };

  const handleViewChange = (view: "dayGridMonth" | "timeGridWeek") => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.changeView(view);
      setCurrentView(view);
    }
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>
            {t("title")}
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="bg-card rounded-xl border overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-border">
              <div className="flex items-center gap-4">
                <h2 className="text-xl font-semibold">
                  {currentView === "dayGridMonth"
                    ? format(currentDate, "MMMM yyyy").toUpperCase()
                    : `${format(startOfWeek(currentDate, { weekStartsOn: 6 }), "MMM d")} - ${format(endOfWeek(currentDate, { weekStartsOn: 6 }), "MMM d, yyyy")}`.toUpperCase()}
                </h2>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handlePrev}
                    className="h-8 w-8"
                    aria-label={t("previous")}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleNext}
                    className="h-8 w-8"
                    aria-label={t("next")}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant={currentView === "dayGridMonth" ? "accentPurple" : "outline"}
                  size="sm"
                  onClick={() => handleViewChange("dayGridMonth")}
                >
                  {t("month")}
                </Button>
                <Button
                  variant={currentView === "timeGridWeek" ? "accentPurple" : "outline"}
                  size="sm"
                  onClick={() => handleViewChange("timeGridWeek")}
                >
                  {t("week")}
                </Button>
              </div>
            </div>

            <FullCalendar
              ref={calendarRef}
              plugins={[dayGridPlugin, timeGridPlugin]}
              initialView={currentView}
              dayHeaderClassNames="!p-3 text-sm text-center border-x-0!"
              dayCellClassNames={"!border-border text-sm !py-4"}
              eventClassNames="text-start bg-transparent font-bold border-0 p-1.5"
              headerToolbar={false}
              events={events}
              height="auto"
              datesSet={handleDatesSet}
              eventClick={(info: EventClickArg) => {
                console.log("Event clicked:", info.event.extendedProps);
              }}
              dayHeaderFormat={{ weekday: "short" }}
              slotMinTime="00:00:00"
              slotMaxTime="24:00:00"
              allDaySlot={false}
              locale="en"
              showNonCurrentDates={false}
            />
          </div>
        </CardContent>

      </Card>

    </div>
  );
};

export default EventsCalendar;
