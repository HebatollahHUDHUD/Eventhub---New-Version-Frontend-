import BlogsContent from './components/BlogsContent';
import PageHeader from '@/components/common/PageHeader';
import BlogsFilters from './components/BlogsFilters';
import { getTranslations } from 'next-intl/server';
import BlogsTitle from './components/BlogsTitle';

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

         <BlogsTitle />

        <BlogsFilters />

        <BlogsContent searchParams={params} />
      </div>
    </main>
  );
};

export default page;