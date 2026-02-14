"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Event } from "@/schemas/types";
import { useTranslations } from "next-intl";
import moment from "moment";
import Image from "@/components/common/image";
import { useState } from "react";
import EditHoursDialog from "./EditHoursDialog";

type AttendanceCardProps = {
  event: Event;
  refetch: () => void;
};

const AttendanceCard = ({ event, refetch }: AttendanceCardProps) => {
  const t = useTranslations("dashboard.events");
  const [selectedDate, setSelectedDate] = useState<string>(
    moment().format("YYYY-MM-DD")
  );
  const [editingAttendee, setEditingAttendee] = useState<{
    id: number;
    user: any;
    date: string;
    check_in: string | null;
    check_out: string | null;
  } | null>(null);

  // Filter attendees by selected date
  const filteredAttendees = event.attendees?.filter((attendee) => {
    if (!attendee.check_in) return false;
    const checkInDate = moment(attendee.check_in).format("YYYY-MM-DD");
    return checkInDate === selectedDate;
  }) || [];

  const formatTime = (dateTime: string | null) => {
    if (!dateTime) return "-";
    return moment(dateTime).format("hh:mm A");
  };

  const formatDate = (dateTime: string | null) => {
    if (!dateTime) return "-";
    return moment(dateTime).format("DD/MM/YYYY");
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">
            {t("employees-attendance") || "EMPLOYEES ATTENDANCE"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">
              {t("select-date") || "Select Date"}
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            />
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t("employee") || "EMPLOYEE"}</TableHead>
                  <TableHead>{t("date") || "DATE"}</TableHead>
                  <TableHead>{t("clock-in") || "CLOCK-IN"}</TableHead>
                  <TableHead>{t("clock-out") || "CLOCK-OUT"}</TableHead>
                  <TableHead>{t("action") || "ACTION"}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAttendees.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                      {t("no-attendance-records") || "No attendance records found for this date"}
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredAttendees.map((attendee) => (
                    <TableRow key={attendee.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Image
                            src={attendee.user?.photo || "/images/placeholder.png"}
                            alt={attendee.user?.name || "User"}
                            width={40}
                            height={40}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <span className="font-medium">{attendee.user?.name || "-"}</span>
                        </div>
                      </TableCell>
                      <TableCell>{formatDate(attendee.check_in)}</TableCell>
                      <TableCell>{formatTime(attendee.check_in)}</TableCell>
                      <TableCell>{attendee.check_out ? formatTime(attendee.check_out) : "-"}</TableCell>
                      <TableCell>
                        <Button
                          variant="outline"
                          size="sm"
                          className="bg-accentBlue text-white hover:bg-accentBlue/90"
                          onClick={() => {
                            setEditingAttendee({
                              id: attendee.id,
                              user: attendee.user,
                              date: formatDate(attendee.check_in),
                              check_in: attendee.check_in,
                              check_out: attendee.check_out,
                            });
                          }}
                        >
                          {t("edit-hours") || "Edit Hours"}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {editingAttendee && (
        <EditHoursDialog
          open={!!editingAttendee}
          onOpenChange={(open) => !open && setEditingAttendee(null)}
          attendee={editingAttendee}
          eventId={event.id}
          refetch={refetch}
        />
      )}
    </>
  );
};

export default AttendanceCard;
