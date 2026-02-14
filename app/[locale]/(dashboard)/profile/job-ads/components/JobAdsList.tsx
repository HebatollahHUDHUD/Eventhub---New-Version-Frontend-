"use client";

import { Card, CardTitle, CardContent, CardHeader } from '@/components/ui/card'
import { JobAd } from '@/schemas/types';
import { useTranslations } from 'next-intl';
import JobAdCard from './JobAdCard';

const JobAdsList = ({ jobAds }: { jobAds: JobAd[] }) => {
  const t = useTranslations("dashboard.job-ads");

  if (!jobAds || jobAds.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{t("title")}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground py-8">
            {t("no-job-ads")}
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("title")}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {jobAds.map((jobAd) => (
            <JobAdCard key={jobAd.id} jobAd={jobAd} />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default JobAdsList