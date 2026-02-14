"use client";

import LoadingPage from "@/components/common/LoadingPage";
import { useGetData } from "@/hooks/useFetch";
import { Event } from "@/schemas/types";
import AddEvent from "../components/AddEvent";
import AttendanceCard from "../components/AttendanceCard";
import { useParams } from "next/navigation";

type EventDetailsResponse = {
  status: string;
  result: {
    event: Event;
  };
};

const EventDetailsPage = () => {
  const { id } = useParams();

  const { data, isLoading, refetch } = useGetData<EventDetailsResponse>({
    endpoint: `/profile/events/${id}`,
    queryKey: [`profile-events-${id}`],
  });

  const event = data?.status === "success" ? data?.result?.event : null;

  if (isLoading) return <LoadingPage />;

  if (!event) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-muted-foreground">Event not found</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <AddEvent refetch={refetch} event={event} isUpdate={true} />

      <AttendanceCard event={event} refetch={refetch} />
    </div>
  );
};

export default EventDetailsPage;
