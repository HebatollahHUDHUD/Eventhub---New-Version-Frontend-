"use client";

import Image from "@/components/common/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    ArrowUpRight,
    BadgeCheck,
    Briefcase,
    CalendarDays,
    Download,
    Flag,
    Mail,
    MapPin,
    MessageCircle,
    Phone,
    Star,
    User,
    XCircle,
    Facebook,
    Linkedin,
    Youtube,
    Twitter,
    X,
} from "lucide-react";
import Link from "next/link";
import DownloadButton from "@/components/common/DownloadButton";
import TalentCard from "../components/TalentCard";
import RateCandidateDialog from "../components/RateCandidateDialog";
import { useState } from "react";
import { useTranslations } from "next-intl";

type TalentDetailsContentProps = {
    id: string;
};

const TalentDetailsContent = ({ id }: TalentDetailsContentProps) => {
    const [isRateDialogOpen, setIsRateDialogOpen] = useState(false);
    const t = useTranslations("talent.details");

    const talent = {
        id,
        name: "Faisal Jamous",
        role: "Photographer",
        image: "/images/image1.png",
        rating: 4,
        aboutTitle: t("about_me"),
        about:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vel blandit purus, et efficitur lorem. Cras eleifend tortor ac sem auctor aliquet. Quisque at metus luctus. Maecenas porta lobortis vestibulum. Morbi convallis venenatis congue. Proin commodo enim id dapibus cursus. Praesent ante eros, condimentum venenatis congue, venenatis elementum et sit. Nam porttitor diam felis, et lacinia magna sagittis enim.\n\nSed lacinia nibh tellus, at metus magna faucibus ac. Donec metus est, libero vel imperdiet. Vivamus auctor, tortor in ornare sagittis, velit enim varius dui, luctus tincidunt metus neque ut nulla. Vivamus dui scelerisque, fermentum nisi nec, feugiat nibh. In leo euismod, gravida leo et, ultrices sit. Nulla nec elit ullamcorper sem.\n\nQuisque at metus ipsum, quisque massa. Sed blandit mollis augue, eget malesuada a egestas sit. Morbi tempor justo eu vestibulum lacus. Phasellus tempor dui in porta. Quisque finibus quis et amet velit eu condimentum. Nam nec viverra est. Cras eget ex nibh. Donec placerat fermentum augue, ac dictum eros convallis sit amet.\n\nCras semper odio a mauris finibus, quis aliquam nisi lorem. Proin at eu lectus tincidunt suscipit. Mauris quis tristique nisi. Sed at hendrerit ligula, ac lacinia tellus. Proin rhoncus et sem pretium ligula. Donec porta varius neque, sed ornare. In non malesuada metus. Aliquam non neque ut pretium eleifend. Aenean cursus in mauris. Etiam a facilisis orci. Ut feugiat lacus turpis, quis eget egestas vel, nisl in sit.",
        portfolioTitle: t("portfolio"),
        portfolio: [
            { id: "p1", title: "Project Name", date: "Date", image: "/images/placeholder.png" },
            { id: "p2", title: "Project Name", date: "Date", image: "/images/placeholder.png" },
            { id: "p3", title: "Project Name", date: "Date", image: "/images/placeholder.png" },
            { id: "p4", title: "Project Name", date: "Date", image: "/images/placeholder.png" },
            { id: "p5", title: "Project Name", date: "Date", image: "/images/placeholder.png" },
        ],
        availability: "Not Available",
        personalDetails: {
            gender: "Male",
            email: "FJamous@gmail.com",
            phone: "0790000000",
            location: "Jordan",
            nationality: "Jordan",
            projects: "30",
        },
        badges: [
            { id: "b1", label: "Travel", icon: "/images/Group 3616.svg" },
            { id: "b2", label: "Flexible Time", icon: "/images/Object.svg" },
            { id: "b3", label: "Record Project", icon: "/images/Object-1.svg" },
            { id: "b4", label: "Certified ID", icon: "/images/Object-2.svg" },
        ],
        pricePerDay: "50.00",
    };

    return (
        <main className="py-10">
            <section className="container px-6 xl:px-20">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
                    {/* Left */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Profile header */}
                        <div>
                            <div className="flex items-center gap-6">
                                <Avatar className="size-20 ring-4 ring-white shadow-sm">
                                    <AvatarImage src={talent.image} alt={talent.name} />
                                    <AvatarFallback>{talent.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                                </Avatar>
                                <div className="flex flex-col">
                                    <h1 className="mt-4 font-bold text-lg">{talent.name}</h1>
                                    <p className="text-gray-500">{talent.role}</p>

                                    <div className="flex items-center gap-1 mt-2 text-yellow-400">
                                        {Array.from({ length: 5 }).map((_, i) => (
                                            <Star
                                                key={i}
                                                className="h-4 w-4"
                                                fill={i < talent.rating ? "currentColor" : "none"}
                                                stroke="currentColor"
                                                aria-hidden="true"
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="">
                                <div className="flex items-center gap-2 mt-4 flex-wrap">
                                    <Button size="sm" variant="muted" className="rounded-full">
                                        {t("about_me")}
                                    </Button>
                                    <Button size="sm" variant="muted" className="rounded-full">
                                        {t("portfolio")}
                                    </Button>
                                    <Button size="sm" variant="muted" className="rounded-full">
                                        {t("reviews")}
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/* About */}
                        <div className="space-y-3">
                            <h2 className="title-4">{talent.aboutTitle}</h2>
                            <div className="description whitespace-pre-line">{talent.about}</div>
                        </div>

                        {/* Portfolio */}
                        <Card className="p-3">
                            <div className="space-y-4">
                                <h2 className="title-4">{talent.portfolioTitle}</h2>

                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {talent.portfolio.map((p) => (
                                        <>
                                            <div className="">
                                                <div key={p.id} className="relative w-full aspect-4/3 overflow-hidden">
                                                    <Image
                                                        src={p.image}
                                                        alt={p.title}
                                                        width={500}
                                                        height={375}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                                <div className="px-4 pt-4 pb-4 space-y-2">
                                                    <div className="font-semibold text-sm">{p.title}</div>
                                                    <div className="text-xs text-muted-foreground">{p.date}</div>
                                                    <Button
                                                        size="sm"
                                                        variant="secondary"
                                                        className="w-full rounded-md bg-accentBlue text-white hover:bg-accentBlue/90"
                                                    >
                                                        {t("view")}
                                                    </Button>
                                                </div>

                                            </div>
                                        </>
                                    ))}
                                </div>
                            </div>
                        </Card>
                    </div>

                    {/* Middle sidebar */}
                    <div className="lg:col-span-1 space-y-6">
                        {/* Availability + Personal details */}
                        <Card className="rounded-lg overflow-hidden py-0 gap-0">
                            <div className="bg-[#B71C1C] text-white text-center px-4 py-3">
                                <div className="font-semibold">{talent.availability}</div>
                            </div>

                            <div className="p-4 space-y-4">
                                <div className="font-semibold">{t("personal_details")}</div>

                                <div className="space-y-3 text-sm">
                                    <div className="flex items-start gap-2">
                                        <User className="h-4 w-4 text-muted-foreground mt-0.5" aria-hidden="true" />
                                        <div className="flex-1 flex justify-between gap-4">
                                            <span className="text-muted-foreground">{t("gender")}</span>
                                            <span className="font-medium">{talent.personalDetails.gender}</span>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-2">
                                        <Mail className="h-4 w-4 text-muted-foreground mt-0.5" aria-hidden="true" />
                                        <div className="flex-1 flex justify-between gap-4">
                                            <span className="text-muted-foreground">{t("email")}</span>
                                            <span className="font-medium">{talent.personalDetails.email}</span>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-2">
                                        <Phone className="h-4 w-4 text-muted-foreground mt-0.5" aria-hidden="true" />
                                        <div className="flex-1 flex justify-between gap-4">
                                            <span className="text-muted-foreground">{t("phone_number")}</span>
                                            <span className="font-medium">{talent.personalDetails.phone}</span>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-2">
                                        <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" aria-hidden="true" />
                                        <div className="flex-1 flex justify-between gap-4">
                                            <span className="text-muted-foreground">{t("location")}</span>
                                            <span className="font-medium">{talent.personalDetails.location}</span>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-2">
                                        <Flag className="h-4 w-4 text-muted-foreground mt-0.5" aria-hidden="true" />
                                        <div className="flex-1 flex justify-between gap-4">
                                            <span className="text-muted-foreground">{t("nationality")}</span>
                                            <span className="font-medium">{talent.personalDetails.nationality}</span>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-2">
                                        <Briefcase className="h-4 w-4 text-muted-foreground mt-0.5" aria-hidden="true" />
                                        <div className="flex-1 flex justify-between gap-4">
                                            <span className="text-muted-foreground">{t("projects")}</span>
                                            <span className="font-medium">{talent.personalDetails.projects}</span>
                                        </div>
                                    </div>
                                </div>


                                <div className="flex items-center justify-around gap-3 pt-2">
                                    <Button size="icon" variant="muted" className="rounded-full" aria-label="Facebook">
                                        <Facebook className="h-4 w-4" aria-hidden="true" />
                                    </Button>
                                    <Button size="icon" variant="muted" className="rounded-full" aria-label="X (Twitter)">
                                        <X className="h-4 w-4" aria-hidden="true" />
                                    </Button>
                                    <Button size="icon" variant="muted" className="rounded-full" aria-label="LinkedIn">
                                        <Linkedin className="h-4 w-4" aria-hidden="true" />
                                    </Button>
                                    <Button size="icon" variant="muted" className="rounded-full" aria-label="YouTube">
                                        <Youtube className="h-4 w-4" aria-hidden="true" />
                                    </Button>
                                </div>

                                <div className="space-y-2">
                                    <div className="p-2 shadow-2xl rounded-sm">
                                        <Button
                                            variant="secondary"
                                            className="w-full rounded-md bg-accentBlue text-white hover:bg-accentBlue/90"
                                        >
                                            <Download className="h-4 w-4" aria-hidden="true" />
                                            {t("download_cv")}
                                        </Button>
                                    </div>
                                    <div className="p-2 shadow-2xl rounded-sm">
                                        <Button
                                            variant="secondary"
                                            className="w-full rounded-md bg-[#F9AF3F] text-white hover:bg-[F9AF33]"
                                            onClick={() => setIsRateDialogOpen(true)}
                                        >
                                            {t("rate_candidate")}
                                        </Button>
                                    </div>

                                </div>
                            </div>
                        </Card>

                        {/* Badges */}
                        <Card className="rounded-2xl">
                            <div className="px-6">
                                <div className="font-semibold">{t("badges")}</div>
                            </div>

                            <div className="px-6 grid grid-cols-2 gap-4">
                                {talent.badges.map((b) => {
                                    return (
                                        <div key={b.id} className="flex flex-col items-center text-center gap-2">
                                            <div className=" flex items-center justify-center">
                                                <Image
                                                    src={b.icon}
                                                    alt={b.label}
                                                    width={24}
                                                    height={24}
                                                    className="h-20 w-20"
                                                />
                                            </div>
                                            <div className="text-xs font-medium">{b.label}</div>
                                        </div>
                                    );
                                })}
                            </div>
                        </Card>

                        {/* Pricing */}
                        <Card className="rounded-2xl">
                            <div className="px-6">
                                <div className="font-semibold">{t("pricing_per_day")}</div>
                            </div>
                            <div className="px-6 pb-6 flex items-end justify-center gap-2">
                                <div className="text-3xl font-extrabold text-chart-5">J{talent.pricePerDay}</div>
                                <div className="text-sm font-medium text-chart-5 mb-1">/Day</div>
                            </div>
                        </Card>
                    </div>

                    {/* Right */}
                    <div className="lg:col-span-1">
                        <Card className="overflow-hidden py-0 gap-0">
                            <div className="relative w-full aspect-3/5">
                                <Image
                                    src="/images/Event-Planning.png"
                                    alt="Ad banner"
                                    width={600}
                                    height={1000}
                                    className="absolute inset-0 w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-linear-to-b from-black/10 via-black/40 to-black/80" />

                                <div className="absolute inset-x-0 bottom-0 p-6 text-white space-y-3 text-center">
                                    <div className="text-4xl font-extrabold leading-tight">
                                        Great Ad <br />
                                        Banner
                                    </div>
                                    <p className="text-sm text-white/80">
                                        Don’t miss out the chance to put your ad and get exposure on EventHub’s Website
                                    </p>
                                    <DownloadButton
                                        url=""
                                        label={"KNOW MORE"}
                                        icon={<div className="relative ">
                                            <ArrowUpRight className="size-5 absolute top-[-13px] start-[7px]" />
                                            <ArrowUpRight className="size-5 opacity-[0.4] absolute bot-[11px] start-[-5px]" />
                                        </div>}
                                        variant="secondary"
                                        size="lg"
                                        className="w-full rounded-lg p-6"
                                    />
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </section>

            <section className="container px-6 xl:px-20 mt-12">
                <h2 className="text-3xl text-center font-black mb-6">{t("similar_profiles")}</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-20">
                    <TalentCard
                        id="2"
                        name="Sarah Johnson"
                        role="Graphic Designer"
                        projects={15}
                        years={3}
                        skills={8}
                        image="/images/placeholder.png"
                    />
                    <TalentCard
                        id="3"
                        name="Mike Chen"
                        role="Videographer"
                        projects={22}
                        years={6}
                        skills={12}
                        image="/images/placeholder.png"
                    />
                    <TalentCard
                        id="4"
                        name="Emily Davis"
                        role="Event Planner"
                        projects={18}
                        years={4}
                        skills={10}
                        image="/images/placeholder.png"
                    />
                    <TalentCard
                        id="5"
                        name="Alex Rodriguez"
                        role="Photographer"
                        projects={25}
                        years={7}
                        skills={15}
                        image="/images/placeholder.png"
                    />
                </div>
            </section>

            <RateCandidateDialog 
                isOpen={isRateDialogOpen} 
                onClose={() => setIsRateDialogOpen(false)} 
            />

        </main>
    );
};

export default TalentDetailsContent;

