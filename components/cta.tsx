"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

import { motion, AnimatePresence } from "framer-motion";
import { Copy, Zap, Bell, MousePointerClick, History } from "lucide-react";

interface CTAProps {
  onApplyClick?: () => void;
  scrolled?: boolean;
}

const ROTATING_FEATURES = [
  {
    icon: Copy,
    line1: "copy & paste instantly,",
    line2: "paste everywhere you work.",
  },
  {
    icon: Zap,
    line1: "transfer files at high speed,",
    line2: "at full router throughput.",
  },
  {
    icon: Bell,
    line1: "mirror phone notifications,",
    line2: "straight to your desktop.",
  },
  {
    icon: MousePointerClick,
    line1: "share mouse & keyboard,",
    line2: "control multiple computers.",
  },
  {
    icon: History,
    line1: "search your sync history,",
    line2: "find anything in milliseconds.",
  },
];

const containerVariants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.032,
    },
  },
  exit: {
    transition: {
      staggerChildren: 0,
    },
  },
};

const wordVariants = {
  initial: {
    opacity: 0,
    y: 22,
    filter: "blur(8px)",
  },
  animate: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.38,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  exit: {
    opacity: 0,
    y: -18,
    filter: "blur(6px)",
    transition: {
      duration: 0.16,
      ease: [0.32, 0, 0.67, 0],
    },
  },
};

export default function CTA({ onApplyClick, scrolled: externalScrolled }: CTAProps) {
  const [internalScrolled, setInternalScrolled] = useState(false);
  const [featureIndex, setFeatureIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setFeatureIndex((prev) => (prev + 1) % ROTATING_FEATURES.length);
    }, 3200);
    return () => clearInterval(timer);
  }, []);

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
  const CurrentFeature = ROTATING_FEATURES[featureIndex];
  const CurrentIcon = CurrentFeature.icon;

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

        {/* Display Headline: Tagline + Strictly 2-Line Dynamic Blue Text with Parallax (Reduced Line Height) */}
        <div className="w-full mb-3 sm:mb-4 flex flex-col items-center text-center">
          <h1 className="text-[1.4rem] xs:text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold tracking-tight text-white leading-[1.08] text-center w-full flex flex-col items-center">
            <span className="block w-full text-center whitespace-nowrap">Your devices in sync,</span>
            <span className="block w-full text-center min-h-[2.2em] pb-1">
              <AnimatePresence mode="wait">
                <motion.span
                  key={featureIndex}
                  variants={containerVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="w-full flex flex-col items-center justify-center text-center">
                  {/* Blue Line 1 (with inline icon, centered, tight) */}
                  <span className="inline-flex items-center justify-center text-center whitespace-nowrap">
                    <motion.span
                      variants={wordVariants}
                      className="inline-block align-[-0.08em] mr-2 sm:mr-3 md:mr-3.5">
                      <CurrentIcon className="h-[0.82em] w-[0.82em] text-[#6ca8ff] stroke-[2.4]" />
                    </motion.span>
                    {CurrentFeature.line1.split(" ").map((word, i) => (
                      <motion.span
                        key={`l1-${i}`}
                        variants={wordVariants}
                        className="inline-block mr-[0.28em] bg-gradient-to-b from-[#6ca8ff] to-[#256beb] bg-clip-text text-transparent pb-1">
                        {word}
                      </motion.span>
                    ))}
                  </span>

                  {/* Blue Line 2 (strictly on its own line, centered, tight) */}
                  <span className="inline-flex items-center justify-center text-center whitespace-nowrap">
                    {CurrentFeature.line2.split(" ").map((word, i) => (
                      <motion.span
                        key={`l2-${i}`}
                        variants={wordVariants}
                        className="inline-block mr-[0.28em] bg-gradient-to-b from-[#6ca8ff] to-[#256beb] bg-clip-text text-transparent pb-1">
                        {word}
                      </motion.span>
                    ))}
                  </span>
                </motion.span>
              </AnimatePresence>
            </span>
          </h1>
        </div>

        {/* Product Focused Secondary Subtitle */}
        <div>
          <p className="mx-auto max-w-2xl text-sm sm:text-base md:text-lg text-[#b2b6bd] font-normal leading-relaxed">
            Copynsync connects Android, Mac, Windows, and Linux over your local network so all your devices feel like one.{" "}
            <span className="text-white font-semibold">Copy</span> on your phone and{" "}
            <span className="text-white font-semibold">paste</span> on your computer,{" "}
            <span className="text-white font-semibold">transfer</span> large files at full Wi-Fi speed without the internet,{" "}
            <span className="text-white font-semibold">mirror</span> notifications, and{" "}
            <span className="text-white font-semibold">share</span> your mouse across screens, all 100% private over your local network.
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
