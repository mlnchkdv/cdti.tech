import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl border border-white/15 bg-white/10 text-sm font-medium backdrop-blur-xl ring-offset-background transition-all duration-300 shadow-[0_10px_30px_-12px_rgba(0,0,0,0.45)] hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
variants: {
variant: {
        default:
          "bg-gradient-to-br from-primary/85 via-primary/75 to-primary/65 text-primary-foreground shadow-[0_14px_45px_-18px_rgba(59,130,246,0.75)] hover:from-primary/95 hover:via-primary/85 hover:to-primary/70",
        accent:
          "bg-gradient-to-br from-accent/90 via-accent/85 to-accent/70 text-accent-foreground shadow-[0_14px_45px_-18px_rgba(59,130,246,0.75)] hover:from-accent/95 hover:via-accent/90 hover:to-accent/75",
        destructive:
          "bg-gradient-to-br from-destructive/90 via-destructive/80 to-destructive/70 text-destructive-foreground shadow-[0_12px_40px_-18px_rgba(239,68,68,0.65)] hover:from-destructive/95 hover:to-destructive/80",
        outline:
          "border-white/25 bg-white/10 text-foreground shadow-[0_10px_30px_-15px_rgba(0,0,0,0.35)] hover:border-white/40 hover:bg-white/15",
        secondary:
          "bg-gradient-to-br from-white/12 via-white/6 to-white/3 text-foreground border-white/15 shadow-[0_10px_32px_-18px_rgba(0,0,0,0.35)] hover:from-white/16 hover:via-white/10 hover:to-white/5",
        ghost:
          "border-transparent bg-white/5 text-foreground shadow-none hover:border-white/20 hover:bg-white/10",
        link: "border-none bg-transparent shadow-none backdrop-blur-0 text-primary underline-offset-4 hover:underline hover:bg-transparent",
},
size: {
default: "h-10 px-4 py-2",
sm: "h-9 rounded-md px-3",
lg: "h-11 rounded-md px-8",
icon: "h-10 w-10",
},
},
defaultVariants: {
variant: "default",
size: "default",
},
},
);

export interface ButtonProps
extends React.ButtonHTMLAttributes<HTMLButtonElement>,
VariantProps<typeof buttonVariants> {
asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
({ className, variant, size, asChild = false, ...props }, ref) => {
const Comp = asChild ? Slot : "button";
return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
},
);
Button.displayName = "Button";

export { Button, buttonVariants };
