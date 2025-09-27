import { cn } from "@/lib/utils";
import React, { type InputHTMLAttributes } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          // Neobrutalism input styles - thick borders, sharp corners, bold shadows
          "flex h-12 w-full border-[3px] border-black bg-white px-4 py-2 text-base font-medium",
          "shadow-[4px_4px_0px_0px_#000]",
          "placeholder:text-gray-500 placeholder:font-medium",
          "focus:outline-none focus:ring-0 focus:border-black focus:shadow-[2px_2px_0px_0px_#000]",
          "focus:translate-x-[2px] focus:translate-y-[2px]",
          "transition-all duration-150 ease-out",
          "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-100",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          // Neobrutalism textarea styles - similar to input but for multiline
          "flex min-h-[120px] w-full border-[3px] border-black bg-white px-4 py-3 text-base font-medium",
          "shadow-[4px_4px_0px_0px_#000]",
          "placeholder:text-gray-500 placeholder:font-medium",
          "focus:outline-none focus:ring-0 focus:border-black focus:shadow-[2px_2px_0px_0px_#000]",
          "focus:translate-x-[2px] focus:translate-y-[2px]",
          "transition-all duration-150 ease-out",
          "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-100",
          "resize-none",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {}

export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={cn(
          "text-base font-bold text-black leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
          className
        )}
        {...props}
      />
    );
  }
);
Label.displayName = "Label";