import { getData } from "@/lib/request-server";
import HeroSection from "@/components/home/HeroSection";
import AboutEventsHubs from "@/components/home/AboutEventsHubs";

const page = async () => {

  const data = await getData<any>({
    endpoint: "/home",
    config: {
      next: {
        cache: "no-cache",
        tags: ["home"],
        revalidate: 0,
      },
    }
  });


  return (
    <div>
      <HeroSection />
      <AboutEventsHubs />
      {/* Add other sections here */}
    </div>
  )
}

export default page