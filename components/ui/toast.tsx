import { toast as sonnerToast } from "sonner";
import { cn } from "@/lib/utils"; // assuming you're using tailwind utils like `clsx`

type ToastVariant = "default" | "destructive" | "success" | "warning";

export function toast(
  message: string | string[],
  variant: ToastVariant = "default"
) {
  sonnerToast(
    typeof message === "string"
      ? message
      : typeof message === "object" && message.length > 0
      ? message[0]
      : "Unknown error occurred",
    {
      className: cn(
        "group toast border",
        variant === "destructive" &&
          "!bg-destructive !text-destructive-foreground !border-destructive",
        variant === "success" &&
          "!bg-emerald-500 !text-white !border-emerald-700",
        variant === "warning" &&
          "!bg-orange-500 !text-white !border-orange-700",
        variant === "default" &&
          "!bg-background !text-foreground !border-border"
      ),
    }
  );
}
