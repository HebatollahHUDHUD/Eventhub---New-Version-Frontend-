import HeroSection from "@/components/home/HeroSection";
import AboutEventsHubs from "@/components/home/AboutEventsHubs";
import TalentsSection from "@/components/home/TalentsSection";
import BlogsSection from "@/components/home/BlogsSection";
import OpportunitiesSection from "@/components/home/OpportunitiesSection";
import TrustedOrganisationsSection from "@/components/home/TrustedOrganisationsSection";
import PricingPlans from "@/components/home/PricingPlans";
import { getData } from "@/lib/request-server";

const HomeContent = async () => {
  const data = await getData<any>({
    endpoint: "/home",
    config: {
      next: {
        tags: ["home"],
      },
    }
  });

  console.log(data);

  return (
    <div>
      <HeroSection />
      <AboutEventsHubs />
      <TalentsSection />
      <TrustedOrganisationsSection />
      <PricingPlans />
      <OpportunitiesSection />
      <BlogsSection />
    </div>
  )
}

export default HomeContent