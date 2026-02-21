"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { usePostData } from "@/hooks/useFetch";
import { toast } from "@/components/ui/toast";
import { LoaderIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "@/components/common/image";
import moment from "moment";
import { useEffect } from "react";
import { Input } from "@/components/ui/input";

const editHoursSchema = z.object({
  check_in: z.string().min(1, "Clock-in hour is required"),
  check_out: z.string().min(1, "Clock-out hour is required"),
});

type EditHoursFormValues = z.infer<typeof editHoursSchema>;

type EditHoursDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  attendee: {
    id: number;
    user: any;
    date: string;
    check_in: string | null;
    check_out: string | null;
  };
  eventId: number;
  refetch: () => void;
};

const EditHoursDialog = ({
  open,
  onOpenChange,
  attendee,
  eventId,
  refetch,
}: EditHoursDialogProps) => {
  const t = useTranslations("dashboard.events");

  const form = useForm<EditHoursFormValues>({
    resolver: zodResolver(editHoursSchema),
    defaultValues: {
      check_in: attendee.check_in || "",
      check_out: attendee.check_out || "",
    },
  });

  const { mutateAsync, isPending } = usePostData({
    endpoint: `/profile/events/${eventId}/attendees/${attendee.id}`,
  });

  const onSubmit = async (values: EditHoursFormValues) => {
    try {
      const res = await mutateAsync(values as any)

      if (res.status === "success") {
        toast(res.message || t("hours-updated"), "success");
        refetch();
        onOpenChange(false);
      } else {
        toast(res.message || t("error-msg"), "destructive");
      }
    } catch (error) {
      console.error(error);
      toast(t("error-msg"), "destructive");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="md:max-w-3xl">
        <DialogHeader>
          <DialogTitle>{t("edit-hours")}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Employee Info */}
          <div className="flex items-center gap-4 pb-4 border-b">
            <Image
              src={attendee.user?.photo || "/images/placeholder.png"}
              alt={attendee.user?.name || "User"}
              width={60}
              height={60}
              className="w-15 h-15 rounded-full object-cover"
            />
            <div>
              <p className="font-semibold">{attendee.user?.name || "-"}</p>
              <p className="text-sm text-muted-foreground">{attendee.date}</p>
            </div>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="check_in"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("clock-in")}</FormLabel>
                      <Input
                        {...field}
                        type="datetime-local"
                        placeholder={t("clock-in")}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="check_out"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("clock-out")}</FormLabel>
                      <Input
                        {...field}
                        type="datetime-local"
                        placeholder={t("clock-out")}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <DialogFooter>
                <Button
                  type="submit"
                  variant="accentSecondary"
                  disabled={isPending}
                >
                  {isPending && <LoaderIcon className="animate-spin" />}
                  {t("update")}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditHoursDialog;
