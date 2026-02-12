type OpportunityAboutProps = {
  content: string;
};

const OpportunityAbout = ({ content }: OpportunityAboutProps) => {
  return (
    <section className="space-y-4">
      <h2 className="title-3 font-semibold">About The Job</h2>
      <div className="description leading-7 whitespace-pre-line">{content}</div>
    </section>
  );
};

export default OpportunityAbout;
