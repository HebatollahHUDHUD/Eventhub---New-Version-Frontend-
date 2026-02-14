"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TicketCard } from "@/components/ui/ticket-card";
import { usePostData } from "@/hooks/useFetch";
import { toast } from "@/components/ui/toast";
import { CircleX, Loader2 } from "lucide-react";

interface PurchaseDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  planDetails: {
    name: string;
    price: number;
    id?: string | number;
  } | null;
}

const PurchaseDialog = ({
  open,
  onOpenChange,
  planDetails,
}: PurchaseDialogProps) => {
  const t = useTranslations("home.pricingPlans.purchaseDialog");

  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState<{
    code: string;
    discount: number;
  } | null>(null);

  // Placeholder API: Validate Promo Code
  // POST /validate-promo  { code: string, plan_id: string }
  // Response: { status: "success", result: { discount: number, code: string } }
  const { mutate: validatePromo, isPending: isValidating } = usePostData<{
    discount: number;
    code: string;
  }>({
    endpoint: "/validate-promo",
  });

  // Placeholder API: Process Payment
  // POST /process-payment  { plan_id: string, promo_code?: string }
  // Response: { status: "success", result: { payment_url: string } }
  const { mutate: processPayment, isPending: isProcessing } = usePostData<{
    payment_url: string;
  }>({
    endpoint: "/process-payment",
  });

  const handleApplyPromo = () => {
    if (!promoCode.trim() || !planDetails) return;

    validatePromo(
      { code: promoCode.trim(), plan_id: String(planDetails.id ?? "") },
      {
        onSuccess: (res) => {
          if (res?.status === "success" && res.result) {
            setAppliedPromo({
              code: promoCode.trim(),
              discount: res.result.discount,
            });
            toast(t("promoCodeApplied"), "success");
          } else {
            toast(t("invalidPromoCode"), "destructive");
          }
        },
        onError: () => {
          toast(t("invalidPromoCode"), "destructive");
        },
      }
    );
  };

  const handleRemovePromo = () => {
    setAppliedPromo(null);
    setPromoCode("");
  };

  const handlePayment = () => {
    if (!planDetails) return;

    const payload: Record<string, unknown> = {
      plan_id: String(planDetails.id ?? ""),
    };
    if (appliedPromo) {
      payload.promo_code = appliedPromo.code;
    }

    processPayment(payload, {
      onSuccess: (res) => {
        if (res?.status === "success" && res.result?.payment_url) {
          window.location.href = res.result.payment_url;
        }
      },
      onError: () => {
        toast(t("invalidPromoCode"), "destructive");
      },
    });
  };

  const handleOpenChange = (value: boolean) => {
    if (!value) {
      // Reset state when dialog closes
      setPromoCode("");
      setAppliedPromo(null);
    }
    onOpenChange(value);
  };

  if (!planDetails) return null;

  const price = planDetails.price;
  const discount = appliedPromo?.discount ?? 0;
  const total = price - discount;

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md gap-4 p-4 pt-10 border-none shadow-none overflow-visible md:min-w-[600px]!">
      <TicketCard
          cardBg="#F2F2F2"
          // className="space-y-6"
          
        > 
        <div className="max-w-[400px]! mx-auto space-y-4">

        
          {/* Header Section */}
          <DialogHeader className="items-center text-center border-2 border-white rounded-xl py-6 space-y-0 ">
            <DialogTitle className="text-xl font-bold">
              {t("title")}
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              {t("description")}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              {t("promocode")}
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Input
                  value={appliedPromo ? appliedPromo.code : promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder={t("promocodePlaceholder")}
                  disabled={!!appliedPromo || isValidating}
                  className="border-amber-400!  pe-10 h-[40px]"
                />
                {appliedPromo && (
                  <button
                    type="button"
                    onClick={handleRemovePromo}
                    className="absolute top-1/2 end-3 -translate-y-1/2 text-red-500 hover:text-red-600 transition-colors"
                    aria-label="Remove promo code"
                  >
                    <CircleX className="size-5" />
                  </button>
                )}
              </div>
              <Button
                variant="orange"
                onClick={handleApplyPromo}
                disabled={!promoCode.trim() || !!appliedPromo || isValidating}
                className="shrink-0 h-[40px]"
              >
                {isValidating ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  t("applyCode")
                )}
              </Button>
            </div>
          </div>
          </div>
        </TicketCard>

          {/* Promocode Input Section */}

          {/* Pricing Summary Section */}
          <div className="space-y-3">
            {/* Plan Amount */}
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                {t("planAmount")}
              </span>
              <span className="text-base font-semibold">
                ₦{price.toFixed(2)}
              </span>
            </div>

            {/* Discount - only shown when promo applied */}
            {appliedPromo && (
              <>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    {t("discount")}
                  </span>
                  <span className="text-base font-semibold">
                    ₦{discount.toFixed(2)}
                  </span>
                </div>

                
                {/* Total */}
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">
                    {t("total")}
                  </span>
                  <span className="text-lg font-bold text-amber-500">
                    ₦{total.toFixed(2)}
                  </span>
                </div>
              </>
            )}
          </div>

          {/* Footer Button */}
          <Button
            // variant="default"
            size="lg"
            className="max-w-[300px]! mx-auto bg-[#797DE5]!"
            onClick={handlePayment}
            disabled={isProcessing}
          >
            {isProcessing ? (
              <Loader2 className="size-4 animate-spin" />
            ) : appliedPromo ? (
              t("proceedToPayment")
            ) : (
              t("continueWithoutCode")
            )}
          </Button>
       
      </DialogContent>
    </Dialog>
  );
};

export default PurchaseDialog;
