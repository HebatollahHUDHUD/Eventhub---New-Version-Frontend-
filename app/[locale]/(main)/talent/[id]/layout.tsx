


import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Briefcase,
  Download,
  Flag,
  Mail,
  MapPin,
  Phone,
  User,
  Facebook,
  Linkedin,
  Youtube,
} from "lucide-react";
import RateCandidateDialog from "../components/RateCandidateDialog";
import { getTranslations } from "next-intl/server";
import { getData } from "@/lib/request-server";
import AdBanner from "@/components/common/AdBanner";
import { UserDetailResponse } from "@/schemas/types";
import { Badge } from "@/components/ui/badge";


const layout = async ({ children, params }: { children: React.ReactNode, params: { id: string } }) => {
  const { id } = await params;
  const t = await getTranslations("talent.details");

  const data = await getData<UserDetailResponse>({
    endpoint: `/users/${id}`,
  });

  const userData = data.status === "success" ? data.result?.user : null;

  console.log(userData);
  if (!userData) {
    return (
      <main className="py-10">
        <section className="container px-6 xl:px-20">
          <div className="text-center py-20">
            <p className="text-muted-foreground">{t("user_not_found")}</p>
          </div>
        </section>
      </main>
    );
  }



  // Map user data to component structure
  const positionName = userData.position?.name || userData.other_position || "-";
  const availability = userData.available_for_work === 1 ? t("available") : t("not_available");
  const availabilityColor = userData.available_for_work === 1 ? "bg-green-600" : "bg-[#B71C1C]";
  const pricePerProject = userData.price_per_project || "0.00";
  const gender = userData.gender || "-";
  const countryName = userData.country?.name || "-";


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
                  <AvatarImage src={userData.photo || ""} alt={userData.name} />
                  <AvatarFallback>{userData.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <h1 className="mt-4 font-bold text-lg">{userData.name}</h1>
                  <p className="text-gray-500">{positionName}</p>
                </div>
              </div>
              <div className="mt-4">
                <div className="flex items-center flex-wrap gap-1">
                  {userData?.skills?.map((skill: any) => (
                    <Badge key={skill.id} variant="muted" className="rounded-full">
                      {skill.name}
                    </Badge>
                  ))}

                </div>
              </div>

            </div>


            {children}
          </div>

          {/* Middle sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Availability + Personal details */}
            <Card className="rounded-lg overflow-hidden py-0 gap-0">
              <div className={`${availabilityColor} text-white text-center px-4 py-3`}>
                <div className="font-semibold">{availability}</div>
              </div>

              <div className="p-4 space-y-4">
                <div className="font-semibold">{t("personal_details")}</div>

                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-2">
                    <User className="h-4 w-4 text-muted-foreground mt-0.5" aria-hidden="true" />
                    <div className="flex-1 flex justify-between gap-4">
                      <span className="text-muted-foreground">{t("gender")}</span>
                      <span className="font-medium">{gender}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground mt-0.5" aria-hidden="true" />
                    <div className="flex-1 flex justify-between gap-4">
                      <span className="text-muted-foreground">{t("email")}</span>
                      <span className="font-medium">{userData.email}</span>
                    </div>
                  </div>

                  {userData.mobile && (
                    <div className="flex items-start gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground mt-0.5" aria-hidden="true" />
                      <div className="flex-1 flex justify-between gap-4">
                        <span className="text-muted-foreground">{t("phone_number")}</span>
                        <span className="font-medium">{userData.mobile}</span>
                      </div>
                    </div>
                  )}

                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" aria-hidden="true" />
                    <div className="flex-1 flex justify-between gap-4">
                      <span className="text-muted-foreground">{t("location")}</span>
                      <span className="font-medium">{countryName}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <Flag className="h-4 w-4 text-muted-foreground mt-0.5" aria-hidden="true" />
                    <div className="flex-1 flex justify-between gap-4">
                      <span className="text-muted-foreground">{t("nationality")}</span>
                      <span className="font-medium">{countryName}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <Briefcase className="h-4 w-4 text-muted-foreground mt-0.5" aria-hidden="true" />
                    <div className="flex-1 flex justify-between gap-4">
                      <span className="text-muted-foreground">{t("projects")}</span>
                      <span className="font-medium">{userData.projects_count || 0}</span>
                    </div>
                  </div>
                </div>

                {(userData.facebook_url || userData.instagram_url || userData.youtube_url || userData.linkedin_url) && (
                  <div className="flex items-center justify-around gap-3 pt-2">
                    {userData.facebook_url && (
                      <Button
                        size="icon"
                        variant="muted"
                        className="rounded-full"
                        aria-label="Facebook"
                        asChild
                      >
                        <a href={userData.facebook_url} target="_blank" rel="noopener noreferrer">
                          <Facebook className="h-4 w-4" aria-hidden="true" />
                        </a>
                      </Button>
                    )}
                    {userData.linkedin_url && (
                      <Button
                        size="icon"
                        variant="muted"
                        className="rounded-full"
                        aria-label="LinkedIn"
                        asChild
                      >
                        <a href={userData.linkedin_url} target="_blank" rel="noopener noreferrer">
                          <Linkedin className="h-4 w-4" aria-hidden="true" />
                        </a>
                      </Button>
                    )}
                    {userData.youtube_url && (
                      <Button
                        size="icon"
                        variant="muted"
                        className="rounded-full"
                        aria-label="YouTube"
                        asChild
                      >
                        <a href={userData.youtube_url} target="_blank" rel="noopener noreferrer">
                          <Youtube className="h-4 w-4" aria-hidden="true" />
                        </a>
                      </Button>
                    )}
                  </div>
                )}

                <div className="space-y-2">
                  <div className="p-2 shadow-2xl rounded-sm">
                    {userData?.resume?.file_path && (
                      <Button
                        variant="secondary"
                        className="w-full rounded-md bg-accentBlue text-white hover:bg-accentBlue/90"
                        disabled
                        asChild
                      >
                        <a href={userData?.resume?.file_path} target="_blank" rel="noopener noreferrer">

                          <Download className="h-4 w-4" aria-hidden="true" />
                          {t("download_cv")}
                        </a>

                      </Button>
                    )}
                  </div>
                  <div className="p-2 shadow-2xl rounded-sm">
                    <RateCandidateDialog userId={id} />
                  </div>
                </div>
              </div>
            </Card>

            {/* Pricing */}
            {pricePerProject !== "0.00" && (
              <Card className="rounded-2xl">
                <div className="px-6">
                  <div className="font-semibold">{t("pricing_per_day")}</div>
                </div>
                <div className="px-6 pb-6 flex items-end justify-center gap-2">
                  <div className="text-3xl font-extrabold text-chart-5">{pricePerProject}</div>
                  <div className="text-sm font-medium text-chart-5 mb-1">{t("per_project")}</div>
                </div>
              </Card>
            )}
          </div>

          {/* Right */}
          <div className="lg:col-span-1">
            <div className="h-fit sticky top-20 p-4">
              <AdBanner
                dir="Vertical"
                position="talents_details"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default layout