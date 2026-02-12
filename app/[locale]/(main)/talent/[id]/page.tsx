import TalentDetailsContent from "./content";

type Props = {
  params: Promise<{ id: string }>;
};

const TalentDetailsPage = ({ params }: Props) => {
  return (
    <TalentDetailsContentPromise params={params} />
  );
};

const TalentDetailsContentPromise = async ({ params }: Props) => {
  const { id } = await params;
  return <TalentDetailsContent id={id} />;
};

export default TalentDetailsPage;

