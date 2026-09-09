"use client";

import { ChangeEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaAndroid,
  FaApple,
  FaWindows,
  FaLinux,
  FaWhatsapp,
  FaCircleInfo,
} from "react-icons/fa6";

export const PLATFORMS = [
  { id: "android", name: "Android", icon: FaAndroid },
  { id: "macos", name: "macOS", icon: FaApple },
  { id: "windows", name: "Windows", icon: FaWindows },
  { id: "linux", name: "Linux", icon: FaLinux },
];

export interface FormErrors {
  name?: string;
  email?: string;
  platforms?: string;
  whatsappNumber?: string;
}

interface FormProps {
  name: string;
  email: string;
  platforms: string[];
  togglePlatform: (id: string) => void;
  joinWhatsApp: boolean;
  setJoinWhatsApp: (join: boolean) => void;
  whatsappNumber: string;
  handleWhatsAppChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleNameChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleEmailChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: () => void;
  loading: boolean;
  errors: FormErrors;
}

export default function Form({
  name,
  email,
  platforms,
  togglePlatform,
  joinWhatsApp,
  setJoinWhatsApp,
  whatsappNumber,
  handleWhatsAppChange,
  handleNameChange,
  handleEmailChange,
  handleSubmit,
  loading,
  errors,
}: FormProps) {
  const isAndroidSelected = platforms.includes("android");
  const hasDesktopSelected = platforms.some((p) =>
    ["macos", "windows", "linux"].includes(p)
  );
  const showPairingHint = platforms.length === 1 || (isAndroidSelected && !hasDesktopSelected);

  return (
    <div className="w-full max-w-xl md:max-w-2xl">
      
      {/* Section Header */}
      <div className="text-center mb-6 sm:mb-8">
        <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-white">
          Apply for Closed Beta Access
        </h2>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        noValidate
        className="flex flex-col gap-6 sm:gap-7">
        
        {/* Row 1: Name and Email side-by-side with rounded-full pill inputs */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
          <div>
            <label
              htmlFor="tester-name"
              className="mb-2 block text-sm sm:text-base font-medium text-white">
              Your Name <span className="text-[#4b93ff]">*</span>
            </label>
            <input
              id="tester-name"
              type="text"
              placeholder="Samuel Lefto"
              value={name}
              onChange={handleNameChange}
              autoComplete="name"
              className={`h-[54px] w-full rounded-full border bg-[#28292b] px-6 text-base text-white placeholder:text-[#8f9296] transition-colors focus:outline-none ${
                errors.name
                  ? "border-red-500/80 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                  : "border-transparent focus:border-[#4b93ff] focus:ring-1 focus:ring-[#4b93ff]"
              }`}
            />
            {errors.name && (
              <p className="mt-1.5 pl-4 text-xs sm:text-sm text-red-400 font-normal">
                {errors.name}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="tester-email"
              className="mb-2 block text-sm sm:text-base font-medium text-white">
              Email Address <span className="text-[#4b93ff]">*</span>
            </label>
            <input
              id="tester-email"
              type="email"
              placeholder="samuel@example.com"
              value={email}
              onChange={handleEmailChange}
              autoComplete="email"
              inputMode="email"
              className={`h-[54px] w-full rounded-full border bg-[#28292b] px-6 text-base text-white placeholder:text-[#8f9296] transition-colors focus:outline-none ${
                errors.email
                  ? "border-red-500/80 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                  : "border-transparent focus:border-[#4b93ff] focus:ring-1 focus:ring-[#4b93ff]"
              }`}
            />
            {errors.email && (
              <p className="mt-1.5 pl-4 text-xs sm:text-sm text-red-400 font-normal">
                {errors.email}
              </p>
            )}
          </div>
        </div>

        {/* Row 2: Platform Selection Cards */}
        <div className="flex flex-col gap-2.5">
          <div className="flex items-center justify-between">
            <label className="text-sm sm:text-base font-medium text-white">
              Select Testing Platforms <span className="text-[#4b93ff]">*</span>
            </label>
            <span className="text-xs text-[#8f9296]">
              Multi-select
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
            {PLATFORMS.map((platform) => {
              const isSelected = platforms.includes(platform.id);
              const Icon = platform.icon;

              return (
                <button
                  key={platform.id}
                  type="button"
                  onClick={() => togglePlatform(platform.id)}
                  className={`flex h-24 sm:h-26 flex-col items-center justify-center gap-2 rounded-2xl sm:rounded-3xl border transition-all duration-150 select-none ${
                    isSelected
                      ? "border-white bg-white text-[#181819] font-medium shadow-md"
                      : errors.platforms
                      ? "border-red-500/50 bg-[#28292b] text-[#8f9296] hover:bg-[#323437] hover:text-white"
                      : "border-transparent bg-[#28292b] text-[#8f9296] hover:bg-[#323437] hover:text-white"
                  }`}>
                  <Icon className="h-6 w-6 sm:h-7 sm:w-7" />
                  <span className="text-xs sm:text-sm">{platform.name}</span>
                </button>
              );
            })}
          </div>

          {errors.platforms && (
            <p className="mt-1.5 pl-1 text-xs sm:text-sm text-red-400 font-normal">
              {errors.platforms}
            </p>
          )}

          {/* Accessible Pairing Tip in Rounded Box */}
          <AnimatePresence>
            {showPairingHint && (
              <motion.div
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: "auto", marginTop: 12 }}
                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden">
                <div className="rounded-2xl sm:rounded-3xl bg-[#28292b] p-4 sm:p-5 flex items-start gap-3.5">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#202124] text-[#4b93ff]">
                    <FaCircleInfo className="h-5 w-5" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm sm:text-base font-medium text-white">
                      Desktop Pairing Recommended
                    </p>
                    <p className="text-sm sm:text-base text-zinc-300 mt-1 leading-relaxed">
                      Cross-device clipboard &amp; input synchronization requires testing Android together with at least one desktop OS (macOS, Windows, or Linux).
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Row 3: WhatsApp Group Row - Stable container without layout/transition fighting */}
        <div className="rounded-3xl bg-[#28292b] p-5 sm:p-6">
          <div
            onClick={() => setJoinWhatsApp(!joinWhatsApp)}
            className="flex cursor-pointer items-center justify-between gap-4 select-none">
            <div className="flex items-center gap-3.5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#202124] text-[#8f9296]">
                <FaWhatsapp className="h-5 w-5 sm:h-6 sm:w-6" />
              </div>
              <div className="text-left">
                <p className="text-sm sm:text-base font-medium text-white">
                  Join WhatsApp Testing Group
                </p>
                <p className="text-xs sm:text-sm text-[#8f9296]">
                  14-day daily cohort feedback &amp; release chat
                </p>
              </div>
            </div>

            {/* iOS Switch */}
            <div
              className={`relative h-6 w-11 shrink-0 rounded-full transition-colors duration-200 ease-in-out ${
                joinWhatsApp ? "bg-[#4b93ff]" : "bg-[#3c3e42]"
              }`}>
              <div
                className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white transition-transform duration-200 ease-in-out ${
                  joinWhatsApp ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </div>
          </div>

          {/* Clean Expandable Phone Input */}
          {joinWhatsApp && (
            <div className="mt-4 pt-1">
              <label
                htmlFor="whatsapp-phone"
                className="mb-2 block text-sm sm:text-base font-medium text-white">
                WhatsApp Phone Number <span className="text-[#4b93ff]">*</span>
              </label>
              <input
                id="whatsapp-phone"
                type="tel"
                placeholder="+1 234 567 8900"
                value={whatsappNumber}
                onChange={handleWhatsAppChange}
                autoComplete="tel"
                className={`h-[54px] w-full rounded-full border bg-[#202124] px-6 text-base text-white placeholder:text-[#8f9296] transition-colors focus:outline-none ${
                  errors.whatsappNumber
                    ? "border-red-500/80 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                    : "border-transparent focus:border-[#4b93ff] focus:ring-1 focus:ring-[#4b93ff]"
                }`}
              />
              {errors.whatsappNumber && (
                <p className="mt-1.5 pl-4 text-xs sm:text-sm text-red-400 font-normal">
                  {errors.whatsappNumber}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Row 4: Muse-style Submit Pill Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex h-[54px] w-full cursor-pointer select-none items-center justify-center rounded-full bg-[#4b93ff] px-6 text-base font-medium text-white shadow-sm transition-all duration-150 hover:bg-[#3d84f5] active:bg-[#3277e6] disabled:opacity-40 disabled:cursor-not-allowed">
            {loading ? "Joining cohort..." : "Join the Testing Cohort"}
          </button>
        </div>
      </form>
    </div>
  );
}
