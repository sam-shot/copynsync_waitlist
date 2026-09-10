"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaWhatsapp, FaPhone } from "react-icons/fa6";

export interface WhatsAppToggleProps {
  joinWhatsApp: boolean;
  onToggle: (join: boolean) => void;
  whatsappNumber: string;
  onNumberChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  className?: string;
}

export default function WhatsAppToggle({
  joinWhatsApp,
  onToggle,
  whatsappNumber,
  onNumberChange,
  error,
  className,
}: WhatsAppToggleProps) {
  return (
    <div
      className={`rounded-3xl bg-[#28292b] p-5 sm:p-6 transition-colors select-none ${
        className ?? ""
      }`}>
      {/* Interactive Switch Row */}
      <div
        role="button"
        tabIndex={0}
        onClick={() => onToggle(!joinWhatsApp)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onToggle(!joinWhatsApp);
          }
        }}
        className="group flex cursor-pointer items-center justify-between gap-4 select-none outline-none focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0">
        {/* Left: Icon & Description */}
        <div className="flex items-center gap-3 sm:gap-3.5">
          <FaWhatsapp className="h-6 w-6 sm:h-7 sm:w-7 shrink-0 text-[#25d366]" />

          <div className="text-left">
            <p className="text-sm sm:text-base font-medium tracking-tight text-white">
              Join WhatsApp Testing Group
            </p>
            <p className="text-xs sm:text-sm text-[#8f9296] leading-snug mt-0.5">
              Daily testing feedback &amp; alpha release chat
            </p>
          </div>
        </div>

        {/* Right: Clean Tactile Switch with Top-to-Bottom Gradient */}
        <div
          role="switch"
          aria-checked={joinWhatsApp}
          className={`relative h-[28px] w-[50px] shrink-0 rounded-full transition-all duration-200 ease-out focus:outline-none ${
            joinWhatsApp
              ? "bg-gradient-to-b from-[#569bff] to-[#246feb]"
              : "bg-[#383a3f]"
          }`}>
          <div
            className={`absolute top-[3px] left-[3px] h-[22px] w-[22px] rounded-full bg-white shadow-sm transition-transform duration-200 ease-out ${
              joinWhatsApp ? "translate-x-[22px]" : "translate-x-0"
            }`}
          />
        </div>
      </div>

      {/* Morphing Expandable Phone Input Drawer */}
      <AnimatePresence initial={false}>
        {joinWhatsApp && (
          <motion.div
            key="whatsapp-drawer"
            initial={{ opacity: 0, height: 0 }}
            animate={{
              opacity: 1,
              height: "auto",
              transition: {
                height: { duration: 0.28, ease: [0.16, 1, 0.3, 1] },
                opacity: { duration: 0.22, delay: 0.05 },
              },
            }}
            exit={{
              opacity: 0,
              height: 0,
              transition: {
                height: { duration: 0.2, ease: [0.16, 1, 0.3, 1] },
                opacity: { duration: 0.12 },
              },
            }}
            className="overflow-hidden">
            <div className="pt-4 mt-4 border-t border-white/[0.06] flex flex-col gap-3">
              {/* Visual Hierarchy: Context first, so users know why their number is requested */}
              <p className="text-sm text-[#8f9296] leading-relaxed select-none">
                We will send an invitation link to the private WhatsApp tester group before testing starts.
              </p>

              <div>
                <label
                  htmlFor="whatsapp-phone"
                  className="mb-2 block text-sm sm:text-base font-medium text-white select-none">
                  WhatsApp Phone Number <span className="text-[#4b93ff]">*</span>
                </label>

                <div className="relative flex items-center">
                  <div className="pointer-events-none absolute left-5 text-[#8f9296]">
                    <FaPhone className="h-4 w-4" />
                  </div>
                  <input
                    id="whatsapp-phone"
                    type="tel"
                    placeholder="+1 234 567 8900"
                    value={whatsappNumber}
                    onChange={onNumberChange}
                    autoComplete="tel"
                    className={`h-[54px] w-full rounded-full border bg-[#202124] pl-12 pr-6 text-base text-white placeholder:text-[#8f9296] transition-colors focus:outline-none select-text ${
                      error
                        ? "border-red-500/80 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                        : "border-transparent focus:border-[#4b93ff] focus:ring-1 focus:ring-[#4b93ff]"
                    }`}
                  />
                </div>

                {error && (
                  <p className="mt-1.5 pl-4 text-xs sm:text-sm text-red-400 font-normal">
                    {error}
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
