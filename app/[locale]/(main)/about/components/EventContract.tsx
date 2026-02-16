import { useTranslations } from "next-intl";
import Image from "next/image";
import DownloadButton from "@/components/common/DownloadButton";
import type { AboutPage } from "@/schemas/shared";
import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";

interface EventContractProps {
  data?: AboutPage | null;
  downloadIcon?: ReactNode;
}

export default function EventContract({ data, downloadIcon }: EventContractProps) {
  const t = useTranslations("about");

  const badgeText = data?.about_page_contract_title || t("ready_to_use_event_contract");
  const title = data?.about_page_contract_subtitle || t("event_contract_title");
  const description =
    data?.about_page_contract_desc || t("event_contract_description");
  const buttonText = t("download_now");
  const downloadUrl = data?.about_page_contract_file || "#";

  return (
    <section className="bg-[#010462] p-4 md:p-8 lg:p-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 px-6 md:px-10 lg:px-16 py-12 md:py-16 lg:py-20 items-center">
        {/* Left column - Text content */}
        <div className="space-y-6">
          {/* Badge */}
          <span className="inline-block rounded-full bg-[#5033FF] px-5 py-2 text-sm font-medium text-white">
            {badgeText}
          </span>

          {/* Title */}
          <h2 className="title-2  font-bold! text-white leading-snug">
            {title}
          </h2>

          {/* Description */}
          <p className="text-sm md:text-base text-white leading-relaxed max-w-xl">
            {description}
          </p>
        </div>

        {/* Right column - Document preview + Download */}
        <div className="flex flex-col items-center gap-6">
          {/* Circular document preview */}
          <div className="relative w-48 h-48 md:w-64 md:h-64 lg:w-72 lg:h-72">
            {/* Outer ring */}
            <div className="absolute inset-0 rounded-full border-4 border-[#3B82F6]/40" />

            {/* Inner circle with image */}
            <div className="">
              <Image
                src="/images/employment-contract-template-uk-feature-image@2x.png"
                alt="Event contract document"
                // width={400}
                // height={400}
                fill
                className="object-cover max-w-[400px] max-h-[400px]"
              />
            </div>

            {/* "Word" badge */}
            {/* <div className="absolute start-0 top-1/2 -translate-y-1/2 -translate-x-1/4 w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#F5B731] flex items-center justify-center shadow-lg">
              <span className="text-xs md:text-sm font-bold text-white">
                Word
              </span>
            </div> */}
          </div>

          {/* Download button */}
          <DownloadButton
            url={downloadUrl}
            label={buttonText}
            icon={<div className="relative ">
              <ArrowUpRight className="size-5 absolute top-[-13px] start-[7px]" />
              <ArrowUpRight className="size-5 opacity-[0.4] absolute bot-[11px] start-[-5px]" />
            </div>}
            variant="pink"
            size="lg"
            className="min-w-[250px] rounded-lg p-6"
          />
        </div>
      </div>
    </section>
  );
}
