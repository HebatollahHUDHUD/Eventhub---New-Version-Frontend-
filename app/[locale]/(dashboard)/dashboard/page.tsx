"use client";

import { useGetData } from "@/hooks/useFetch";
import { useTranslations } from "next-intl";
import DashboardCard from "./components/DashboardCard";
import { Eye, Star, Briefcase } from "lucide-react";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

type DashboardData = {
  profile_views: number;
  rates_count: number;
  job_ad_views: number;
  job_ads: Array<{
    id: number;
    title: string;
    applicants_count: number;
    views_count: number;
  }>;
};

const DashboardPage = () => {
  const t = useTranslations("navigation");
  const tStats = useTranslations("dashboard.dashboard-stats");

  const { data, isLoading } = useGetData<{ status: string; result: DashboardData }>({
    endpoint: "/profile/dashboard",
    queryKey: ["profile-dashboard"],
  });

  const dashboardData = data?.status === "success" ? (data.result as unknown as DashboardData) : null;

  // Prepare chart data
  const chartData = dashboardData?.job_ads?.map((job) => ({
    name: job.title.length > 15 ? job.title.substring(0, 15) + "..." : job.title,
    applicants: job.applicants_count,
    views: job.views_count,
    fullName: job.title,
  })) || [];

  const chartConfig = {
    applicants: {
      label: tStats("applicants"),
      color: "#f97316", // orange-500
    },
    views: {
      label: tStats("views"),
      color: "#3b82f6", // blue-500
    },
  };


  return (
    <div className="space-y-6">
      <div>
        <h1 className="title-2">{tStats("title")}</h1>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <DashboardCard
          title={tStats("profile-views")}
          value={dashboardData?.profile_views || 0}
          icon={<Eye className="h-6 w-6 text-muted-foreground" />}
        />
        <DashboardCard
          title={tStats("rates-count")}
          value={dashboardData?.rates_count || 0}
          icon={<Star className="h-6 w-6 text-muted-foreground" />}
        />
        <DashboardCard
          title={tStats("job-ad-views")}
          value={dashboardData?.job_ad_views || 0}
          icon={<Briefcase className="h-6 w-6 text-muted-foreground" />}
        />
      </div>

      {/* Job Ads Chart */}
      {chartData.length > 0 && (
        <div className="bg-card border rounded-2xl p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-6">{tStats("job-ads-chart-title")}</h2>
          <ChartContainer config={chartConfig} className="h-[400px] w-full">
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis
                dataKey="name"
                angle={-45}
                textAnchor="end"
                height={100}
                className="text-xs"
                tick={{ fill: "hsl(var(--muted-foreground))" }}
              />
              <YAxis
                className="text-xs"
                tick={{ fill: "hsl(var(--muted-foreground))" }}
              />
              <ChartTooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="rounded-lg border bg-background p-2 shadow-sm">
                        <div className="grid gap-2">
                          <div className="flex items-center justify-between gap-4">
                            <span className="text-sm font-medium">{data.fullName}</span>
                          </div>
                          {payload.map((entry: any, index: number) => (
                            <div key={index} className="flex items-center justify-between gap-4">
                              <span className="text-sm text-muted-foreground">
                                {entry.name === "applicants" ? tStats("applicants") : tStats("views")}
                              </span>
                              <span className="text-sm font-bold">{entry.value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar
                dataKey="applicants"
                fill="var(--color-applicants)"
                radius={[8, 8, 0, 0]}
              />
              <Bar
                dataKey="views"
                fill="var(--color-views)"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ChartContainer>
        </div>
      )}

      {chartData.length === 0 && dashboardData && (
        <div className="bg-card border rounded-2xl p-6 shadow-sm text-center">
          <p className="text-muted-foreground">{tStats("job-ads")}: 0</p>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;