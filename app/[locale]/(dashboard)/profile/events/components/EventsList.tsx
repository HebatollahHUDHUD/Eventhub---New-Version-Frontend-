import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useTranslations } from 'next-intl';
import EventCard from './EventCard';
import { Event } from '@/schemas/types';

const EventsList = ({ eventsData }: { eventsData: Event[] }) => {
  const t = useTranslations("dashboard.events");
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("title")}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {eventsData.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default EventsList