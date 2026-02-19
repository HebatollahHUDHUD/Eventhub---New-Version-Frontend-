"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin, Tag, Instagram, Twitter, Linkedin, Facebook } from "lucide-react";
import SelectCountry from "../select/SelectCountry";
import SelectSkills from "../select/SelectSkillsTags";
import Image from "next/image";

interface HeroSectionProps {
  title: string;
  subtitle: string;
  image: string;
  image2: string;
}

const HeroSection = ({ title, subtitle, image, image2 }: HeroSectionProps) => {
  const t = useTranslations("home.hero");
  const [selectedSkills, setSelectedSkills] = useState<string>("");
  const [selectedLocation, setSelectedLocation] = useState<string>("");

  return (
    <section className="min-h-[calc(100vh-80px)] flex items-center bg-primary">
      <div className="relative container">
        <div className="grid xl:grid-cols-2 gap-8 xl:gap-16 items-center">
          <div className="space-y-8">
            {/* Social Media Icons - Desktop */}
            <div className="absolute -start-6 top-4 hidden xl:flex flex-col items-center gap-5">
              <span className="h-28 w-[3px] bg-white" />

              <a href="#" className="text-white/80 hover:text-accentPink transition-colors duration-300" aria-label="Instagram">
                <Instagram className="size-5" />
              </a>
              <a href="#" className="text-white/80 hover:text-accentPink transition-colors duration-300" aria-label="Twitter">
                <Twitter className="size-5" />
              </a>
              <a href="#" className="text-white/80 hover:text-accentPink transition-colors duration-300" aria-label="LinkedIn">
                <Linkedin className="size-5" />
              </a>
              <a href="#" className="text-white/80 hover:text-accentPink transition-colors duration-300" aria-label="Facebook">
                <Facebook className="size-5" />
              </a>

              <span className="text-white text-xs font-medium mb-6 [writing-mode:vertical-rl] [text-orientation:mixed] tracking-wider">
                {t("social.follow")}
              </span>
            </div>

            {/* Social Media Icons - Mobile */}
            <div className="flex xl:hidden items-center gap-4 mb-8">
              <span className="text-white text-sm font-medium">{t("social.follow")}</span>
              <a href="#" className="text-white/80 hover:text-accentPink transition-colors" aria-label="Instagram">
                <Instagram className="size-5" />
              </a>
              <a href="#" className="text-white/80 hover:text-accentPink transition-colors" aria-label="Twitter">
                <Twitter className="size-5" />
              </a>
              <a href="#" className="text-white/80 hover:text-accentPink transition-colors" aria-label="LinkedIn">
                <Linkedin className="size-5" />
              </a>
              <a href="#" className="text-white/80 hover:text-accentPink transition-colors" aria-label="Facebook">
                <Facebook className="size-5" />
              </a>
            </div>

            {/* Headline */}
            <h1 className="title-1 text-primary-foreground tracking-tight">
              {title}
            </h1>

            {/* Description */}
            <p className="max-w-xl title-4 font-normal! leading-relaxed text-primary-foreground/85">
              {subtitle}
            </p>

            {/* Search Bar */}
            <div className="bg-background rounded-xl p-2.5 sm:rounded-full sm:p-1.5 flex flex-col sm:flex-row sm:items-center gap-1.5 shadow-2xl border border-border">
              <SelectSkills
                className="flex-1 border-none!"
                value={selectedSkills}
                onChange={setSelectedSkills}
                icon={<Tag className="size-4 text-accentPink shrink-0 group-hover:scale-110 transition-transform" />}
              />
              {/* Location Dropdown */}
              <SelectCountry
                className="flex-1 border-none!"
                value={selectedLocation}
                onChange={setSelectedLocation}
                icon={<MapPin className="size-4 text-accentPink shrink-0 group-hover:scale-110 transition-transform" />}
              />

              {/* Search Button */}
              <Button
                variant="pink"
                size="lg"
                className="rounded-full px-8 sm:px-10 gap-2 shrink-0 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 sm:h-12"
              >
                {t("search.button")}
                <ArrowRight className="size-4" />
              </Button>
            </div>
          </div>

          <div>
            <Image
              src={image}
              alt="Hero Section Image"
              width={1000}
              height={1000}
              className="w-full h-auto object-contain hidden xl:block"
              unoptimized
              quality={100}
              loading="eager"
            />
          </div>

        </div>
      </div>

      <div className="hidden absolute bottom-0 end-0 xl:block w-3/5 rtl:-scale-x-100">
        <Image
          src={image2}
          alt="Hero Section Image"
          width={500}
          height={500}
          className="w-full h-auto object-cover"
          unoptimized
          quality={100}
        />
      </div>
    </section>
  );
};

export default HeroSection;
