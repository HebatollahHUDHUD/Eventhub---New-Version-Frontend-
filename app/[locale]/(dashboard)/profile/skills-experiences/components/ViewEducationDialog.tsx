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
import { Education } from "@/schemas/types";
import { Eye } from "lucide-react";
import moment from "moment";

interface ViewEducationDialogProps {
  education: Education;
}

const ViewEducationDialog = ({ education }: ViewEducationDialogProps) => {
  const t = useTranslations("dashboard.skills-experiences");
  const [open, setOpen] = useState(false);

  const formatDate = (dateString: string) => {
    return moment(dateString).format("MMMM YYYY");
  };

  return (
    <>
      <Button
        type="button"
        variant="outline"
        size="icon"
        onClick={() => setOpen(true)}
        aria-label={t("view-education")}
      >
        <Eye className="h-4 w-4" />
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{t("education-details")}</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-muted-foreground">
                  {t("major")}
                </label>
                <p className="text-base">{education.major}</p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-muted-foreground">
                  {t("university")}
                </label>
                <p className="text-base">{education.university}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-muted-foreground">
                    {t("from-date")}
                  </label>
                  <p className="text-base">{formatDate(education.from_date)}</p>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-muted-foreground">
                    {t("to-date")}
                  </label>
                  <p className="text-base">{formatDate(education.to_date)}</p>
                </div>
              </div>

              <div className="pt-2 border-t">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>
                    {t("created-at")}: {moment(education.created_at).format("MMM DD, YYYY")}
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

export default ViewEducationDialog;
