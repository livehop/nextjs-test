"use client";

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { FaCheck, FaLightbulb } from "react-icons/fa6";
import { MdErrorOutline } from "react-icons/md";

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props}>
            <div className="grid gap-1">
              {title && (
                <ToastTitle>
                  {props.variant === "success" && (
                    <div className="flex gap-2 items-center">
                      <FaCheck />
                      {title}
                    </div>
                  )}
                  {props.variant === "destructive" && (
                    <div className="flex gap-2 items-center">
                      <MdErrorOutline />
                      {title}
                    </div>
                  )}
                </ToastTitle>
              )}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}
