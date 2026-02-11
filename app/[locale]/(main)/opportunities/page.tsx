import PageHeader from "@/components/common/PageHeader";
import PageTitle from "@/components/common/PageTitle";
import OpportunitiesFilters from "./components/OpportunitiesFilters";
import OpportunitiesContent from "./components/OpportunitiesContent";

type PageProps = {
  searchParams: Promise<Record<string, string | undefined>>;
};

const page = async ({ searchParams }: PageProps) => {
  const params = await searchParams;

  return (
    <main>
      <PageHeader title="Opportunities" />

      <div className="space-y-10 py-10">
        <PageTitle
          title="More Opportunities For Everyone"
          className="space-y-6 max-w-2xl"
          description={
            <p>
              <span className="block">
                Explore the latest gigs, projects, and event roles. And take the
              </span>
              <span>next step in your events career</span>
            </p>
          }
        />

        <OpportunitiesFilters />

        <OpportunitiesContent searchParams={params} />
      </div>
    </main>
  );
};

export default page;
