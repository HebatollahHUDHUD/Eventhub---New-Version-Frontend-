import AboutIntro from '@/components/about/AboutIntro'
import WhyEventsHubs from '@/components/about/WhyEventsHubs'

const page = () => {
  return (
    <main className='p-4 md:p-8 lg:p-12 space-y-12 md:space-y-16'>
      <AboutIntro />
      <WhyEventsHubs />
    </main>
  )
}

export default page