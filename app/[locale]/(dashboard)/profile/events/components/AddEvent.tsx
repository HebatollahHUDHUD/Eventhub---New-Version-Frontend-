"use client";

import { useFieldArray, useForm } from "react-hook-form";
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
import { useLocale, useTranslations } from "next-intl";
import { AddEventSchema, AddEventType } from "@/lib/schemas";
import { usePostData } from "@/hooks/useFetch";
import { toast } from "@/components/ui/toast";
import { LoaderIcon, TrashIcon, XIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { serialize } from "object-to-formdata";
import InputFile from "@/components/ui/InputFile";
import SelectUser from "@/components/select/SelectUser";
import SelectEventType from "@/components/select/SelectEventType";
import SelectLocation from "@/components/common/SelectLocation";
import Image from "@/components/common/image";
import { Event } from "@/schemas/types";
import SelectEmployee from "@/components/select/SelectEmployee";
import ChangeEventStatus from "./ChangeEventStatus";
import Status, { StatusType } from "@/components/common/Status";

const AddEvent = ({
  refetch,
  event,
  isUpdate
}: {
  refetch: () => void;
  event?: Event | null;
  isUpdate?: boolean;
}) => {
  const t = useTranslations("dashboard.events");
  const form = useForm<AddEventType>({
    resolver: zodResolver(AddEventSchema),
    defaultValues: {
      event_type_id: undefined,
      title: { en: "" },
      user_ids: [],
      users: [],
      attachments: [],
      ...(event ? {
        id: event.id,
        title: { en: event.title },
        event_type_id: event.event_type.id,
        from_date: event.from_date,
        to_date: event.to_date,
        check_in_time: event.check_in_time,
        check_out_time: event.check_out_time,
        lat: parseFloat(event.lat),
        lng: parseFloat(event.lng),
        user_ids: event.users?.map((user) => user.id) || [],
        users: event.users || [],
      } : {}),
    },
  });

  const users = form.watch("users");

  const { mutateAsync } = usePostData<AddEventType>({
    endpoint: "/profile/events",
  });

  async function onSubmit(values: AddEventType) {
    try {
      const userIds = users?.map((user: any) => user.id) || [];

      const data = {
        ...values,
        user_ids: userIds,
      };

      const formData = serialize(data, {
        indices: true,
      });

      const res = (await mutateAsync(formData as any)) as any;

      if (res.status === "success") {
        toast(res.message, "success");
        if (!isUpdate) {
          form.reset({
            event_type_id: undefined,
            title: { en: undefined },
            user_ids: [],
            attachments: [],
            check_in_time: undefined,
            check_out_time: undefined,
            from_date: undefined,
            to_date: undefined,
            lat: undefined,
            lng: undefined,
          });
        }
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
  const isDisabled = isUpdate && event?.status !== "active";

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {isUpdate ? t("event-details") || "Event Details" : t("add-event")}

          {isUpdate && (
            <Status
              status={event?.status as StatusType || "active"}
            />
          )}
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
                        disabled={isDisabled}
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
                    <div className={isDisabled ? "pointer-events-none opacity-50" : ""}>
                      <SelectEventType
                        onChange={field.onChange}
                        value={field.value}
                      />
                    </div>
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
                        disabled={isDisabled}
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
                      disabled={isDisabled}
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
                        disabled={isDisabled}
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
                      disabled={isDisabled}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="user_ids"
                render={() => (
                  <FormItem>
                    <FormLabel>{t("employees")}</FormLabel>
                    <div className={isDisabled ? "pointer-events-none opacity-50" : ""}>
                      <SelectEmployee
                        isMultiple
                        value={form.watch("users")?.map((user: any) => user.id) || []}
                        getItem={(value) => {
                          form.setValue("users", value);
                        }}
                      />
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="col-span-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {users?.map((user: any, index: number) => (
                  <div key={user.id} className="flex items-center gap-4">
                    <Button variant="outlineDestructive" size="icon-sm" className="rounded-full border-destructive bg-transparent" onClick={() => {
                      form.setValue("users", users.filter((user: any) => user.id !== user.id));
                    }}
                      disabled={isDisabled}
                    >
                      <XIcon />
                    </Button>

                    <div className="flex-1 flex items-center gap-2">
                      <Image
                        src={user.profile_image}
                        alt={user.full_name}
                        width={70}
                        height={70}
                        className="w-18 h-18 rounded-full"
                      />

                      <p>{user.name}</p>
                    </div>
                  </div>
                ))}
              </div>


              <FormField
                control={form.control}
                name="attachments"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("attachments")}</FormLabel>
                    <FormControl>
                      <InputFile
                        files={field.value || []}
                        defaultValue={event?.attachments || []}
                        onChange={field.onChange}
                        disabled={isDisabled}
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
                      <div className={isDisabled ? "pointer-events-none opacity-50" : ""}>
                        <SelectLocation
                          value={{ lat: form.watch("lat"), lng: form.watch("lng") }}
                          onChange={({ lat, lng }) => {
                            form.setValue("lat", lat);
                            form.setValue("lng", lng);
                          }}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />


            </div>



            <div className="flex gap-2 justify-end">
              {isUpdate && event?.status === "active" && (
                <>
                  {/* <ChangeEventStatus
                    id={event?.id as number}
                    status={"completed"}
                    refetch={refetch}
                  /> */}

                  <ChangeEventStatus
                    id={event?.id as number}
                    status={"cancelled"}
                    refetch={refetch}
                  />
                </>)
              }

              <Button
                type="submit"
                size={"lg"}
                disabled={isLoading || isDisabled}
                variant={"accentSecondary"}
              >
                {isLoading && (
                  <LoaderIcon className="animate-spin" />
                )}

                {isUpdate ? t("update-event") || "Update" : t("add-event")}

              </Button>
            </div>



          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default AddEvent;

