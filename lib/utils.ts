import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function errorMessagesHandler(errors: any, setError: any) {
  Object.entries(errors).forEach(([field, error]) => {
    // If the error is a string
    if (typeof error === "string") {
      setError(
        field,
        {
          type: "custom",
          message: error,
        },
        { shouldFocus: true }
      );
    } else if (Array.isArray(error)) {
      setError(
        field,

        {
          type: "custom",
          message: error[0], // Take the first error message
        },
        { shouldFocus: true }
      );
    } else if (error && typeof error === "object" && "message" in error) {
      setError(
        field,
        {
          type: "custom",
          message: error.message,
        },
        { shouldFocus: true }
      );
    }
  });
}
