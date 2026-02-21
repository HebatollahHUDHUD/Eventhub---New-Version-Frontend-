"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useTranslations } from "next-intl";
import { usePostData } from "@/hooks/useFetch";
import { toast } from "@/components/ui/toast";
import { Loader2 } from "lucide-react";

interface SendMessageDialogProps {
  trigger: React.ReactNode;
  jobAdApplicantId?: number;
}

const SendMessageDialog = ({ trigger, jobAdApplicantId }: SendMessageDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const t = useTranslations("dashboard.employees");
  const tCommon = useTranslations("common");

  const { mutateAsync, isPending } = usePostData<any>({
    endpoint: "/messages/conversations/start",
  });

  const handleSubmit = async () => {
    if (!message.trim()) {
      toast(t("message_required") || "Please enter a message", "destructive");
      return;
    }


    try {
      const res = await mutateAsync({
        job_ad_applicant_id: jobAdApplicantId,
        message: message.trim(),
      });

      if (res.status === "success") {
        toast(res.message || t("message_sent") || "Message sent successfully", "success");
        setIsOpen(false);
        setMessage("");
      } else {
        toast(res.message || t("message_failed") || "Failed to send message", "destructive");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      toast(t("message_failed") || "Failed to send message. Please try again.", "destructive");
    }
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      setMessage("");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{t("send_message") || "Send Message"}</DialogTitle>
          <DialogDescription>
            {t("send_message_description") || "Send a message to start a conversation"}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-medium">
              {tCommon("message") || "Message"}
            </label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={t("enter_message") || "Enter your message..."}
              rows={6}
              className="resize-none"
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setIsOpen(false)}
            disabled={isPending}
          >
            {tCommon("cancel")}
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isPending || !message.trim()}
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {t("sending")}
              </>
            ) : (
              t("send") || "Send"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SendMessageDialog;
