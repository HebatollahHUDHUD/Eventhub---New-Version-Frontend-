import Image from "next/image";
import HeroSocialMedia from "./HeroSocialMedia";
import HeroSearchBar from "./HeroSearchBar";

interface HeroSectionProps {
  title: string;
  subtitle: string;
  image: string;
  image2: string;
}

const HeroSection = ({ title, subtitle, image, image2 }: HeroSectionProps) => {

  return (
    <section className="min-h-[calc(100vh-80px)] flex items-center bg-primary">
      <div className="relative container">
        <div className="grid xl:grid-cols-2 gap-8 xl:gap-16 items-center">
          <div className="space-y-8">
            <HeroSocialMedia />

            {/* Headline */}
            <h1 className="title-1 text-primary-foreground tracking-tight">
              {title}
            </h1>

            {/* Description */}
            <p className="max-w-xl title-4 font-normal! leading-relaxed text-primary-foreground/85">
              {subtitle}
            </p>

            {/* Search Bar */}
            <HeroSearchBar />
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
