import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/toast';
import { usePostData } from '@/hooks/useFetch';
import { Event } from '@/schemas/types';
import moment from 'moment';

type ClockInBtnProps = {
  event: Event;
  refetch: () => void;
}

const ClockInBtn = ({ event, refetch }: ClockInBtnProps) => {
  const { mutateAsync } = usePostData<any>({
    endpoint: `/profile/events/${event.id}/clock-in`,
  });

  const onClockIn = async () => {
    const res = await mutateAsync({
      check_in_time: moment().format("YYYY-MM-DD HH:mm:ss"),
    });

    if (res.status === "success") {
      toast(res.message, "success");
      refetch();
    } else {
      toast(res.message, "destructive");
    }
  }

  return (
    <Button variant={event.status === "active" ? "success" : "muted"}>
      {event.status === "active" ? "Clock In" : "Clock Out"}
    </Button>
  )
}

export default ClockInBtn