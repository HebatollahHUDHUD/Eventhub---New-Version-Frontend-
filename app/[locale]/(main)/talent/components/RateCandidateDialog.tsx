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
} from "@/components/ui/dialog";
import { Star, Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { usePostData } from "@/hooks/useFetch";
import { toast } from "@/components/ui/toast";

interface RateCandidateDialogProps {
  userId: string | number;
}

const RateCandidateDialog = ({ userId }: RateCandidateDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const t = useTranslations("talent.rate_dialog");

  const { mutateAsync, isPending } = usePostData<any>({
    endpoint: `/users/${userId}/rate`,
  });

  const handleSubmit = async () => {
    if (rating === 0) {
      toast(t("please_select_rating") || "Please select a rating", "destructive");
      return;
    }

    try {
      const res = await mutateAsync({ rating });

      if (res.status === "success") {
        toast(res.message || t("rating_success") || "Rating submitted successfully", "success");
        setIsOpen(false);
        setRating(0);
      } else {
        toast(res.message || t("rating_failed") || "Failed to submit rating", "destructive");
      }
    } catch (error) {
      console.error("Error submitting rating:", error);
      toast(t("rating_failed") || "Failed to submit rating. Please try again.", "destructive");
    }
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      // Reset rating when dialog closes
      setRating(0);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button
          variant="secondary"
          className="w-full rounded-md bg-[#F9AF3F] text-white hover:bg-[F9AF33]"
        >
          {t("rate_candidate")}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{t("title")}</DialogTitle>
          <DialogDescription className="text-base text-gray-600">
            {t("description")}
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center space-y-6 py-6">
          <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                className="transition-colors hover:scale-110"
              >
                <Star
                  className={`h-8 w-8 ${star <= rating
                    ? "fill-yellow-400 text-yellow-400"
                    : "fill-gray-200 text-gray-200"
                    }`}
                />
              </button>
            ))}
          </div>

          <Button
            onClick={handleSubmit}
            disabled={isPending || rating === 0}
            className="w-full bg-[#F9AF3F] hover:bg-[#F9AF33] text-white disabled:opacity-50"
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {t("submitting") || "Submitting..."}
              </>
            ) : (
              t("submit")
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RateCandidateDialog;
