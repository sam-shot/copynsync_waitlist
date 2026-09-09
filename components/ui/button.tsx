import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex shrink-0 cursor-pointer select-none items-center justify-center gap-1.5 font-medium transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4b93ff] disabled:pointer-events-none disabled:opacity-40 active:scale-[0.98]",
  {
    variants: {
      variant: {
        primary:
          "bg-gradient-to-b from-[#569bff] to-[#246feb] hover:from-[#62a4ff] hover:to-[#317bf5] active:from-[#2167de] active:to-[#1b55be] text-white shadow-[0_1px_0_0_rgba(255,255,255,0.2)_inset,0_2px_6px_rgba(0,0,0,0.18)]",
        elevated:
          "bg-[#28292d]/90 hover:bg-[#34353a] active:bg-[#202124] backdrop-blur-[16px] text-white shadow-[0_1px_0_0_rgba(255,255,255,0.18)_inset,0_4px_16px_0_rgba(0,0,0,0.35)]",
        secondary:
          "bg-[#242528] hover:bg-[#2d2e33] active:bg-[#1d1e20] text-white",
        outline:
          "border border-white/15 hover:border-white/30 hover:bg-white/5 text-white",
        ghost:
          "hover:bg-white/10 text-[#8f9296] hover:text-white",
      },
      size: {
        sm: "h-8 px-3.5 text-xs rounded-full",
        md: "h-10 px-5 text-sm rounded-full",
        lg: "h-[54px] px-6 text-base rounded-full",
        icon: "h-10 w-10 rounded-full p-0",
      },
      fullWidth: {
        true: "w-full",
        false: "w-fit",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      fullWidth: false,
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      fullWidth,
      asChild = false,
      loading = false,
      icon,
      trailingIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, fullWidth, className }))}
        ref={ref}
        disabled={disabled || loading}
        {...props}>
        {loading ? (
          <span className="inline-flex items-center gap-2">
            <svg
              className="h-4 w-4 animate-spin text-current"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              />
            </svg>
            <span>{children}</span>
          </span>
        ) : (
          <>
            {icon && <span className="shrink-0">{icon}</span>}
            {children}
            {trailingIcon && <span className="shrink-0">{trailingIcon}</span>}
          </>
        )}
      </Comp>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
