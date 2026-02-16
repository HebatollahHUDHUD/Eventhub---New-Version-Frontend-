import BlogsContent from './components/BlogsContent';
import PageHeader from '@/components/common/PageHeader';
import PageTitle from '@/components/common/PageTitle';
import BlogsFilters from './components/BlogsFilters';
import { getTranslations } from 'next-intl/server';

type PageProps = {
  searchParams: Promise<Record<string, string | undefined>>;
};

const page = async ({ searchParams }: PageProps) => {
  const params = await searchParams;
  const t = await getTranslations("blogs");

  return (
    <main>
      <PageHeader title="Blogs" />

      <div className="space-y-10 py-10">

        <PageTitle
          title={t("title")}
          description={t("description")}
          className="max-w-md"
        />

        <BlogsFilters />

        <BlogsContent searchParams={params} />
      </div>
    </main>
  );
};

export default page;