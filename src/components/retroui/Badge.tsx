import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import React, { type HTMLAttributes } from "react";

const badgeVariants = cva(
  "font-sans font-medium border-2 border-black rounded-none shadow-[2px_2px_0px_0px_#000] inline-block",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        outline: "bg-background text-foreground",
        solid: "bg-foreground text-background",
        secondary: "bg-secondary text-secondary-foreground",
      },
      size: {
        sm: "px-2 py-1 text-xs",
        md: "px-3 py-1.5 text-sm",
        lg: "px-4 py-2 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({
  children,
  size = "md",
  variant = "default",
  className = "",
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(badgeVariants({ variant, size }), className)}
      {...props}
    >
      {children}
    </span>
  );
}
