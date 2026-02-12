"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ContactFormSchema, ContactFormType } from "@/schemas/shared";
import { toast } from "@/components/ui/toast";
import { usePostData } from "@/hooks/useFetch";

export default function ContactForm() {
    const t = useTranslations("contact");

    const form = useForm<ContactFormType>({
        resolver: zodResolver(ContactFormSchema),
        defaultValues: {
            name: "",
            email: "",
            subject: "",
            message: "",
        },
    });

    const { mutateAsync, isPending } = usePostData<any>({
        endpoint: "/contact",
    });

    async function onSubmit(values: ContactFormType) {
        const res = await mutateAsync(values);

        if (res.status === "success") {
            toast(t("sendSuccess"), "success");
            form.reset();
        } else {
            toast(res.message?.[0] || t("error"), "destructive");
        }
    }

    return (
        <div className="w-full max-w-lg mx-auto bg-white shadow-xl rounded-3xl p-10">
            <h2 className="title-3 mb-10 relative inline-block">
                {t("title")}
                <span className="absolute -bottom-4 left-0 w-40 h-8 bg-accentPurple/30 rounded-full"></span>
            </h2>

            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4"
                >
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    {t("fullName")}
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder={t("fullNamePlaceholder")}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel >
                                    {t("email")}
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder={t("emailPlaceholder")}

                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="subject"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel >
                                    {t("subject")}
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder={t("subjectPlaceholder")}

                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel >
                                    {t("message")}
                                </FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder={t("messagePlaceholder")}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="flex flex-row justify-center">
                        <Button
                            type="submit"
                            disabled={isPending}
                            size={"lg"}
                            variant={"accentPurple"}
                            className="rounded-full px-10 md:px-16"
                        >
                            {isPending ? t("sending") : t("submit")}
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}
