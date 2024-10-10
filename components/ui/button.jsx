import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-content whitespace-nowrap rounded-full text-base font-semibold ring-offset-white transition-colors",
  {
    variants: {
      variant: {
        default: "bg-accent text-primary hover:bg-accent-hover",
        primary: "bg-primary text-white",
        outlined: "border border-accent bg-transparent text-accent hover:bg-accent hover:text-primary",
        danger: "border border-red-500 bg-transparent text-red-500 hover:bg-red-500 hover:text-white/60",
        success: "border border-green-500 bg-transparent text-green-500 hover:bg-green-500 hover:text-white/60",
        warning: "border border-yellow-500 bg-transparent text-yellow-500 hover:bg-yellow-500 hover:text-white/60",
        disabled: "border border-black/20 bg-transparent text-black/20 cursor-not-allowed" // Add disabled styles here
      },
      size: {
        default: "h-[44px] px-6",
        md: "h-[48px] px-6",
        sm: "h-[38px] px-4",
        xs: "h-[30px] px-2",
        lg: "h-[56px] px-8 text-sm uppercase tracking-[2px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const Button = React.forwardRef(
  ({ className, variant, size, disabled = false, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    
    // Choose the variant based on the disabled state
    const buttonVariant = disabled ? 'disabled' : variant;

    return (
      <Comp
        className={cn(buttonVariants({ variant: buttonVariant, size, className }))}
        ref={ref}
        disabled={disabled} // Set disabled prop on button
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
