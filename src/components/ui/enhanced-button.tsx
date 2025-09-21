import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-neumorphic hover:shadow-elevated",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-neumorphic",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground shadow-neumorphic",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-neumorphic",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        // TRISVARA Custom Variants
        hero: "bg-gradient-primary text-white hover:shadow-glow border-2 border-white/20 backdrop-blur-sm font-inter font-semibold tracking-wide",
        wellness: "bg-gradient-secondary text-white hover:shadow-elevated border border-green-herbal/30 font-source",
        accent: "bg-saffron text-white hover:bg-saffron/90 shadow-elevated font-inter font-medium",
        neumorphic: "bg-card shadow-neumorphic hover:shadow-elevated border border-border/50 text-foreground hover:bg-muted/50",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        xl: "h-14 rounded-lg px-10 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }