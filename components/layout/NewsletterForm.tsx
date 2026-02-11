import { useTranslations } from "next-intl";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { usePostData } from "@/hooks/useFetch";
import { toast } from "../ui/toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { LoaderIcon } from "lucide-react";

const newsletterSchema = z.object({
  email: z.string().email(),
});

const NewsletterForm = () => {
  const t = useTranslations("navigation");

  const form = useForm<z.infer<typeof newsletterSchema>>({
    resolver: zodResolver(newsletterSchema),
  });

  const { mutateAsync } = usePostData<z.infer<typeof newsletterSchema>>({
    endpoint: "/subscribe-newsletter",
  });

  async function onSubmit(values: z.infer<typeof newsletterSchema>) {
    try {
      const res = (await mutateAsync(values)) as any;

      if (res.status === "success") {
        toast(t("subscribed-msg"), "success");
        form.reset();
      } else {
        toast(res.message, "destructive");
      }
    } catch (error) {
      console.log(error);
      toast("Failed to submit the form. Please try again.", "destructive");
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full"
        key={form.formState.submitCount}
      >
        <div className="relative">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    placeholder={t("enter-email")}
                    className="w-full h-14 ps-4 pe-32 bg-primary-foreground border-none"
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <button
            type="submit"
            className="absolute top-2 end-2 h-10 px-4 bg-secondary text-primary rounded-md hover:opacity-90"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? <LoaderIcon className="animate-spin" /> : t("send")}
          </button>
        </div>
      </form>
    </Form>
  );
};

export default NewsletterForm;
