import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import React, { type HTMLAttributes } from "react";

const badgeVariants = cva(
  // Base neobrutalism badge styles - inline-block, thick borders, sharp shadows
  "inline-block px-3 py-1 text-sm font-bold uppercase border-[2px] border-black shadow-[3px_3px_0px_0px_#000] font-sans",
  {
    variants: {
      variant: {
        default: "bg-white text-black",
        primary: "bg-black text-white",
        secondary: "bg-gray-200 text-black",
        success: "bg-green-400 text-black",
        warning: "bg-yellow-400 text-black",
        danger: "bg-red-400 text-white",
        info: "bg-blue-400 text-white",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(badgeVariants({ variant }), className)}
        {...props}
      />
    );
  }
);
Badge.displayName = "Badge";
