"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { Experience } from "@/schemas/types";
import { Eye } from "lucide-react";
import moment from "moment";

interface ViewExperienceDialogProps {
  experience: Experience;
}

const ViewExperienceDialog = ({ experience }: ViewExperienceDialogProps) => {
  const t = useTranslations("dashboard.skills-experiences");
  const [open, setOpen] = useState(false);

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "-";
    return moment(dateString).format("MMMM YYYY");
  };

  return (
    <>
      <Button
        type="button"
        variant="outline"
        size="icon"
        onClick={() => setOpen(true)}
        aria-label={t("view-experience")}
      >
        <Eye />
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{t("experience-details")}</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-muted-foreground">
                  {t("position")}
                </label>
                <p className="text-base">
                  {experience.position?.name || experience.other_position || (experience.position_id ? `Position ID: ${experience.position_id}` : "-")}
                </p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-muted-foreground">
                  {t("company")}
                </label>
                <p className="text-base">
                  {experience.company?.name || experience.other_company || (experience.company_id ? `Company ID: ${experience.company_id}` : "-")}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-muted-foreground">
                    {t("from-date")}
                  </label>
                  <p className="text-base">{formatDate(experience.from_date)}</p>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-muted-foreground">
                    {t("to-date")}
                  </label>
                  <p className="text-base">
                    {experience.is_current === 1
                      ? (t("currently-working") || "Currently Working")
                      : formatDate(experience.to_date)}
                  </p>
                </div>
              </div>

              {experience.is_current === 1 && (
                <div className="flex items-center gap-2 p-2 bg-muted rounded-md">
                  <span className="text-sm font-semibold text-primary">
                    {t("currently-working")}
                  </span>
                </div>
              )}

              {experience.description && (
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-muted-foreground">
                    {t("description")}
                  </label>
                  <p className="text-base whitespace-pre-wrap">{experience.description}</p>
                </div>
              )}

              <div className="pt-2 border-t">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>
                    {t("created-at")}: {moment(experience.created_at).format("MMM DD, YYYY")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ViewExperienceDialog;
