"use client";

import Image from './image'

import { cn } from '@/lib/utils'
import { Card } from '../ui/card'
import { useGetData } from '@/hooks/useFetch'

const AdBanner = ({
  dir,
  position,
}: {
  dir: "Vertical" | "Horizontal";
  position: "home_talents_section" | "home_plans_section" | "opportunities_details" | "talents_details" | "talents_profile" | "companies_profile";
}) => {
  const { data } = useGetData<any>({
    endpoint: "/ads",
    queryKey: ["ads"],
  })

  const adBannerData = data?.status === "success" ? data.result?.ads : null;

  const adBanner = adBannerData?.find((ad: any) => ad.position === position);

  if (!adBanner) return null;

  return (
    <Card className="overflow-hidden py-0 gap-0">
      <a href={adBanner?.link_url} className={cn("flex z-10 w-full",
        dir === "Vertical" ? "h-auto aspect-video max-h-[350px] lg:aspect-auto lg:max-h-none lg:h-[calc(100vh-120px)] lg:max-w-[380px]" : "h-auto aspect-video max-h-[350px]"
      )}>
        <Image
          src={adBanner?.image}
          alt="Ad banner"
          width={1500}
          height={2000}
          className="w-full h-full object-cover"
          quality={100}
          unoptimized
        />
      </a>
    </Card>
  )
}

export default AdBanner