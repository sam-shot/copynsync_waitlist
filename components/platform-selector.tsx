"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaAndroid,
  FaApple,
  FaWindows,
  FaLinux,
  FaCircleInfo,
} from "react-icons/fa6";

export interface PlatformItem {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const PLATFORMS: PlatformItem[] = [
  { id: "android", name: "Android", icon: FaAndroid },
  { id: "macos", name: "macOS", icon: FaApple },
  { id: "windows", name: "Windows", icon: FaWindows },
  { id: "linux", name: "Linux", icon: FaLinux },
];

export interface PlatformSelectorProps {
  selected: string[];
  onToggle: (id: string) => void;
  error?: string;
  showPairingHint?: boolean;
  className?: string;
}

export default function PlatformSelector({
  selected,
  onToggle,
  error,
  showPairingHint,
  className,
}: PlatformSelectorProps) {
  const isAndroidSelected = selected.includes("android");
  const hasDesktopSelected = selected.some((p) =>
    ["macos", "windows", "linux"].includes(p)
  );

  const shouldShowHint =
    showPairingHint !== undefined
      ? showPairingHint
      : selected.length === 1 || (isAndroidSelected && !hasDesktopSelected);

  return (
    <div className={`flex flex-col ${className ?? ""}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-2.5">
        <label className="text-sm sm:text-base font-medium text-white select-none">
          Select Testing Platforms <span className="text-[#4b93ff]">*</span>
        </label>
        <span className="text-xs text-[#8f9296] select-none">Multi-select</span>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
        {PLATFORMS.map((platform) => {
          const isSelected = selected.includes(platform.id);
          const Icon = platform.icon;

          return (
            <button
              key={platform.id}
              type="button"
              onClick={() => onToggle(platform.id)}
              className={`flex h-24 sm:h-26 flex-col items-center justify-center gap-2 rounded-2xl sm:rounded-3xl border transition-all duration-150 select-none cursor-pointer active:scale-[0.98] ${
                isSelected
                  ? "border-white bg-white text-[#181819] font-medium shadow-md"
                  : "border-transparent bg-[#28292b] text-[#8f9296] hover:bg-[#323437] hover:text-white"
              }`}>
              <Icon className="h-6 w-6 sm:h-7 sm:w-7" />
              <span className="text-xs sm:text-sm">{platform.name}</span>
            </button>
          );
        })}
      </div>

      {/* Error Message */}
      {error && (
        <p className="mt-2 pl-1 text-xs sm:text-sm text-red-400 font-normal">
          {error}
        </p>
      )}

      {/* Accessible Pairing Tip in Smooth Spring Drawer without Margin/Gap Stutter */}
      <AnimatePresence initial={false}>
        {shouldShowHint && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{
              opacity: 1,
              height: "auto",
              transition: {
                height: { duration: 0.28, ease: [0.16, 1, 0.3, 1] },
                opacity: { duration: 0.2, delay: 0.05 },
              },
            }}
            exit={{
              opacity: 0,
              height: 0,
              transition: {
                height: { duration: 0.22, ease: [0.16, 1, 0.3, 1] },
                opacity: { duration: 0.12 },
              },
            }}
            className="overflow-hidden">
            <div className="pt-3">
              <div className="rounded-2xl sm:rounded-3xl bg-[#28292b] p-4 sm:p-5 flex items-start gap-3.5">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#202124] text-[#4b93ff]">
                  <FaCircleInfo className="h-5 w-5" />
                </div>
                <div className="text-left">
                  <p className="text-sm sm:text-base font-medium text-white">
                    Desktop Pairing Recommended
                  </p>
                  <p className="text-sm sm:text-base text-zinc-300 mt-1 leading-relaxed">
                    Cross-device clipboard &amp; input synchronization requires
                    testing Android together with at least one desktop OS (macOS,
                    Windows, or Linux).
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
