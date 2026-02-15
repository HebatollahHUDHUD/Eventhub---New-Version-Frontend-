"use client";

import { useState, useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { talentRegisterSchema } from "@/lib/schemas";
import { useTranslations } from "next-intl";
import { FormField, FormItem, FormControl, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LoaderIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const
  VerificationCodeForm = ({
    form,
    isLoading,
    onSubmit,
  }: {
    form: UseFormReturn<z.infer<typeof talentRegisterSchema>>;
    isLoading: boolean;
    onSubmit: (values: z.infer<typeof talentRegisterSchema>) => Promise<void>;
  }) => {
    const t = useTranslations("auth");
    const tCommon = useTranslations("common");
    const [countdown, setCountdown] = useState(60);
    const [canResend, setCanResend] = useState(false);
    const [isResending, setIsResending] = useState(false);

    useEffect(() => {
      if (countdown > 0) {
        const timer = setTimeout(() => {
          setCountdown(countdown - 1);
        }, 1000);
        return () => clearTimeout(timer);
      } else {
        setCanResend(true);
      }
    }, [countdown]);

    const handleResendCode = async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();

      // Clear verification_code from form
      form.setValue("verification_code", undefined);

      // Get current form values
      const currentValues = form.getValues();

      // Remove verification_code from values
      const valuesWithoutCode = {
        ...currentValues,
        verification_code: undefined,
      };

      // Reset countdown
      setCountdown(60);
      setCanResend(false);
      setIsResending(true);

      // Submit form with current values (without verification_code)
      try {
        await onSubmit(valuesWithoutCode);
      } catch (error) {
        console.error(error);
      } finally {
        setIsResending(false);
      }
    };

    // Calculate progress for circular timer (0 to 100)
    const progress = ((60 - countdown) / 60) * 100;
    const circumference = 2 * Math.PI * 45; // radius = 45
    const strokeDashoffset = circumference - (progress / 100) * circumference;

    return (
      <Card className="max-w-md mx-auto">
        <CardContent>
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="verification_code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("verify-form.code-label")}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t("verify-form.code-label")}
                      className="border-purple-300 focus:border-purple-500"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Circular Countdown Timer */}
            <div className="flex flex-col items-center gap-4">
              <div className="relative w-24 h-24">
                <svg className="transform -rotate-90 w-24 h-24">
                  {/* Background circle */}
                  <circle
                    cx="48"
                    cy="48"
                    r="45"
                    stroke="currentColor"
                    strokeWidth="6"
                    fill="none"
                    className="text-gray-200"
                  />
                  {/* Progress circle */}
                  <circle
                    cx="48"
                    cy="48"
                    r="45"
                    stroke="currentColor"
                    strokeWidth="6"
                    fill="none"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    className="text-blue-600 transition-all duration-1000"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-blue-600 font-semibold text-xl">
                    {countdown}
                  </span>
                </div>
              </div>

              {/* Resend Code Link */}
              <button
                type="button"
                onClick={handleResendCode}
                disabled={!canResend || isResending}
                className={`text-sm ${canResend && !isResending
                  ? "text-orange-600 hover:text-orange-700 cursor-pointer"
                  : "text-gray-400 cursor-not-allowed"
                  } transition-colors`}
              >
                {isResending ? (
                  <span className="flex items-center gap-2">
                    <LoaderIcon className="w-4 h-4 animate-spin" />
                    {t("verify-form.resend-code")}
                  </span>
                ) : (
                  t("verify-form.resend-code")
                )}
              </button>
            </div>

            {/* Confirm Button */}
            <div className="flex justify-center">
              <Button
                type="submit"
                size={"lg"}
                disabled={isLoading}
                variant={"accentSecondary"}
                className="w-full max-w-xs"
              >
                {isLoading ? (
                  <LoaderIcon className="animate-spin" />
                ) : (
                  tCommon("confirm")
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

export default VerificationCodeForm;
