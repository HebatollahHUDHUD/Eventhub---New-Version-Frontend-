import { Suspense } from 'react'
import TalentContent from './components/TalentContent'
import PageHeader from '@/components/common/PageHeader'
import { getTranslations } from 'next-intl/server';
import PageTitle from '@/components/common/PageTitle';

type PageProps = {
  searchParams: Promise<Record<string, string | undefined>>;
};

const page = async ({ searchParams }: PageProps) => {
  const params = await searchParams;
  const t = await getTranslations("talent");

  return (
    <main>
      <PageHeader title="Talent" />

      <div className="space-y-10 py-10">
        <PageTitle
          title={t("title")}
          description={t("description")}
          className="max-w-md"
        />

        <Suspense fallback={<div>Loading...</div>}>
          <TalentContent searchParams={params} />
        </Suspense>
      </div>
    </main>
  )
}

export default page