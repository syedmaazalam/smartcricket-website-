import * as React from "react";
import { cva } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold transition-all duration-200 select-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
  {
    variants: {
      variant: {
        default:
          "bg-accent text-white hover:bg-accent-hover shadow-sm",
        secondary:
          "bg-surface text-accent hover:bg-surface/80 border border-secondary/20",
        outline:
          "border border-border bg-white text-ink hover:border-secondary hover:bg-surface/30",
        ghost:
          "text-muted hover:text-ink hover:bg-surface/60",
        glass:
          "bg-white/80 backdrop-blur-md text-ink border border-white/80 hover:bg-white hover:border-secondary shadow-soft",
        glow:
          "bg-accent text-white shadow-glow hover:bg-accent-hover hover:shadow-glow-lg",
        destructive:
          "bg-red-600 text-white hover:bg-red-700 shadow-sm",
      },
      size: {
        sm: "h-9 px-3.5 text-xs rounded-xl",
        default: "h-11 px-5 text-sm rounded-xl min-h-[44px]",
        lg: "h-13 px-7 text-base rounded-2xl min-h-[48px]",
        icon: "h-10 w-10 p-0 rounded-xl min-h-[44px] min-w-[44px]",
        "icon-sm": "h-8 w-8 p-0 rounded-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
