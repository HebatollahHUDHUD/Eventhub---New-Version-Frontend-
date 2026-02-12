import { Suspense } from 'react'
import TalentContent from './components/TalentContent'
import PageHeader from '@/components/common/PageHeader'
import { getTranslations } from 'next-intl/server';

type PageProps = {
  searchParams: Promise<Record<string, string | undefined>>;
};

const page = async ({ searchParams }: PageProps) => {
  const params = await searchParams;
  const t = await getTranslations("blogs");

  return (
    <main>
      <PageHeader title="Talent" />

      <div className="space-y-10 py-10">
        <div className="space-y-4 max-w-md mx-auto text-center">
          <h2 className="title-1">
            {t("title")}
          </h2>
          <p className="description">
            {t("description")}
          </p>
        </div>
        
        <Suspense fallback={<div>Loading...</div>}>
          <TalentContent searchParams={params} />
        </Suspense>
      </div>
    </main>
  )
}

export default page