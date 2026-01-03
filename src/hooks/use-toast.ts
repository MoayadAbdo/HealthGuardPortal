import { toast } from "sonner";

type ToastOptions = {
  title?: string;
  description?: string;
  variant?: "default" | "destructive";
};

export function useToast() {
  return {
    toast: ({ title, description, variant }: ToastOptions) => {
      if (variant === "destructive") {
        toast.error(title ?? "Error", { description });
      } else {
        toast.success(title ?? "Success", { description });
      }
    },
  };
}