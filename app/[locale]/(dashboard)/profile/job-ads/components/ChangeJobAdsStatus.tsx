import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { usePostData } from "@/hooks/useFetch";
import { LoaderIcon } from "lucide-react";
import { useTranslations } from "next-intl";


const ChangeJobAdsStatus = ({ id, status, refetch }: { id: number, status: "closed" | "cancelled", refetch: () => void }) => {
  const t = useTranslations("common");
  const { mutateAsync, isPending } = usePostData({
    endpoint: `/profile/job-ads/${id}/status`
  })

  async function onSubmit() {
    try {
      const res = (await mutateAsync({ status })) as any;

      if (res.status === "success") {
        toast(res.message, "success");
        refetch?.();
      } else {
        toast(res.message, "destructive");
      }
    } catch (error) {
      console.log(error);
      toast(t("submit-failed"), "destructive");
    }
  }

  return (
    <Button variant={status === "closed" ? "success" : "destructive"} size="lg" onClick={onSubmit} disabled={isPending}
    >
      {isPending ? <LoaderIcon className="animate-spin" /> : t(status)}
    </Button>
  )
}

export default ChangeJobAdsStatus