"use client";

import { useTranslations } from "next-intl";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface PurchaseDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  planDetails: {
    name: string;
    price: number;
  } | null;
}

const PurchaseDialog = ({
  open,
  onOpenChange,
  planDetails,
}: PurchaseDialogProps) => {
  const t = useTranslations("home.pricingPlans.purchaseDialog");

  if (!planDetails) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("title")}</DialogTitle>
          <DialogDescription>
            {t("description", {
              planName: planDetails.name,
              price: planDetails.price.toFixed(2),
            })}
          </DialogDescription>
        </DialogHeader>

        {/* Placeholder for future payment form / actions */}
        <div className="py-4">
          {/* Future content will go here */}
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            {t("cancel")}
          </Button>
          <Button variant="default">
            {t("confirm")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PurchaseDialog;
