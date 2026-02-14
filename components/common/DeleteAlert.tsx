import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { LoaderIcon, Trash2Icon } from "lucide-react";
import { toast } from "../ui/toast";
import { useDeleteData } from "@/hooks/useFetch";
import { useTranslations } from "next-intl";

export function DeleteModal({
  className = "",
  isIcon = false,
  size = "default",
  endpoint,
  body,
  refetch,
  disabled,
}: {
  className?: string;
  isIcon?: boolean;
  hasDesc?: boolean;
  size?: "default" | "sm" | "lg" | "icon";
  endpoint: string;
  body?: any;
  refetch?: () => void;
  disabled?: boolean;
  redirectTo?: string;
  method?: "post" | "delete";
}) {
  const t = useTranslations("common");

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { mutateAsync, isPending } = useDeleteData<any>({
    endpoint,
  });

  async function onSubmit() {
    try {
      const res = (await mutateAsync(body)) as any;

      if (res.status === "success") {
        toast(res.message, "success");
        setIsOpen(false);
        refetch?.();
      } else {
        toast(res?.message?.image || res?.message, "destructive");
      }
    } catch (error) {
      console.log(error);
      toast(t("failed-to-submit"), "destructive");
    }
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button
          variant={"destructive"}
          className={className}
          size={size}
          disabled={disabled}
        >
          {isIcon ? <Trash2Icon /> : t("delete")}
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t("are-you-sure")}</AlertDialogTitle>

          <AlertDialogDescription>{t("delete-desc")}</AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>{t("cancel")}</AlertDialogCancel>
          <Button
            type="button"
            variant={"destructive"}
            onClick={onSubmit}
            disabled={isPending}
          >
            {isPending ? <LoaderIcon className="animate-spin" /> : t("confirm")}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeleteModal;
