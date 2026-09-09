"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full max-w-4xl mx-auto flex flex-col items-center justify-end text-center mt-12 md:mt-24 pb-10 md:pb-16 px-6 select-none">
      <div className="flex flex-col items-center gap-2.5 sm:gap-3">
        {/* Main Display Headline */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-white leading-snug">
          Your clipboard,{" "}
          <span className="text-[#4b93ff]">
            everywhere you work.
          </span>
        </h2>

        {/* Supporting info text */}
        <p className="max-w-md text-sm sm:text-base text-[#8f9296] font-normal leading-relaxed">
          Instant, peer-to-peer clipboard synchronization across all your devices.
        </p>

        {/* Built with ❤️ attribution */}
        <div className="pt-5 sm:pt-6">
          <p className="text-xs sm:text-sm text-[#5a5d63]">
            Built with ❤️ by{" "}
            <Link
              href="https://x.com/samshot01"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#8f9296] hover:text-white transition-colors underline underline-offset-4 decoration-white/20 hover:decoration-white">
              samshot01
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
