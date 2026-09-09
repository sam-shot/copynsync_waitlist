"use client";

import * as React from "react";
import { FaWhatsapp } from "react-icons/fa6";
import { Input } from "@/components/ui/input";

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
    <div className={`rounded-3xl bg-[#28292b] p-5 sm:p-6 ${className ?? ""}`}>
      {/* Switch Row */}
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
        className="flex cursor-pointer items-center justify-between gap-4 select-none focus:outline-none">
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

        {/* iOS-style toggle switch */}
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

      {/* Expandable Phone Input using unified Input component */}
      {joinWhatsApp && (
        <div className="mt-4 pt-1">
          <Input
            id="whatsapp-phone"
            type="tel"
            label="WhatsApp Phone Number"
            required
            placeholder="+1 234 567 8900"
            value={whatsappNumber}
            onChange={onNumberChange}
            autoComplete="tel"
            error={error}
            className="bg-[#202124]"
          />
        </div>
      )}
    </div>
  );
}
