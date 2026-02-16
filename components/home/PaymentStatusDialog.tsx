"use client";

import { useTranslations } from "next-intl";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { getData } from "@/lib/request";
import { Loader2, CircleX } from "lucide-react";

interface PaymentStatusDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  paymentId: string | null;
}

const PaymentStatusDialog = ({
  open,
  onOpenChange,
  paymentId,
}: PaymentStatusDialogProps) => {
  const t = useTranslations("home.pricingPlans.paymentStatus");
  const { data, isLoading } = useQuery({
    queryKey: ["payment-status", paymentId],
    queryFn: () =>
      getData<null>({
        endpoint: `/payment-status/${paymentId}`,
      }),
    enabled: !!paymentId && open,
    retry: false,
  });

  const isSuccess = data?.status === "success";
  const isFailure = data && data.status === "fail";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="sm:max-w-md gap-0 p-6"
        showCloseButton={false}
      >
        {/* Loading State */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-12 gap-4">
            <Loader2 className="size-10 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground">
              {t("checkingPayment")}
            </p>
          </div>
        )}

        {/* Success State */}
        {!isLoading && isSuccess && (
          <div className="flex flex-col items-center text-center gap-4">
            <Image
              src="/images/plan-upgrade-success.png"
              alt="Payment Successful"
              width={180}
              height={180}
              className="mx-auto"
            />

            <DialogHeader className="items-center text-center space-y-2">
              <DialogTitle className="text-2xl font-bold">
                {t("successTitle")}
              </DialogTitle>
              <DialogDescription className="text-muted-foreground text-sm leading-relaxed whitespace-pre-line text-center">
                {t("successDescription")}
              </DialogDescription>
            </DialogHeader>

            <Button
              variant="purple"
              size="lg"
              className="mt-2 min-w-[200px]"
              onClick={() => onOpenChange(false)}
            >
              {t("greatButton")}
            </Button>
          </div>
        )}

        {/* Failure State */}
        {!isLoading && isFailure && (
          <div className="flex flex-col items-center text-center gap-4 py-6">
            <div className="flex items-center justify-center size-20 rounded-full bg-red-50">
              <CircleX className="size-10 text-red-500" />
            </div>

            <DialogHeader className="items-center text-center space-y-2">
              <DialogTitle className="text-2xl font-bold text-red-600">
                {t("failedTitle")}
              </DialogTitle>
              <DialogDescription className="text-muted-foreground text-sm leading-relaxed">
                {t("failedDescription")}
              </DialogDescription>
            </DialogHeader>

            <Button
              variant="outline"
              size="lg"
              className="mt-2 min-w-[200px]"
              onClick={() => onOpenChange(false)}
            >
              {t("closeButton")}
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PaymentStatusDialog;
