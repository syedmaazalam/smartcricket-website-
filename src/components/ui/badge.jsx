import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold tracking-wide transition-colors select-none",
  {
    variants: {
      variant: {
        default:
          "bg-accent/10 text-accent border border-accent/20",
        secondary:
          "bg-surface text-ink border border-secondary/30",
        glass:
          "glass-pill text-ink border border-white/80 shadow-xs",
        outline:
          "border border-border text-muted bg-white/50",
        success:
          "bg-emerald-50 text-emerald-700 border border-emerald-200",
        warning:
          "bg-amber-50 text-amber-700 border border-amber-200",
        live:
          "bg-emerald-500/10 text-emerald-600 border border-emerald-500/30",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

function Badge({ className, variant, ...props }) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
