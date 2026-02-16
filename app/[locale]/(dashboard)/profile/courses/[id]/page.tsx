"use client";

import LoadingPage from "@/components/common/LoadingPage";
import { useGetData } from "@/hooks/useFetch";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "@/components/common/image";
import LessonCard from "../components/LessonCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CourseDetailsResponse } from "@/schemas/types";

const CourseDetailsPage = () => {
  const { id } = useParams();
  const t = useTranslations("dashboard.courses");

  const { data, isLoading } = useGetData<CourseDetailsResponse>({
    endpoint: `/profile/courses/${id}`,
    queryKey: [`profile-courses-${id}`],
  });

  const course = data?.status === "success" ? data?.result?.course : null;

  if (isLoading) return <LoadingPage />;

  // Parse description to extract bullet points if it's structured
  const descriptionLines = course?.description
    ? course?.description.split("\n").filter((line) => line.trim())
    : [];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div>
            <Button variant="link" size="sm" className="px-0" asChild>
              <Link href="/profile/courses">
                {t("back-to-course-list")}
              </Link>
            </Button>
          </div>

          <CardTitle>{t("course-details")}</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="flex flex-col md:flex-row gap-6">
            {/* Course Image */}
            <div className="shrink-0">
              <Image
                src={course?.image || "/images/placeholder.png"}
                alt={course?.title || ""}
                width={400}
                height={300}
                className="w-full md:w-[400px] aspect-4/3 object-cover rounded-lg"
              />
            </div>

            {/* Course Info */}
            <div className="flex-1 space-y-4">
              <h2 className="text-2xl font-bold">{course?.title || ""}</h2>

              {descriptionLines.length > 0 && (
                <div className="space-y-3">
                  <h3 className="font-semibold text-lg">{t("whats-in-this-book")}:</h3>
                  <ul className="space-y-2">
                    {descriptionLines.map((line, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle2 className="text-orange-400" />
                        <span className="text-muted-foreground">{line.trim()}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {!descriptionLines.length && course?.description && (
                <p className="text-muted-foreground">{course?.description}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t("all-classes")}</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {course?.lessons.map((lesson) => (
              <LessonCard key={lesson.id} lesson={lesson} />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CourseDetailsPage;
