import AboutIntro from '@/components/about/AboutIntro'
import WhyEventsHubs from '@/components/about/WhyEventsHubs'

const page = () => {
  return (
    <main className='py-4 md:py-8 lg:py-12 space-y-12 md:space-y-16'>
      <AboutIntro />
      <WhyEventsHubs />
    </main>
  )
}

export default page