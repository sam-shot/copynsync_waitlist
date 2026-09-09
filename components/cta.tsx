"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface CTAProps {
  onApplyClick?: () => void;
  scrolled?: boolean;
}

export default function CTA({ onApplyClick, scrolled: externalScrolled }: CTAProps) {
  const [internalScrolled, setInternalScrolled] = useState(false);

  useEffect(() => {
    if (externalScrolled !== undefined) return;
    const handleScroll = () => {
      setInternalScrolled(window.scrollY > 15);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [externalScrolled]);

  const scrolled = externalScrolled !== undefined ? externalScrolled : internalScrolled;

  return (
    <section className="relative flex h-[100dvh] w-full flex-col items-center justify-center pt-[60px] pb-6 px-5 sm:px-6 lg:px-8 select-none">
      {/* Hero Center Lockup: App Icon, Display Headline, Subtitle, and Apply Button - All within 100dvh */}
      <div className="flex w-full max-w-3xl flex-col items-center text-center my-auto">
        {/* Hero App Icon (generous clearance below 60px fixed header, perfectly unclipped) */}
        <div id="hero-app-icon" className="relative mb-5 sm:mb-6">
          <Image
            src="/icons/copynsync-128.png"
            alt="Copynsync"
            width={96}
            height={96}
            priority
            className="h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 rounded-2xl object-contain drop-shadow-2xl"
          />
        </div>

        {/* Display Headline */}
        <div className="space-y-1 mb-3 sm:mb-4">
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-white leading-[1.12]">
            Your clipboard, <br />
            <span className="text-[#4b93ff]">
              everywhere you work.
            </span>
          </h1>
        </div>

        {/* Clean Secondary Subtitle */}
        <div>
          <p className="mx-auto max-w-xl text-sm sm:text-base md:text-lg text-[#8f9296] font-normal leading-relaxed">
            Instant, peer-to-peer clipboard synchronization across Android, macOS, Windows, and Linux.
            Join our 14-day cohort for <strong className="font-medium text-white">free Pro access</strong> during testing plus a <strong className="font-medium text-white">1-month Pro license</strong> on launch.
          </p>
        </div>
      </div>

      {/* Muse AI Style Elevated Button: Anchored at the bottom of 100dvh, borderless, disappears smoothly on scroll */}
      <Button
        variant="elevated"
        size="md"
        onClick={onApplyClick}
        type="button"
        trailingIcon={
          <svg
            className="h-4 w-4 text-white/80 transition-transform duration-150 group-hover:translate-y-0.5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round">
            <path d="m6 9 6 6 6-6" />
          </svg>
        }
        className={`fixed inset-x-0 bottom-6 sm:bottom-8 z-30 mx-auto group transition-all duration-200 ease-out ${
          scrolled
            ? "opacity-0 pointer-events-none translate-y-2"
            : "opacity-100 pointer-events-auto translate-y-0"
        }`}>
        Apply for Closed Beta
      </Button>
    </section>
  );
}
