import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/toast';
import { usePostData } from '@/hooks/useFetch';
import { Event } from '@/schemas/types';
import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

type ClockInBtnProps = {
  event: Event;
  refetch: () => void;
}

const ClockInBtn = ({ event, refetch }: ClockInBtnProps) => {
  const t = useTranslations("dashboard.events");
  const [userCoordinates, setUserCoordinates] = useState({
    lat: 0,
    lng: 0,
  });

  const { mutateAsync, isPending } = usePostData<any>({
    endpoint: `/profile/events/${event.id}/attendees`,
  });

  const geolocationAPI = navigator.geolocation;

  const getUserCoordinates = () => {
    if (!geolocationAPI) {
      console.log("Geolocation API is not available in your browser!");
    } else {
      geolocationAPI.getCurrentPosition(
        (position) => {
          const { coords } = position;
          setUserCoordinates({ lat: coords.latitude, lng: coords.longitude });
        },
        () => {
          console.log("Something went wrong getting your position!");
        }
      );
    }
  };

  useEffect(() => {
    getUserCoordinates();
  }, [geolocationAPI]);

  const onClockIn = async () => {
    const res = await mutateAsync({
      lat: userCoordinates.lat,
      lng: userCoordinates.lng,
    });

    if (res.status === "success") {
      toast(res.message, "success");
      refetch();
    } else {
      toast(res.message, "destructive");
    }
  }

  const isDisabled = (event.status === "active" && event.has_checked_in && event.has_checked_out);

  return (
    <Button variant={event.status === "active" && event.has_checked_in && !event.has_checked_out ? "destructive" :
      event.status === "active" && !event.has_checked_out ? "success"
        : "muted"}
      onClick={onClockIn}
      disabled={isPending || isDisabled}
      size="lg"
      className="w-full"
    >
      {event.status === "active" && !event.has_checked_in ? t("clockIn") : t("clockOut")}
    </Button>
  )
}

export default ClockInBtn