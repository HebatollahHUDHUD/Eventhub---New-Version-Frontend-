"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDown, ArrowRight, MapPin, Tag, Instagram, Twitter, Linkedin, Facebook } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "../common/image";

interface HeroSectionProps {
  title: string;
  subtitle: string;
  image: string;
  image2: string;
}

const HeroSection = ({ title, subtitle, image, image2 }: HeroSectionProps) => {
  const t = useTranslations("home.hero");
  const [skillsOpen, setSkillsOpen] = useState(false);
  const [locationOpen, setLocationOpen] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState<string>("");
  const [selectedLocation, setSelectedLocation] = useState<string>("");

  // Mock data - replace with actual data from API
  const skillsOptions = ["Event Planning", "Marketing", "Design", "Photography", "Catering"];
  const locationOptions = ["Riyadh", "Jeddah", "Dubai", "Abu Dhabi", "Dammam"];

  return (
    <section className="min-h-[calc(100vh-80px)] flex items-center bg-primary">
      <div className="relative container">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <div className="space-y-8">
            {/* Social Media Icons - Desktop */}
            <div className="absolute -start-6 top-4 hidden lg:flex flex-col items-center gap-5">
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
            <div className="flex lg:hidden items-center gap-4 mb-8">
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
            <div className="bg-background rounded-xl p-2.5 sm:rounded-full sm:p-1.5 flex flex-col sm:flex-row gap-1.5 shadow-2xl border border-border">
              {/* Skills/Exp Dropdown */}
              <Popover open={skillsOpen} onOpenChange={setSkillsOpen}>
                <PopoverTrigger asChild>
                  <button className="flex-1 flex items-center gap-2.5 px-5 py-3.5 rounded-full hover:bg-gray-50 transition-all duration-200 text-left group">
                    <Tag className="size-4 text-accentPink shrink-0 group-hover:scale-110 transition-transform" />
                    <span className={cn("flex-1 text-sm font-medium", !selectedSkills && "text-muted-foreground")}>
                      {selectedSkills || t("search.skills")}
                    </span>
                    <ChevronDown className={cn("size-4 text-muted-foreground shrink-0 transition-transform", skillsOpen && "rotate-180")} />
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-[220px] p-2 shadow-xl" align="start">
                  <div className="space-y-0.5">
                    {skillsOptions.map((skill) => (
                      <button
                        key={skill}
                        onClick={() => {
                          setSelectedSkills(skill);
                          setSkillsOpen(false);
                        }}
                        className="w-full text-left px-3 py-2.5 rounded-md hover:bg-accent text-sm transition-colors font-medium"
                      >
                        {skill}
                      </button>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>

              {/* Location Dropdown */}
              <Popover open={locationOpen} onOpenChange={setLocationOpen}>
                <PopoverTrigger asChild>
                  <button className="flex-1 flex items-center gap-2.5 px-5 py-3.5 rounded-full hover:bg-gray-50 transition-all duration-200 text-left group">
                    <MapPin className="size-4 text-accentPink shrink-0 group-hover:scale-110 transition-transform" />
                    <span className={cn("flex-1 text-sm font-medium", !selectedLocation && "text-muted-foreground")}>
                      {selectedLocation || t("search.location")}
                    </span>
                    <ChevronDown className={cn("size-4 text-muted-foreground shrink-0 transition-transform", locationOpen && "rotate-180")} />
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-[220px] p-2 shadow-xl" align="start">
                  <div className="space-y-0.5">
                    {locationOptions.map((location) => (
                      <button
                        key={location}
                        onClick={() => {
                          setSelectedLocation(location);
                          setLocationOpen(false);
                        }}
                        className="w-full text-left px-3 py-2.5 rounded-md hover:bg-accent text-sm transition-colors font-medium"
                      >
                        {location}
                      </button>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>

              {/* Search Button */}
              <Button
                variant="pink"
                size="lg"
                className="rounded-full px-8 sm:px-10 gap-2 shrink-0 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                {t("search.button")}
                <ArrowRight className="size-4" />
              </Button>
            </div>
          </div>

          <Image
            src={image}
            alt="Hero Section Image"
            width={1000}
            height={1000}
            className="w-[125%] h-auto object-cover hidden lg:block"
            unoptimized
            quality={100}
          />
        </div>
      </div>

      <div className="hidden absolute bottom-0 end-0 lg:block w-3/5 rtl:-scale-x-100">
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
