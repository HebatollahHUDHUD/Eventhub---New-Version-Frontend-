"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useTranslations } from "next-intl";
import { AddEventSchema, AddEventType } from "@/lib/schemas";
import { usePostData } from "@/hooks/useFetch";
import { toast } from "@/components/ui/toast";
import { LoaderIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { serialize } from "object-to-formdata";
import InputFile from "@/components/ui/InputFile";
import SelectUser from "@/components/select/SelectUser";
import SelectEventType from "@/components/select/SelectEventType";
import SelectLocation from "@/components/common/SelectLocation";

const AddEvent = ({ refetch }: { refetch: () => void }) => {
  const t = useTranslations("dashboard.events");
  const form = useForm<AddEventType>({
    resolver: zodResolver(AddEventSchema),
    defaultValues: {
      event_type_id: 1,
      title: { en: "" },
      user_ids: [],
      attachments: [],
    },
  });

  const { mutateAsync } = usePostData<AddEventType>({
    endpoint: "/profile/events",
  });

  async function onSubmit(values: AddEventType) {
    try {
      const formData = serialize(values, {
        indices: true,
      });

      const res = (await mutateAsync(formData as any)) as any;

      if (res.status === "success") {
        toast(res.message, "success");
        form.reset();
        refetch();
        return;
      } else {
        toast(res.message, "destructive");
      }
    } catch (error) {
      console.log(error);
      toast(t("error-msg"), "destructive");
    }
  }

  const isLoading = form.formState.isSubmitting;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {t("add-event")}
        </CardTitle>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="title.en"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("event-title")}</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder={t("enter-event-title")}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="event_type_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("event-type")}</FormLabel>
                    <SelectEventType onChange={field.onChange} value={field.value} />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="from_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("from-date")}</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="date"
                        placeholder={t("enter-from-date")}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="to_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("to-date")}</FormLabel>
                    <Input
                      {...field}
                      type="date"
                      placeholder={t("enter-to-date")}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="check_in_time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("check-in-time")}</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="time"
                        placeholder={t("enter-check-in-time")}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="check_out_time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("check-out-time")}</FormLabel>
                    <Input
                      {...field}
                      type="time"
                      placeholder={t("enter-check-out-time")}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />


              <FormField
                control={form.control}
                name="user_ids"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("employees")}</FormLabel>
                    <SelectUser
                      isMultiple
                      value={field.value}
                      onChange={field.onChange}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="col-span-full grid grid-cols-1 md:grid-cols-2 gap-4"></div>


              <FormField
                control={form.control}
                name="attachments"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("attachments")}</FormLabel>
                    <FormControl>
                      <InputFile
                        files={field.value || []}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="lat"
                render={() => (
                  <FormItem>
                    <FormLabel>{t("location")}</FormLabel>
                    <FormControl>
                      <SelectLocation
                        value={{ lat: form.watch("lat"), lng: form.watch("lng") }}
                        onChange={({ lat, lng }) => {
                          form.setValue("lat", lat);
                          form.setValue("lng", lng);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />


            </div>


            <div className="flex justify-end">
              <Button
                type="submit"
                size={"lg"}
                disabled={isLoading}
                variant={"accentSecondary"}
              >
                {isLoading && (
                  <LoaderIcon className="animate-spin" />
                )}

                {t("add-event")}

              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default AddEvent;

