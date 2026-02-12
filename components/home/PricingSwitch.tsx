"use client";

import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";

import { cn } from "@/lib/utils";

const PricingSwitch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    ref={ref}
    className={cn(
      // Track
      "peer relative inline-flex h-10 w-20 shrink-0 cursor-pointer items-center rounded-full",
      "bg-transparent shadow-[inset_0px_3px_6px_#00000029]",
      "transition-colors",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      "disabled:cursor-not-allowed disabled:opacity-50",
      className
    )}
    {...props}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        // Knob
        "pointer-events-none block h-7 w-7 rounded-full",
        "bg-[#797DE5] shadow-md",
        "transition-transform duration-200 will-change-transform",
        // Inset = 6px on both sides
        "data-[state=unchecked]:translate-x-[6px]",
        "data-[state=checked]:translate-x-[46px]"
      )}
    />
  </SwitchPrimitives.Root>
));
PricingSwitch.displayName = SwitchPrimitives.Root.displayName;

export { PricingSwitch };
