import OpportunityContent from "./content";

type Props = {
  params: any;
};

const OpportunityPage = async ({ params }: Props) => {
  const { slug } = await params;

  return <OpportunityContent slug={slug} />;
};

export default OpportunityPage;
