import AboutIntro from '@/components/about/AboutIntro'
import EventContract from '@/components/about/EventContract'
import QuestionsAndAnswers from '@/components/about/QuestionsAndAnswers'
import WhyEventsHubs from '@/components/about/WhyEventsHubs'
import { getData } from '@/lib/request-server'
import type { AboutPage } from '@/schemas/shared'

const page = async () => {
  const response = await getData<AboutPage>({
    endpoint: "/about",
    config: {
      next: {
        tags: ["about"],
      },
    },
  });

  const data = response.status === "success" ? response.result : null;

  return (
    <main className='py-4 md:py-8 lg:py-12 space-y-12 md:space-y-8'>
      <AboutIntro data={data} />
      <WhyEventsHubs data={data} />
      <EventContract data={data} />
      <QuestionsAndAnswers data={data} />
    </main>
  )
}

export default page