import BlogsContent from './components/BlogsContent';
import PageHeader from '@/components/common/PageHeader';
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
      <div className="space-y-10">
        <PageHeader title="Blogs" />

        <div className="space-y-4 max-w-md mx-auto text-center">
          <h2 className="title-1">
            {t("title")}
          </h2>
          <p className="description">
            {t("description")}
          </p>
        </div>

        <BlogsFilters />

        <BlogsContent searchParams={params} />
      </div>
    </main>
  );
};

export default page;