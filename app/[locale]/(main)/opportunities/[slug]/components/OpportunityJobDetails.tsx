type JobDetail = {
  label: string;
  value: string;
};

type OpportunityJobDetailsProps = {
  details: JobDetail[];
  isActive?: boolean;
  applyUrl?: string;
};

const OpportunityJobDetails = ({
  details,
  isActive = true,
  applyUrl = "#",
}: OpportunityJobDetailsProps) => {
  return (
    <div className="rounded-t-xl overflow-hidden shadow-sm h-fit">
      {" "}
      {isActive && (
        <div className="bg-accentSky text-white text-center text-md font-medium py-4.5">
          Active
        </div>
      )}
      <div className="p-6 space-y-5">
        <h3 className="title-4 font-semibold">Job Details</h3>

        <div>
          {details.map((detail) => (
            <div
              key={detail.label}
              className="flex items-center justify-between text-sm py-3 first:pt-0 last:pb-0"
            >
              <span className="text-muted-foreground">{detail.label}:</span>
              <span className="font-medium">{detail.value}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="rounded-lg shadow-[0px_0px_6px_#00000029] p-3.5 mx-4 mb-4">
        <a
          href={applyUrl}
          className="block w-full text-center bg-accentPurple text-white font-medium py-2.5 rounded-lg hover:opacity-90 transition-opacity"
        >
          Apply to Job
        </a>
      </div>
    </div>
  );
};

export default OpportunityJobDetails;
