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
import { Star } from "lucide-react";
import { useTranslations } from "next-intl";

const RateCandidateDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState(4);
  const t = useTranslations("talent.rate_dialog");

  const handleSubmit = () => {
    // Handle submit logic here
    console.log("Rating submitted:", rating);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
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
            className="w-full bg-[#F9AF3F] hover:bg-[#F9AF33] text-white"
          >
            {t("submit")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RateCandidateDialog;
