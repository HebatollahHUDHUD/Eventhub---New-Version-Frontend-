"use client";

import { useGetData } from "@/hooks/useFetch";
import LoadingPage from "@/components/common/LoadingPage";
import CourseCard from "./components/CourseCard";
import Pagination from "@/components/common/Pagination";
import { parseAsString, useQueryStates } from "nuqs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslations } from "next-intl";
import { CoursesResponse } from "@/schemas/types";



const CoursesPage = () => {
  const t = useTranslations("dashboard.courses");
  const [queryParams] = useQueryStates({
    page: parseAsString.withDefault("1"),
  });

  const { data, isLoading } = useGetData<CoursesResponse>({
    endpoint: "/profile/courses",
    queryKey: ["courses", queryParams.page],
    config: {
      queryParams: {
        page: queryParams.page,
      },
    },
  });

  if (isLoading) return <LoadingPage />;

  const coursesData = data?.status === "success" ? data.result : null;


  const courses = coursesData?.courses.data || [];
  const pagination = coursesData?.courses.pagination || null;



  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{t("courses")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
          <Pagination pagination={pagination} />
        </CardContent>
      </Card>
    </div>
  );
};

export default CoursesPage;
