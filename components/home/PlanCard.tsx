"use client";

import { useTranslations } from "next-intl";
import { CircleCheckBig } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { riyalSVG } from "@/public/SVGs";
import { Plan } from "@/schemas/types";
import PurchaseDialog from "./PurchaseDialog";
// import PaymentStatusDialog from "./PaymentStatusDialog";
import { useSearchParams } from "next/navigation";
import { getUserSession } from "@/lib/userSession";
import { useState } from "react";
import PaymentStatusDialog from "./PaymentStatusDialog";

interface PlanFeature {
  name: string;
  is_active: boolean;
}

interface PlanCardProps {
  plan: Plan;
  is_recommended: boolean;
  disabled?: boolean;
  checkPaymentStatus?: boolean;
}

const PlanCard = ({
  plan,
  is_recommended,
  disabled,
  checkPaymentStatus = false,
}: PlanCardProps) => {

  const searchParams = useSearchParams();
  const loggedUser = getUserSession();


  // Payment status check: only if logged in and payment_id param is present
  const paymentId = searchParams.get("payment_id");
  const isLoggedIn = !!loggedUser;
  const [paymentStatusOpen, setPaymentStatusOpen] = useState(
    !!paymentId && isLoggedIn
  );
  const handlePaymentStatusClose = (open: boolean) => {
    setPaymentStatusOpen(open);
    if (!open && paymentId) {
      // Remove payment_id from URL without a full reload
      const url = new URL(window.location.href);
      url.searchParams.delete("payment_id");
      window.history.replaceState({}, "", url.toString());
    }
  };




  const t = useTranslations("home.pricingPlans");

  const isFree = Number(plan.price) === 0;



  const planIcon = (plan.name.toLowerCase().includes("platinum") || plan.name.includes("بلاتين"))
    ? "/icons/plan-icons/platinum.png"
    : (plan.name.toLowerCase().includes("gold") || plan.name.includes("ذهب"))
      ? "/icons/plan-icons/gold.png"
      : "/icons/plan-icons/muted.png";

  return (
    <article
      className={cn(
        "h-full relative flex flex-col rounded-3xl bg-background shadow-lg overflow-hidden border border-border/50 transition-transform duration-300 hover:-translate-y-1",

      )}
    >
      {/* Recommended Badge */}
      {is_recommended && (
        <div className="absolute top-0 end-5 z-10 bg-amber-500 text-[9px]  text-white  uppercase tracking-[.25em] px-2 py-1 leading-tight">
          {t("recommended")}
        </div>
      )}

      {/* Curved Gradient Header */}
      <div
        className="relative flex flex-col items-center justify-center  pt-4 pb-6"
        style={{
          background:
            "linear-gradient(180deg, #797DE5 0%, #333441 100%)",
          borderRadius: "0 0 50% 50% / 0 0 30px 30px",
          // borderRadius: "0 0 70% 70% / 0 0 30px 30px",
        }}
      >
        {/* Icon Circle */}
        <div className="">
          <Image src={planIcon} alt="Plan Icon" width={48} height={48} />
        </div>
        {/* Plan Name */}
        <h3 className="text-lg font-bold text-white text-center">
          {plan.name}
        </h3>
      </div>

      {/* Card Body */}
      <div className="flex flex-col flex-1 p-6 pt-4 space-y-6">

        {/* Price */}
        <div className="flex items-baseline justify-center gap-1">
          <span className="title-2 font-bold text-foreground flex items-center gap-1">
            {riyalSVG("#000", "40px", "40px")}
            {isFree ? "00.00" : parseFloat(plan.price).toFixed(2)}
          </span>
          <span className="text-sm text-muted-foreground font-medium">
            {t("perMonth")}
          </span>
        </div>

        {/* Features */}
        <ul className="space-y-3 flex-1">
          {plan.features.map((feature, index) => (
            <li
              key={index}
              className={cn(
                "flex items-center gap-2 text-sm",
                // feature
                //   ? "text-foreground"
                //   : "text-muted-foreground/40"
              )}
            >
              <CircleCheckBig
                className={cn(
                  "size-4 shrink-0",
                  // feature.is_active
                  //   ? "text-primary"
                  //   : "text-muted-foreground/40"
                )}
              />
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        {/* Purchase / Register Button */}
        <PurchaseDialog
          disabled={disabled}
          isFree={isFree}
          planDetails={plan}
        />
      </div>

      {/* Purchase Dialog */}


      {/* Payment Status Dialog */}
      {checkPaymentStatus && <PaymentStatusDialog
        open={paymentStatusOpen}
        onOpenChange={handlePaymentStatusClose}
        paymentId={paymentId}
      />}
    </article>
  );
};

export default PlanCard;
