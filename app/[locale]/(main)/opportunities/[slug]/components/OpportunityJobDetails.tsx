"use client";

import { usePostData } from "@/hooks/useFetch";
import { toast } from "@/components/ui/toast";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

type JobDetail = {
  label: string;
  value: string;
};

type OpportunityJobDetailsProps = {
  jobAdId: number;
  details: JobDetail[];
  isActive?: boolean;
};

const OpportunityJobDetails = ({
  jobAdId,
  details,
  isActive = true,
}: OpportunityJobDetailsProps) => {
  const { mutate: applyToJob, isPending } = usePostData({
    endpoint: `/job-ads/${jobAdId}/apply`,
  });

  const handleApply = () => {
    applyToJob(null, {
      onSuccess: (data: any) => {
        if (data?.status === "fail") {
          toast(data.message, "destructive");
        } else {
          toast(data?.message || "Applied successfully", "success");
        }
      },
      onError: () => {
        toast("Failed to apply. Please try again.", "destructive");
      },
    });
  };

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
        <Button
          variant="accentPurple"
          size="lg"
          onClick={handleApply}
          disabled={isPending}
          className="w-full rounded-lg"
        >
          {isPending ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            "Apply to Job"
          )}
        </Button>
      </div>
    </div>
  );
};

export default OpportunityJobDetails;
