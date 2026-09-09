"use client";

import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="dark"
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast font-sans !rounded-full !bg-[#202124] !text-white !border !border-white/10 !shadow-2xl !px-5 !py-3.5 flex items-center gap-2.5 text-sm font-medium",
          error:
            "!border-red-500/40 !bg-[#241c1d] !text-white [&_[data-icon]]:!text-red-400",
          success:
            "!border-[#4b93ff]/40 !bg-[#1c2229] !text-white [&_[data-icon]]:!text-[#4b93ff]",
          info:
            "!border-white/10 !bg-[#202124] !text-white",
          description: "!text-[#8f9296] text-xs font-normal",
          actionButton:
            "group-[.toast]:!bg-[#4b93ff] group-[.toast]:!text-white !rounded-full",
          cancelButton:
            "group-[.toast]:!bg-white/10 group-[.toast]:!text-white !rounded-full",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
