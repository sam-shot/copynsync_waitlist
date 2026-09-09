"use client";

import { useEffect, useState } from "react";
import CopynsyncIcon from "@/components/copynsync-icon";
import { motion, AnimatePresence } from "framer-motion";

interface HeaderProps {
  scrolled?: boolean;
}

export default function Header({ scrolled: externalScrolled }: HeaderProps) {
  const [internalScrolled, setInternalScrolled] = useState(false);

  useEffect(() => {
    if (externalScrolled !== undefined) return;
    const handleScroll = () => {
      setInternalScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [externalScrolled]);

  const scrolled = externalScrolled !== undefined ? externalScrolled : internalScrolled;

  return (
    <header className="fixed left-0 right-0 top-0 z-50 flex h-[60px] items-center backdrop-blur-md bg-[#181819]/80 transition-colors">
      <div className="relative mx-auto flex h-full w-full max-w-[1440px] items-center justify-between px-6 sm:px-8 md:px-12 lg:px-16">
        
        {/* Left: Clean name of the app - Copynsync */}
        <div className="flex items-center">
          <span className="font-semibold tracking-tight text-white text-base md:text-lg select-none">
            Copynsync
          </span>
        </div>

        {/* Center: App SVG icon jumps into the middle on scroll (Muse style) */}
        <div className="absolute left-1/2 -translate-x-1/2 pointer-events-none">
          <AnimatePresence>
            {scrolled && (
              <motion.div
                initial={{ opacity: 0, scale: 0.7, y: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.7, y: 8 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="pointer-events-auto flex h-9 w-9 items-center justify-center">
                <CopynsyncIcon className="h-6 w-6 text-white" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right: Clean, empty to balance left side */}
        <div className="w-16" aria-hidden="true" />
      </div>
    </header>
  );
}
