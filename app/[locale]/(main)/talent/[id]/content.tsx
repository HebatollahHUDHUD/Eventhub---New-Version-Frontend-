import { Card } from "@/components/ui/card";
import { getTranslations, getLocale } from "next-intl/server";
import { getData } from "@/lib/request-server";
import { UserDetailResponse } from "@/schemas/types";
import PortfolioCard from "@/app/[locale]/(dashboard)/profile/portfolio/components/PortfolioCard";

type TalentDetailsContentProps = {
    id: string;
};

const TalentDetailsContent = async ({ id }: TalentDetailsContentProps) => {
    const t = await getTranslations("talent.details");

    const data = await getData<UserDetailResponse>({
        endpoint: `/users/${id}`,
    });

    const userData = data.status === "success" ? data.result?.user : null;

    if (!userData) {
        return (
            <main className="py-10">
                <section className="container px-6 xl:px-20">
                    <div className="text-center py-20">
                        <p className="text-muted-foreground">User not found</p>
                    </div>
                </section>
            </main>
        );
    }

    // Fetch projects if needed
    let projects: any = [];
    try {
        const projectsData = await getData<any>({
            endpoint: `/users/${id}/projects`,
        });
        projects = projectsData.status === "success" ? projectsData.result?.projects || [] : [];
    } catch (error) {
        // Projects might not be available, continue without them
        projects = [];
    }


    const bio = userData.bio || "";



    return (
        <div className="space-y-6">


            {/* About */}
            {bio && (
                <div className="space-y-3">
                    <h2 className="title-4">{t("about_me")}</h2>
                    <div className="description whitespace-pre-line">{bio}</div>
                </div>
            )}

            {/* Portfolio */}
            {projects?.length > 0 && (
                <Card className="p-3">
                    <div className="space-y-4">
                        <h2 className="title-4">{t("portfolio")}</h2>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {projects.map((p: any) => (
                                <PortfolioCard
                                    key={p.id}
                                    project={p}
                                    isTalent={true}
                                />
                            ))}
                        </div>
                    </div>
                </Card>
            )}
        </div>
    );
};

export default TalentDetailsContent;

