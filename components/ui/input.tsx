import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  label?: string;
  required?: boolean;
  hint?: string;
  leadingIcon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = "text",
      error,
      label,
      required,
      hint,
      leadingIcon,
      id,
      ...props
    },
    ref
  ) => {
    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={id}
            className="mb-2 block text-sm sm:text-base font-medium text-white select-none">
            {label} {required && <span className="text-[#4b93ff]">*</span>}
          </label>
        )}
        <div className="relative flex items-center">
          {leadingIcon && (
            <div className="pointer-events-none absolute left-5 text-[#8f9296]">
              {leadingIcon}
            </div>
          )}
          <input
            id={id}
            type={type}
            ref={ref}
            className={cn(
              "h-[54px] w-full rounded-full border bg-[#28292b] px-6 text-base text-white placeholder:text-[#8f9296] transition-colors focus:outline-none",
              leadingIcon && "pl-12",
              error
                ? "border-red-500/80 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                : "border-transparent focus:border-[#4b93ff] focus:ring-1 focus:ring-[#4b93ff]",
              className
            )}
            {...props}
          />
        </div>
        {error && (
          <p className="mt-1.5 pl-4 text-xs sm:text-sm text-red-400 font-normal">
            {error}
          </p>
        )}
        {hint && !error && (
          <p className="mt-1.5 pl-4 text-xs text-[#8f9296] font-normal">
            {hint}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
