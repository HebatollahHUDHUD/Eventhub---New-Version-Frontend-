"use client";

import { useGetData } from "@/hooks/useFetch";
import LoadingPage from "@/components/common/LoadingPage";
import EventsCalendar from "./components/EventsCalendar";
import AddEvent from "./components/AddEvent";
import { parseAsString, useQueryStates } from "nuqs";
import moment from "moment";

const EventsPage = () => {
  const [queryParams] = useQueryStates({
    from_date: parseAsString.withDefault(moment().startOf("month").format("YYYY-MM-DD")),
    to_date: parseAsString.withDefault(moment().endOf("month").format("YYYY-MM-DD")),
  });

  const { data, isLoading, refetch } = useGetData<any>({
    endpoint: "/profile/events",
    queryKey: ["events", queryParams.from_date, queryParams.to_date],
    config: {
      queryParams
    },
  });

  if (isLoading) return <LoadingPage />

  const eventsData = data?.status === "success" ? data?.result?.events || [] : [];

  return (
    <div className="space-y-6">
      <EventsCalendar eventsData={eventsData} />

      <AddEvent refetch={refetch} />
    </div>
  );
};

export default EventsPage;
