import { Suspense } from 'react'
import TalentContent from './components/TalentContent'
import PageHeader from '@/components/common/PageHeader'
import { getData } from '@/lib/request-server';
import PageTitle from '@/components/common/PageTitle';
import { TalentsPageResponse } from '@/schemas/types';

type PageProps = {
  searchParams: Promise<Record<string, string | undefined>>;
};

const page = async ({ searchParams }: PageProps) => {
  const params = await searchParams;

  // Call the API to get page data
  const data = await getData<TalentsPageResponse>({
    endpoint: "/talents-page",
    config: {
      next: {
        tags: ["talents-page"],
      },
    }
  });

  const pageData = data.status === "success" ? data.result : null;
  const talentsData = pageData as {
    talents_page_name: string;
    talents_page_title: string;
    talents_page_subtitle: string;
  } | null;

  return (
    <main>
      <PageHeader title={talentsData?.talents_page_name || "-"} />

      <div className="space-y-10 py-10">
        <PageTitle
          title={talentsData?.talents_page_title || "-"}
          description={talentsData?.talents_page_subtitle || "-"}
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