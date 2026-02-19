import HeroSection from "@/components/home/HeroSection";
import AboutEventsHubs from "@/components/home/AboutEventsHubs";
import TalentsSection from "@/components/home/TalentsSection";
import BlogsSection from "@/components/home/BlogsSection";
import OpportunitiesSection from "@/components/home/OpportunitiesSection";
import TrustedOrganisationsSection from "@/components/home/TrustedOrganisationsSection";
import PricingPlans from "@/components/home/PricingPlans";
import { getData } from "@/lib/request-server";
import type { HomeResponse } from "@/schemas/home";

const HomeContent = async () => {
  const data = await getData<HomeResponse>({
    endpoint: "/home",
    config: {
      next: {
        tags: ["home"],
      },
    }
  });

  const homeData = data.status === "success" ? data.result : null;

  if (!homeData) {
    return null;
  }

  return (
    <div>
      <HeroSection
        title={homeData.home_hero_title}
        subtitle={homeData.home_hero_subtitle}
        image={"/images/hero_bg.svg"}
        image2={"/images/hero_line.svg"}
      />
      <AboutEventsHubs
        title={homeData.home_about_us_title}
        description={homeData.home_about_us_desc}
        video={homeData.home_about_us_video}
        videoUrl={homeData.home_about_us_video_url}
        items={homeData.home_about_us_items}
      />
      <TalentsSection
        title={homeData.home_talents_title}
        subtitle={homeData.home_talents_subtitle}
        featured_talents={homeData.featured_talents || []}
      />
      <TrustedOrganisationsSection
        title={homeData.home_trusted_organizations_title}
        subtitle={homeData.home_trusted_organizations_subtitle}
        featured_companies={homeData.featured_companies || []}
      />
      <PricingPlans
        title={homeData.home_pricing_title}
        subtitle={homeData.home_pricing_subtitle}
        description={homeData.home_pricing_desc}
        plans={homeData.plans}
      />
      <OpportunitiesSection
        title={homeData.home_opportunities_title}
        subtitle={homeData.home_opportunities_subtitle}
        description={homeData.home_opportunities_desc}
        opportunities={homeData.opportunities}
      />
      <BlogsSection
        title={homeData.home_blog_title}
        subtitle={homeData.home_blog_subtitle}
        description={homeData.home_blog_desc}
        blogPosts={homeData.blog_posts}
      />
    </div>
  )
}

export default HomeContent