"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaXmark } from "react-icons/fa6";
import Confetti from "@/components/ui/confetti";
import CopynsyncIcon from "@/components/copynsync-icon";
import { Button } from "@/components/ui/button";

interface SuccessDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function SuccessDialog({ open, onClose }: SuccessDialogProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  // Lock background scrolling when dialog is open
  useEffect(() => {
    if (open) {
      const originalOverflow = document.body.style.overflow;
      const originalTouchAction = document.body.style.touchAction;
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
      return () => {
        document.body.style.overflow = originalOverflow;
        document.body.style.touchAction = originalTouchAction;
      };
    }
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 select-none">
          {/* Confetti Animation */}
          <Confetti duration={3000} />

          {/* Solid Dark Backdrop - NO Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80"
          />

          {/* Clean Muse-style Dialog Card - Solid Background, NO Borders, NO Gradients */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            className="relative z-10 w-full max-w-md rounded-3xl sm:rounded-[32px] bg-[#242528] p-7 sm:p-8 shadow-2xl text-center flex flex-col items-center">
            {/* Close Button in Top-Right */}
            <button
              onClick={onClose}
              type="button"
              aria-label="Close dialog"
              className="absolute top-4 sm:top-5 right-4 sm:right-5 h-8 w-8 rounded-full bg-white/5 hover:bg-white/10 text-[#8f9296] hover:text-white flex items-center justify-center transition-colors outline-none focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0">
              <FaXmark className="h-4 w-4" />
            </button>

            {/* App Icon - Direct White SVG */}
            <div className="my-3 flex items-center justify-center">
              <CopynsyncIcon className="h-12 w-12 text-white" />
            </div>

            {/* Headline */}
            <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white mb-2.5">
              Application Received!
            </h3>

            {/* Message clarifying that downloads and invites arrive within the week */}
            <p className="text-sm sm:text-base text-[#d4d7dc] font-normal leading-relaxed mb-6">
              We&apos;ve reserved your closed beta spot. As soon as the test build is ready <span className="text-white font-medium">(within the week)</span>, you&apos;ll receive an onboarding email with your download links, test access, and WhatsApp group invite.
            </p>

            {/* Action Button: Rounded-full pill */}
            <Button
              variant="primary"
              size="lg"
              fullWidth
              onClick={onClose}
              type="button">
              Got it
            </Button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
