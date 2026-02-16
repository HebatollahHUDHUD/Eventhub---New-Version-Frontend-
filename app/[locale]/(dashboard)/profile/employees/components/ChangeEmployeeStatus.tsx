import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { usePostData } from "@/hooks/useFetch";
import { LoaderIcon } from "lucide-react";
import { useTranslations } from "next-intl";


const ChangeEmployeeStatus = ({ id, status, refetch }: { id: number, status: "confirmed" | "declined", refetch: () => void }) => {
  const t = useTranslations("common");
  const { mutateAsync, isPending } = usePostData({
    endpoint: `/profile/employees/${id}/status`
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
    <Button variant={status === "confirmed" ? "outlineSuccess" : "outlineDestructive"} size="default" onClick={onSubmit} disabled={isPending} className="w-full">
      {isPending ? <LoaderIcon className="animate-spin" /> : t(status)}
    </Button>
  )
}

export default ChangeEmployeeStatus