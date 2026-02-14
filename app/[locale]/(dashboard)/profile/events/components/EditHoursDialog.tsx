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
import { usePatchData } from "@/hooks/useFetch";
import { toast } from "@/components/ui/toast";
import { LoaderIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "@/components/common/image";
import moment from "moment";
import { useEffect } from "react";

const editHoursSchema = z.object({
  check_in_hour: z.string().min(1, "Clock-in hour is required"),
  check_out_hour: z.string().min(1, "Clock-out hour is required"),
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

  // Generate hour options (00-23)
  const hours = Array.from({ length: 24 }, (_, i) => {
    const hour = i.toString().padStart(2, "0");
    return {
      value: hour,
      label: `${hour}:00`,
    };
  });

  const form = useForm<EditHoursFormValues>({
    resolver: zodResolver(editHoursSchema),
    defaultValues: {
      check_in_hour: "00",
      check_out_hour: "00",
    },
  });

  // Reset form when attendee changes
  useEffect(() => {
    if (open && attendee) {
      const existingCheckIn = attendee.check_in
        ? moment(attendee.check_in).format("HH")
        : "00";
      const existingCheckOut = attendee.check_out
        ? moment(attendee.check_out).format("HH")
        : "00";
      
      form.reset({
        check_in_hour: existingCheckIn,
        check_out_hour: existingCheckOut,
      });
    }
  }, [open, attendee, form]);

  const { mutateAsync, isPending } = usePatchData({
    endpoint: `/profile/events/${eventId}/attendees/${attendee.id}`,
  });

  const onSubmit = async (values: EditHoursFormValues) => {
    try {
      // Parse the date from attendee.check_in or use today's date
      const dateStr = attendee.check_in
        ? moment(attendee.check_in).format("YYYY-MM-DD")
        : moment().format("YYYY-MM-DD");

      // Format: YYYY-MM-DD HH:MM
      const check_in = `${dateStr} ${values.check_in_hour}:00`;
      const check_out = `${dateStr} ${values.check_out_hour}:00`;

      const res = (await mutateAsync({
        check_in,
        check_out,
      } as any)) as any;

      if (res.status === "success") {
        toast(res.message || t("hours-updated") || "Hours updated successfully", "success");
        refetch();
        onOpenChange(false);
      } else {
        toast(res.message || t("error-msg") || "An error occurred", "destructive");
      }
    } catch (error) {
      console.error(error);
      toast(t("error-msg") || "An error occurred", "destructive");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{t("edit-hours") || "Edit Hours"}</DialogTitle>
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
                  name="check_in_hour"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("clock-in-hour") || "Clock-in Hour"}</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder={t("hour") || "Hour"} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {hours.map((hour) => (
                            <SelectItem key={hour.value} value={hour.value}>
                              {hour.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="check_out_hour"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("clock-out-hour") || "Clock-out Hour"}</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder={t("hour") || "Hour"} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {hours.map((hour) => (
                            <SelectItem key={hour.value} value={hour.value}>
                              {hour.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                  disabled={isPending}
                >
                  {t("back") || "Back"}
                </Button>
                <Button
                  type="submit"
                  variant="accentSecondary"
                  disabled={isPending}
                >
                  {isPending && <LoaderIcon className="animate-spin mr-2" />}
                  {t("update") || "Update"}
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
